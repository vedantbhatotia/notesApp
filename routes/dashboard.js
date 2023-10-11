const express = require('express');
const router = express.Router();
const Notes = require('../models/notes');
const passport = require('passport');
router.get('/dashboard', passport.checkAuthentication, async function(req, res) {
    const note = await Notes.find({});
    res.render('dashboard_index', {
        title: 'NodeJs Notes App Dashboard',
        layout: '../views/dashboard',
        notes:note
    });
});

module.exports = router;