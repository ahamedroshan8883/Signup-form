const express = require('express');
const UserRouter = express.Router();

const { postUserdetails } = require('../Controller/UserController');

UserRouter.post('/Signup',postUserdetails);
module.exports = UserRouter;