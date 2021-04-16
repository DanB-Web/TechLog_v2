import express from 'express';

const router = express.Router();

import { createUser, deleteUsers, authUser, changePassword, resetPassword } from './controllers/userControllers.js'

import { createReport, editReport, addComment, deleteReport } from './controllers/reportsControllers.js';
import { createCompany } from './controllers/companyControllers.js';
import { addImage, removeImage } from './controllers/imageControllers.js';

import { protect, protectBody } from './middleware/authMiddleware.js';

router.get('/test', protect, (req, res) => {
  console.log(req.headers);
  res.json('Route connected');
})

//USER ROUTES
router.post('/login', authUser)
router.post('/user', protect, createUser);
router.delete('/user', protectBody, deleteUsers);
router.post('/password', protect, changePassword);
router.put('/password', protect, resetPassword);

//REPORT ROUTES
router.post('/report', protect, createReport);
router.put('/report', protect, editReport);
router.delete('/report', protectBody, deleteReport);

//COMPANY ROUTES
router.post('/company', protect, createCompany);

//IMAGE ROUTES
router.post('/image', protect, addImage);
router.put('/image', protect, removeImage)

//COMMENTS ROUTES
router.post('/comment', protect, addComment);

export { router };