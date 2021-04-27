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
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }]
}, {
  timestamps: true
  }
);

const Company = mongoose.model('Company', companySchema);

export { Company };