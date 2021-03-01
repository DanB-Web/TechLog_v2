import User from '../models/userModel.js';

const createUser = async (req, res) => {
  try {
    const { name, email, password, company } = req.body;
    const update = await User.create( { name, email, password, company } );
    res.status(201).send(update);
  } catch (err) {
    console.log(`CREATE USER ERROR: ${err}`.bold.red);
    res.status(500).json('CREATE USER ERROR');  
  } 
}

export { createUser };