import bcrypt from 'bcrypt'
import {User} from '../models/auth.mjs'

export const getUser = async (req, res)=>{
    const username = req.params.username;
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({msg:`No user with said credentials. Please try again`})
        }
        res.status(200).json({success: true})
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
}

export const createUser = async (req, res)=>{
    const {username, email, password} = req.body;
    try {
        const userName = await User.findOne({username});
        const eMail = await User.findOne({email});
        if(userName || eMail){
            return res.status(500).json({msg:'This username already exist, please introduce a username that has not been used', success: false})
        }
        bcrypt.hash(password,5, async (err, hash)=>{
            if(err){console.log(err);}
            try {
                const user = await User.create({username, email, password: hash});
                res.status(201).json({success: true, msg: `The user was successfully created!`})
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
    const user = req.session.user;
    try {
        if(user){
            res.status(200).json({loggedIn: true})
        } else {
            res.status(200).json({loggedIn: false}) 
        }
    } catch (error) {
        const {message}= error;
        res.status(500).json({success: false, message});
    }
}

export const loggoutUser = (req, res) =>{
    const {loggedIn} = req.body;
    req.session.destroy();
    res.status(200).json({loggedIn})
} 

export const loginUser = async (req, res)=>{
    const {username, email, password} = req.body;
    
    try {
        const user = await User.findOne({username})
        const eMail = await User.findOne({email});
        
        if(!user){
            if(!eMail){
                return res.status(404).json({msg:`No user found with the information provided. Please check credentials`})
            }
        }
        const passwordDB = user?.password ? user?.password : eMail?.password ? eMail?.password : null;

        bcrypt.compare(password, passwordDB, (err, result)=>{
            if(result){
                req.session.user = user;
                res.status(200).json({success: true, msg:`User has logged`})
            } else {
                res.send({msg:'Incorrect username or password. Please try again'})
            }
        })
    } catch (error) {
        const {message} = error;
        res.status(500).json({msg: message, success: false})
    }
}