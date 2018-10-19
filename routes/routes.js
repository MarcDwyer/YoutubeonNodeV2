const router = require('express').Router();
const fs = require('fs');
const streamerList = require('../init/getstreams');


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
router.get('/:name', (req, res) => {
    fs.readFile(`./fetches/activestreamers.json`, (err, data) => {
        const makeJson = JSON.parse(data);
        const indexNum = makeJson.findIndex(item => item.name == req.params.name);
        res.send(JSON.stringify(makeJson[indexNum]));
    })
})
module.exports = router;
