const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await userModel.findOne({username});
        if(user){
            return res.status(409).json({message:"user is already exist",success:false})
        }

        const newUser = new userModel({username,password});
        newUser.password = await bcrypt.hash(password,10);
        await newUser.save()

        res.status(201).json({
            message:"signup successfully",success:true
        })

    }catch(error){
        res.status(501).json({
            message:"Internal Server ",success:false
        })
    }
}

const signin = async (req,res)=>{
    try{
        const {username,password}= req.body;
        const user = await userModel.findOne({username});
        const errorMsg = "Username or password is wrong"
        if(!user){
            return res.status(403).json({message:errorMsg,success:false})
        }

        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
           return res.status(403).json({
                message:errorMsg,success:false
            })
        }
       
        const jwtToken = jwt.sign({
            userID:user._id,
            username:user.username
        },process.env.JWT_SECRET,{expiresIn:'24h'})

        res.cookie("token",jwtToken);

        res.status(200).json({
            message:"Login Success",
            success:true,
            jwtToken,
            username:user.username 
        })

        

    }catch(error){
        res.status(501).json({
            message:"Internal Server Error",success:false
        })
    }
}


module.exports = {
    signup,signin
}