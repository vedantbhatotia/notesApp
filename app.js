const express = require('express');
const path = require('path');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static(path.join(__dirname, 'assets')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("error in firing the server");
    }else{
        console.log("Server is up and running on port",port);
        }
});