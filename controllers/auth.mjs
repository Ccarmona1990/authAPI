
import {User} from '../models/auth.mjs'

export const getUser = async (req, res)=>{
    const {username, password} = req.params;
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({msg:`No user with: ${username} and ${password}`})
        }
        res.status(200).json({user})
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
}

export const createUser = async (req, res)=>{
    const userCredentials = req.body;
    try {
        const userName = await User.findOne({username: userCredentials.username});
        if(userName){
            return res.status(500).json({msg:'This username already exist, please introduce a username that has not been used', success: false})
        }
        const user = await User.create(userCredentials);
        res.status(201).json({user})
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
}

export const loginUser = async (req, res)=>{
    const {username} = req.body;
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({msg:`No user found with the information provided. Please check your username or password`})
        }
        res.status(200).json({user})
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
}