import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();
const userMail = process.env.EMAIL_USER;
const userPassword = process.env.EMAIL_PASS;


const accountSid = process.env.ACCOUNT_SID;
const accountAuthToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_NUM;


export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: userMail,
            pass: userPassword
        }
    });

    let info = await transporter.sendMail({
        from: userMail,
        to: email,
        subject: 'OTP for Password Update',
        text: `Your OTP is ${otp}`
    });

    console.log('Message sent: %s', info.messageId);
};

export const sendOtpSms = async (phoneNumber, otp) =>{

    const client = new twilio(accountSid, accountAuthToken);
    const message = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: twilioPhoneNumber,
        to: phoneNumber
    });

}
