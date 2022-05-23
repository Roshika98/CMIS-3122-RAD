const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');

const Routers = {
    admin: adminRoutes,
    user: userRoutes
}


module.exports = Routers;