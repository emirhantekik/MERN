const postSchema = require("../models/post.js")

const getPosts = async(req,res) => {
    try {
        const getPosts = await postSchema.find();
        res.status(200).json(getPosts);
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

const createPost = async (req, res) => {
    try {
        const {user,title,description} = req.body;
        const newPost = await postSchema.create({user:user,title:title,description:description});
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

const updatePost = async (req,res) => {
    try {
        const {id} = req.params;
        const update = await postSchema.findByIdAndUpdate(id,req.body,{new : true});
        res.status(200).json(update)
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

const deletePost = async (req,res) => {
    try {
        const {id} = req.params;
        await postSchema.findByIdAndDelete(id);
        res.status(200).json({msg : "Silme işlemi başarılı"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

module.exports = {getPosts,createPost,updatePost,deletePost}