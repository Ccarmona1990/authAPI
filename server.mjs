import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import greetingRoute from "./routes/greeting.mjs"
import registerRoute from './routes/reg.mjs'
import sessionRoute from './routes/session.mjs'
import loginRoute from './routes/login.mjs'
import DBconnection from './DB/connect.mjs'
import morgan from 'morgan';
dotenv.config()

const app = express();
const port = process.env.PORT;
const URI = process.env.MONGO_URI;

// parsers 
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    key: "userID",
    secret: "subscriber",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 24 * 60 * 60
    }
}))

app.use(morgan('tiny'));
app.use(cors({
    origin: [
        'http://localhost:3000/',
        'http://localhost:3000/task-manager',
        'http://localhost:3001/', 
        'http://localhost:3001/api/v1/login/', 
        'http://localhost:3001/api/v1/register/', 
        'http://localhost:3001/api/v1/tasks/',
        'http://localhost:8080/',
        'http://localhost:8080/api/v1/login/', 
        'http://localhost:8080/api/v1/register/', 
        'http://localhost:8080/api/v1/tasks/', 
        'https://tm-auth-api.herokuapp.com/', 
        'https://tm-auth-api.herokuapp.com/api/v1/login/', 
        'https://tm-auth-api.herokuapp.com/api/v1/register/', 
        'https://tm-auth-api.herokuapp.com/api/v1/tasks/', 
        'https://t-manager.netlify.app/',
        'https://t-manager.netlify.app/task-manager'],
    methods: ["GET", "POST"],
    //credentials: true
    })
);

// routes
app.use('/', greetingRoute)
app.use('/api/v1/register',registerRoute)
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/tasks',sessionRoute);

const start = async ()=>{
    try {
        await DBconnection(URI)
        app.listen(port, ()=>console.log(`Server open on port: ${port}`))
    } catch (err) {
        console.log(err);
    }
}
start();
