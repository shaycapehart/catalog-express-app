const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const hbs = require('hbs')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const catalogRouter = require('./routes/catalog')

const app = express()

//Set up mongoose connection
const mongoose = require('mongoose')
const mongoDB =
  'mongodb+srv://taskapp:eD@u@k29dNF2kWK@cluster0-4jalw.mongodb.net/local_library?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Specify helpers which are only registered on this instance
hbs.registerHelper('isEq', function(arg1, arg2) {
  return arg1 === arg2
})

hbs.registerHelper('isNotEq', function(arg1, arg2) {
  return arg1 !== arg2
})

hbs.registerHelper('isLt', function(arg1, arg2) {
  return arg1 < arg2
})

hbs.registerHelper('add', function(arg1, arg2) {
  return arg1 + arg2
})

hbs.registerHelper('isChecked', function(arg1) {
  return arg1 === true
})

hbs.registerHelper('isEqStrings', function(arg1, arg2) {
  return arg1.toString() === arg2.toString()
})

hbs.registerHelper('ternary', function(arg1, arg2, arg3) {
  return arg1 ? arg2 : arg3
})

hbs.registerHelper('authorOptions', function(book, authors) {
  var out = ''

  authors.forEach(author => {
    if (book) {
      out =
        out +
        '<option value=' +
        author._id +
        (author._id.equals(book.author._id) ? ' selected>' : ' >')
      out = out + author.name + '</option>'
    }
  })

  return out
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
