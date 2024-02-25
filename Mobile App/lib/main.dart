import 'package:flutter/material.dart';
import 'package:mongo_dart/mongo_dart.dart' as mongo;
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sound_stream/sound_stream.dart';
import 'package:web_socket_channel/io.dart';
import 'dart:math' as math;



void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'DocAI',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DocAI'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => TranscriptionSessionPage(filePath: null)),
            );
          },
          child: Text('Start Transcription'),
        ),
      ),
    );
  }
}

class RecordingSession {
  final String transcript;
  final DateTime timestamp;

  RecordingSession({required this.transcript, required this.timestamp});
}

const serverUrl = 'wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000&language=en-GB';
const apiKey = '6eb68cb75458c666d51f34a1b341a49c804c9e44'; // Replace with your actual Deepgram API key

class TranscriptionSessionPage extends StatefulWidget {
  final String? filePath;

  const TranscriptionSessionPage({Key? key, this.filePath}) : super(key: key);

  @override
  _TranscriptionSessionPageState createState() => _TranscriptionSessionPageState();
}

class _TranscriptionSessionPageState extends State<TranscriptionSessionPage> {
  final RecorderStream _recorder = RecorderStream();
  bool isRecording = false;
  late StreamSubscription _audioStream;
  late StreamSubscription _recorderStatus;
  late IOWebSocketChannel channel;
  String transcript = '';
  List<RecordingSession> _sessions = [];

  @override
  void initState() {
    super.initState();
    _recorder.initialize();
    if (widget.filePath == null) {
      _requestPermissions().then((_) {
        _startRecording();
      });
    } else {
      _loadTranscript();
    }
  }

  Future<void> _requestPermissions() async {
    final status = await Permission.microphone.request();
    if (status != PermissionStatus.granted) {
      print("Microphone permission denied");
    }
  }

  Future<void> _startRecording() async {
    await _initStream();
    await _recorder.start();
    setState(() {
      isRecording = true;
    });
  }

  Future<void> _initStream() async {
    channel = IOWebSocketChannel.connect(Uri.parse(serverUrl), headers: {'Authorization': 'Token $apiKey'});
    channel.stream.listen((event) {
      final parsedJson = jsonDecode(event);
      if (parsedJson['channel']['alternatives'] != null && parsedJson['channel']['alternatives'].isNotEmpty) {
        setState(() {
          transcript += "${parsedJson['channel']['alternatives'][0]['transcript']}\n";
        });
      }
    });

    _audioStream = _recorder.audioStream.listen((data) => channel.sink.add(data));
    _recorderStatus = _recorder.status.listen((status) {
      // Update UI based on recorder status if needed
    });
  }

 Future<void> _stopRecording() async {
    await _recorder.stop();
    channel.sink.close();
    await _audioStream.cancel();
    await _recorderStatus.cancel();
    setState(() {
      isRecording = false;
      _sessions.add(RecordingSession(transcript: transcript, timestamp: DateTime.now()));
      transcript = ''; // Reset transcript for the next session
    });
    await _saveTranscriptToMongoDB(_sessions.last); // Save the last session to MongoDB
}

Future<void> _saveTranscriptToMongoDB(RecordingSession session) async {
  try {
    var db = await mongo.Db.create("mongodb+srv://craftersaiofficial:ashmat@cluster0.vqrvkmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); // Replace with your actual MongoDB URL
    await db.open();
    var collection = db.collection('transcriptions'); // Replace with your actual collection name
    await collection.insertOne({
      "transcript": session.transcript,
      "timestamp": session.timestamp.toIso8601String(),
    });
    await db.close();
  } catch (e) {
    print("Error connecting to the database: $e");
  }
}

  Future<void> _saveTranscript() async {
    final directory = await getApplicationDocumentsDirectory();
    final String fileName = DateFormat('yyyy-MM-dd – kk:mm').format(DateTime.now()) + '.txt';
    final File file = File('${directory.path}/$fileName');
    await file.writeAsString(transcript);
  }

  Future<void> _loadTranscript() async {
    final fileContent = await File(widget.filePath!).readAsString();
    setState(() {
      transcript = fileContent;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transcriptions'),
      ),
      body: _sessions.isEmpty
          ? Center(child: Text('No sessions yet', style: TextStyle(fontSize: 18)))
          : ListView.builder(
              itemCount: _sessions.length,
              itemBuilder: (context, index) {
                final session = _sessions[index];
                return ListTile(
                  title: Text(DateFormat('yyyy-MM-dd – kk:mm').format(session.timestamp)),
                  subtitle: Text(session.transcript.substring(0, math.min(50, session.transcript.length)) + '...'),
                  onTap: () => Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => TranscriptDetailPage(transcript: session.transcript),
                  )),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: isRecording ? _stopRecording : _startRecording,
        child: Icon(isRecording ? Icons.stop : Icons.mic),
      ),
    );
  }

  @override
  void dispose() {
    if (isRecording) {
      _stopRecording();
    }
    super.dispose();
  }
}

class TranscriptDetailPage extends StatelessWidget {
  final String transcript;

  const TranscriptDetailPage({Key? key, required this.transcript}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Transcript Detail'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(transcript, style: TextStyle(fontSize: 16.0)),
      ),
    );
  }
}
