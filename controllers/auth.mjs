import bcrypt from 'bcrypt'
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
    const {username, password} = req.body;
    try {
        const userName = await User.findOne({username});
        if(userName){
            return res.status(500).json({msg:'This username already exist, please introduce a username that has not been used', success: false})
        }
        bcrypt.hash(password,5, async (err, hash)=>{
            //console.log(hash);
            if(err){console.log(err);}
            try {
                const user = await User.create({username, password: hash});
                res.status(201).json({user})
            } catch (err) {
                console.log(err)
            }
        })
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
}

export const loginSession = async (req, res)=>{
    try {
        if(req.session.user){
            res.status(200).json({loggedIn: true, user: req.session.user})
        } else {
            res.status(200).json({loggedIn: false})
        }
    } catch (error) {
        const {message}= error;
        res.status(500).json({message});
    }
}

export const loggoutUser = (req, res) =>{
    const {loggedIn} = req.body;
    req.session.destroy();
    res.status(200).json({loggedIn})
} 

export const loginUser = async (req, res)=>{
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({msg:`No user found with the information provided. Please check your username or password`})
        }
        bcrypt.compare(password, user.password, (err, result)=>{
            if(result){
                req.session.user = user;
                res.status(200).json({user})
            } else {
                res.send({msg:'Incorrect username or password. Please try again'})
            }
        })
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
}