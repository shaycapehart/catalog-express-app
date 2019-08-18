const hbs = require('hbs')

hbs.registerHelper('is_equal', function(a, b) {
  return a === b
})
