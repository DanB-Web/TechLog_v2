import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  longDesc: {
    type: String,
    required: true
  },
  steps: {
    type: [String]
  },
  images: {
    type: [String]
  },
  approved: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company'
  }
}, {
  //'Created at' and 'Updated at' fields will be auto created with the below option
  timestamps: true
  }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;