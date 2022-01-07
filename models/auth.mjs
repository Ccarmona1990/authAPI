import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Provide a username'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Provide an email address'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Provide a password'],
        trim: true,
        minlength: [8, 'Please provide a minimum of 8 characters']
    }
})

export const User = mongoose.model('User',userSchema) 