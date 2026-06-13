import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [userRes, assetsRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, { headers }),
        axios.get(`${process.env.REACT_APP_API_URL}/api/assets`, { headers })
      ]);

      setStats(userRes.data);
      setAssets(assetsRes.data.slice(0, 6));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Bem-vindo, {user?.fullName}! 👋</h1>
        <p>Dashboard de Investimentos</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Saldo</h3>
            <p className="stat-value">R$ {stats?.balance?.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Carteira Total</h3>
            <p className="stat-value">R$ 0,00</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>Rendimento</h3>
            <p className="stat-value positive">+0.00%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Ativos</h3>
            <p className="stat-value">0</p>
          </div>
        </div>
      </div>

      <div className="assets-section">
        <h2>Ativos Disponíveis</h2>
        <div className="assets-grid">
          {assets.map(asset => (
            <div key={asset.id} className="asset-card">
              <div className="asset-header">
                <h3>{asset.symbol}</h3>
                <span className="asset-type">{asset.asset_type}</span>
              </div>
              <p className="asset-name">{asset.name}</p>
              <p className="asset-price">R$ {parseFloat(asset.current_price).toFixed(2)}</p>
              <button className="buy-btn">Comprar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
