const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/dashboard',passport.checkAuthentication,function(req,res){
    res.render('dashboard_index',{
        title:'NodeJs Notes App Dashboard',
        layout:'../views/dashboard'
    });
})

module.exports = router;