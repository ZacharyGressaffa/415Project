var express = require('express')
// var app = express();
//
// var tickets = require('./tickets.js');
// app.use('/tickets', tickets);
//  app.get('/', function(req, res) {
//      res.send("Hello World!");
//  });
// app.listen(3000);
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
app.get('/', (req, res)=>{
    res.render('index', {title: 'Hey', message: 'yo'})
})

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'))
app.post('/', function (req, res) {
    console.log(req.body)
    res.send("recieved your req")
});
app.listen(3000)