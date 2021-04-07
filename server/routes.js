import express from 'express';

const router = express.Router();

import { createUser, deleteUsers, authUser, changePassword, resetPassword } from './controllers/userControllers.js'

import { createReport, editReport, addComment, deleteReport } from './controllers/reportsControllers.js';
import { createCompany } from './controllers/companyControllers.js';
import { addImage, removeImage } from './controllers/imageControllers.js'

router.get('/test', (req, res) => {
  res.json('Route connected')
})

//USER ROUTES
router.post('/login', authUser)
router.post('/user', createUser);
router.delete('/user', deleteUsers);
router.post('/password', changePassword);
router.put('/password', resetPassword);

//REPORT ROUTES
router.post('/report', createReport);
router.put('/report', editReport);
router.delete('/report', deleteReport);

//COMPANY ROUTES
router.post('/company', createCompany);

//IMAGE ROUTES
router.post('/image', addImage);
router.put('/image', removeImage)

//COMMENTS ROUTES
router.post('/comment', addComment);

export { router };