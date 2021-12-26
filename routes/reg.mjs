import express from 'express';
import {createUser} from '../controllers/auth.mjs'
const router = express.Router();

router.route('/').post(createUser);

export default router


