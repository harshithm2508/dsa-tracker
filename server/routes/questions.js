const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ dateAdded: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new question
router.post('/', async (req, res) => {
    console.log('Received POST /api/questions:', req.body);
    const question = new Question(req.body);
    try {
        const newQuestion = await question.save();
        console.log('Saved question to DB:', newQuestion);
        res.status(201).json(newQuestion);
    } catch (err) {
        console.error('Error saving question:', err);
        res.status(400).json({ message: err.message });
    }
});

// PUT update question
router.put('/:id', async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE question
router.delete('/:id', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
