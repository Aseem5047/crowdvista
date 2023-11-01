const express = require("express");
const { getProfile, getUser, editProfile, followUser,
    unfollowUser, getAllUsers } = require("../Controllers/UserController");

const router = express.Router();

router.get('/profile', getProfile);
router.get('/profile/:id', getUser);
router.get('/', getAllUsers);
router.put('/editProfile/:id', editProfile);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);


module.exports = router;
