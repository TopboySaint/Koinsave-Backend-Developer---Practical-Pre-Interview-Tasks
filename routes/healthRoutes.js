const express = require('express');
const router = express.Router();
const { healthCheck } = require('../controllers/healthController');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 *                   description: Server uptime in seconds
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-11-15T10:30:00.000Z'
 *                 db:
 *                   type: string
 *                   example: connected
 *                   enum: [disconnected, connected, connecting, disconnecting]
 *       500:
 *         description: API is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: degraded
 *                 uptime:
 *                   type: number
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 db:
 *                   type: string
 */
router.get('/health', healthCheck);

module.exports = router;