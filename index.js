const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const logger = require('./middleware/logger');
const { apiLimiter } = require('./middleware/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const transferRoutes = require('./routes/transferRoutes');
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');

const port = process.env.PORT || 8080
const uri = process.env.URI

// Middleware
app.use(express.json())
app.use(logger) // Logging middleware
app.use(apiLimiter) // Rate limiting middleware

mongoose.connect(uri)
  .then(() => {
    console.log(`Mongo database is now connected.`);
  })
  .catch((err) => {
    console.log(`Error connecting to Mongo database.`, err);
  })

app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'],
    credentials: true,
  }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to KoinSave!',
    version: '1.0.0',
  });
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'KoinSave API Documentation'
}));

app.use('/', authRoutes);
app.use('/', transferRoutes);
app.use('/', userRoutes);
app.use('/', healthRoutes);

app.listen(port, () => {
  console.log(`The question isn't who is going to let me, it's who is going to stop me. - ${port} running.`);
})