import cloudinary from 'cloudinary';

import { Report } from '../models/reportModel.js';

cloudinary.v2.config({
  cloud_name: "dasb94yfb",
  api_key: "281265939685491",
  api_secret: "3o36L3BCbF4V_vGz_u0unnERlFo"
})

const createReport = async (req, res) => {
  try {
    const { title, tags, shortDesc, longDesc, steps, images, user, company } = req.body.newReport;

    const update = await Report.create( { title, tags, shortDesc, longDesc, steps, images, user, company });

    res.status(201).send(update);

  } catch (err) {
    console.log(`CREATE REPORT ERROR: ${err}`.bold.red);
    res.status(500).json('CREATE REPORT ERROR');  
  } 
}

const editReport = async (req, res) => {

  try {
    const { id, title, tags, shortDesc, longDesc, steps, images, comments, approved, approvedBy } = req.body.editedReport;

    const report = await Report.findById(id);

    report.title = title;
    report.tags = tags;
    report.shortDesc = shortDesc;
    report.longDesc = longDesc;
    report.steps = steps;
    report.images = images;
    report.comments = comments;
    report.approved = approved;
    report.approvedBy = approvedBy;

    const updatedReport = await report.save();

    res.status(200).send(updatedReport);

  } catch (err) {
    console.log(`EDIT REPORT COMMENT ERROR: ${err}`.bold.red);
    res.status(500).json('EDIT REPORT ERROR');
  }
}

const deleteReport = async (req, res) => {
  try {
    const reportId = req.body.id;
    const images = req.body.imageUrls;

    //CHECK FOR IMAGES AND DELETE FROM CLOUDINARY
    if (images.length > 0) {

      const deleteIds = [];

      images.forEach(image => deleteIds.push(image.publicId));

      const cloudinaryReply = await cloudinary.v2.api.delete_resources(deleteIds);

      console.log(cloudinaryReply);

    }

    //DELETE REPORT FROM DB
    const databaseReply = await Report.findByIdAndDelete(reportId);

    console.log(databaseReply);
    res.status(200).send(databaseReply);
  } catch (err) {
    console.log(`DELETE REPORT ERROR: ${err}`.bold.red);
    res.status(500).json('DELETE REPORT ERROR');
  }
}

const addComment = async (req, res) => {
  try {
    const {reportId, user, comment } = req.body;

    const report = await Report.findById(reportId);
    report.comments.push({
      user, 
      comment, 
      time: Date.now()
    });
    const updatedReport = await report.save();

    res.status(201).send(updatedReport);

  } catch (err) {
    console.log(`ADD REPORT COMMENT ERROR: ${err}`.bold.red);
    res.status(500).json('ADD REPORT COMMENT ERROR');  
  }
}

export { createReport, editReport, deleteReport, addComment };