const express = require('express')
const router = express.Router() //indexRouter from server.js set equal to this

router.get('/', (req, res) => {
    //this next line has a problem...will not render
    res.render('index')
})

module.exports = router