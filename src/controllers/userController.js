let User = require('../modals/user');

const getAllUsers = async(req,res)=>{
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            msg : "Error in fetching users.",
            errorMsg : error.message 
        })
    }
}

const createUser = async(req,res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({
            msg : "User added successfully"
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            msg : "Unable to Add User.",
            errorMsg : error.message 
        })
    }
}

module.exports = { getAllUsers, createUser };