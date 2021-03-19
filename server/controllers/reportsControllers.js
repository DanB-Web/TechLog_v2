import { Report } from '../models/reportModel.js';

const createReport = async (req, res) => {
  try {
    const { 
      title, 
      tags, 
      shortDesc, 
      longDesc, 
      steps, 
      images, 
      user, 
      company 
    } = req.body;

    const update = await Report.create( { 
      title, 
      tags, 
      shortDesc, 
      longDesc, 
      steps, 
      images, 
      user, 
      company 
    });

    res.status(201).send(update);

  } catch (err) {
    console.log(`CREATE REPORT ERROR: ${err}`.bold.red);
    res.status(500).json('CREATE REPORT ERROR');  
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

export { createReport, addComment };