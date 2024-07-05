import express from 'express';
import connectDB from './utils/dbConne.mjs';
import dotenv from 'dotenv';
import session from 'express-session';


import adminRoutes from './routers/adminRouter.mjs'
import userRoutes from './routers/userRouter.mjs'

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT|| 5050;
connectDB();


app.use('/admin', adminRoutes);
app.use('/user', userRoutes);


app.listen(PORT, () =>{
    console.log(`server is connected to port ${PORT}`);
});
