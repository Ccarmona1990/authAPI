import express from 'express';
import {getUser, loginUser} from '../controllers/auth.mjs'
const router = express.Router();

router.route('/:username&:password').get(getUser);
router.route('/').post(loginUser);

export default router