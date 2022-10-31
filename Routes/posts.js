const router = require('express').Router();
const Post = require('../modals/Post')
const { v4: uuidv4 } = require('uuid');

//create Post
router.post('/create', async (req, res) => {
    const ppid = await uuidv4();
    const newPost = await new Post({
        ppid: ppid,
        title: req.body.title,
        desc: req.body.desc,
        userusn: req.body.userusn
    })
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete post by ppid
router.delete('/delete/:ppid', async (req, res) => {
    try {
        const post = await Post.findOne({ ppid: req.params.ppid })
        if (post) {
            await post.delete()
            res.status(200).json("Post has been deleted")
        } else {
            res.status(200).json("Post not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all post 
router.get('/all', async (req, res) => {

    try {
        const post = await Post.find()
        if (post) {
            // const { password, uuid, createdAt, updatedAt, ...others } = user._doc
            res.status(200).json(post)
        } else {
            res.status(200).json("No Posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all post by usn
router.get('/all/:usn', async (req, res) => {

    try {
        const post = await Post.find({ userusn: req.params.usn })
        if (post) {
            // const { password, uuid, createdAt, updatedAt, ...others } = user._doc
            res.status(200).json(post)
        } else {
            res.status(200).json("No Posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all post by ppid
router.get('/ppid/:ppid', async (req, res) => {

    try {
        const post = await Post.findOne({ ppid: req.params.ppid })
        if (post) {
            // const { password, uuid, createdAt, updatedAt, ...others } = user._doc
            res.status(200).json(post)
        } else {
            res.status(200).json("No Posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// update post by ppid
router.put('/update/:ppid', async (req, res) => {
    try {
        const post = await Post.findOne({ ppid: req.params.ppid })

        if (post) {
            // res.status(200).json(user.id)
            await Post.findByIdAndUpdate(post.id, {
                $set: req.body
            })
            res.status(200).json("Account has been updated")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})





module.exports = router;