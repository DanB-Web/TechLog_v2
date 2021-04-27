import mongoose from 'mongoose';

// const databaseString = 'mongodb+srv://dan:dan1234@techlog.iaaiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const databaseString = 'mongodb://localhost:27017'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(databaseString /*|| process.env.MONGO_URI*/, {
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