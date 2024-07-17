
import express from 'express';
const router = express.Router(); // Corrected Router initialization
import {loginAdmin, registerAdmin, requestOtp, sendSms} from '../controllers/adminController.mjs';

import {authenticate} from '../middlewares/aurthoMiddleware.mjs';


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/request-otp', authenticate, requestOtp);
router.post('/send-sms', sendSms);


export default router;

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Registration
 */



/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               userName:
 *                 type: string
 *                 example: Jhon Doe
 *               email:
 *                 type: string
 *                 example: john.doe@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               phoneNumber:
 *                 type: string
 *                 example: 8555807757
 *     responses:
 *       200:
 *         description: User registered successfully....
 *       400:
 *         description: Bad request
 *         content-type: application/json
 *       401:
 *         description: Unauthorized
 *         content-type: application/json
 *       403:
 *         description: Forbidden
 *         content-type: application/json
 *       404:
 *         description: User not found
 *         content-type: application/json
 *       500:
 *         description: Server Error
 *         content-type: application/json
 */



//Swagger for login
//post swager for login

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully....
 *       400:
 *         description: Bad request
 *         content-type: application/json
 *       401:
 *         description: Unauthorized
 *         content-type: application/json
 *       403:
 *         description: Forbidden
 *         content-type: application/json
 *       404:
 *         description: User not found
 *         content-type: application/json
 *       500:
 *         description: Server Error
 *         content-type: application/json
 */
