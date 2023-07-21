import express from 'express';
let route = express.Router();



route.post('/adduser');

route.delete('/removeuser');

export default route;