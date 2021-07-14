const express = require('express')
const router = express.Router() //indexRouter from server.js set equal to this

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router