const express = require('express');
const UserRoute = express.Router();
const UsersController = require('../controllers/users.controller');

/* index */
UserRoute.get('/', UsersController.index);

/* signin */
UserRoute.get('/signin', UsersController.signin);
UserRoute.post('/signin_process', UsersController.signinProcess);

/* register */
UserRoute.get('/register', UsersController.register);
UserRoute.post('/register_process', UsersController.registrationProcess);

/* logout */
UserRoute.get('/logout', UsersController.logout);

module.exports = UserRoute;