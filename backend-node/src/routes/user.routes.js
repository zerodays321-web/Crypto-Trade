const express = require('express');
const pool = require('../db/connection');

const router = express.Router();

router.get('/me', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, full_name, phone, document_id, address, balance, is_active, is_verified, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

router.get('/portfolio', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, a.symbol, a.name, a.asset_type, p.quantity, p.average_price, p.current_value, p.total_invested
       FROM portfolios p
       JOIN assets a ON p.asset_id = a.id
       WHERE p.user_id = $1
       ORDER BY p.updated_at DESC`,
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar carteira' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const { fullName, phone, address, city, state, zipCode } = req.body;

    await pool.query(
      'UPDATE users SET full_name = $1, phone = $2, address = $3, city = $4, state = $5, zip_code = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7',
      [fullName, phone, address, city, state, zipCode, req.user.userId]
    );

    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

router.get('/balance', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT balance FROM users WHERE id = $1',
      [req.user.userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar saldo' });
  }
});

module.exports = router;
