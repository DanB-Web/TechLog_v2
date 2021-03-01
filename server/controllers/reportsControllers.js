import Report from '../models/reportModel.js';

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

export { createReport };