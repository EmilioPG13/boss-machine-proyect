const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

//GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res) => {
    try {
        const newMinion = addToDatabase('minions', req.body);
        res.status(201).send(newMinion);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        res.send(minion);
    } else {
        res.status(404).send();
    }
});

// PUT /api/minions/:minionId to update a single minion by id
minionsRouter.put('/:minionId', (req, res) => {
    const minionId = req.params.minionId;
    const existingMinion = getFromDatabaseById('minions', minionId);
    if (existingMinion) {
        try {
            const updatedMinion = updateInstanceInDatabase('minions', { ...req.body, id: minionId});
            res.send(updatedMinion);
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.status(404).send();
    }
});

// DELETE /api/minions/:minionId to delete a single minion by id
minionsRouter.delete('/:minionId', (req, res) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

module.exports = minionsRouter;