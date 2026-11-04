import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// POST /api/contact - Submit contact or reservation inquiry
router.post('/', (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Your name is required.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Contact phone number is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message content cannot be empty.' });
    }

    const insert = db.prepare(`
      INSERT INTO contact_messages (name, phone, email, message, is_read)
      VALUES (?, ?, ?, ?, 0)
    `);

    const result = insert.run(
      name.trim(),
      phone.trim(),
      email ? email.trim() : null,
      message.trim()
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent to the Suku team. We will contact you shortly.',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Contact message error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try calling directly.' });
  }
});

export default router;
