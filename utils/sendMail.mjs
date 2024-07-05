import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure the email transport using the default SMTP transport and a GMail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationMail = (toemail,msg) =>{
       

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toemail,
        subject: 'Account Verification',
        html: `Please click this <a href="${msg}">link</a> to verify your email address.`
    };
}


export const sendSuccessEmail = (toEmail,msg) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: `Registration Successful ${ msg } `,
        text: 'Congratulations! You have successfully registered.',
        html: '<h1>Welcome!</h1><p>You have successfully registered.</p>'
    };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Success email sent: ' + info.response);
    });
};

export const sendLoginEmail = (toEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'login Successful',
        text: 'Congratulations! You have successfully login.',
        html: '<h1>Welcome!</h1><p>You have successfully login.</p>'
    };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Success email sent: ' + info.response);
    });
};

export const sendLoginFailedMail =  (toEmail) =>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'login Un-Successful',
        text: 'SomeOne is trying to login your account.',
        html: '<h1>Welcome!</h1><p>You have un-success for login.</p>'
    };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Success email sent: ' + info.response);
    });
}


export const updateMail = (toEmail) =>{

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'password updated  Successful',
        text: 'Congratulations! You have successfully password updated.',
        html: '<h1>Welcome!</h1><p>You have successfully password updated.</p>'
    };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Success email sent: ' + info.response);
    });



}

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