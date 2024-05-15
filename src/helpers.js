const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function () {
  const args = Array.prototype.slice.call(arguments, 0, -1);
  return args.every(function (expression) {
    return args[0] === expression;
  });
});

Handlebars.registerHelper('or', function () {
  const args = Array.prototype.slice.call(arguments, 0, -1);
  return args.some(function (condicion) {
    return condicion === true;
  });
});

Handlebars.registerHelper('inc', function (index) {
  return index + 1;
});

module.exports = Handlebars;