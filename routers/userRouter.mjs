import express from 'express';
const router = express.Router(); // Corrected Router initialization
import { userRegister, verifyOtp} from '../controllers/userController.mjs';

import {authenticate} from '../middlewares/aurthoMiddleware.mjs';


router.post('/register', authenticate, userRegister);
// router.post('/login', loginAdmin);
router.post('/verify-otp', verifyOtp);
// router.post('/send-sms', sendSms);


export default router;


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Registration
 */



/**
 * @swagger
 * /User/register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
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




/**
 * @swagger
 * /user/verify-otp:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
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
 *               otp1:
 *                 type: string
 *                 example: 111111
 *               otp2:
 *                 type: string
 *                 example: 111111
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

