
var path = require('path')
var RE = /:([p~\.htr])|:(g?s)\?([^\?]+)\?([^\?]*)\?|((?::e)+)/g

function extname(file, count) {
  var output = [ ]
  for (var i = 0; i < count; i ++) {
    var extname = path.extname(file)
    if (extname !== '') {
      output.unshift(extname.substr(1))
      file = file.substr(0, file.length - extname.length)
    }
  }
  return output.join('.')
}

var EXTRACT = /(?::[p~\.htre]|:g?s\?[^\?]+\?[^\?]*\?)*$/

function extract(input) {
  var mods  = ''
  var fname = input.replace(RE, function(a) {
    mods = a
    return ''
  })
  return { fname: fname, mods: mods }
}

module.exports = function fnamemodify(fname, mods, opts) {
  if (typeof mods !== 'string') {
    var result = extract(fname)
    opts  = mods
    fname = result.fname
    mods  = result.mods
  }
  opts = opts || { }
  return modify(fname, mods, opts)
}

function modify(fname, mods, options) {
  var cwd = options.cwd || process.cwd()
  var home = options.home || process.env['HOME']
  mods.replace(RE, function(a, b, c, pattern, replacement, extensions) {
    if (typeof replacement === 'string') {
      replacement = replacement.replace(/\\(.)/g, '$1')
    }
    if (typeof extensions === 'string') {
      fname = extname(fname, extensions.length / 2)
      return
    }
    var command = b || c
    switch (command) {
    case 'p':
      fname = path.resolve(cwd, fname)
      break
    case '.':
      fname = path.relative(cwd, fname)
      break
    case '~':
      fname = path.join('~', path.relative(home, fname))
      break
    case 'h':
      fname = path.dirname(fname)
      break
    case 't':
      fname = path.basename(fname)
      break
    case 'r':
      fname = fname.substr(0, fname.length - path.extname(fname).length)
      break
    case 's':
      fname = fname.replace(new RegExp(pattern), replacement)
      break
    case 'gs':
      fname = fname.replace(new RegExp(pattern, 'g'), replacement)
      break
    }
  })
  return fname
}


