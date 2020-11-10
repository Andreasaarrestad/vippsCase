var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

// Returns the number of times the topic occur in the topic as a string 
router.get('/:topic', function(req, res, next) {

    fetch('https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page='+req.params.topic)
        .then(res2 => res2.json())
        .then(json => {
            const regex = new RegExp(req.params.topic, 'gi');
            const text = json.parse.text["*"];
            const counter = (text.match(regex) || []).length;
            res.status(200);
            res.send(counter.toString());
        })
        .catch(() => {
            res.status(500);
            res.send("Error");
        });       
});

module.exports = router;