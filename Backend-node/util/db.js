const mongoose = require('mongoose');

 const connectionDB = (url)=>{
    console.log("trying to conneect db");
    mongoose.set({'debug':true});
    return mongoose.connect(url);
 } 
 module.exports = connectionDB;