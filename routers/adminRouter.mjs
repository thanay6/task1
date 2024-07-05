
import express from 'express';
const router = express.Router(); // Corrected Router initialization
import {loginAdmin, registerAdmin, requestOtp, sendSms} from '../controllers/adminController.mjs';

import {authenticate} from '../middlewares/aurthoMiddleware.mjs';


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/request-otp', authenticate, requestOtp);
router.post('/send-sms', sendSms);


export default router;

