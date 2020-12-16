let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
var fs = require('fs'); 
var parse = require('csv-parse');
var _ = require('underscore');
const User = require("./models/user");
const { decrypt } = require('./crypto');
const ecomConfig = require("../db_config.json");
let dbUrl = 'mongodb+srv://'+ ecomConfig.env.MONGO_ATLAS_User + ':' + ecomConfig.env.MONGO_ATLAS_Password+ '@cluster0.fvzf9.mongodb.net/'+ ecomConfig.env.MONGO_ATLAS_DB_Name +'?retryWrites=true&w=majority'


//Import the mongoose module
var mongoose = require('mongoose');

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true , UseMongoClient: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function callback () {
    console.log("MongoDB connected"); 
});  


router.post("/login", (req, res, next) => { 
    const email = req.body.email;
    const password = req.body.password;    
    User
      .find({Email : email})
      .exec()
      .then(doc => {
        const data = _.first(doc);
        if(!_.isEmpty(data)){
            const text = decrypt(data.Password);           
            if(_.isEqual(text, password)){
                res.status(200).json({user : data});
            }else{
                res
                .status(404)
                .json({ message: "Invalid Password" });
            }
        };    
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
})

module.exports = router;