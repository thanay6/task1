import User from "../modules/userModules.mjs";
import bcrypt from "bcrypt";
import validateRegistration from '../validations/registrationValidation.mjs';
import validateOtp from '../validations/validateOtp.mjs'
import { sendSuccessEmail } from '../utils/sendMail.mjs';
import {validate} from '../middlewares/aurthoMiddleware.mjs';
import { generateOtp, sendOtp,sendOtpSms } from '../utils/otp.mjs';

export const userRegister = async (req, res) => {
    const { error } = validateRegistration(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { firstName, lastName, userName, email, password, phoneNumber } = req.body;

    try {
        const token = req.headers['auth-token'];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token not provided' });
        }
        validate(token);

        // Check if email already exists
        const findMail = await User.findOne({ email: email });
        
        if (findMail) {
            return res.status(400).json({
                message: "Email already exists",
                solution: "Change email address"
            });
        }
        const otp1 = generateOtp();
        const otp2 = generateOtp();
        const otp1Expiration = new Date(Date.now() + 1* 60 * 1000); // OTP valid for 30 sec
        const otp2Expiration = new Date(Date.now() + 1* 60 * 1000); // OTP valid for 30 sec10 minutes

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 10);

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword,
            phoneNumber,
            emailVerification: false, 
            phoneVerification: false, 
            otp1, 
            otp1Expiration,
            otp2, 
            otp2Expiration 
        });

        // Save the new user to the database
        await newUser.save();

        await sendOtp(email, otp1);
        const Number = "+91"+newUser.phoneNumber;
        await sendOtpSms (Number, otp2);
        
        // Return response
        return res.status(201).json({
            message: "User Created",
            data: newUser
        });
    } catch (err) {
        // Handle errors
        console.error("Error registering user:", err);
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
};

// export const verifyOtp = async (req, res) => {
//     const { error } = validateOtp(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const { otp1, otp2 } = req.body;

//     let user = null;
//     if (otp1) {
//         user = await User.findOne({ otp1, otp1Expiration: { $gt: new Date() } });
//         if (user) {
//             user.emailVerification = true;
//             user.otp1 = null;  // Clear the email OTP
//             user.otp1Expiration = null;  // Clear the email OTP expiration
//             await user.save();
//         }
//     }
    
//     if (otp2) {
//         user = await User.findOne({ otp2, otp2Expiration: { $gt: new Date() } });
//         if (user) {
//             user.phoneVerification = true;
//             user.otp2 = null;  // Clear the phone OTP
//             user.otp2Expiration = null;  // Clear the phone OTP expiration
//             await user.save();
//         }
//     }

//     if (!user) {
//         // Delete all user data associated with the failed OTPs
//         try {
//             await User.deleteMany({ 
//                 $or: [
//                     { otp1 },
//                     { otp2 }
//                 ]
//             });
//             return res.status(400).send('Invalid or expired OTP');
//         } catch (error) {
//             console.error('Error deleting user data:', error);
//             return res.status(500).send('Error deleting user data');
//         }
//     }

//     await sendSuccessEmail(user.email, "User registered successfully");
//     res.status(200).send('OTP verified successfully');
// };


export const verifyOtp = async (req, res) => {
    const { error } = validateOtp(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {email, otp1, otp2 } = req.body;

    let emailOtpValid = false;
    let phoneOtpValid = false;
    let user = null;

    if (otp1) {
        user = await User.findOne({ otp1, otp1Expiration: { $gt: new Date() } });
        if (user) {
            emailOtpValid = true;
            user.emailVerification = true;
            user.otp1 = null;  // Clear the email OTP
            user.otp1Expiration = null;  // Clear the email OTP expiration
            await user.save();
        }
    }

    if (otp2) {
        user = await User.findOne({ otp2, otp2Expiration: { $gt: new Date() } });
        if (user) {
            phoneOtpValid = true;
            user.phoneVerification = true;
            user.otp2 = null;  // Clear the phone OTP
            user.otp2Expiration = null;  // Clear the phone OTP expiration
            await user.save();
        }
    }

    

    if (!emailOtpValid || !phoneOtpValid) {
        // Delete all user data associated with the failed OTPs
        try {
            await User.deleteMany({ email });

            if (!emailOtpValid && !phoneOtpValid) {
                return res.status(400).send('Invalid or expired OTPs for both email and phone');
            } else if (!emailOtpValid) {
                return res.status(400).send('Invalid or expired OTP for email');
            } else if (!phoneOtpValid) {
                return res.status(400).send('Invalid or expired OTP for phone');
            }
        } catch (error) {
            console.error('Error deleting user data:', error);
            return res.status(500).send('Error deleting user data');
        }
    }

    await sendSuccessEmail(user.email, "User registered successfully");
    res.status(200).send('OTP verified successfully');
};


export const requestOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User is already registered' });
        }

        // Generate OTP and OTP expiration time
        const otp = generateOtp();
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        // Send OTP to the user's email
        await sendOtp(email, otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error("Error requesting OTP:", error);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

  