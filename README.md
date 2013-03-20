# LiScript
LiScript replaces JavaScript's syntax by lisp's powerful, awesomeness-filled s-expressions and macro system.

Differently from other languages that compile to JavaScript, it does not try to make it a completely different language - which is the root of many common problems such as messy generated code, overheads, painful compilation and hard debugging - all of which compensate for the theoricall benefits. Instead, as very thin layer - the whole implementation being less than 100 lines - it's generated code is be **fast, readable, beautiful, zero-overheaded, workeable and easy to debug**. In fact, you could send it to a JS developer and chances are he wouldn't even notice it's not handwritten.

In summary, it's a programming language that combines JavaScript's high level features, ridiculous cross-platformness and blazing speed with lisp's awesome, powerful syntax loved by hackers all around the world. For more info on it, I recommend reading Paul Graham's "Beating the Averages": http://www.paulgraham.com/avg.html

#### Installation
There's no installation guide yet (this will be updated soon). For now, just download LiScript, require the file on node.s or include it in a HTML script tag and call `LiScript.compile("(your source code)")`. This will return the compiled JavaScript. 

#### Tutorial / Using
Using LiScript is very easy. I'll expose the whole language with examples; if you find trouble understanding those, you could may on S-Expressions. Also, feel free to contact me!

The language is very easy. It has 4 forms:
String: `"this is a string"` -> `"this is a string"`
Array: `["this" "is" "an" "array"]` -> `["this","is","an","array"]`
Object: `{foo 5 bar 7}` -> `{foo:5, bar:7}`
Function calling: `(foo 1 2 3)` -> `foo(1,2,3)`

The language comes with those built-in forms (remember you can always change those to whatever you likes best!):
Math operators: `sum sub mul div mod` 
Example: `(sum 1 2 3 (mul 2 2))` -> 10

Boolean comparisons: `and or eq dif less greater lesseq greatereq`
`(eq 2 2)` -> true

Function definition: `fn`
`(fn (a b) (sum a b))` -> function(a,b){ return a+b; };

Assignment: `def`
`(def foo 5)` -> foo = 5

Member access: `get set`
```
(def my_obj {a 1 b 2 c 3})
(set my_obj "b" 4)
(console.log (get my_obj "b"))
```
-> 4

Looping: `while`
```
(def i 0)
(while (less i 4) (console.log i))
```
-> 0 1 2 3

Iteration: `iter` (works for arrays, objects and strings)
```(iter {a 1 b 2 c 3} (console.log [key val]))```
-> ["a",1] ["b",2] ["c",3]

Macro: `defmacro` (just return an array of strings representing the modified form)
`(defmacro swap (a b) [b a])`
`(swap "test" console.log)` -> `(console.log "test")` -> "test"

`(defmacro unless (cond T F) ["if" cond F T])`
`(unless (eq 2 3) "2 isnt 3!" "math broke!")` -> `(if (eq 2 3) "math broke!" "2 isnt 3!")` -> "2 isnt 3!"

Readers: `defreader`
Readers are a little different: you just define enclosing symbols and a header. It's really much easier for the main uses.
```
(defreader sqr < >) 
(defmacro sqr (a) (mul a a)) 
(console.log <3>)
```
->
9

That was easy compared to traditional reader-macros. For more advanced cases just edit the reader! It's the 25-lines-long function called "parse_tree" on the source. Providing no lisp-to-js language provide reader macros at all as of now, it's pure win.

Well, that's it! This is the whole language. This is a crude, out-of-the-box format. It's not ideal to use it like that. For example, defining macros without some facility to concatenate array could be a little worky. Also, you could certainly improve the loops - for example, what about a "for" macro that works as an array comprehension? The point is: on LiScript you can do whatever you want, the control of the language is on your hands. Syntax-sugars can be added to make it the way you want, but the core form is plain and solid. I'll be posting interesting macros/readers in a future, and I have plans for an IDE-integrated database of macros, which will make working with LiScript much easier.

#### Next steps: 
LiScript is just a first step towards a goal: increasing programmer productivity to new levels. There is still needs some work, but when it's stable, it'll not ever need to be updated (which also makes it very future proof). After this, efforts will be done towards the concretization of:

1. A centralized, cloud-based, taggeable, computer-analyzable, queriable database of functions and macros (NOT libraries!)

2. A powerful, shortcut-optimized, VIM inspired, web-based IDE to access those.

3. A huge community with a good communication system. (this is the hard part ;/)

If this all interests you, feel free to contact me!


