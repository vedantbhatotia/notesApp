require('dotenv').config(); 
const mongoose = require("mongoose");
const uri = process.env.MONGO_URL;
const connectDB = async () =>{
  try {
    await mongoose.connect(uri);
    console.log("Pinged your deployment. You successfully connected to DB!");
  } catch(err) {
    console.log(err);
  }
}

module.exports = connectDB;





// // require the library
// const mongoose = require('mongoose');
// // connect to the database
// mongoose.connect('mongodb://0.0.0.0/notes-app');
// // get the connection bw mongoose and database
// const db = mongoose.connection;
// // check if the connection is made or not
// db.on('error',console.error.bind(console,"error connecting to db"));
// db.once('open',function(){
//     console.log("successfully connected to the database");
// });
// module.exports = db;


