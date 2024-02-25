require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI; // Ensure this is set in your .env file or environment variables

app.use(bodyParser.json());

MongoClient.connect(uri, { useUnifiedTopology: true }) // Removed the useNewUrlParser since it's deprecated and no longer necessary
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('transcription_database'); // Specify your database name here
    const transcriptsCollection = db.collection('trial'); // Specify your collection name here

    // Endpoint to handle POST requests to /transcripts
    app.post('/transcripts', (req, res) => {
      transcriptsCollection.insertOne(req.body)
        .then(result => res.status(201).send(result))
        .catch(error => res.status(500).send(error));
    });
  })
  .catch(error => console.error(error));

// Updated to listen on '0.0.0.0' allowing connections from any IP address
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
