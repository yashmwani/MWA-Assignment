const express =  require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const {urlencoded} = require("body-parser");
const port = 80;

// express specific stuff
app.use('/static',express.static('static'));
app.use(urlencoded());

// pug specific stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// endpts
app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
});

// start server
app.listen(port,()=>{
    console.log(`application successfully started on ${port}`);
})