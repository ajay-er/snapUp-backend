import express from 'express';
let route = express.Router();
import { login, getAllUsers, getUserData, updateUser, deleteUser } from '../controllers/adminController';
import { adminProtect } from '../middlewares/authMiddleware';


route.post('/login',login);

route.get('/getusers',adminProtect, getAllUsers);

route.get('/getuser/:id', adminProtect,getUserData);

route.post('/updateuser',adminProtect,updateUser);

route.delete('/deleteuser/:id',adminProtect,deleteUser);

export default route;