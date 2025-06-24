import express from 'express';

const router =express.Router();
import { protectRoute } from '../middleware/authmiddleware.js';
import { getRecommendedUsers,getMyFriends } from '../controllers/userController.js';



router.use(protectRoute);
router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);

export default router;