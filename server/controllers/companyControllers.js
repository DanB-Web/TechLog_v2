import { Company } from '../models/companyModel.js';

const createCompany = async (req, res) => {
  try {
    const { 
      name, 
      address, 
      primaryColor, 
      secondaryColor, 
      logoUrl 
    } = req.body;

    const update = await Company.create( { 
      name, 
      address, 
      primaryColor, 
      secondaryColor, 
      logoUrl 
    });

    res.status(201).send(update);

  } catch (err) {

    console.log(`CREATE COMPANY ERROR: ${err}`.bold.red);
    res.status(500).json('CREATE COMPANY ERROR');  

  } 
}

export { createCompany };