require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const transactionRoutes = require('./routes/transaction.routes');
const assetRoutes = require('./routes/asset.routes');
const adminRoutes = require('./routes/admin.routes');
const { authenticate, authorize } = require('./middleware/auth.middleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), service: 'WXT Node.js API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/transactions', authenticate, transactionRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/admin', authenticate, authorize('admin'), adminRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀 WXT Node.js API rodando em http://localhost:${PORT}`);
  console.log('📊 Health Check: http://localhost:${PORT}/health\n`);
});

module.exports = app;
