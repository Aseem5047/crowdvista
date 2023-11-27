const ProjectModel = require('../models/ProjectModel');
const UserModel = require('../models/UserModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

// res - server to user / req - user to server

// add a new Project

const addProject = async (req, res) => {
    const { token } = req.cookies;
    const {
        title,
        link,
        photos,
        description,
        features,
        extraInfo,
        createdAt,
        requiredPrice,
    } = req.body;


    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {
        const projectDoc = await ProjectModel.create({
            owner: userData.id,
            title: title,
            link: link,
            photos: photos,
            description: description,
            features: features,
            extraInfo: extraInfo,
            createdAt: createdAt,
            requiredFunds: requiredPrice,
        })
        res.status(200).json(projectDoc)
    })
}

const editGivenProject = async (req, res) => {
    const { token } = req.cookies;
    const {
        projectId,
        title,
        link,
        photos,
        description,
        features,
        extraInfo,
        createdAt,
        requiredPrice,
    } = req.body;

    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {
        const projectDoc = await ProjectModel.findById(projectId)
        if (userData.id === projectDoc.owner.toString()) {
            projectDoc.set({
                title: title,
                link: link,
                photos: photos,
                description: description,
                features: features,
                extraInfo: extraInfo,
                createdAt: createdAt,
                requiredFunds: requiredPrice,
            })

            await projectDoc.save()

            res.status(200).json('The document has been Updated')

            console.log(projectDoc);
        }
    })

}

const updateFunds = async (req, res) => {
    try {
        const { token } = req.cookies;
        const {
            projectId,
            addedFunds,
            fundedBy
        } = req.body;

        const userData = jwt.verify(token, process.env.JWT_KEY);

        const projectDoc = await ProjectModel.findById(projectId);

        if (!projectDoc) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // if (userData.id !== projectDoc.owner.toString()) {
        //     return res.status(403).json({ error: 'Permission denied' });
        // }

        // Convert addedFunds to a number without decimals
        const parsedFunds = parseInt(addedFunds); // or parseFloat(addedFunds) if you want to allow decimals

        // projectDoc.fundedBy.push(...fundedBy);
        if (!projectDoc.fundedBy.includes(fundedBy)) {
            await projectDoc.updateOne({ $push: { fundedBy: fundedBy } });
        }

        projectDoc.recievedFunds.push(parsedFunds);

        await projectDoc.save();

        return res.status(200).json('The document has been updated');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const getAllProjects = async (req, res) => {
    res.status(200).json(await ProjectModel.find())
}

const getUserProjects = async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {
        if (err) {
            console.log("Error verifying JWT:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        const { id } = userData;

        try {
            const projects = await ProjectModel.find({ owner: id });
            res.status(200).json(projects);
        } catch (err) {
            console.log("Error getting projects:", err);
            res.status(404).json("No projects found");
        }
    });
};

const getProjectsById = async (req, res) => {
    const { projectId } = req.params
    // const place = await PlaceModel.findById(projectId)

    console.log(projectId);

    const place = await ProjectModel.findById(projectId)

    res.status(200).json(place)

    // console.log(place);

    // res.json(await )
}

// Delete a project
const deleteProject = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    try {
        const project = await ProjectModel.findById(id);
        // console.log(_id);
        if (project.userId === _id) {
            await project.deleteOne();
            res.status(200).json("project deleted successfully");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// like/dislike a project
const likeProject = async (req, res) => {
    const id = req.params.id;
    const { userId, value } = req.body;
    // console.log(req.body);
    try {
        const project = await ProjectModel.findById(id);
        if (!project.likes.includes(userId)) {
            await project.updateOne({ $push: { likes: userId } });
            await project.updateOne({ $push: { likedBy: value } });
            res.status(200).json(project.likedBy);
        } else {
            await project.updateOne({ $pull: { likes: userId } });
            await project.updateOne({ $pull: { likedBy: value } });
            res.status(200).json("project Unliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get Timeline Posts
const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await ProjectModel.find({ owner: userId });

        const followingUser = await UserModel.findById(userId);

        if (!followingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const followingPosts = await ProjectModel.find({
            owner: { $in: followingUser.following },
        });

        console.log(followingPosts);

        const allPosts = currentUserPosts.concat(followingPosts);

        allPosts.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json(error);
    }
};


const commentProject = async (req, res) => {

    const { id } = req.params;
    const { userId } = req.body;
    const project = await ProjectModel.findById(id);

    // if (project.userId !== userId) return res.json({ message: "Unauthenticated" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No project with id: ${id}`);

    const { comment } = req.body;

    console.log("Value ", comment);

    project.comments.push(comment)

    const updatedproject = await ProjectModel.findByIdAndUpdate(id, project, { new: true });

    res.json(updatedproject);
    // console.log(updatedproject);
}

// get posts by search

const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    console.log(req.query);
    try {
        const title = new RegExp(searchQuery, 'i');
        console.log(title);
        const posts = await ProjectModel.find({ $or: [{ 'title': title }, { features: { $in: tags.split(',') } }] });

        const user = await UserModel.find(({ $or: [{ 'username': title }, { 'fullname': title }] }));

        if (user) {
            res.status(200).json({ posts: posts, user: user });
        }
        else {
            res.status(200).json(posts)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports = {
    addProject, getUserProjects, getAllProjects, getProjectsById, editGivenProject, deleteProject,
    likeProject, commentProject, updateFunds, getTimelinePosts, getPostsBySearch
};