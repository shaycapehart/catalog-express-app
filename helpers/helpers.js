const hbs = require('hbs')

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
    } else {
      out =
        out + '<option value=' + author._id + '>' + author.name + '</option>'
    }
  })

  return out
})
