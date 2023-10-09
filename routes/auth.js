const express = require('express');
const router = express.Router();
router.get('/auth/google',function(req,res){
    return res.send("LOG IN WITH GOOGLE");
})
router.get('/logout',function(req,res){
    return res.send("LOG OUT");
})
module.exports = router;