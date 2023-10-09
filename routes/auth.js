const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/auth/google',passport.authenticate('google',{
    scope:['profile']
}))
router.get('/auth/google/redirect',passport.authenticate('google'),function(req,res){
    // user can be accessed with th req.user method
    // current logged in user
    return res.redirect('/dashboard');
})

router.get('/logout',passport.checkAuthentication,function(req,res){
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.redirect('/'); // Handle error by redirecting to home or appropriate page
        }
        return res.redirect('/');
    });
})
module.exports = router;