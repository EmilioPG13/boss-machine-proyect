express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

//GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res) => {
    try {
        const newIdea = addToDatabase('ideas', req.body);
        res.status(201).send(newIdea);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.put('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const existingIdea = getFromDatabaseById('ideas', ideaId);
    if (existingIdea) {
        try {
            const updatedIdea = updateInstanceInDatabase('ideas', { ...req.body, id: ideaId});
            res.send(updatedIdea);
        } catch (error) {
            res.status(400).send(error.message);
        }
    } else {
        res.status(404).send();
    }
});

// Delete /api/ideas/:ideaId to delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = ideasRouter;
