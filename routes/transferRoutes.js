const express = require('express');
const router = express.Router();
const { transfer } = require('../controllers/transferController');
const { transferLimiter } = require('../middleware/rateLimiter');

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer money between accounts
 *     tags: [Transfers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderAccountNumber
 *               - recipientAccountNumber
 *               - amount
 *             properties:
 *               senderAccountNumber:
 *                 type: string
 *                 example: '1234567890'
 *                 description: 10-digit sender account number
 *               recipientAccountNumber:
 *                 type: string
 *                 example: '0987654321'
 *                 description: 10-digit recipient account number
 *               amount:
 *                 type: number
 *                 example: 5000
 *                 description: Amount to transfer in Naira
 *     responses:
 *       200:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ₦5,000 sent to account 0987654321
 *                 senderBalance:
 *                   type: number
 *                   example: 45000
 *       400:
 *         description: Bad request (insufficient balance, invalid amount, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Sender or recipient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/transfer', transferLimiter, transfer);

module.exports = router;