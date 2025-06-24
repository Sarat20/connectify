import express from 'express';

const router =express.Router();
import { protectRoute } from '../middleware/authmiddleware.js';
import { getRecommendedUsers,getMyFriends } from '../controllers/userController.js';



router.use(protectRoute);
router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);
// router.post('/friend-request/:id',sendFriendRequest);
// router.put('/friend-request/:id/accept',acceptFriendRequest);
export default router;