const express = require('express');
const router = express.Router();
const Notes = require('../models/notes');
const passport = require('passport');
const mongoose = require('mongoose');

router.get('/dashboard', passport.checkAuthentication, async function(req, res, next) {
    try {
        const perPage = 12;
        const page = parseInt(req.query.page) || 1;

        const notes = await Notes.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id)  // Fixed this line
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 50] }
                }
            },
            {
                $skip: (page - 1) * perPage
            },
            {
                $limit: perPage
            }
        ]).exec();

        const count = await Notes.countDocuments({ user: new mongoose.Types.ObjectId(req.user.id) });

        res.render('dashboard_index', {
            title: 'NodeJs Notes App Dashboard',
            layout: '../views/dashboard',
            notes,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
