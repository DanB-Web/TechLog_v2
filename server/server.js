import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';

dotenv.config();

//ROUTES + CUSTOM MIDDLEWARE
import { router } from './routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//DATABASE
import { connectDB } from './config/database.js';

//NEW APP INSTANCE AND .ENV VARIABLES
const app = express();
const PORT = process.env.PORT || 5000 ;
const MODE = process.env.NODE_ENV;

//MIDDLEWARE
app.use(
  cors()
);

//LOAD ROUTES
app.use(router);

//CUSTOM MIDDLEWARE - make sure error catching is last!
app.use(notFound);
app.use(errorHandler);

//AWAIT DB CONNECTION BEFORE STARTING SERVER
(async function () {
  try {
    await connectDB();
    app.listen(PORT, ()=> {
      console.log(`Server listening in ${MODE} mode on ${PORT}`.yellow.bold);
    });
  } catch (err) {
    console.log(`Failure to start server: ${err}`.red.bold);
  }
})();