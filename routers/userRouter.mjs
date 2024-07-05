import express from 'express';
const router = express.Router(); // Corrected Router initialization
import { userRegister, verifyOtp} from '../controllers/userController.mjs';

import {authenticate} from '../middlewares/aurthoMiddleware.mjs';


router.post('/register', authenticate, userRegister);
// router.post('/login', loginAdmin);
router.post('/verify-otp', verifyOtp);
// router.post('/send-sms', sendSms);


export default router;

