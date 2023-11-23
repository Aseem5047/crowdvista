const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { decode } = jwt;

const getUser = async (req, res) => {

    const id = req.params.id;
    const { _id } = req.body;

    try {
        const user = await UserModel.findById(_id || id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        }

        else {
            res.status(404).json("No such user exists")
        }
    } catch (error) {
        res.status(500).json(error);
    }

}

// Get all users
const getAllUsers = async (req, res) => {

    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc
            return otherDetails
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};


// edit current user's profile

const editProfile = async (req, res) => {
    const id = req.params?.id;
    console.log("Data Received", req.body);
    const { _id, password, ...otherFields } = req.body;

    console.log(id, _id);

    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            } else {
                // Remove the password field from the update object
                delete otherFields.password;
            }

            const user = await UserModel.findByIdAndUpdate(id, otherFields, {
                new: true,
            });
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).cookie('token', token).json({ user, token });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! You can update only your own Account.");
    }
};

// get a User via token cookie

const getProfile = async (req, res) => {

    const { token } = req.cookies;
    if (token) {
        const decodedToken = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        let expired = false;

        if (decodedToken.exp < currentTime) {
            console.log('Token has expired');
            expired = true;
            // Perform actions for an expired token
        } else {
            console.log('Token is valid');
            expired = false
            // Perform actions for a valid token
        }

        jwt.verify(token, process.env.JWT_KEY, {}, async (arr, userData) => {
            if (expired) {
                res.status(401).json("Invalid or Expired token");

            } else {
                const userDetails = await UserModel.findById(userData.id);
                const { password, ...otherDetails } = userDetails._doc;
                res.status(200).json(otherDetails)

            }
        })
    } else {
        // console.log("Token not found");
        res.status(401).json("Invalid or expired token");
    }

}

// Follow a User

const followUser = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    console.log(id, userId)
    if (userId == id) {
        res.status(403).json("Action Forbidden");
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(userId);

            if (!followUser.followers.includes(userId)) {
                await followUser.updateOne({ $push: { followers: userId } });
                await followingUser.updateOne({ $push: { following: id } });
                res.status(200).json("User followed!");
            } else {
                res.status(403).json("you are already following this id");
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
};

// Unfollow a User

const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action Forbidden")
    }
    else {
        try {
            const unFollowUser = await UserModel.findById(id)
            const unFollowingUser = await UserModel.findById(_id)


            if (unFollowUser.followers.includes(_id)) {
                await unFollowUser.updateOne({ $pull: { followers: _id } })
                await unFollowingUser.updateOne({ $pull: { following: id } })
                res.status(200).json("Unfollowed Successfully!")
            }
            else {
                res.status(403).json("You are not following this User")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
};

module.exports = {
    getProfile,
    getUser,
    getAllUsers,
    editProfile,
    followUser,
    unfollowUser
};