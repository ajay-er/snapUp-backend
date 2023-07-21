import express from 'express';
import { signup,login } from '../controllers/authController';

let route = express.Router();

route.post('/login',login);

route.post('/signup',signup);

export default route;