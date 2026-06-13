const express = require('express');
const pool = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, full_name, balance, is_active, is_verified, created_at FROM users ORDER BY created_at DESC LIMIT 100'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const users = await pool.query('SELECT COUNT(*) as count FROM users');
    const transactions = await pool.query('SELECT COUNT(*) as count FROM transactions');
    const totalBalance = await pool.query('SELECT SUM(balance) as total FROM users');
    const assets = await pool.query('SELECT COUNT(*) as count FROM assets WHERE is_active = true');
    const totalVolume = await pool.query('SELECT SUM(total_amount) as volume FROM transactions');

    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalTransactions: parseInt(transactions.rows[0].count),
      totalBalance: parseFloat(totalBalance.rows[0].total || 0),
      totalAssets: parseInt(assets.rows[0].count),
      totalVolume: parseFloat(totalVolume.rows[0].volume || 0)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dashboard' });
  }
});

router.post('/assets', async (req, res) => {
  try {
    const { symbol, name, assetType, currentPrice, commissionPercentage } = req.body;

    if (!symbol || !name || !assetType || !currentPrice) {
      return res.status(400).json({ error: 'Dados obrigatórios faltando' });
    }

    const assetId = uuidv4();

    await pool.query(
      `INSERT INTO assets (id, symbol, name, asset_type, current_price, commission_percentage, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [assetId, symbol.toUpperCase(), name, assetType, currentPrice, commissionPercentage || 0.5, true]
    );

    res.status(201).json({ assetId, message: 'Ativo criado com sucesso' });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Símbolo já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar ativo' });
  }
});

router.put('/assets/:id/price', async (req, res) => {
  try {
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ error: 'Preço obrigatório' });
    }

    await pool.query(
      'UPDATE assets SET current_price = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [price, req.params.id]
    );

    res.json({ message: 'Preço atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar preço' });
  }
});

router.put('/users/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE users SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING is_active',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: `Usuário ${result.rows[0].is_active ? 'ativado' : 'desativado'}` });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

router.get('/transactions/report', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DATE(created_at) as date, COUNT(*) as count, SUM(total_amount) as total
       FROM transactions
       GROUP BY DATE(created_at)
       ORDER BY date DESC
       LIMIT 30`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório' });
  }
});

module.exports = router;
