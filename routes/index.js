let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();


router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.get('/',(request,response,next)=>{
    response.render('index.html');
});




module.exports = router;