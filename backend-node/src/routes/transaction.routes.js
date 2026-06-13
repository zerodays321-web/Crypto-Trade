const express = require('express');
const pool = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.transaction_type, t.quantity, t.price, t.total_amount, t.commission, t.status, a.symbol, a.name, t.created_at
       FROM transactions t
       JOIN assets a ON t.asset_id = a.id
       WHERE t.user_id = $1
       ORDER BY t.created_at DESC
       LIMIT 50`,
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

router.post('/buy', async (req, res) => {
  try {
    const { assetId, quantity } = req.body;

    if (!assetId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const assetResult = await pool.query(
      'SELECT id, current_price, commission_percentage FROM assets WHERE id = $1 AND is_active = true',
      [assetId]
    );

    if (assetResult.rows.length === 0) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    const asset = assetResult.rows[0];
    const totalAmount = parseFloat(asset.current_price) * parseFloat(quantity);
    const commission = (totalAmount * asset.commission_percentage) / 100;
    const finalAmount = totalAmount + commission;

    const userResult = await pool.query(
      'SELECT balance FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (userResult.rows[0].balance < finalAmount) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    const transactionId = uuidv4();

    await pool.query(
      `INSERT INTO transactions (id, user_id, asset_id, transaction_type, quantity, price, total_amount, commission, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [transactionId, req.user.userId, assetId, 'buy', quantity, asset.current_price, totalAmount, commission, 'completed']
    );

    await pool.query(
      'UPDATE users SET balance = balance - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [finalAmount, req.user.userId]
    );

    res.status(201).json({ 
      transactionId, 
      message: 'Compra realizada com sucesso',
      details: { totalAmount, commission, finalAmount }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar compra' });
  }
});

router.post('/sell', async (req, res) => {
  try {
    const { assetId, quantity } = req.body;

    if (!assetId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const assetResult = await pool.query(
      'SELECT current_price, commission_percentage FROM assets WHERE id = $1 AND is_active = true',
      [assetId]
    );

    if (assetResult.rows.length === 0) {
      return res.status(404).json({ error: 'Ativo não encontrado' });
    }

    const asset = assetResult.rows[0];
    const totalAmount = parseFloat(asset.current_price) * parseFloat(quantity);
    const commission = (totalAmount * asset.commission_percentage) / 100;
    const finalAmount = totalAmount - commission;

    const transactionId = uuidv4();

    await pool.query(
      `INSERT INTO transactions (id, user_id, asset_id, transaction_type, quantity, price, total_amount, commission, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [transactionId, req.user.userId, assetId, 'sell', quantity, asset.current_price, totalAmount, commission, 'completed']
    );

    await pool.query(
      'UPDATE users SET balance = balance + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [finalAmount, req.user.userId]
    );

    res.status(201).json({ 
      transactionId, 
      message: 'Venda realizada com sucesso',
      details: { totalAmount, commission, finalAmount }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao realizar venda' });
  }
});

module.exports = router;
