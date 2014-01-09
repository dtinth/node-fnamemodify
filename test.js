
var modify = require('./')
var assert = require('assert')

var RE = /^\s\s(\S+)\s+(\S+)|when the file name is "([^"]+)"/
var base = '/home/mool/vim'
var file = null
var examples = require('fs').readFileSync(__dirname + '/examples.txt', 'utf-8')
      .split(/\r\n|\r|\n/)
      .map(function(x) { return x.match(RE) })
      .map(function(x) {
        if (!x) return
        if (x[1]) return { fname: file, mods: x[1], output: x[2], base: base }
        if (x[3]) file = x[3]
      })
      .filter(function(x) { return !!x })


examples.forEach(function(example) {
  it(example.input + ' -> ' + example.output, function() {
    var options = { cwd: example.base, home: '/home/mool' }
    assert.equal(modify(example.fname, example.mods, options), example.output)
  })
})

it('when only one string is supplied, extract the modifiers from filename', function() {
  assert.equal(modify('hello.txt.a.b.c.d.e:e:e:e'), 'c.d.e')
})


