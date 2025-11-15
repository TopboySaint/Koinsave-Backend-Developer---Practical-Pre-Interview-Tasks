const mongoose = require('mongoose');

const healthCheck = (req, res) => {
  const dbState = mongoose.connection.readyState;
  const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const isDbHealthy = dbState === 1;

  const payload = {
    status: isDbHealthy ? 'ok' : 'degraded',
    uptime: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString(),
    db: stateMap[dbState]
  };

  if (!isDbHealthy) {
    return res.status(500).json(payload);
  }
  return res.status(200).json(payload);
};

module.exports = {
  healthCheck
};