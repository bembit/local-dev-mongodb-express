const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const { renderRoomHtml } = require('./renderRoomHtml');


const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.REPLICA_SERVER_PORT;

app.use(cors({
	origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
}));

// Parse JSON and URL-encoded data for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// default post request

app.post('/create-room', async (req, res) => {
	try {
		// Extract parameters from the request body
		const { name, description, region, maxParticipants } = req.body;
	
		// Log the incoming request payload for debugging
		console.log('Incoming Request Payload:', req.body);

		// Log the extracted parameters for debugging
		console.log('Extracted Parameters:', { name, description, region, maxParticipants });

		// Example: Make a POST request to MongoDB server
		const mongoDbResponse = await axios.post(`http://localhost:${process.env.DB_PORT || 8000}/create-room`, {
			// roomId,
			name,
			description,
			region,
			maxParticipants,
		});
	
		// Check the response from MongoDB server
		if (mongoDbResponse.status === 200) {
			// Your processing logic here, e.g., handling the MongoDB server response
			console.log('MongoDB server response:', mongoDbResponse.data);
			// Extract the room data from the MongoDB response
  			const roomData = mongoDbResponse.data; 
			// Send a success response
			// res.status(200).json({ message: 'Room created successfully', room: roomData });
			// Render HTML for the room
			const roomHtml = renderRoomHtml(roomData);
			// Send the HTML response to the client
			// Playing with server-side delays
			const delayDuration = 700;
			await new Promise(resolve => setTimeout(resolve, delayDuration));
			// We are returning HTML in the response, so we don't need to parse incoming request body, but I'm leaving this here for reference
			res.status(200).send(roomHtml);
			// console.log(roomData)
		} else {
			// Handle the case when the MongoDB server returns an error
			console.error('Error from MongoDB server:', mongoDbResponse.data);
			// res.status(500).json({ error: 'Error from MongoDB server' });
			res.status(500).send('<p>Error from MongoDB server</p>');
		}
	} catch (error) {
		// Log the error
		console.error(error);
		// Send an error response
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(PORT, () => {
 	 console.log(`Lambda Replica Server is running at http://localhost:${PORT}`);
});
