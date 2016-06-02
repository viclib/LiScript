var liscript = require('./liscript.js')

var code =
  "(defmacro unless (cond T F) ['if' cond F T]) \
   (def yell (fn (a) (call a 'toUpperCase'))) \
   (def im_sad false) \
   (unless im_sad (yell 'what a great day!'))"

console.log(liscript.eval(code))