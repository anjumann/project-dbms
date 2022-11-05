const User = require('../modals/User')


const getAll = async (req, res) => {

    try {
        const user = await User.find()
        if (user) {
            // const { password, uuid, createdAt, updatedAt, ...others } = user._doc
            res.status(200).json(user)
        } else {
            res.status(200).json("User not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getByUsn = async (req, res) => {

    try {
        const user = await User.findOne({ usn: req.params.usn })
        if (user) {
            const { password, uuid, createdAt, updatedAt, ...others } = user._doc
            res.status(200).json(others)
        } else {
            res.status(200).json("User not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ usn: req.params.usn })
        if (user) {
            // res.status(200).json(user.id)
            await User.findByIdAndUpdate(user.id, {
                $set: req.body
            })
            res.status(200).json("Account has been updated")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = { getAll, getByUsn, updateUser }