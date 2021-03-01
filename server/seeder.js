/*
Note that this script is essentially seperate from our server
This is why we have to import everything we need (mongoose, dotenv etc...)
*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

//IMPORT SEEDING DATA
import users from './data/userData.js';
import companies from './data/companyData.js';
import reports from './data/reportData.js';

//IMPORT MODELS
import User from './models/userModel.js';
import Company from './models/companyModel.js';
import Report from './models/reportModel.js';     

//IMPORT DB CONNECTION
import connectDB from './config/database.js';

dotenv.config();

//Connect to DB
connectDB();

const importData = async () => {
  try { 
    //Clear existing db
    await User.deleteMany();
    await Company.deleteMany();
    await Report.deleteMany();

    //Add all seed companies to db
    const createdCompanies = await Company.insertMany(companies);
    
    //Assign company id's to users
    users[0].company = createdCompanies[0]._id;
    users[1].company = createdCompanies[1]._id;
    users[2].company = createdCompanies[1]._id;
    users[3].company = createdCompanies[2]._id;
    users[4].company = createdCompanies[2]._id;

    //Add all seed users to db
    const createdUsers = await User.insertMany(users);

    //Assign user + company id's to reports

    //DAN LEVEL USER
    reports[0].user = createdUsers[0]._id;
    reports[0].company = createdCompanies[0]._id;

    //REACH ADMIN + USER
    reports[1].user = createdUsers[1]._id;
    reports[1].company = createdCompanies[1]._id;
    reports[2].user = createdUsers[1]._id;
    reports[2].company = createdCompanies[1]._id;
    reports[3].user = createdUsers[2]._id;
    reports[3].company = createdCompanies[1]._id;
    reports[4].user = createdUsers[2]._id;
    reports[4].company = createdCompanies[1]._id;

    //DO ADMIN + USER
    reports[5].user = createdUsers[3]._id;
    reports[5].company = createdCompanies[2]._id;
    reports[6].user = createdUsers[4]._id;
    reports[6].company = createdCompanies[2]._id;
    reports[7].user = createdUsers[4]._id;
    reports[7].company = createdCompanies[2]._id;

    await Report.insertMany(reports);

    //Successful seed
    console.log('Data imported'.green.inverse);
    process.exit();

  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try { 
    //Clear existing db
    await User.deleteMany();
    await Company.deleteMany();
    await Report.deleteMany();

    //Successful seed
    console.log('Data removed!'.green.inverse);
    process.exit();

  } catch (err) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

//When the script is run, we can choose to destroy or import data:
//scripts are in package.json
//npm run data:import
//npm run data:destroy
//process.argv gets the flag passed to the command line
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}