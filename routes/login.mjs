import express from 'express';
import {getUser, loginUser, loginSession} from '../controllers/auth.mjs'
const router = express.Router();

router.route('/:username&:password').get(getUser);
router.route('/').post(loginUser).get(loginSession);

export default router