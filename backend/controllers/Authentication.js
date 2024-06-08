const Users = require("../models/User")

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log(req.body)
  try {
    const {username, password} = req.body;
    console.log(req.body)

    if(!username || !password){
      res.status(400).json({msg:"please fill out data first"})
    }else{
      const user = await Users.findOne({$or:[{username:username},{email: username}]})
      if(!user){
        res.status(400).json({msg:"User with this username does not exist"})
      }else{
        const validateUser = await bcryptjs.compare(password, user.password)
        if(!validateUser){
          res.status(400).json({msg:"User's password is incorrect"})
        }else{
          const payload = {
            userId: user._id,
            username: user.username
          }
          const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "This_Is_JWT_App_Secret_@#£_"
          jwt.sign(payload,JWT_SECRET_KEY,{expiresIn: 86400 * 2},async (err, token)=>{
            await Users.updateOne({_id:user._id},{
              $set: {token:token}
            })
            user.save()
            const updatedUser = await Users.findOne({_id: user._id})
            return res.status(200).json({
              user:{
                userId:user._id,
                username: user.username,
                email: user.email,
              },token: updatedUser.token
            })
          })
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Server Error"})
  }
}

const register = async (req, res) => {
  try {
    const {email, username, password} = req.body;

    if(!email || !username || !password){
      res.status(400).json({msg:"please fill credentials first"})
    }else{
      const isAlreadyExist = await Users.findOne({$or:[{username:username},{email: email}]});
      if(isAlreadyExist){
        res.status(400).json({msg:"User with this username already exists"})
      }else{
        const newUser = new Users({
          email: email,
          username: username
        })
        bcryptjs.hash(password, 10, (err, hashedPassword)=>{
          newUser.set('password',hashedPassword)
          newUser.save()
        })
        return res.status(200).json({msg:"Account Created. Redirecting to LOGIN"});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Server Error"})
  }
}

module.exports = {
    login,
    register
}