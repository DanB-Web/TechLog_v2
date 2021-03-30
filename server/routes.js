import express from 'express';

const router = express.Router();

import { createUser, authUser, changePassword } from './controllers/userControllers.js'

import { createReport, editReport, addComment } from './controllers/reportsControllers.js';
import { createCompany } from './controllers/companyControllers.js';
import { addImage, removeImage } from './controllers/imageControllers.js'

router.get('/test', (req, res) => {
  res.json('Route connected')
})

//USER ROUTES
router.post('/login', authUser)
router.post('/user', createUser);
router.post('/password', changePassword);

//REPORT ROUTES
router.post('/report', createReport);
router.put('/report', editReport);

//COMPANY ROUTES
router.post('/company', createCompany);

//IMAGE ROUTES
router.post('/image', addImage);
router.put('/image', removeImage)

//COMMENTS ROUTES
router.post('/comment', addComment);

export { router };