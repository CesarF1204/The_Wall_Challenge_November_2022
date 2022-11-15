const express = require('express');
const DashboardRoute = express.Router();
const DashboardController = require('../controllers/dashboard.controller');

/* index */
DashboardRoute.get('/dashboard', DashboardController.index);

module.exports = DashboardRoute;