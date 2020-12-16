let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let ejs = require('ejs')

let port = process.env.PORT || 3000;
let index = require('./routes/index.js');
let tasks = require('./routes/tasks.js');
let products = require('./routes/products.js');
let users = require('./routes/users.js');
let crypto = require('./routes/crypto.js');
let app = express();

//setting up the views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile)


//set up static forlders for  angular (client)
app.use(express.static(path.join(__dirname,'client')));

//body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',index);
app.use('/api',tasks);
app.use('/api/products',products);
app.use('/api/users',users);

app.listen(port,()=>{
    console.log("connected to express server")
})
