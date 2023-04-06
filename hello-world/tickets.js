var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    res.send('Get route on tickets');
});
router.post('/', function(req, res) {
    res.send('Post route on tickets');
});
module.exports = router;