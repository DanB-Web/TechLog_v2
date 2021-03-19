import mongoose from 'mongoose';

//COMMENT SCHEMA
const commentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  }
}, {timeStamps: true})

const reportSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
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
  comments: {
    type: [commentSchema]
  },
  approved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'User'
  },
}, {
  //'Created at' and 'Updated at' fields will be auto created with the below option
  timestamps: true
  }
);

const Report = mongoose.model('Report', reportSchema);

export { Report };