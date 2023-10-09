const express = require('express');
const router = express.Router();

router.get('/dashboard',function(req,res){
    res.render('dashboard_index',{
        title:'NodeJs Notes App Dashboard',
        layout:'../views/dashboard'
    });
})

module.exports = router;