const express = require('express');
const path = require('path');
const port = 8000;
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/mongoosse');
const passportMware = require('./config/passport-setup');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const app = express();
dotenv.config();
const uri = process.env.MONGO_URL;
app.use(session({
    // key to encrypt the cookie
    // req.session stores information about that session
     name:'notesApp',
     secret:'mac',
     saveUninitialized:false,
     resave:false,
     cookie:{
        maxAge:(1000*60*100)
     },
     store:MongoStore.create({
        mongoUrl:uri
    }, function(err){
        if (err) {
            console.error("Error setting up MongoStore:", err);
        } else {
            console.log("MongoStore setup successful");
        }
    })
    
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(bodyParser.urlencoded({extended: false}));
connectDB();
app.use(bodyParser.json());

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static(path.join(__dirname, 'assets')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use('/',require('./routes/index'));
app.use('/',require('./routes/dashboard'));
app.use('/',require('./routes/auth'));

app.listen(port,function(err){
    if(err){
        console.log("error in firing the server");
    }else{
        console.log("Server is up and running on port",port);
        }
});




// <!-- /dashboard/item/update/<%- noteID %>" -->