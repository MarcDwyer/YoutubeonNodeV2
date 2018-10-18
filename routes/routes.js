const router = require('express').Router();
const fs = require('fs');
const streamerList = require('../init/getstreams');

console.log(streamerList.allstreams);
router.get('/all', (req, res) => {
    fs.readFile(`./fetches/all.json`, (err, data) => {
        res.send(data);
    })
})
router.get('/live', (req, res) => {
    fs.readFile(`./fetches/activestreamers.json`, (err, data) => {
        res.send(data);
    })
})

module.exports = router;
