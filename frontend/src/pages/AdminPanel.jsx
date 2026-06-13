import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAsset, setNewAsset] = useState({ symbol: '', name: '', assetType: '', currentPrice: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (activeTab === 'dashboard') {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/dashboard`, { headers });
        setStats(res.data);
      } else if (activeTab === 'users') {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, { headers });
        setUsers(res.data);
      } else if (activeTab === 'assets') {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/assets`, { headers });
        setAssets(res.data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAsset = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/assets`, newAsset, { headers });
      setNewAsset({ symbol: '', name: '', assetType: '', currentPrice: '' });
      fetchData();
      alert('Ativo criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar ativo');
    }
  };

  const handleToggleUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}/toggle`, {}, { headers });
      fetchData();
    } catch (error) {
      alert('Erro ao atualizar usuário');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>⚙️ Admin</h2>
        <nav className="admin-nav">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Usuários
          </button>
          <button 
            className={`nav-btn ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            💎 Ativos
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <div className="dashboard-section">
                <h1>Dashboard Administrativo 📈</h1>
                {stats && (
                  <div className="stats-grid">
                    <div className="stat-box">
                      <h3>👥 Usuários</h3>
                      <p className="stat-number">{stats.totalUsers}</p>
                    </div>
                    <div className="stat-box">
                      <h3>💰 Transações</h3>
                      <p className="stat-number">{stats.totalTransactions}</p>
                    </div>
                    <div className="stat-box">
                      <h3>💵 Saldo Total</h3>
                      <p className="stat-number">R$ {stats.totalBalance?.toFixed(2)}</p>
                    </div>
                    <div className="stat-box">
                      <h3>💎 Ativos</h3>
                      <p className="stat-number">{stats.totalAssets}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="users-section">
                <h1>Gerenciar Usuários 👥</h1>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Nome</th>
                      <th>Saldo</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.full_name}</td>
                        <td>R$ {user.balance?.toFixed(2)}</td>
                        <td>
                          <span className={`status ${user.is_active ? 'active' : 'inactive'}`}>
                            {user.is_active ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="action-btn"
                            onClick={() => handleToggleUser(user.id)}
                          >
                            {user.is_active ? 'Desativar' : 'Ativar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'assets' && (
              <div className="assets-section">
                <h1>Gerenciar Ativos 💎</h1>
                
                <form onSubmit={handleCreateAsset} className="asset-form">
                  <h3>Criar Novo Ativo</h3>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Símbolo (ex: BTC)"
                      value={newAsset.symbol}
                      onChange={(e) => setNewAsset({...newAsset, symbol: e.target.value})}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nome (ex: Bitcoin)"
                      value={newAsset.name}
                      onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <select
                      value={newAsset.assetType}
                      onChange={(e) => setNewAsset({...newAsset, assetType: e.target.value})}
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="stock">Ação</option>
                      <option value="crypto">Criptomoeda</option>
                      <option value="fund">Fundo</option>
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Preço"
                      value={newAsset.currentPrice}
                      onChange={(e) => setNewAsset({...newAsset, currentPrice: e.target.value})}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Criar Ativo</button>
                </form>

                <div className="assets-list">
                  <h3>Ativos Cadastrados</h3>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Símbolo</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Preço</th>
                        <th>Comissão</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map(asset => (
                        <tr key={asset.id}>
                          <td>{asset.symbol}</td>
                          <td>{asset.name}</td>
                          <td>{asset.asset_type}</td>
                          <td>R$ {asset.current_price?.toFixed(2)}</td>
                          <td>{asset.commission_percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
