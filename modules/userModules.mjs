import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    emailVerification: { 
        type: Boolean, 
        default: false 
    },
    phoneVerification: { 
        type: Boolean, 
        default: false 
    },
    otp1: {
        type: String
    },
    otp1Expiration: {
        type: Date
    },
    otp2: {
        type: String
    },
    otp2Expiration: {
        type: Date
    }
});

const User = mongoose.model('User', userSchema);

export default User;
