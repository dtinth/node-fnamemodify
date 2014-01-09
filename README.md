fnamemodify
===========

[fnamemodify()](http://vimdoc.sourceforge.net/htmldoc/eval.html#fnamemodify%28%29) from Vim for Node.

`fnamemodify({fname}, {mods})`
------------------------------

Modify file name {fname} according to {mods}.  {mods} is a
string of characters like it is used for file names on the
command line.  See [|filename-modifiers|](http://vimdoc.sourceforge.net/htmldoc/cmdline.html#filename-modifiers).

Example:

```javascript
var fnamemodify = require('fnamemodify') 

console.log(fnamemodify("main.c", ":p:h"))
//=> /Users/dttvb/Projects/fnamemodify
```


`fnamemodify.extract({fname}{mods})`
------------------------------------

Extract the {mods} from the {fname}.

Example:

```javascript
console.log(fnamemodify.extract('%:p:s?a?b?'))
//=> { fname: '%', mods: ':p:s?a?b?' }
```


