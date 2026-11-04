import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// GET /api/menu - Get all available menu items
router.get('/', (req, res) => {
  try {
    const { category, is_veg, search } = req.query;
    let query = 'SELECT * FROM menu_items WHERE is_available = 1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (is_veg !== undefined && is_veg !== '') {
      query += ' AND is_veg = ?';
      params.push(is_veg === '1' || is_veg === 'true' ? 1 : 0);
    }

    if (search && search.trim() !== '') {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    query += ' ORDER BY is_signature DESC, category ASC, name ASC';

    const items = db.prepare(query).all(...params);
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to retrieve menu items.' });
  }
});

// GET /api/menu/:id - Single item
router.get('/:id', (req, res) => {
  try {
    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve item.' });
  }
});

export default router;
