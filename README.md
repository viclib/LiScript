LiScript is a lisp dialect which translates to JavaScript. 
Implemented in less than 100 lines of code, it is a very simple, hackeable, thin layer that allows you to program for the web using the
proven, powerful syntax and features of lisp, while still producing ultra-fast, readable, beautiful and reusable JavaScript code.

Why?
Lately, many JS-Compilant languages have been created: CoffeeScript, ClojureScript, Coco, to name a few.
While the idea of fixing JavaScript is interesting, in pratice the community is slowly perceiving that problems such as bad performance, generated code ugliness, painful debugging and the splitting of the community overcompensate for the theorical benefits. I make a case that there's a single root for such problems: trying to make JavaScript what it is not! By implementing their own, arbitrary sets of features and semantics, those languages are just distancing themselves from a perfectly good language, resulting in a messy generated code which in turns leads to all those problems. 
While JS has tricky syntax, it's features are awesome. It's a ridiculously cross-platform, blazingly fast, ultra high level programming language. What else do you want? With that in mind, LiScript restricts itself to solve the syntatical issues of JavaScript and nothing else. It does so by bringing the powerful, historically proven lisp syntax as a very thin layer that maps to JS. This allows LiScript to be:
1. Very easy to debug.
2. Very readable.
3. Very fast.
4. Shareable & Adoptable - at any moment you can stop using LiScript and just continue your work with the compiled code.
5. Future-proof - the syntax is solid and won't ever change. The languague is improved by creating more functions and macros, not by changing it's semantics.
6. Still fully-featured by borrowing the awesome features of JavaScript and combining them with lisp's powerful syntax and macro system.
In summary, LiScript is **actually** just JavaScript - except it has macros and is written with s-expressions. 
For anyone that could benefit from the power that macros, using LiScript should provide great productivity benefits with no adverse effects.

Installation
There's no installation process yet, sorry. Just download LiScript, require the file on node.s or include it in an HTML script tag and call `eval(LiScript.compile("(your source code)"))`. 

Using
(TODO)

Next steps: 
LiScript is just a first step towards a goal: increasing programmer productivity to new levels.
The first step is solidifying the language to a point it won't ever need to change anymore. 
After this, the language will improve by other means, as efforts will be done towards the concretization of:
1. A centralized, cloud-based, taggeable, computer-analyzable, queriable database of functions and macros (NOT libraries!)
2. A powerful, shortcut-optimized, VIM inspired, web-based IDE to access those.
3. A huge community with a good communication system.
If this all interests you, feel free to contact me!
