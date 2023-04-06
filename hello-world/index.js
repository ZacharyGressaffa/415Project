var express = require('express');
var app = express();
var router = express.Router();

router.get('/test', function(req, res) {
    res.status(200).send('Hello world');
});

app.use('/api', router);

app.listen(1069, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Magic Happens on Port 69');
    }
});