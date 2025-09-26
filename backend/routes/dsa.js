// routes/dsa.js
const express = require('express');
const router = express.Router();
const DSAProblem = require('../models/DSAProblem'); // Use the correct model name
const verifyToken = require('../middleware/verifyToken');

// POST: Add a new problem
router.post('/add', verifyToken, async (req, res) => {
  const { problemName, platform, link, timeComplexity, spaceComplexity } = req.body;

  if (!problemName || !platform) {
    return res.status(400).json({ error: 'Problem Name and Platform are required' });
  }

  try {
    const newProblem = new DSAProblem({
      userId: req.user.userId, // Ensure consistency with JWT payload
      problemName,
      platform,
      link,
      timeComplexity,
      spaceComplexity
    });

    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    console.error("Error adding problem:", err);
    res.status(500).json({ error: 'Server error: Failed to add problem' });
  }
});

// GET: Fetch all problems by user
router.get('/', verifyToken, async (req, res) => {
  try {
    const problems = await DSAProblem.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    console.error("Error fetching problems:", err);
    res.status(500).json({ error: 'Server error: Failed to fetch problems' });
  }
});

// PUT: Update an existing problem
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { problemName, platform, link, timeComplexity, spaceComplexity } = req.body;

  try {
    const problem = await DSAProblem.findOneAndUpdate(
      { _id: id, userId: req.user.userId }, // Find by ID and ensure it belongs to the user
      { problemName, platform, link, timeComplexity, spaceComplexity },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found or unauthorized' });
    }

    res.json(problem);
  } catch (err) {
    console.error("Error updating problem:", err);
    res.status(500).json({ error: 'Server error: Failed to update problem' });
  }
});

// DELETE: Delete a problem
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await DSAProblem.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found or unauthorized' });
    }

    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (err) {
    console.error("Error deleting problem:", err);
    res.status(500).json({ error: 'Server error: Failed to delete problem' });
  }
});

module.exports = router;
