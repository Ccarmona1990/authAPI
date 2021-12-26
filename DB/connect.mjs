import mongoose from 'mongoose';

const dbconnection = (url) =>{
    return mongoose
    .connect(url)
    .then(()=>console.log('DB CONNECTION OPEN...'))
}
export default dbconnection