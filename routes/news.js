const express = require('express');
const router = express.Router();
const News = require('../models/news');
const mongoose = require('mongoose');

// GET /api/news?language=en&q=keyword
router.get('/', async (req, res) => {
  try {
    const { language, q } = req.query;
    const filter = {};
    if (language) filter.language = language;
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
    const items = await News.find(filter).sort({ date: -1 }).limit(200);
    res.json({ success: true, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/news/add
router.post('/add', async (req, res) => {
  try {
    const { title, description, language, source, date } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });
    const news = new News({ title, description, language: language || 'en', source, date: date ? new Date(date) : undefined });
    const saved = await news.save();
    res.json({ success: true, data: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/news/delete/:id
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const removed = await News.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: removed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/news/seed - create demo items (for local testing)
router.post('/seed', async (req, res) => {
  try {
    const sample = [
      { title: 'Global Markets Rally', description: 'Stocks rise globally on upbeat economic data.', language: 'en', source: 'Reuters' },
      { title: 'नई शिक्षा नीति पर चर्चा', description: 'सरकार ने नई शिक्षा नीति पर सार्वजनिक राय मांगी।', language: 'hi', source: 'NDTV' },
      { title: 'Tech Conference 2025 Highlights', description: 'Innovations in AI and green tech were showcased.', language: 'en', source: 'TechCrunch' },
      { title: 'स्थानीय उत्सव की तैयारी', description: 'गाँव में वार्षिक उत्सव की तैयारियाँ जारी हैं।', language: 'hi', source: 'Local Times' }
    ];
    const created = await News.insertMany(sample);
    res.json({ success: true, data: created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
