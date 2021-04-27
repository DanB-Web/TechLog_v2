import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
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
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company'
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  isDan: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  //'Created at' and 'Updated at' fields will be auto created with the below option
  timestamps: true
  }
);

//Add password checking method on user instance
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//Mongoose middleware to hash passwords into DB
userSchema.pre('save', async function (next) {

  //Make sure only runs if password field is changed 
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}) 


//Create a new Mongoose model using the schmema above
const User = mongoose.model('User', userSchema);

export { User};