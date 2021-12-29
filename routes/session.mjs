import express from 'express';
import {loginSession, loggoutUser} from '../controllers/auth.mjs'
const router = express.Router();

router.route('/').get(loginSession).post(loggoutUser);

export default router 