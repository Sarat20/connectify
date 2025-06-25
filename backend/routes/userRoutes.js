import express from 'express';

const router =express.Router();
import { protectRoute } from '../middleware/authmiddleware.js';
import { getRecommendedUsers,getMyFriends,acceptFriendRequest,sendFriendRequest, getFriendRequests, getOutgoingFriendReqs } from '../controllers/userController.js';



router.use(protectRoute);
router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);
router.post('/friend-request/:id',sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest);

router.get("/friend-requests",getFriendRequests)
router.get('/outgoing-friend-requests',getOutgoingFriendReqs)
export default router;