LiScript = (function(){
	var slice = [].slice;
	var translations = {
		fn:function(argList,body){ 
			return '(function('+argList.join(',')+')'+'{return '+slice.call(arguments,1).map(tree_to_js).join(",")+'})';	
		},
		macro:function(argList,body){
			return '{type:"macro",fn:'+tree_to_js(["fn"].concat(argList,body))+'}';
		},
		if:function(cond,case_true,case_false){
			return '('+tree_to_js(cond)+'?'+tree_to_js(case_true)+':'+tree_to_js(case_false)+')';
		},
		str:function(){ 
			return '"'+slice.call(arguments).join(' ')+'"'; 
		},
		obj:function(){ 
			return '({'+slice.call(arguments).map(function(a){return a[0]+':'+tree_to_js(a[1])}).join(',')+'})'; 
		},
		arr:function(){ 
			return '(['+slice.call(arguments).map(tree_to_js).join(',')+'])'; 
		},
		set:function(obj,key,val){ 
			return '('+tree_to_js(obj)+'['+tree_to_js(key)+']='+tree_to_js(val)+')' 
		},
		get:function(obj,key){ 
			return '('+tree_to_js(obj)+'['+slice.call(arguments,1).map(tree_to_js).join('][')+'])'; 
		},
		while:function(cond,body){ 
			return '(function(){while('+tree_to_js(cond)+'){'+tree_to_js(body)+'}})()'; 
		},
		iter:function(obj,code){
			return '(function(obj_){for(var key in obj_){var val=obj_[key];'+tree_to_js(code)+'}})('+tree_to_js(obj)+')'
		},
		call:function(func,args){
			return '('+tree_to_js(func)+'('+tree_to_js(args)+'))';
		}
	};
	var operators = {def:'=',do:',',and:'&&',or:'||',eq:'===',diff:'!==',sum:'+',sub:'-',mul:'*',div:'/',mod:'%',less:'<',greater:'>',lesseq:'<=',greatereq:'>='};
	for (var op in operators) {(function(op){
		translations[op] = function(){ 
			return '('+slice.call(arguments).map(tree_to_js).join(operators[op])+')'; 
		};
	})(op)};
	var macros = {
		defmacro:function(name,args,body){ 
			return eval(tree_to_js(['LiScript.add_macro',['str',name],['fn',args,body]])), '"macro"';
		},
		defreader:function(open,close,head){
			return eval(tree_to_js(['LiScript.add_reader',open,close,head])), '"reader"';
		}
	};
	var add_macro = function(name,fn){ console.log("adding macro ",name,fn); macros[name]=fn; };
	var readers = {
		'(':{close:')'},
		'"':{close:'"',head:'str'},
		"[":{close:"]",head:'arr'}, 
		"{":{close:"}",head:'obj'}
	};
	var add_reader = function(open,close,head){ readers[open] = {close:close,head:head}; };
	var parse_tree = function(str){
		return (function parse_object(close){
			var obj=[], symbol="", reader; 
			function push_symbol(){ 
				if (symbol.length>0&&symbol!=" ") 
					obj.push(symbol); 
				symbol=''; 
			};
			function matchingReader(str){
				for (var reader in readers)
					if (str.slice(0,reader.length)===reader)
						return {open:reader,close:readers[reader].close,head:readers[reader].head};
			};
			for (; str.length>0; str=str.slice(1)){
				if (str[0]==close) break;
				else if ((reader = matchingReader(str)) && close!='"') 
					push_symbol(), 
					str=str.slice(reader.open.length), 
					obj.push((reader.head?[reader.head]:[]).concat(parse_object(reader.close)));
				else if (str[0]==' ') push_symbol();
				else symbol+=str[0];
			};
			push_symbol();
			return obj;
		})()[0];
	};
	var tree_to_string = function(ast){
		return typeof(ast) != "object" ? ast : "("+ast.map(tree_to_string).join(" ")+")";
	};
	var tree_to_js = function(ast){
		return typeof(ast)!='object' ? ast
			: macros[ast[0]] ? tree_to_js(macros[ast[0]].apply(this,ast.slice(1)))
			: translations[ast[0]] ? translations[ast[0]].apply(this,ast.slice(1))
			: '('+tree_to_js(ast[0])+'('+ast.slice(1).map(function(a){return tree_to_js(a);}).join(',')+'))';
	};
	var compile = function(text){ return tree_to_js(parse_tree("(do "+text.replace(/[\n\t]/g,"")+")",{})); };
	var evaluate = function(text){ eval(compile(text)); };
	return {eval:evaluate,compile:compile,add_macro:add_macro,add_reader:add_reader,parse_tree:parse_tree,tree_to_js:tree_to_js,tree_to_string:tree_to_string};
})();

