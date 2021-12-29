import express from 'express';
import {loginUser, loginSession} from '../controllers/auth.mjs'
const router = express.Router();

router.route('/').post(loginUser).get(loginSession);

export default router