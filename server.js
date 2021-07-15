if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//this throws an error
//require('dotenv').config({ path: './config/.env'  })
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const TodoTask = require('./models/TodoTask')

app.use('/static', express.static("public"))

app.use(express.urlencoded({ extended: true }))

//POST method
app.post('/',async (req, res) => {
    const TodoTask = new TodoTask ({
        content: req.body.content
    })

    try {
        await todoTask.save()
        res.redirect('/')
    } catch (err) {
        res.redirect('/')
        
    }
})

const indexRouter = require('./routes/index')

//Set view engine as ejs
app.set('view engine', 'ejs')
//Set up server views
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

//Set up public views folder
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to Mongoose'))






app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)