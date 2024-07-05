import Admin from "../modules/adminModule.mjs";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import validateRegistration from '../validations/registrationValidation.mjs';
import {sendSuccessEmail, sendLoginEmail,sendLoginFailedMail } from '../utils/sendMail.mjs';
import {generateOtp, sendOtp , sendOtpSms} from '../utils/otp.mjs';


export const registerAdmin = async (req, res) => {
  const { error } = validateRegistration(req.body);
 if (error) return res.status(400).send(error.details[0].message);
  const { firstName, lastName, userName, email, password, phoneNumber } = req.body;
  try {
    // Check for existing email and username
    const findMail = Admin.findOne({ email })
    
    if (!findMail) {
      return res.status(400).json({
        message: "Email already exist",
        solution: "Change email address"
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // Create new admin
    const admin = new Admin({
      firstName,
      lastName,
      userName,
      email,
      password: hashPassword,
      phoneNumber
    });

    // const otp = generateOtp();
    // const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
    // await sendOtp(email, otp);

    const newAdmin = await admin.save();

    const msg = "admin"

    await sendSuccessEmail(email,msg);
    res.status(201).json({
      message: "Admin Created",
      data: newAdmin
    });
  } catch (err) {
    res.status(500).json({
      message: "Admin is not created",
      error: err.message
    });
    console.log(err);
  }
};


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findAdmin = await Admin.findOne({email: email});
    if(!findAdmin){
      return res.status(400).json({
        message: "Email does not exist"
      });
    }
    const isMatch = await bcrypt.compare(password, findAdmin.password);
    if(!isMatch){
      await sendLoginFailedMail(email);
      return res.status(400).json({
        message: "Password is incorrect",
        solution: "enter correct password"
      });
    }
    // oken genaration
    const token = JWT.sign(
      { id: findAdmin._id, email: findAdmin.email }, // Corrected to findAdmin.email
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.header("auth-token", token);
    await sendLoginEmail(email);
    // Return a successful response with the token and admin details
    res.status(200).json({
      message: "Admin logged in",
      data: {
        token,
        admin: {
          id: findAdmin._id,
          name: findAdmin.name,
          userName: findAdmin.userName,
          email: findAdmin.email
        }
      }
    });
  }catch (err) {
    // Handle any errors that occur
    res.status(500).json({
      message: "Admin is not logged in",
      error: err.message
    });
    console.log(err);
  }
}

export const requestOtp = async (req, res) => {
  try {
    const {email } = req.body;
    const admin = await Admin.findOne({email: email});
    if (!admin) {
      return res.status(400).send('Admin not found');
     }
    const otp = generateOtp();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
    admin.otp = otp;
    admin.otpExpiration = otpExpiration;
    await admin.save();
    console.log(otp);
    console.log(email);
    // req.session.otp = otp;
    // req.session.otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    await sendOtp(email, otp);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).send(error);
  }
};


export const sendSms = async (req,res) =>{
  try {
    const {email } = req.body;
    const admin = await Admin.findOne({email: email});
    if (!admin) {
      return res.status(400).send('Admin not found');
     }
    const otp = generateOtp();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
    // admin.otp = otp;
    // admin.otpExpiration = otpExpiration;
    // await admin.save();
    admin.otp = otp;
    admin.otpExpiration = otpExpiration;
    await admin.save();
    console.log(otp);
    console.log(admin.phoneNumber);
    admin.phoneNumber = "+91"+admin.phoneNumber;
    await sendOtpSms (admin.phoneNumber, otp);
    res.status(200).json({ message: `OTP sent to your ${admin.phoneNumber}` });
  }catch (err){
    res.status(500).json({
      message: "Admin is not logged in",
      error: err.message
    });
 console.log(err);

  }
}
