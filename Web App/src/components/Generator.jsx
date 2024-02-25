import React, { useState, useEffect } from 'react';
import Nav from "./NavBar";


function Generator() {
  const [transcript, setTranscription] = useState('');
  const [generatedSOAPNote, setGeneratedSOAPNote] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const fetchTranscript = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/transcriptions/latest');
        if (!response.ok) {
            throw new Error('Failed to fetch transcript');
        }
        const transcript = await response.json();
        if (!transcript) {
            console.error('Transcript is empty');
            return;
        }
        setTranscription(transcript);
        console.log(transcript.transcript);
    } catch (error) {
        console.error('Failed to fetch transcript', error);
    }
};


  const generateSOAPNote = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/generate_soap_note/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcription_text: transcript.transcript,
        }),
      });
      console.log(transcript);
      const data = await response.json();
      setGeneratedSOAPNote(data.soap_note);
      setShowAlert(true);
      console.log(data.soap_note);
    } catch (error) {
      console.error('Error fetching or processing SOAP note:', error);
    }
  };
  
  return (
    <div className="bg-white pb-20 dark:bg-gray-900 w-full">
    <Nav/>
      <h1 className="text-3xl font-bold text-center pt-20 text-white w-full">Generate SOAP Note</h1>
        <div className="pt-10 pb-20 md:flex-row flex-col md:flex w-full">
        <div className="md:w-1/2 px-6 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white">Step 1</h2>
                <p className="mt-4 text-white"><strong>Launching the App</strong> : Begin by opening [App Name] on your mobile device. You'll be greeted by the home screen, where you can navigate to various features offered by the app. Familiarize yourself with the layout to find functionalities easily.<br/><br/>
                <strong>Initiating Transcription</strong> : To start a new transcription, locate and tap on the <i>Start Transcription</i> button. This button is typically positioned prominently on the screen for easy access. Ensure you're in a quiet environment to improve the accuracy of the transcription.<br/><br/>
                <strong>Completing the Recording</strong> : Once you've conveyed all necessary information, press the "Stop" button to halt the recording process. The app will then automatically begin converting your spoken words into written text, creating a detailed transcript of the session.<br/><br/><br/>

                </p>
            </div>
            </div>
            <div className="md:w-1/2 px-6 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white">Step 2</h2>
                <p className="mt-4 text-white"><strong>Viewing Transcripts</strong> :
                After you have completed a recording and the app has processed your audio into text, accessing and managing your transcripts is a straightforward and intuitive process designed for efficiency and convenience. <br/><br/>

                <strong>Immediate Accessibility</strong> : Once the transcription process concludes, the app automatically navigates you to a new page where your freshly generated transcript is displayed. This immediate access allows for a seamless transition from recording to review. <br/><br/>

                <strong>Finding Your Transcripts</strong> : All session transcripts are meticulously organized within the app. To access a past transcript, navigate to the "Transcripts" section from the main menu. Here, transcripts are sorted by date, but you can also use the search function to find transcripts by keywords or specific dates.<br/><br/>
                </p>
            </div>
            </div>
            <div className="md:w-1/2 px-6 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white">Step 3</h2>
                <p className="mt-4 text-white"><strong>Starting SOAP Note Creation</strong> : Below the transcription, you'll find the "Start Generating SOAP Note" option. Tapping this button initiates the SOAP note creation process, which utilizes the information from your transcript to craft a structured document.<br/><br/>

                <strong>Waiting for the Note</strong> : The generation of a SOAP note is a sophisticated process that requires a short wait. The app analyzes the transcript data, organizing it into the Subjective, Objective, Assessment, and Plan format that medical professionals use.<br/><br/>

                <strong>Downloading the SOAP Note</strong> : Upon completion, a PDF version of the SOAP note will be made available for download. You can preview the note within the app to ensure it meets your requirements before downloading it to your device for future reference or sharing.<br/><br/><br/>
                </p>
            </div>
            </div>
        </div>
        <div className='flex justify-center align-center'>
            <button
             onClick={() => {
              setGeneratedSOAPNote('Generating the SOAP Note ..............');
              generateSOAPNote();
              fetchTranscript();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Generate SOAP Note
        </button>
        </div>  
      
      {generatedSOAPNote && (
        <div className="mt-4 p-10">
          <h2 className="text-2xl font-bold mb-2 text-white text-center">Generated SOAP Note:</h2>
          <div className='flex justify-center align-center'>
            <p className="bg-gray-100 p-4 w-1/2 rounded text-center">{generatedSOAPNote}</p>
          </div>
          {showAlert && (
            <div className="mt-2 text-center">
              <p className="text-green-500 font-semibold">PDF Downloaded</p>
            </div>
          )}
        </div> 
      )}
    </div>
  );
}

export default Generator;
