import express from 'express';
let route = express.Router();


route.post('/createuser');

route.post('/updateuser');

route.delete('/deleteuser');

export default route;