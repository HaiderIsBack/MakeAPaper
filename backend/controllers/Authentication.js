const Users = require("../models/User");
const Subscription = require("../models/Subscription");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

const login = async (req, res) => {
  try {
    const {username, password} = req.body;

    if(!username || !password){
      res.status(200).json({success: false, msg:"please fill out data first"})
    }else{
      const user = await Users.findOne({$or:[{username:username},{email: username}]})
      if(!user){
        res.status(200).json({success: false, msg:"User with this username does not exist"})
      }else{
        const validateUser = await bcryptjs.compare(password, user.password)
        if(!validateUser){
          res.status(200).json({success: false, msg:"User's password is incorrect"})
        }else{
          const payload = {
            userId: user._id,
            username: user.username
          }
          const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "This_Is_JWT_App_Secret_@#£_"
          jwt.sign(payload, JWT_SECRET_KEY,{expiresIn: 86400 /** 1 Day */},async (err, token)=>{
            await Users.updateOne({_id:user._id},{
              $set: {token:token}
            })
            user.save()
            const updatedUser = await Users.findOne({_id: user._id})
            const userSubscription = await Subscription.findOne({_id: user._id})

            if(userSubscription){
              return res.status(200).json({
                success: true,
                user:{
                  userId:user._id,
                  username: user.username,
                  email: user.email,
                  subscription: userSubscription
                },
                token: updatedUser.token
              })
            }else{
              return res.status(200).json({
                success: true,
                user:{
                  userId:user._id,
                  username: user.username,
                  email: user.email,
                },
                token: updatedUser.token
              })
            }
          })
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, msg: "Server Error"})
  }
}

const register = async (req, res) => {
  try {
    const {email, username, password} = req.body;

    if(!email || !username || !password){
      res.status(200).json({success: false, msg:"please fill credentials first"})
    }else{
      const isAlreadyExist = await Users.findOne({$or:[{username:username},{email: email}]});
      if(isAlreadyExist){
        res.status(200).json({success: false, msg:"User with this username already exists"})
      }else{
        const newUser = new Users({
          email: email,
          username: username
        })
        bcryptjs.hash(password, 10, (err, hashedPassword)=>{
          newUser.set('password', hashedPassword)
          newUser.save()
        })
        return res.status(200).json({success: true, msg:"Account Created. Redirecting to LOGIN"});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, msg: "Server Error"})
  }
}

module.exports = {
    login,
    register
}