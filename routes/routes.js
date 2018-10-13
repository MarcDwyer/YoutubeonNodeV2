const router = require('express').Router();
const fs = require('fs');
const streamerList = require('../init/getstreams');


const newList = streamerList.map(item => {
    return `/${item}`;
})


newList.forEach((name) => {
    router.get(name, (req, res) => {
        fs.readFile(`./fetches/${name}.json`, (err, data) => {
            res.send(data);
        })
    })
})

newList.forEach((name) => {
    router.get(`/stats${name}`, (req, res) => {
        fs.readFile(`./fetches/${name}stats.json`, (err, data) => {
            res.send(data);
        })
    })
})

router.get('/list', (req, res) => {
    res.send(JSON.stringify(streamerList));
})

module.exports = router; 