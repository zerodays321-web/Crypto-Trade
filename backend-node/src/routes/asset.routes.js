const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, symbol, name, asset_type, current_price, min_investment, commission_percentage, is_active FROM assets WHERE is_active = true ORDER BY symbol ASC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar ativos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM assets WHERE id = $1 AND is_active = true',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar ativo' });
  }
});

router.get('/type/:assetType', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, symbol, name, current_price FROM assets WHERE asset_type = $1 AND is_active = true',
      [req.params.assetType]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ativos' });
  }
});

module.exports = router;
