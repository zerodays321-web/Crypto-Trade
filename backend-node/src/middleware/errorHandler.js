const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  if (err.code === '23505') {
    return res.status(409).json({ error: 'Recurso duplicado' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
};

module.exports = errorHandler;
