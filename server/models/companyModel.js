import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  primaryColor: {
    type: String,
    required: true
  },
  secondaryColor: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  },
}, {
  timestamps: true
  }
);

const Company = mongoose.model('Company', companySchema);

export default Company;