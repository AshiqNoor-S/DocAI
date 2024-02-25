const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const uri = 'mongodb+srv://craftersaiofficial:ashmat@cluster0.vqrvkmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // MongoDB connection URI

app.get('/api/transcriptions/latest', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('test');
    const collection = database.collection('transcriptions');

    const transcription = await collection.find({}, { projection: { transcript: 1, _id: 0 } }).sort({ _id: -1 }).limit(1).toArray();
    console.log(transcription[0]);
    res.json(transcription[0]);
    
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
