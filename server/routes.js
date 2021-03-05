import express from 'express';

const router = express.Router();

import { createUser, authUser } from './controllers/userControllers.js'

import { createReport } from './controllers/reportsControllers.js';
import { createCompany } from './controllers/companyControllers.js';

router.get('/test', (req, res) => {
  res.json('Route connected')
})

//USER ROUTES
router.post('/login', authUser)
router.post('/user', createUser);

//REPORT ROUTES
router.post('/report', createReport);

//COMPANY ROUTES
router.post('/company', createCompany);


export { router };