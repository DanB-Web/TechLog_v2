import { Report } from '../models/reportModel.js';

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
    const { id, title, tags, shortDesc, longDesc, steps, comments, approved, approvedBy } = req.body.editedReport;

    const report = await Report.findById(id);

    report.title = title;
    report.tags = tags;
    report.shortDesc = shortDesc;
    report.longDesc = longDesc;
    report.steps = steps;
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

export { createReport, editReport, addComment };