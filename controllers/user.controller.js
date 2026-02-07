const UserModel = require("../models/user.model")


const createUser=async(req, res)=>{
    const {firstname, lastname, email, password} = req.body

    try {
        const user =await UserModel.create(req.body)
    res.status(201).send(
        {
            message:"user created successfully",
            data:{
                firstname,
                lastname,
                email
            }
        }
    )
    } catch (error) {
        console.log(error);

        res.status(400).send({
            message:"Account creation failed"
        })
        
    }



}


const getUsers=async(req, res)=>{
    try {
        let user = await UserModel.find().select("-password")
        res.status(200).send({
            message:"All users fetched successfully",
            data:user
        })
    } catch (error) {
        console.log(error);

        res.status(404).send({
            message:"cannot get users at this time"
        })
        
    }
}




module.exports= {
    createUser,
    getUsers
}