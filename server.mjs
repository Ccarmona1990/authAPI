import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
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
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
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
    origin: ['http//http://localhost:3000/', 'http://localhost:8080/'],
    methods: ["GET", "POST"],
    credentials: true
    })
);

// route
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
