const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.render('index',{title:'NodeJs Notes App'});
})
router.get('/about',function(req,res){
    res.render('about',{title:'ABOUT NodeJs Notes App'});
})

module.exports = router;