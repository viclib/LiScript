# LiScript
LiScript replaces JavaScript's syntax by lisp's powerful S-Expressions and macro system.

Differently from other languages that compile to JavaScript, it does not try to make it a completely different language - which is the root of many common problems such as messy generated code, overheads, painful compilation and hard debugging - all of which compensate for the theoricall benefits. Instead, as very thin layer - the whole implementation being less than 100 lines - it's generated code is **fast, readable, beautiful, zero-overheaded, workeable and easy to debug**.

In summary, it's a programming language that combines JavaScript's high level features, ridiculous cross-platformness and blazing speed with lisp's awesome, powerful syntax loved by hackers all around the world. For more info on it, I recommend reading Paul Graham's "Beating the Averages": http://www.paulgraham.com/avg.html

#### Installation
There's no installation guide yet (this will be updated soon). For now, just download LiScript, require the file on node.s or include it in a HTML script tag and call `LiScript.compile("(your source code)")`. This will return the compiled JavaScript. 

**You can also try it online: http://evanhahn.github.com/Try-LiScript/**

#### Tutorial / Using
Using LiScript is very easy. I'll expose the whole language with examples. If you find trouble understanding those, you could may on S-Expressions. Looking at the source could be a good idea. Also, feel free to contact me! Notice  that this is the crude form of the language - to actually use it you'll certainly load with macros which will calibre the syntax to fill your needs. The language core is very easy. It has 4 basic forms, which map directly to their JavaScript counterparts:
* String: `"this is a string"`
* Array: `["this" "is" "an" "array"]`
* Object: `{foo 5 bar 7}`
* Function/macro calling: `(func 1 2 3)`

It also comes with the following functions out-of-the-box:

* Math operators: `sum sub mul div mod`
```lisp
(sum 1 2 3 (mul 2 2)) 
Output: 10
```

* Boolean comparisons: `and or eq dif less greater lesseq greatereq`
```lisp
(eq 2 2)
Output: true
```

* Assignment: `def`
```lisp
(def foo 5)
This is the same as "foo = 5" in JavaScript.
```

* Conditional: `if`
```lisp
(def rnd (Math.random))
(if (less rnd 0.05)
	(console.log "You won :D")
	(console.log "Bad luck, try again."))
Output: ?
```

* Function definition: `fn`
```lisp
(fn (a b) (sum a b))
Output: function(a,b){ return a+b; };
```

* Member access: `get set`
```lisp
(def my_obj {a 1 b 2 c 3})
(set my_obj "b" 4)
(console.log (get my_obj "b"))
Output: 4
```

* Loop: `while`
```lisp
(def i 0)
(while (less i 4) 
	(console.log i)
	(def i (sum i 1)))
Output: 0 1 2 3
```

* Iteration: `iter`
```lisp
(iter {a 1 b 2 c 3} 
		(console.log [key val]))
Output: ["a",1] ["b",2] ["c",3]
```

* Macro: `defmacro`
Macros work by modifying the code **before** it's compiled to JavaScript. and it couldn't be easier: just return an array of strings representing the new form of your code! Let's make a macro that inverts an expression:
```lisp
(defmacro swap (a b) [b a])
(swap "test" console.log)
This becomes `(console.log "test")` which outputs `"test"`!
```
Another example:
```lisp
(defmacro unless (cond T F) ["if" cond F T]) 
(def yell (fn (a) (call a "toUpperCase"))) 
(def im_sad false)
(unless im_sad (yell "What a great day!"))
Output: "WHAT A GREAT DAY!"
```
This is an interesting fact about Lisp: clever user of macros can make the language sound just like speech. There's no syntax: just a bunch of phrases that tell your program what to do. Sometimes it's too abstracted away you don't even notice you are programming: `(make me a sandwitch in 2 hours)`, one could perfectly make this work. Lisp code from a great hacker is a piece of art. But maybe you're the type that likes terse syntax and symbols? No problems...

* Readers: `defreader`
Readers are similar to macros, except they work for special forms (not parenthesis). Readers on LiScript are a little different: you just define a name and enclosing symbols. You can, then, further process it with normal macros. For example, lets define the form < a > to return the square of a:
```lisp
(defreader square < >) 
(defmacro square (a) (mul a a)) 
(console.log <3>)
The form above becomes (console.log (square 3)),
which becomes (console.log (mul 3 3)),
which becomes (console.log 9),
which outputs 9. 
```
That is much simpler than traditional reader macros! For more advanced cases you can just edit the parser itself: it's a 25-lines-long function on the source, so it shouldn't be hard. Given how no other lisp-to-js language implement reader macros at all, it's pure win.

Well, that's it! This is the whole language. Again, the out-of-the-box package must be temperated with macros. For example, you could certainly improve the loops - a "for" macro could work as CoffeeScript's array comprehension. A "let" macro might prove handy, and a facility to concatenate arrays would make defining new macros easier. The point is: LiScript allows you to do whatever you want; you control the language!

#### Next steps: 
LiScript is just a first step towards a goal: increasing programmer productivity to new levels. There is still needs some work - for example, "var x=3" is not an expression in JavaScript. Because of this, all variables are defined on the global scope. I'm thinking in a solution for this. Anyway, the idea is reaching a point of stability where the language doesn't need to be ever changed anymore, making it future-proof. At this point, efforts must be done towards the concretization of:

1. A centralized, cloud-based, taggeable, computer-analyzable, queriable database of functions and macros (NOT libraries!)

2. A powerful, shortcut-optimized, VIM inspired, web-based IDE to access those.

3. A huge community with a good communication system. (this is the hard part ;/)

If this all interests you, feel free to contact me!
