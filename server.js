if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const dotenv =  require('dotenv')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000

const TodoTask = require('./models/todoTask')

dotenv.config()

app.use('/static', express.static("public"))

app.use(express.urlencoded({ extended: true }))

const indexRouter = require('./routes/index')

//Set view engine as ejs
app.set('view engine', 'ejs')

//GET method
app.get('/', (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render('todos.ejs', { todoTasks: tasks })
    })
})

//POST method
app.post('/', async(req, res) => {
    const todoTask = new TodoTask ({
        content: req.body.content
    })

    try {
        await todoTask.save()
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
        
    }
})

//UPDATE METHOD
app
.route('/edit/:id')
.get((req, res) => {
    const id = req.params.id
    TodoTask.find({}, (err, tasks) => {
        res.render('todoEdit.ejs', { todoTasks: tasks, idTask: id })
    })
})
.post((req, res) => {
    const id = req.params.id
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if(err) return res.send(500, err)
        res.redirect('/')
    })
})

//DELETE METHOD
app.route('/remove/:id').get((req, res) => {
    const id = req.params.id
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err)
        res.redirect('/')
    })
})

//Set up server views
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

//Set up public views folder
app.use(express.static('public'))

const mongoose = require('mongoose')

mongoose.set("useFindAndModify", false)

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to Mongoose'))






app.use('/', indexRouter)

app.listen(process.env.PORT)

