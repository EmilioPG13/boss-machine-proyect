const { validateMeeting } = require('./validation');

const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, createMeeting, deleteAllFromDatabase } = require('./db');

// Get /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res) => {
    const newMeeting = createMeeting();
    const error = validateMeeting(newMeeting);
    if (error) {
        return res.status(400).send(error);
    }
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;