import React from 'react';
import '../styles/Portfolio.css';

function Portfolio({ user }) {
  return (
    <div className="portfolio-container">
      <h1>Minha Carteira 💼</h1>
      <div className="portfolio-empty">
        <p>Nenhum ativo na carteira</p>
        <p>Comece a investir agora!</p>
      </div>
    </div>
  );
}

export default Portfolio;
