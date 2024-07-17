import express from 'express';
import connectDB from './utils/dbConne.mjs';
import dotenv from 'dotenv';
import session from 'express-session';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const app = express();

const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: "Swagger Documentation",
        version: '1.0.0',
        description: 'API documentation using Swagger'
      },
      servers: [
        {
          url: 'http://localhost:5000'
        }
      ],
      components: {
        securitySchemes: {
          AuthToken: { 
            type: 'apiKey',
            in: 'header',
            name: 'auth-token', 
          },
        },
      },
      security: [
        {
          AuthToken: [] 
        }
      ],
    },
    apis: [
      './routers/*.mjs'
    ],
  };

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());


import adminRoutes from './routers/adminRouter.mjs'
import userRoutes from './routers/userRouter.mjs'


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
