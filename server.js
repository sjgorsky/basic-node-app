if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

//Set view engine as ejs
//app.set('view-engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected ot Mongoose'))




//Set up server views
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(expressLayouts)

//Set up public views folder
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)