import mongoose from 'mongoose';

const connectDB = async () => {

  const databaseString = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(databaseString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(`Database Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Database Connection Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
}

export { connectDB };