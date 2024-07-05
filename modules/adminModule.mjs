import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
  //"firstName":
  //"lastName":
  //"userName" :
  //"email" :
  //"password" :
  //"phoneNumber"
  firstName: {
    type : String,
    required : true
  },
  lastName: {
    type : String,
    required : true
  },
  userName:{
    type : String,
    required : true,
    unique : true
  },
  email: {
    type : String,
    required : true,
    unique : true
  },
  password:{
    type : String,
    required : true
  },
  phoneNumber: {
    type : String,
    required : true
  },
  otp: { type: String },
  otpExpiration: { type: Date }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;



