
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$groupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$zip5 = _elm_lang$core$List$map5(
	F5(
		function (v0, v1, v2, v3, v4) {
			return {ctor: '_Tuple5', _0: v0, _1: v1, _2: v2, _3: v3, _4: v4};
		}));
var _elm_community$list_extra$List_Extra$zip4 = _elm_lang$core$List$map4(
	F4(
		function (v0, v1, v2, v3) {
			return {ctor: '_Tuple4', _0: v0, _1: v1, _2: v2, _3: v3};
		}));
var _elm_community$list_extra$List_Extra$zip3 = _elm_lang$core$List$map3(
	F3(
		function (v0, v1, v2) {
			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
		}));
var _elm_community$list_extra$List_Extra$zip = _elm_lang$core$List$map2(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _elm_community$list_extra$List_Extra$isPrefixOf = F2(
	function (prefix, xs) {
		var _p0 = {ctor: '_Tuple2', _0: prefix, _1: xs};
		if (_p0._0.ctor === '[]') {
			return true;
		} else {
			if (_p0._1.ctor === '[]') {
				return false;
			} else {
				return _elm_lang$core$Native_Utils.eq(_p0._0._0, _p0._1._0) && A2(_elm_community$list_extra$List_Extra$isPrefixOf, _p0._0._1, _p0._1._1);
			}
		}
	});
var _elm_community$list_extra$List_Extra$isSuffixOf = F2(
	function (suffix, xs) {
		return A2(
			_elm_community$list_extra$List_Extra$isPrefixOf,
			_elm_lang$core$List$reverse(suffix),
			_elm_lang$core$List$reverse(xs));
	});
var _elm_community$list_extra$List_Extra$selectSplit = function (xs) {
	var _p1 = xs;
	if (_p1.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _p4,
				_2: _p5
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: _p4, _1: _p3._0},
						_1: _p3._1,
						_2: _p3._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p5))
		};
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _p9, _1: _p10},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple2',
						_0: _p8._0,
						_1: {ctor: '::', _0: _p9, _1: _p8._1}
					};
				},
				_elm_community$list_extra$List_Extra$select(_p10))
		};
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p11 = list;
		if (_p11.ctor === '::') {
			var _p12 = _p11._0;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: e, _1: _p12},
				_1: {ctor: '::', _0: _p12, _1: _p11._1}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$isInfixOf = F2(
	function (infix, xs) {
		return A2(
			_elm_lang$core$List$any,
			_elm_community$list_extra$List_Extra$isPrefixOf(infix),
			_elm_community$list_extra$List_Extra$tails(xs));
	});
var _elm_community$list_extra$List_Extra$inits = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			return {
				ctor: '::',
				_0: {ctor: '[]'},
				_1: A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(e),
					acc)
			};
		}),
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (cmp, xs_) {
		var _p13 = xs_;
		if (_p13.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p13._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p13._0,
						_1: {ctor: '[]'}
					},
					_1: {ctor: '[]'}
				};
			} else {
				var _p15 = _p13._0;
				var _p14 = A2(_elm_community$list_extra$List_Extra$groupWhileTransitively, cmp, _p13._1);
				if (_p14.ctor === '::') {
					return A2(cmp, _p15, _p13._1._0) ? {
						ctor: '::',
						_0: {ctor: '::', _0: _p15, _1: _p14._0},
						_1: _p14._1
					} : {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: _p15,
							_1: {ctor: '[]'}
						},
						_1: _p14
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$stripPrefix = F2(
	function (prefix, xs) {
		var step = F2(
			function (e, m) {
				var _p16 = m;
				if (_p16.ctor === 'Nothing') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_p16._0.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Native_Utils.eq(e, _p16._0._0) ? _elm_lang$core$Maybe$Just(_p16._0._1) : _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		return A3(
			_elm_lang$core$List$foldl,
			step,
			_elm_lang$core$Maybe$Just(xs),
			prefix);
	});
var _elm_community$list_extra$List_Extra$dropWhileRight = function (p) {
	return A2(
		_elm_lang$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? {ctor: '[]'} : {ctor: '::', _0: x, _1: xs};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p17) {
			var _p18 = _p17;
			var _p19 = _p18._0;
			return (p(x) && _p18._1) ? {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: x, _1: _p19},
				_1: true
			} : {ctor: '_Tuple2', _0: _p19, _1: false};
		});
	return function (_p20) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: true
				},
				_p20));
	};
};
var _elm_community$list_extra$List_Extra$splitAt = F2(
	function (n, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List$take, n, xs),
			_1: A2(_elm_lang$core$List$drop, n, xs)
		};
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying_ = F3(
	function (listOflengths, list, accu) {
		groupsOfVarying_:
		while (true) {
			var _p21 = {ctor: '_Tuple2', _0: listOflengths, _1: list};
			if (((_p21.ctor === '_Tuple2') && (_p21._0.ctor === '::')) && (_p21._1.ctor === '::')) {
				var _p22 = A2(_elm_community$list_extra$List_Extra$splitAt, _p21._0._0, list);
				var head = _p22._0;
				var tail = _p22._1;
				var _v11 = _p21._0._1,
					_v12 = tail,
					_v13 = {ctor: '::', _0: head, _1: accu};
				listOflengths = _v11;
				list = _v12;
				accu = _v13;
				continue groupsOfVarying_;
			} else {
				return _elm_lang$core$List$reverse(accu);
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying = F2(
	function (listOflengths, list) {
		return A3(
			_elm_community$list_extra$List_Extra$groupsOfVarying_,
			listOflengths,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p23 = f(seed);
		if (_p23.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _p23._0._0,
				_1: A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p23._0._1)
			};
		}
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs_) {
		var _p24 = xs_;
		if (_p24.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p24._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: _p24._0,
					_1: {ctor: '[]'}
				};
			} else {
				var _p25 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p24._1);
				if (_p25.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, _p24._0, _p25._0),
						_1: _p25
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs_) {
		var _p26 = xs_;
		if (_p26.ctor === '[]') {
			return {
				ctor: '::',
				_0: acc,
				_1: {ctor: '[]'}
			};
		} else {
			var _p27 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p26._1);
			if (_p27.ctor === '::') {
				return {
					ctor: '::',
					_0: A2(f, _p26._0, _p27._0),
					_1: _p27
				};
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs_) {
		var _p28 = xs_;
		if (_p28.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p28._0, _p28._1);
		}
	});
var _elm_community$list_extra$List_Extra$indexedFoldr = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p29) {
				var _p30 = _p29;
				var _p31 = _p30._0;
				return {
					ctor: '_Tuple2',
					_0: _p31 - 1,
					_1: A3(func, _p31, x, _p30._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$length(list) - 1,
					_1: acc
				},
				list));
	});
var _elm_community$list_extra$List_Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p32) {
				var _p33 = _p32;
				var _p34 = _p33._0;
				return {
					ctor: '_Tuple2',
					_0: _p34 + 1,
					_1: A3(func, _p34, x, _p33._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				step,
				{ctor: '_Tuple2', _0: 0, _1: acc},
				list));
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p35 = m;
						if (_p35.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p35._0);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldr, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$foldl1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p36 = m;
						if (_p36.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p36._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (l1, l2, acc) {
		interweaveHelp:
		while (true) {
			var _p37 = {ctor: '_Tuple2', _0: l1, _1: l2};
			_v24_1:
			do {
				if (_p37._0.ctor === '::') {
					if (_p37._1.ctor === '::') {
						var _v25 = _p37._0._1,
							_v26 = _p37._1._1,
							_v27 = A2(
							_elm_lang$core$Basics_ops['++'],
							acc,
							{
								ctor: '::',
								_0: _p37._0._0,
								_1: {
									ctor: '::',
									_0: _p37._1._0,
									_1: {ctor: '[]'}
								}
							});
						l1 = _v25;
						l2 = _v26;
						acc = _v27;
						continue interweaveHelp;
					} else {
						break _v24_1;
					}
				} else {
					if (_p37._1.ctor === '[]') {
						break _v24_1;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._1);
					}
				}
			} while(false);
			return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._0);
		}
	});
var _elm_community$list_extra$List_Extra$interweave = F2(
	function (l1, l2) {
		return A3(
			_elm_community$list_extra$List_Extra$interweaveHelp,
			l1,
			l2,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$permutations = function (xs_) {
	var _p38 = xs_;
	if (_p38.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		var f = function (_p39) {
			var _p40 = _p39;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(_p40._0),
				_elm_community$list_extra$List_Extra$permutations(_p40._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p38));
	}
};
var _elm_community$list_extra$List_Extra$isPermutationOf = F2(
	function (permut, xs) {
		return A2(
			_elm_lang$core$List$member,
			permut,
			_elm_community$list_extra$List_Extra$permutations(xs));
	});
var _elm_community$list_extra$List_Extra$subsequencesNonEmpty = function (xs) {
	var _p41 = xs;
	if (_p41.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p42 = _p41._0;
		var f = F2(
			function (ys, r) {
				return {
					ctor: '::',
					_0: ys,
					_1: {
						ctor: '::',
						_0: {ctor: '::', _0: _p42, _1: ys},
						_1: r
					}
				};
			});
		return {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _p42,
				_1: {ctor: '[]'}
			},
			_1: A3(
				_elm_lang$core$List$foldr,
				f,
				{ctor: '[]'},
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p41._1))
		};
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return {
		ctor: '::',
		_0: {ctor: '[]'},
		_1: _elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs)
	};
};
var _elm_community$list_extra$List_Extra$isSubsequenceOf = F2(
	function (subseq, xs) {
		return A2(
			_elm_lang$core$List$member,
			subseq,
			_elm_community$list_extra$List_Extra$subsequences(xs));
	});
var _elm_community$list_extra$List_Extra$transpose = function (ll) {
	transpose:
	while (true) {
		var _p43 = ll;
		if (_p43.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p43._0.ctor === '[]') {
				var _v32 = _p43._1;
				ll = _v32;
				continue transpose;
			} else {
				var _p44 = _p43._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p44);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p44);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p43._0._0, _1: heads},
					_1: _elm_community$list_extra$List_Extra$transpose(
						{ctor: '::', _0: _p43._0._1, _1: tails})
				};
			}
		}
	}
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p45) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p45));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p46) {
				return !pred(_p46);
			},
			list);
	});
var _elm_community$list_extra$List_Extra$removeAt = F2(
	function (index, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return l;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p47 = tail;
			if (_p47.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p47._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_p49, _p48) {
				var _p50 = _p49;
				var _p51 = _p48;
				var result = A2(pred, _p50._0, _p51._0);
				var _p52 = result;
				if (_p52.ctor === 'EQ') {
					return A2(_elm_lang$core$Basics$compare, _p50._1, _p51._1);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, a) {
					return {ctor: '_Tuple2', _0: a, _1: i};
				}),
			list);
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(_elm_lang$core$List$sortWith, predWithIndex, listWithIndex));
	});
var _elm_community$list_extra$List_Extra$setAt = F3(
	function (index, value, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p53 = tail;
			if (_p53.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$List$append,
						head,
						{ctor: '::', _0: value, _1: _p53._0}));
			}
		}
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p54 = xs;
		if (_p54.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p56 = _p54._1;
			var _p55 = _p54._0;
			return _elm_lang$core$Native_Utils.eq(x, _p55) ? _p56 : {
				ctor: '::',
				_0: _p55,
				_1: A2(_elm_community$list_extra$List_Extra$remove, x, _p56)
			};
		}
	});
var _elm_community$list_extra$List_Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var _elm_community$list_extra$List_Extra$updateAt = F3(
	function (index, update, list) {
		return ((_elm_lang$core$Native_Utils.cmp(index, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(
			index,
			_elm_lang$core$List$length(list)) > -1)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A3(
				_elm_community$list_extra$List_Extra$updateIfIndex,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(index),
				update,
				list));
	});
var _elm_community$list_extra$List_Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var _elm_community$list_extra$List_Extra$replaceIf = F3(
	function (predicate, replacement, list) {
		return A3(
			_elm_community$list_extra$List_Extra$updateIf,
			predicate,
			_elm_lang$core$Basics$always(replacement),
			list);
	});
var _elm_community$list_extra$List_Extra$findIndices = function (p) {
	return function (_p57) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$filter,
				function (_p58) {
					var _p59 = _p58;
					return p(_p59._1);
				},
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p57)));
	};
};
var _elm_community$list_extra$List_Extra$findIndex = function (p) {
	return function (_p60) {
		return _elm_lang$core$List$head(
			A2(_elm_community$list_extra$List_Extra$findIndices, p, _p60));
	};
};
var _elm_community$list_extra$List_Extra$splitWhen = F2(
	function (predicate, list) {
		return A2(
			_elm_lang$core$Maybe$map,
			function (i) {
				return A2(_elm_community$list_extra$List_Extra$splitAt, i, list);
			},
			A2(_elm_community$list_extra$List_Extra$findIndex, predicate, list));
	});
var _elm_community$list_extra$List_Extra$elemIndices = function (x) {
	return _elm_community$list_extra$List_Extra$findIndices(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$elemIndex = function (x) {
	return _elm_community$list_extra$List_Extra$findIndex(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			var _p61 = list;
			if (_p61.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p62 = _p61._0;
				if (predicate(_p62)) {
					return _elm_lang$core$Maybe$Just(_p62);
				} else {
					var _v41 = predicate,
						_v42 = _p61._1;
					predicate = _v41;
					list = _v42;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p63) {
		return !A2(_elm_lang$core$List$member, x, _p63);
	};
};
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$List$concatMap;
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return {
							ctor: '::',
							_0: A2(f, a, b),
							_1: {ctor: '[]'}
						};
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return {
									ctor: '::',
									_0: A3(f, a, b, c),
									_1: {ctor: '[]'}
								};
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									function (d) {
										return {
											ctor: '::',
											_0: A4(f, a, b, c, d),
											_1: {ctor: '[]'}
										};
									},
									ld);
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$andMap = F2(
	function (l, fl) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			fl,
			l);
	});
var _elm_community$list_extra$List_Extra$uniqueHelp = F3(
	function (f, existing, remaining) {
		uniqueHelp:
		while (true) {
			var _p64 = remaining;
			if (_p64.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p66 = _p64._1;
				var _p65 = _p64._0;
				var computedFirst = f(_p65);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v44 = f,
						_v45 = existing,
						_v46 = _p66;
					f = _v44;
					existing = _v45;
					remaining = _v46;
					continue uniqueHelp;
				} else {
					return {
						ctor: '::',
						_0: _p65,
						_1: A3(
							_elm_community$list_extra$List_Extra$uniqueHelp,
							f,
							A2(_elm_lang$core$Set$insert, computedFirst, existing),
							_p66)
					};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A3(_elm_community$list_extra$List_Extra$uniqueHelp, f, _elm_lang$core$Set$empty, list);
	});
var _elm_community$list_extra$List_Extra$allDifferentBy = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(list),
			_elm_lang$core$List$length(
				A2(_elm_community$list_extra$List_Extra$uniqueBy, f, list)));
	});
var _elm_community$list_extra$List_Extra$allDifferent = function (list) {
	return A2(_elm_community$list_extra$List_Extra$allDifferentBy, _elm_lang$core$Basics$identity, list);
};
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A3(_elm_community$list_extra$List_Extra$uniqueHelp, _elm_lang$core$Basics$identity, _elm_lang$core$Set$empty, list);
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p67 = list;
			if (_p67.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (predicate(_p67._0)) {
					var _v48 = predicate,
						_v49 = _p67._1;
					predicate = _v48;
					list = _v49;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				var _p68 = list;
				if (_p68.ctor === '[]') {
					return _elm_lang$core$List$reverse(memo);
				} else {
					var _p69 = _p68._0;
					if (predicate(_p69)) {
						var _v51 = {ctor: '::', _0: _p69, _1: memo},
							_v52 = _p68._1;
						memo = _v51;
						list = _v52;
						continue takeWhileMemo;
					} else {
						return _elm_lang$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$span = F2(
	function (p, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_community$list_extra$List_Extra$takeWhile, p, xs),
			_1: A2(_elm_community$list_extra$List_Extra$dropWhile, p, xs)
		};
	});
var _elm_community$list_extra$List_Extra$break = function (p) {
	return _elm_community$list_extra$List_Extra$span(
		function (_p70) {
			return !p(_p70);
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs_) {
		var _p71 = xs_;
		if (_p71.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p73 = _p71._0;
			var _p72 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p73),
				_p71._1);
			var ys = _p72._0;
			var zs = _p72._1;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: _p73, _1: ys},
				_1: A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs)
			};
		}
	});
var _elm_community$list_extra$List_Extra$group = _elm_community$list_extra$List_Extra$groupWhile(
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		}));
var _elm_community$list_extra$List_Extra$minimumBy = F2(
	function (f, ls) {
		var minBy = F2(
			function (x, _p74) {
				var _p75 = _p74;
				var _p76 = _p75._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p76) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p75._0, _1: _p76};
			});
		var _p77 = ls;
		if (_p77.ctor === '::') {
			if (_p77._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p77._0);
			} else {
				var _p78 = _p77._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p78,
								_1: f(_p78)
							},
							_p77._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p79) {
				var _p80 = _p79;
				var _p81 = _p80._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p81) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p80._0, _1: _p81};
			});
		var _p82 = ls;
		if (_p82.ctor === '::') {
			if (_p82._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p82._0);
			} else {
				var _p83 = _p82._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p83,
								_1: f(_p83)
							},
							_p82._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p84 = xs;
	if (_p84.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p84._0, _1: _p84._1});
	}
};
var _elm_community$list_extra$List_Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(index1, index2)) {
				return _elm_lang$core$Maybe$Just(l);
			} else {
				if (_elm_lang$core$Native_Utils.cmp(index1, index2) > 0) {
					var _v59 = index2,
						_v60 = index1,
						_v61 = l;
					index1 = _v59;
					index2 = _v60;
					l = _v61;
					continue swapAt;
				} else {
					if (_elm_lang$core$Native_Utils.cmp(index1, 0) < 0) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						var _p85 = A2(_elm_community$list_extra$List_Extra$splitAt, index1, l);
						var part1 = _p85._0;
						var tail1 = _p85._1;
						var _p86 = A2(_elm_community$list_extra$List_Extra$splitAt, index2 - index1, tail1);
						var head2 = _p86._0;
						var tail2 = _p86._1;
						return A3(
							_elm_lang$core$Maybe$map2,
							F2(
								function (_p88, _p87) {
									var _p89 = _p88;
									var _p90 = _p87;
									return _elm_lang$core$List$concat(
										{
											ctor: '::',
											_0: part1,
											_1: {
												ctor: '::',
												_0: {ctor: '::', _0: _p90._0, _1: _p89._1},
												_1: {
													ctor: '::',
													_0: {ctor: '::', _0: _p89._0, _1: _p90._1},
													_1: {ctor: '[]'}
												}
											}
										});
								}),
							_elm_community$list_extra$List_Extra$uncons(head2),
							_elm_community$list_extra$List_Extra$uncons(tail2));
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p91 = f(x);
		if (_p91.ctor === 'Just') {
			return {
				ctor: '::',
				_0: x,
				_1: A2(_elm_community$list_extra$List_Extra$iterate, f, _p91._0)
			};
		} else {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
		}
	});
var _elm_community$list_extra$List_Extra$getAt = F2(
	function (idx, xs) {
		return (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, idx, xs));
	});
var _elm_community$list_extra$List_Extra_ops = _elm_community$list_extra$List_Extra_ops || {};
_elm_community$list_extra$List_Extra_ops['!!'] = _elm_lang$core$Basics$flip(_elm_community$list_extra$List_Extra$getAt);
var _elm_community$list_extra$List_Extra$init = function () {
	var maybe = F2(
		function (d, f) {
			return function (_p92) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					d,
					A2(_elm_lang$core$Maybe$map, f, _p92));
			};
		});
	return A2(
		_elm_lang$core$List$foldr,
		function (x) {
			return function (_p93) {
				return _elm_lang$core$Maybe$Just(
					A3(
						maybe,
						{ctor: '[]'},
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(x),
						_p93));
			};
		},
		_elm_lang$core$Maybe$Nothing);
}();
var _elm_community$list_extra$List_Extra$last = _elm_community$list_extra$List_Extra$foldl1(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));

var _elm_lang$core$Color$fmod = F2(
	function (f, n) {
		var integer = _elm_lang$core$Basics$floor(f);
		return (_elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics_ops['%'], integer, n)) + f) - _elm_lang$core$Basics$toFloat(integer);
	});
var _elm_lang$core$Color$rgbToHsl = F3(
	function (red, green, blue) {
		var b = _elm_lang$core$Basics$toFloat(blue) / 255;
		var g = _elm_lang$core$Basics$toFloat(green) / 255;
		var r = _elm_lang$core$Basics$toFloat(red) / 255;
		var cMax = A2(
			_elm_lang$core$Basics$max,
			A2(_elm_lang$core$Basics$max, r, g),
			b);
		var cMin = A2(
			_elm_lang$core$Basics$min,
			A2(_elm_lang$core$Basics$min, r, g),
			b);
		var c = cMax - cMin;
		var lightness = (cMax + cMin) / 2;
		var saturation = _elm_lang$core$Native_Utils.eq(lightness, 0) ? 0 : (c / (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)));
		var hue = _elm_lang$core$Basics$degrees(60) * (_elm_lang$core$Native_Utils.eq(cMax, r) ? A2(_elm_lang$core$Color$fmod, (g - b) / c, 6) : (_elm_lang$core$Native_Utils.eq(cMax, g) ? (((b - r) / c) + 2) : (((r - g) / c) + 4)));
		return {ctor: '_Tuple3', _0: hue, _1: saturation, _2: lightness};
	});
var _elm_lang$core$Color$hslToRgb = F3(
	function (hue, saturation, lightness) {
		var normHue = hue / _elm_lang$core$Basics$degrees(60);
		var chroma = (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)) * saturation;
		var x = chroma * (1 - _elm_lang$core$Basics$abs(
			A2(_elm_lang$core$Color$fmod, normHue, 2) - 1));
		var _p0 = (_elm_lang$core$Native_Utils.cmp(normHue, 0) < 0) ? {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 1) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: x, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 2) < 0) ? {ctor: '_Tuple3', _0: x, _1: chroma, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 3) < 0) ? {ctor: '_Tuple3', _0: 0, _1: chroma, _2: x} : ((_elm_lang$core$Native_Utils.cmp(normHue, 4) < 0) ? {ctor: '_Tuple3', _0: 0, _1: x, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 5) < 0) ? {ctor: '_Tuple3', _0: x, _1: 0, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 6) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: 0, _2: x} : {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0}))))));
		var r = _p0._0;
		var g = _p0._1;
		var b = _p0._2;
		var m = lightness - (chroma / 2);
		return {ctor: '_Tuple3', _0: r + m, _1: g + m, _2: b + m};
	});
var _elm_lang$core$Color$toRgb = function (color) {
	var _p1 = color;
	if (_p1.ctor === 'RGBA') {
		return {red: _p1._0, green: _p1._1, blue: _p1._2, alpha: _p1._3};
	} else {
		var _p2 = A3(_elm_lang$core$Color$hslToRgb, _p1._0, _p1._1, _p1._2);
		var r = _p2._0;
		var g = _p2._1;
		var b = _p2._2;
		return {
			red: _elm_lang$core$Basics$round(255 * r),
			green: _elm_lang$core$Basics$round(255 * g),
			blue: _elm_lang$core$Basics$round(255 * b),
			alpha: _p1._3
		};
	}
};
var _elm_lang$core$Color$toHsl = function (color) {
	var _p3 = color;
	if (_p3.ctor === 'HSLA') {
		return {hue: _p3._0, saturation: _p3._1, lightness: _p3._2, alpha: _p3._3};
	} else {
		var _p4 = A3(_elm_lang$core$Color$rgbToHsl, _p3._0, _p3._1, _p3._2);
		var h = _p4._0;
		var s = _p4._1;
		var l = _p4._2;
		return {hue: h, saturation: s, lightness: l, alpha: _p3._3};
	}
};
var _elm_lang$core$Color$HSLA = F4(
	function (a, b, c, d) {
		return {ctor: 'HSLA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$hsla = F4(
	function (hue, saturation, lightness, alpha) {
		return A4(
			_elm_lang$core$Color$HSLA,
			hue - _elm_lang$core$Basics$turns(
				_elm_lang$core$Basics$toFloat(
					_elm_lang$core$Basics$floor(hue / (2 * _elm_lang$core$Basics$pi)))),
			saturation,
			lightness,
			alpha);
	});
var _elm_lang$core$Color$hsl = F3(
	function (hue, saturation, lightness) {
		return A4(_elm_lang$core$Color$hsla, hue, saturation, lightness, 1);
	});
var _elm_lang$core$Color$complement = function (color) {
	var _p5 = color;
	if (_p5.ctor === 'HSLA') {
		return A4(
			_elm_lang$core$Color$hsla,
			_p5._0 + _elm_lang$core$Basics$degrees(180),
			_p5._1,
			_p5._2,
			_p5._3);
	} else {
		var _p6 = A3(_elm_lang$core$Color$rgbToHsl, _p5._0, _p5._1, _p5._2);
		var h = _p6._0;
		var s = _p6._1;
		var l = _p6._2;
		return A4(
			_elm_lang$core$Color$hsla,
			h + _elm_lang$core$Basics$degrees(180),
			s,
			l,
			_p5._3);
	}
};
var _elm_lang$core$Color$grayscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$greyscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$RGBA = F4(
	function (a, b, c, d) {
		return {ctor: 'RGBA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$rgba = _elm_lang$core$Color$RGBA;
var _elm_lang$core$Color$rgb = F3(
	function (r, g, b) {
		return A4(_elm_lang$core$Color$RGBA, r, g, b, 1);
	});
var _elm_lang$core$Color$lightRed = A4(_elm_lang$core$Color$RGBA, 239, 41, 41, 1);
var _elm_lang$core$Color$red = A4(_elm_lang$core$Color$RGBA, 204, 0, 0, 1);
var _elm_lang$core$Color$darkRed = A4(_elm_lang$core$Color$RGBA, 164, 0, 0, 1);
var _elm_lang$core$Color$lightOrange = A4(_elm_lang$core$Color$RGBA, 252, 175, 62, 1);
var _elm_lang$core$Color$orange = A4(_elm_lang$core$Color$RGBA, 245, 121, 0, 1);
var _elm_lang$core$Color$darkOrange = A4(_elm_lang$core$Color$RGBA, 206, 92, 0, 1);
var _elm_lang$core$Color$lightYellow = A4(_elm_lang$core$Color$RGBA, 255, 233, 79, 1);
var _elm_lang$core$Color$yellow = A4(_elm_lang$core$Color$RGBA, 237, 212, 0, 1);
var _elm_lang$core$Color$darkYellow = A4(_elm_lang$core$Color$RGBA, 196, 160, 0, 1);
var _elm_lang$core$Color$lightGreen = A4(_elm_lang$core$Color$RGBA, 138, 226, 52, 1);
var _elm_lang$core$Color$green = A4(_elm_lang$core$Color$RGBA, 115, 210, 22, 1);
var _elm_lang$core$Color$darkGreen = A4(_elm_lang$core$Color$RGBA, 78, 154, 6, 1);
var _elm_lang$core$Color$lightBlue = A4(_elm_lang$core$Color$RGBA, 114, 159, 207, 1);
var _elm_lang$core$Color$blue = A4(_elm_lang$core$Color$RGBA, 52, 101, 164, 1);
var _elm_lang$core$Color$darkBlue = A4(_elm_lang$core$Color$RGBA, 32, 74, 135, 1);
var _elm_lang$core$Color$lightPurple = A4(_elm_lang$core$Color$RGBA, 173, 127, 168, 1);
var _elm_lang$core$Color$purple = A4(_elm_lang$core$Color$RGBA, 117, 80, 123, 1);
var _elm_lang$core$Color$darkPurple = A4(_elm_lang$core$Color$RGBA, 92, 53, 102, 1);
var _elm_lang$core$Color$lightBrown = A4(_elm_lang$core$Color$RGBA, 233, 185, 110, 1);
var _elm_lang$core$Color$brown = A4(_elm_lang$core$Color$RGBA, 193, 125, 17, 1);
var _elm_lang$core$Color$darkBrown = A4(_elm_lang$core$Color$RGBA, 143, 89, 2, 1);
var _elm_lang$core$Color$black = A4(_elm_lang$core$Color$RGBA, 0, 0, 0, 1);
var _elm_lang$core$Color$white = A4(_elm_lang$core$Color$RGBA, 255, 255, 255, 1);
var _elm_lang$core$Color$lightGrey = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$grey = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGrey = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightGray = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$gray = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGray = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightCharcoal = A4(_elm_lang$core$Color$RGBA, 136, 138, 133, 1);
var _elm_lang$core$Color$charcoal = A4(_elm_lang$core$Color$RGBA, 85, 87, 83, 1);
var _elm_lang$core$Color$darkCharcoal = A4(_elm_lang$core$Color$RGBA, 46, 52, 54, 1);
var _elm_lang$core$Color$Radial = F5(
	function (a, b, c, d, e) {
		return {ctor: 'Radial', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Color$radial = _elm_lang$core$Color$Radial;
var _elm_lang$core$Color$Linear = F3(
	function (a, b, c) {
		return {ctor: 'Linear', _0: a, _1: b, _2: c};
	});
var _elm_lang$core$Color$linear = _elm_lang$core$Color$Linear;

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$svg$Svg$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$svg$Svg$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$svg$Svg$svgNamespace = A2(
	_elm_lang$virtual_dom$VirtualDom$property,
	'namespace',
	_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
var _elm_lang$svg$Svg$node = F3(
	function (name, attributes, children) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			name,
			{ctor: '::', _0: _elm_lang$svg$Svg$svgNamespace, _1: attributes},
			children);
	});
var _elm_lang$svg$Svg$svg = _elm_lang$svg$Svg$node('svg');
var _elm_lang$svg$Svg$foreignObject = _elm_lang$svg$Svg$node('foreignObject');
var _elm_lang$svg$Svg$animate = _elm_lang$svg$Svg$node('animate');
var _elm_lang$svg$Svg$animateColor = _elm_lang$svg$Svg$node('animateColor');
var _elm_lang$svg$Svg$animateMotion = _elm_lang$svg$Svg$node('animateMotion');
var _elm_lang$svg$Svg$animateTransform = _elm_lang$svg$Svg$node('animateTransform');
var _elm_lang$svg$Svg$mpath = _elm_lang$svg$Svg$node('mpath');
var _elm_lang$svg$Svg$set = _elm_lang$svg$Svg$node('set');
var _elm_lang$svg$Svg$a = _elm_lang$svg$Svg$node('a');
var _elm_lang$svg$Svg$defs = _elm_lang$svg$Svg$node('defs');
var _elm_lang$svg$Svg$g = _elm_lang$svg$Svg$node('g');
var _elm_lang$svg$Svg$marker = _elm_lang$svg$Svg$node('marker');
var _elm_lang$svg$Svg$mask = _elm_lang$svg$Svg$node('mask');
var _elm_lang$svg$Svg$pattern = _elm_lang$svg$Svg$node('pattern');
var _elm_lang$svg$Svg$switch = _elm_lang$svg$Svg$node('switch');
var _elm_lang$svg$Svg$symbol = _elm_lang$svg$Svg$node('symbol');
var _elm_lang$svg$Svg$desc = _elm_lang$svg$Svg$node('desc');
var _elm_lang$svg$Svg$metadata = _elm_lang$svg$Svg$node('metadata');
var _elm_lang$svg$Svg$title = _elm_lang$svg$Svg$node('title');
var _elm_lang$svg$Svg$feBlend = _elm_lang$svg$Svg$node('feBlend');
var _elm_lang$svg$Svg$feColorMatrix = _elm_lang$svg$Svg$node('feColorMatrix');
var _elm_lang$svg$Svg$feComponentTransfer = _elm_lang$svg$Svg$node('feComponentTransfer');
var _elm_lang$svg$Svg$feComposite = _elm_lang$svg$Svg$node('feComposite');
var _elm_lang$svg$Svg$feConvolveMatrix = _elm_lang$svg$Svg$node('feConvolveMatrix');
var _elm_lang$svg$Svg$feDiffuseLighting = _elm_lang$svg$Svg$node('feDiffuseLighting');
var _elm_lang$svg$Svg$feDisplacementMap = _elm_lang$svg$Svg$node('feDisplacementMap');
var _elm_lang$svg$Svg$feFlood = _elm_lang$svg$Svg$node('feFlood');
var _elm_lang$svg$Svg$feFuncA = _elm_lang$svg$Svg$node('feFuncA');
var _elm_lang$svg$Svg$feFuncB = _elm_lang$svg$Svg$node('feFuncB');
var _elm_lang$svg$Svg$feFuncG = _elm_lang$svg$Svg$node('feFuncG');
var _elm_lang$svg$Svg$feFuncR = _elm_lang$svg$Svg$node('feFuncR');
var _elm_lang$svg$Svg$feGaussianBlur = _elm_lang$svg$Svg$node('feGaussianBlur');
var _elm_lang$svg$Svg$feImage = _elm_lang$svg$Svg$node('feImage');
var _elm_lang$svg$Svg$feMerge = _elm_lang$svg$Svg$node('feMerge');
var _elm_lang$svg$Svg$feMergeNode = _elm_lang$svg$Svg$node('feMergeNode');
var _elm_lang$svg$Svg$feMorphology = _elm_lang$svg$Svg$node('feMorphology');
var _elm_lang$svg$Svg$feOffset = _elm_lang$svg$Svg$node('feOffset');
var _elm_lang$svg$Svg$feSpecularLighting = _elm_lang$svg$Svg$node('feSpecularLighting');
var _elm_lang$svg$Svg$feTile = _elm_lang$svg$Svg$node('feTile');
var _elm_lang$svg$Svg$feTurbulence = _elm_lang$svg$Svg$node('feTurbulence');
var _elm_lang$svg$Svg$font = _elm_lang$svg$Svg$node('font');
var _elm_lang$svg$Svg$linearGradient = _elm_lang$svg$Svg$node('linearGradient');
var _elm_lang$svg$Svg$radialGradient = _elm_lang$svg$Svg$node('radialGradient');
var _elm_lang$svg$Svg$stop = _elm_lang$svg$Svg$node('stop');
var _elm_lang$svg$Svg$circle = _elm_lang$svg$Svg$node('circle');
var _elm_lang$svg$Svg$ellipse = _elm_lang$svg$Svg$node('ellipse');
var _elm_lang$svg$Svg$image = _elm_lang$svg$Svg$node('image');
var _elm_lang$svg$Svg$line = _elm_lang$svg$Svg$node('line');
var _elm_lang$svg$Svg$path = _elm_lang$svg$Svg$node('path');
var _elm_lang$svg$Svg$polygon = _elm_lang$svg$Svg$node('polygon');
var _elm_lang$svg$Svg$polyline = _elm_lang$svg$Svg$node('polyline');
var _elm_lang$svg$Svg$rect = _elm_lang$svg$Svg$node('rect');
var _elm_lang$svg$Svg$use = _elm_lang$svg$Svg$node('use');
var _elm_lang$svg$Svg$feDistantLight = _elm_lang$svg$Svg$node('feDistantLight');
var _elm_lang$svg$Svg$fePointLight = _elm_lang$svg$Svg$node('fePointLight');
var _elm_lang$svg$Svg$feSpotLight = _elm_lang$svg$Svg$node('feSpotLight');
var _elm_lang$svg$Svg$altGlyph = _elm_lang$svg$Svg$node('altGlyph');
var _elm_lang$svg$Svg$altGlyphDef = _elm_lang$svg$Svg$node('altGlyphDef');
var _elm_lang$svg$Svg$altGlyphItem = _elm_lang$svg$Svg$node('altGlyphItem');
var _elm_lang$svg$Svg$glyph = _elm_lang$svg$Svg$node('glyph');
var _elm_lang$svg$Svg$glyphRef = _elm_lang$svg$Svg$node('glyphRef');
var _elm_lang$svg$Svg$textPath = _elm_lang$svg$Svg$node('textPath');
var _elm_lang$svg$Svg$text_ = _elm_lang$svg$Svg$node('text');
var _elm_lang$svg$Svg$tref = _elm_lang$svg$Svg$node('tref');
var _elm_lang$svg$Svg$tspan = _elm_lang$svg$Svg$node('tspan');
var _elm_lang$svg$Svg$clipPath = _elm_lang$svg$Svg$node('clipPath');
var _elm_lang$svg$Svg$colorProfile = _elm_lang$svg$Svg$node('colorProfile');
var _elm_lang$svg$Svg$cursor = _elm_lang$svg$Svg$node('cursor');
var _elm_lang$svg$Svg$filter = _elm_lang$svg$Svg$node('filter');
var _elm_lang$svg$Svg$script = _elm_lang$svg$Svg$node('script');
var _elm_lang$svg$Svg$style = _elm_lang$svg$Svg$node('style');
var _elm_lang$svg$Svg$view = _elm_lang$svg$Svg$node('view');

var _elm_lang$svg$Svg_Attributes$writingMode = _elm_lang$virtual_dom$VirtualDom$attribute('writing-mode');
var _elm_lang$svg$Svg_Attributes$wordSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('word-spacing');
var _elm_lang$svg$Svg_Attributes$visibility = _elm_lang$virtual_dom$VirtualDom$attribute('visibility');
var _elm_lang$svg$Svg_Attributes$unicodeBidi = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-bidi');
var _elm_lang$svg$Svg_Attributes$textRendering = _elm_lang$virtual_dom$VirtualDom$attribute('text-rendering');
var _elm_lang$svg$Svg_Attributes$textDecoration = _elm_lang$virtual_dom$VirtualDom$attribute('text-decoration');
var _elm_lang$svg$Svg_Attributes$textAnchor = _elm_lang$virtual_dom$VirtualDom$attribute('text-anchor');
var _elm_lang$svg$Svg_Attributes$stroke = _elm_lang$virtual_dom$VirtualDom$attribute('stroke');
var _elm_lang$svg$Svg_Attributes$strokeWidth = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-width');
var _elm_lang$svg$Svg_Attributes$strokeOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-opacity');
var _elm_lang$svg$Svg_Attributes$strokeMiterlimit = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-miterlimit');
var _elm_lang$svg$Svg_Attributes$strokeLinejoin = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linejoin');
var _elm_lang$svg$Svg_Attributes$strokeLinecap = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linecap');
var _elm_lang$svg$Svg_Attributes$strokeDashoffset = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dashoffset');
var _elm_lang$svg$Svg_Attributes$strokeDasharray = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dasharray');
var _elm_lang$svg$Svg_Attributes$stopOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stop-opacity');
var _elm_lang$svg$Svg_Attributes$stopColor = _elm_lang$virtual_dom$VirtualDom$attribute('stop-color');
var _elm_lang$svg$Svg_Attributes$shapeRendering = _elm_lang$virtual_dom$VirtualDom$attribute('shape-rendering');
var _elm_lang$svg$Svg_Attributes$pointerEvents = _elm_lang$virtual_dom$VirtualDom$attribute('pointer-events');
var _elm_lang$svg$Svg_Attributes$overflow = _elm_lang$virtual_dom$VirtualDom$attribute('overflow');
var _elm_lang$svg$Svg_Attributes$opacity = _elm_lang$virtual_dom$VirtualDom$attribute('opacity');
var _elm_lang$svg$Svg_Attributes$mask = _elm_lang$virtual_dom$VirtualDom$attribute('mask');
var _elm_lang$svg$Svg_Attributes$markerStart = _elm_lang$virtual_dom$VirtualDom$attribute('marker-start');
var _elm_lang$svg$Svg_Attributes$markerMid = _elm_lang$virtual_dom$VirtualDom$attribute('marker-mid');
var _elm_lang$svg$Svg_Attributes$markerEnd = _elm_lang$virtual_dom$VirtualDom$attribute('marker-end');
var _elm_lang$svg$Svg_Attributes$lightingColor = _elm_lang$virtual_dom$VirtualDom$attribute('lighting-color');
var _elm_lang$svg$Svg_Attributes$letterSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('letter-spacing');
var _elm_lang$svg$Svg_Attributes$kerning = _elm_lang$virtual_dom$VirtualDom$attribute('kerning');
var _elm_lang$svg$Svg_Attributes$imageRendering = _elm_lang$virtual_dom$VirtualDom$attribute('image-rendering');
var _elm_lang$svg$Svg_Attributes$glyphOrientationVertical = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-vertical');
var _elm_lang$svg$Svg_Attributes$glyphOrientationHorizontal = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-horizontal');
var _elm_lang$svg$Svg_Attributes$fontWeight = _elm_lang$virtual_dom$VirtualDom$attribute('font-weight');
var _elm_lang$svg$Svg_Attributes$fontVariant = _elm_lang$virtual_dom$VirtualDom$attribute('font-variant');
var _elm_lang$svg$Svg_Attributes$fontStyle = _elm_lang$virtual_dom$VirtualDom$attribute('font-style');
var _elm_lang$svg$Svg_Attributes$fontStretch = _elm_lang$virtual_dom$VirtualDom$attribute('font-stretch');
var _elm_lang$svg$Svg_Attributes$fontSize = _elm_lang$virtual_dom$VirtualDom$attribute('font-size');
var _elm_lang$svg$Svg_Attributes$fontSizeAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('font-size-adjust');
var _elm_lang$svg$Svg_Attributes$fontFamily = _elm_lang$virtual_dom$VirtualDom$attribute('font-family');
var _elm_lang$svg$Svg_Attributes$floodOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('flood-opacity');
var _elm_lang$svg$Svg_Attributes$floodColor = _elm_lang$virtual_dom$VirtualDom$attribute('flood-color');
var _elm_lang$svg$Svg_Attributes$filter = _elm_lang$virtual_dom$VirtualDom$attribute('filter');
var _elm_lang$svg$Svg_Attributes$fill = _elm_lang$virtual_dom$VirtualDom$attribute('fill');
var _elm_lang$svg$Svg_Attributes$fillRule = _elm_lang$virtual_dom$VirtualDom$attribute('fill-rule');
var _elm_lang$svg$Svg_Attributes$fillOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('fill-opacity');
var _elm_lang$svg$Svg_Attributes$enableBackground = _elm_lang$virtual_dom$VirtualDom$attribute('enable-background');
var _elm_lang$svg$Svg_Attributes$dominantBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('dominant-baseline');
var _elm_lang$svg$Svg_Attributes$display = _elm_lang$virtual_dom$VirtualDom$attribute('display');
var _elm_lang$svg$Svg_Attributes$direction = _elm_lang$virtual_dom$VirtualDom$attribute('direction');
var _elm_lang$svg$Svg_Attributes$cursor = _elm_lang$virtual_dom$VirtualDom$attribute('cursor');
var _elm_lang$svg$Svg_Attributes$color = _elm_lang$virtual_dom$VirtualDom$attribute('color');
var _elm_lang$svg$Svg_Attributes$colorRendering = _elm_lang$virtual_dom$VirtualDom$attribute('color-rendering');
var _elm_lang$svg$Svg_Attributes$colorProfile = _elm_lang$virtual_dom$VirtualDom$attribute('color-profile');
var _elm_lang$svg$Svg_Attributes$colorInterpolation = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation');
var _elm_lang$svg$Svg_Attributes$colorInterpolationFilters = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation-filters');
var _elm_lang$svg$Svg_Attributes$clip = _elm_lang$virtual_dom$VirtualDom$attribute('clip');
var _elm_lang$svg$Svg_Attributes$clipRule = _elm_lang$virtual_dom$VirtualDom$attribute('clip-rule');
var _elm_lang$svg$Svg_Attributes$clipPath = _elm_lang$virtual_dom$VirtualDom$attribute('clip-path');
var _elm_lang$svg$Svg_Attributes$baselineShift = _elm_lang$virtual_dom$VirtualDom$attribute('baseline-shift');
var _elm_lang$svg$Svg_Attributes$alignmentBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('alignment-baseline');
var _elm_lang$svg$Svg_Attributes$zoomAndPan = _elm_lang$virtual_dom$VirtualDom$attribute('zoomAndPan');
var _elm_lang$svg$Svg_Attributes$z = _elm_lang$virtual_dom$VirtualDom$attribute('z');
var _elm_lang$svg$Svg_Attributes$yChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('yChannelSelector');
var _elm_lang$svg$Svg_Attributes$y2 = _elm_lang$virtual_dom$VirtualDom$attribute('y2');
var _elm_lang$svg$Svg_Attributes$y1 = _elm_lang$virtual_dom$VirtualDom$attribute('y1');
var _elm_lang$svg$Svg_Attributes$y = _elm_lang$virtual_dom$VirtualDom$attribute('y');
var _elm_lang$svg$Svg_Attributes$xmlSpace = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var _elm_lang$svg$Svg_Attributes$xmlLang = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
var _elm_lang$svg$Svg_Attributes$xmlBase = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
var _elm_lang$svg$Svg_Attributes$xlinkType = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
var _elm_lang$svg$Svg_Attributes$xlinkTitle = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:title');
var _elm_lang$svg$Svg_Attributes$xlinkShow = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:show');
var _elm_lang$svg$Svg_Attributes$xlinkRole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
var _elm_lang$svg$Svg_Attributes$xlinkHref = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
var _elm_lang$svg$Svg_Attributes$xlinkArcrole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
var _elm_lang$svg$Svg_Attributes$xlinkActuate = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
var _elm_lang$svg$Svg_Attributes$xChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('xChannelSelector');
var _elm_lang$svg$Svg_Attributes$x2 = _elm_lang$virtual_dom$VirtualDom$attribute('x2');
var _elm_lang$svg$Svg_Attributes$x1 = _elm_lang$virtual_dom$VirtualDom$attribute('x1');
var _elm_lang$svg$Svg_Attributes$xHeight = _elm_lang$virtual_dom$VirtualDom$attribute('x-height');
var _elm_lang$svg$Svg_Attributes$x = _elm_lang$virtual_dom$VirtualDom$attribute('x');
var _elm_lang$svg$Svg_Attributes$widths = _elm_lang$virtual_dom$VirtualDom$attribute('widths');
var _elm_lang$svg$Svg_Attributes$width = _elm_lang$virtual_dom$VirtualDom$attribute('width');
var _elm_lang$svg$Svg_Attributes$viewTarget = _elm_lang$virtual_dom$VirtualDom$attribute('viewTarget');
var _elm_lang$svg$Svg_Attributes$viewBox = _elm_lang$virtual_dom$VirtualDom$attribute('viewBox');
var _elm_lang$svg$Svg_Attributes$vertOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-y');
var _elm_lang$svg$Svg_Attributes$vertOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-x');
var _elm_lang$svg$Svg_Attributes$vertAdvY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-adv-y');
var _elm_lang$svg$Svg_Attributes$version = _elm_lang$virtual_dom$VirtualDom$attribute('version');
var _elm_lang$svg$Svg_Attributes$values = _elm_lang$virtual_dom$VirtualDom$attribute('values');
var _elm_lang$svg$Svg_Attributes$vMathematical = _elm_lang$virtual_dom$VirtualDom$attribute('v-mathematical');
var _elm_lang$svg$Svg_Attributes$vIdeographic = _elm_lang$virtual_dom$VirtualDom$attribute('v-ideographic');
var _elm_lang$svg$Svg_Attributes$vHanging = _elm_lang$virtual_dom$VirtualDom$attribute('v-hanging');
var _elm_lang$svg$Svg_Attributes$vAlphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('v-alphabetic');
var _elm_lang$svg$Svg_Attributes$unitsPerEm = _elm_lang$virtual_dom$VirtualDom$attribute('units-per-em');
var _elm_lang$svg$Svg_Attributes$unicodeRange = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-range');
var _elm_lang$svg$Svg_Attributes$unicode = _elm_lang$virtual_dom$VirtualDom$attribute('unicode');
var _elm_lang$svg$Svg_Attributes$underlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('underline-thickness');
var _elm_lang$svg$Svg_Attributes$underlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('underline-position');
var _elm_lang$svg$Svg_Attributes$u2 = _elm_lang$virtual_dom$VirtualDom$attribute('u2');
var _elm_lang$svg$Svg_Attributes$u1 = _elm_lang$virtual_dom$VirtualDom$attribute('u1');
var _elm_lang$svg$Svg_Attributes$type_ = _elm_lang$virtual_dom$VirtualDom$attribute('type');
var _elm_lang$svg$Svg_Attributes$transform = _elm_lang$virtual_dom$VirtualDom$attribute('transform');
var _elm_lang$svg$Svg_Attributes$to = _elm_lang$virtual_dom$VirtualDom$attribute('to');
var _elm_lang$svg$Svg_Attributes$title = _elm_lang$virtual_dom$VirtualDom$attribute('title');
var _elm_lang$svg$Svg_Attributes$textLength = _elm_lang$virtual_dom$VirtualDom$attribute('textLength');
var _elm_lang$svg$Svg_Attributes$targetY = _elm_lang$virtual_dom$VirtualDom$attribute('targetY');
var _elm_lang$svg$Svg_Attributes$targetX = _elm_lang$virtual_dom$VirtualDom$attribute('targetX');
var _elm_lang$svg$Svg_Attributes$target = _elm_lang$virtual_dom$VirtualDom$attribute('target');
var _elm_lang$svg$Svg_Attributes$tableValues = _elm_lang$virtual_dom$VirtualDom$attribute('tableValues');
var _elm_lang$svg$Svg_Attributes$systemLanguage = _elm_lang$virtual_dom$VirtualDom$attribute('systemLanguage');
var _elm_lang$svg$Svg_Attributes$surfaceScale = _elm_lang$virtual_dom$VirtualDom$attribute('surfaceScale');
var _elm_lang$svg$Svg_Attributes$style = _elm_lang$virtual_dom$VirtualDom$attribute('style');
var _elm_lang$svg$Svg_Attributes$string = _elm_lang$virtual_dom$VirtualDom$attribute('string');
var _elm_lang$svg$Svg_Attributes$strikethroughThickness = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-thickness');
var _elm_lang$svg$Svg_Attributes$strikethroughPosition = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-position');
var _elm_lang$svg$Svg_Attributes$stitchTiles = _elm_lang$virtual_dom$VirtualDom$attribute('stitchTiles');
var _elm_lang$svg$Svg_Attributes$stemv = _elm_lang$virtual_dom$VirtualDom$attribute('stemv');
var _elm_lang$svg$Svg_Attributes$stemh = _elm_lang$virtual_dom$VirtualDom$attribute('stemh');
var _elm_lang$svg$Svg_Attributes$stdDeviation = _elm_lang$virtual_dom$VirtualDom$attribute('stdDeviation');
var _elm_lang$svg$Svg_Attributes$startOffset = _elm_lang$virtual_dom$VirtualDom$attribute('startOffset');
var _elm_lang$svg$Svg_Attributes$spreadMethod = _elm_lang$virtual_dom$VirtualDom$attribute('spreadMethod');
var _elm_lang$svg$Svg_Attributes$speed = _elm_lang$virtual_dom$VirtualDom$attribute('speed');
var _elm_lang$svg$Svg_Attributes$specularExponent = _elm_lang$virtual_dom$VirtualDom$attribute('specularExponent');
var _elm_lang$svg$Svg_Attributes$specularConstant = _elm_lang$virtual_dom$VirtualDom$attribute('specularConstant');
var _elm_lang$svg$Svg_Attributes$spacing = _elm_lang$virtual_dom$VirtualDom$attribute('spacing');
var _elm_lang$svg$Svg_Attributes$slope = _elm_lang$virtual_dom$VirtualDom$attribute('slope');
var _elm_lang$svg$Svg_Attributes$seed = _elm_lang$virtual_dom$VirtualDom$attribute('seed');
var _elm_lang$svg$Svg_Attributes$scale = _elm_lang$virtual_dom$VirtualDom$attribute('scale');
var _elm_lang$svg$Svg_Attributes$ry = _elm_lang$virtual_dom$VirtualDom$attribute('ry');
var _elm_lang$svg$Svg_Attributes$rx = _elm_lang$virtual_dom$VirtualDom$attribute('rx');
var _elm_lang$svg$Svg_Attributes$rotate = _elm_lang$virtual_dom$VirtualDom$attribute('rotate');
var _elm_lang$svg$Svg_Attributes$result = _elm_lang$virtual_dom$VirtualDom$attribute('result');
var _elm_lang$svg$Svg_Attributes$restart = _elm_lang$virtual_dom$VirtualDom$attribute('restart');
var _elm_lang$svg$Svg_Attributes$requiredFeatures = _elm_lang$virtual_dom$VirtualDom$attribute('requiredFeatures');
var _elm_lang$svg$Svg_Attributes$requiredExtensions = _elm_lang$virtual_dom$VirtualDom$attribute('requiredExtensions');
var _elm_lang$svg$Svg_Attributes$repeatDur = _elm_lang$virtual_dom$VirtualDom$attribute('repeatDur');
var _elm_lang$svg$Svg_Attributes$repeatCount = _elm_lang$virtual_dom$VirtualDom$attribute('repeatCount');
var _elm_lang$svg$Svg_Attributes$renderingIntent = _elm_lang$virtual_dom$VirtualDom$attribute('rendering-intent');
var _elm_lang$svg$Svg_Attributes$refY = _elm_lang$virtual_dom$VirtualDom$attribute('refY');
var _elm_lang$svg$Svg_Attributes$refX = _elm_lang$virtual_dom$VirtualDom$attribute('refX');
var _elm_lang$svg$Svg_Attributes$radius = _elm_lang$virtual_dom$VirtualDom$attribute('radius');
var _elm_lang$svg$Svg_Attributes$r = _elm_lang$virtual_dom$VirtualDom$attribute('r');
var _elm_lang$svg$Svg_Attributes$primitiveUnits = _elm_lang$virtual_dom$VirtualDom$attribute('primitiveUnits');
var _elm_lang$svg$Svg_Attributes$preserveAspectRatio = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAspectRatio');
var _elm_lang$svg$Svg_Attributes$preserveAlpha = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAlpha');
var _elm_lang$svg$Svg_Attributes$pointsAtZ = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtZ');
var _elm_lang$svg$Svg_Attributes$pointsAtY = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtY');
var _elm_lang$svg$Svg_Attributes$pointsAtX = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtX');
var _elm_lang$svg$Svg_Attributes$points = _elm_lang$virtual_dom$VirtualDom$attribute('points');
var _elm_lang$svg$Svg_Attributes$pointOrder = _elm_lang$virtual_dom$VirtualDom$attribute('point-order');
var _elm_lang$svg$Svg_Attributes$patternUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternUnits');
var _elm_lang$svg$Svg_Attributes$patternTransform = _elm_lang$virtual_dom$VirtualDom$attribute('patternTransform');
var _elm_lang$svg$Svg_Attributes$patternContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternContentUnits');
var _elm_lang$svg$Svg_Attributes$pathLength = _elm_lang$virtual_dom$VirtualDom$attribute('pathLength');
var _elm_lang$svg$Svg_Attributes$path = _elm_lang$virtual_dom$VirtualDom$attribute('path');
var _elm_lang$svg$Svg_Attributes$panose1 = _elm_lang$virtual_dom$VirtualDom$attribute('panose-1');
var _elm_lang$svg$Svg_Attributes$overlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('overline-thickness');
var _elm_lang$svg$Svg_Attributes$overlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('overline-position');
var _elm_lang$svg$Svg_Attributes$origin = _elm_lang$virtual_dom$VirtualDom$attribute('origin');
var _elm_lang$svg$Svg_Attributes$orientation = _elm_lang$virtual_dom$VirtualDom$attribute('orientation');
var _elm_lang$svg$Svg_Attributes$orient = _elm_lang$virtual_dom$VirtualDom$attribute('orient');
var _elm_lang$svg$Svg_Attributes$order = _elm_lang$virtual_dom$VirtualDom$attribute('order');
var _elm_lang$svg$Svg_Attributes$operator = _elm_lang$virtual_dom$VirtualDom$attribute('operator');
var _elm_lang$svg$Svg_Attributes$offset = _elm_lang$virtual_dom$VirtualDom$attribute('offset');
var _elm_lang$svg$Svg_Attributes$numOctaves = _elm_lang$virtual_dom$VirtualDom$attribute('numOctaves');
var _elm_lang$svg$Svg_Attributes$name = _elm_lang$virtual_dom$VirtualDom$attribute('name');
var _elm_lang$svg$Svg_Attributes$mode = _elm_lang$virtual_dom$VirtualDom$attribute('mode');
var _elm_lang$svg$Svg_Attributes$min = _elm_lang$virtual_dom$VirtualDom$attribute('min');
var _elm_lang$svg$Svg_Attributes$method = _elm_lang$virtual_dom$VirtualDom$attribute('method');
var _elm_lang$svg$Svg_Attributes$media = _elm_lang$virtual_dom$VirtualDom$attribute('media');
var _elm_lang$svg$Svg_Attributes$max = _elm_lang$virtual_dom$VirtualDom$attribute('max');
var _elm_lang$svg$Svg_Attributes$mathematical = _elm_lang$virtual_dom$VirtualDom$attribute('mathematical');
var _elm_lang$svg$Svg_Attributes$maskUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskUnits');
var _elm_lang$svg$Svg_Attributes$maskContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskContentUnits');
var _elm_lang$svg$Svg_Attributes$markerWidth = _elm_lang$virtual_dom$VirtualDom$attribute('markerWidth');
var _elm_lang$svg$Svg_Attributes$markerUnits = _elm_lang$virtual_dom$VirtualDom$attribute('markerUnits');
var _elm_lang$svg$Svg_Attributes$markerHeight = _elm_lang$virtual_dom$VirtualDom$attribute('markerHeight');
var _elm_lang$svg$Svg_Attributes$local = _elm_lang$virtual_dom$VirtualDom$attribute('local');
var _elm_lang$svg$Svg_Attributes$limitingConeAngle = _elm_lang$virtual_dom$VirtualDom$attribute('limitingConeAngle');
var _elm_lang$svg$Svg_Attributes$lengthAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('lengthAdjust');
var _elm_lang$svg$Svg_Attributes$lang = _elm_lang$virtual_dom$VirtualDom$attribute('lang');
var _elm_lang$svg$Svg_Attributes$keyTimes = _elm_lang$virtual_dom$VirtualDom$attribute('keyTimes');
var _elm_lang$svg$Svg_Attributes$keySplines = _elm_lang$virtual_dom$VirtualDom$attribute('keySplines');
var _elm_lang$svg$Svg_Attributes$keyPoints = _elm_lang$virtual_dom$VirtualDom$attribute('keyPoints');
var _elm_lang$svg$Svg_Attributes$kernelUnitLength = _elm_lang$virtual_dom$VirtualDom$attribute('kernelUnitLength');
var _elm_lang$svg$Svg_Attributes$kernelMatrix = _elm_lang$virtual_dom$VirtualDom$attribute('kernelMatrix');
var _elm_lang$svg$Svg_Attributes$k4 = _elm_lang$virtual_dom$VirtualDom$attribute('k4');
var _elm_lang$svg$Svg_Attributes$k3 = _elm_lang$virtual_dom$VirtualDom$attribute('k3');
var _elm_lang$svg$Svg_Attributes$k2 = _elm_lang$virtual_dom$VirtualDom$attribute('k2');
var _elm_lang$svg$Svg_Attributes$k1 = _elm_lang$virtual_dom$VirtualDom$attribute('k1');
var _elm_lang$svg$Svg_Attributes$k = _elm_lang$virtual_dom$VirtualDom$attribute('k');
var _elm_lang$svg$Svg_Attributes$intercept = _elm_lang$virtual_dom$VirtualDom$attribute('intercept');
var _elm_lang$svg$Svg_Attributes$in2 = _elm_lang$virtual_dom$VirtualDom$attribute('in2');
var _elm_lang$svg$Svg_Attributes$in_ = _elm_lang$virtual_dom$VirtualDom$attribute('in');
var _elm_lang$svg$Svg_Attributes$ideographic = _elm_lang$virtual_dom$VirtualDom$attribute('ideographic');
var _elm_lang$svg$Svg_Attributes$id = _elm_lang$virtual_dom$VirtualDom$attribute('id');
var _elm_lang$svg$Svg_Attributes$horizOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-y');
var _elm_lang$svg$Svg_Attributes$horizOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-x');
var _elm_lang$svg$Svg_Attributes$horizAdvX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-adv-x');
var _elm_lang$svg$Svg_Attributes$height = _elm_lang$virtual_dom$VirtualDom$attribute('height');
var _elm_lang$svg$Svg_Attributes$hanging = _elm_lang$virtual_dom$VirtualDom$attribute('hanging');
var _elm_lang$svg$Svg_Attributes$gradientUnits = _elm_lang$virtual_dom$VirtualDom$attribute('gradientUnits');
var _elm_lang$svg$Svg_Attributes$gradientTransform = _elm_lang$virtual_dom$VirtualDom$attribute('gradientTransform');
var _elm_lang$svg$Svg_Attributes$glyphRef = _elm_lang$virtual_dom$VirtualDom$attribute('glyphRef');
var _elm_lang$svg$Svg_Attributes$glyphName = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-name');
var _elm_lang$svg$Svg_Attributes$g2 = _elm_lang$virtual_dom$VirtualDom$attribute('g2');
var _elm_lang$svg$Svg_Attributes$g1 = _elm_lang$virtual_dom$VirtualDom$attribute('g1');
var _elm_lang$svg$Svg_Attributes$fy = _elm_lang$virtual_dom$VirtualDom$attribute('fy');
var _elm_lang$svg$Svg_Attributes$fx = _elm_lang$virtual_dom$VirtualDom$attribute('fx');
var _elm_lang$svg$Svg_Attributes$from = _elm_lang$virtual_dom$VirtualDom$attribute('from');
var _elm_lang$svg$Svg_Attributes$format = _elm_lang$virtual_dom$VirtualDom$attribute('format');
var _elm_lang$svg$Svg_Attributes$filterUnits = _elm_lang$virtual_dom$VirtualDom$attribute('filterUnits');
var _elm_lang$svg$Svg_Attributes$filterRes = _elm_lang$virtual_dom$VirtualDom$attribute('filterRes');
var _elm_lang$svg$Svg_Attributes$externalResourcesRequired = _elm_lang$virtual_dom$VirtualDom$attribute('externalResourcesRequired');
var _elm_lang$svg$Svg_Attributes$exponent = _elm_lang$virtual_dom$VirtualDom$attribute('exponent');
var _elm_lang$svg$Svg_Attributes$end = _elm_lang$virtual_dom$VirtualDom$attribute('end');
var _elm_lang$svg$Svg_Attributes$elevation = _elm_lang$virtual_dom$VirtualDom$attribute('elevation');
var _elm_lang$svg$Svg_Attributes$edgeMode = _elm_lang$virtual_dom$VirtualDom$attribute('edgeMode');
var _elm_lang$svg$Svg_Attributes$dy = _elm_lang$virtual_dom$VirtualDom$attribute('dy');
var _elm_lang$svg$Svg_Attributes$dx = _elm_lang$virtual_dom$VirtualDom$attribute('dx');
var _elm_lang$svg$Svg_Attributes$dur = _elm_lang$virtual_dom$VirtualDom$attribute('dur');
var _elm_lang$svg$Svg_Attributes$divisor = _elm_lang$virtual_dom$VirtualDom$attribute('divisor');
var _elm_lang$svg$Svg_Attributes$diffuseConstant = _elm_lang$virtual_dom$VirtualDom$attribute('diffuseConstant');
var _elm_lang$svg$Svg_Attributes$descent = _elm_lang$virtual_dom$VirtualDom$attribute('descent');
var _elm_lang$svg$Svg_Attributes$decelerate = _elm_lang$virtual_dom$VirtualDom$attribute('decelerate');
var _elm_lang$svg$Svg_Attributes$d = _elm_lang$virtual_dom$VirtualDom$attribute('d');
var _elm_lang$svg$Svg_Attributes$cy = _elm_lang$virtual_dom$VirtualDom$attribute('cy');
var _elm_lang$svg$Svg_Attributes$cx = _elm_lang$virtual_dom$VirtualDom$attribute('cx');
var _elm_lang$svg$Svg_Attributes$contentStyleType = _elm_lang$virtual_dom$VirtualDom$attribute('contentStyleType');
var _elm_lang$svg$Svg_Attributes$contentScriptType = _elm_lang$virtual_dom$VirtualDom$attribute('contentScriptType');
var _elm_lang$svg$Svg_Attributes$clipPathUnits = _elm_lang$virtual_dom$VirtualDom$attribute('clipPathUnits');
var _elm_lang$svg$Svg_Attributes$class = _elm_lang$virtual_dom$VirtualDom$attribute('class');
var _elm_lang$svg$Svg_Attributes$capHeight = _elm_lang$virtual_dom$VirtualDom$attribute('cap-height');
var _elm_lang$svg$Svg_Attributes$calcMode = _elm_lang$virtual_dom$VirtualDom$attribute('calcMode');
var _elm_lang$svg$Svg_Attributes$by = _elm_lang$virtual_dom$VirtualDom$attribute('by');
var _elm_lang$svg$Svg_Attributes$bias = _elm_lang$virtual_dom$VirtualDom$attribute('bias');
var _elm_lang$svg$Svg_Attributes$begin = _elm_lang$virtual_dom$VirtualDom$attribute('begin');
var _elm_lang$svg$Svg_Attributes$bbox = _elm_lang$virtual_dom$VirtualDom$attribute('bbox');
var _elm_lang$svg$Svg_Attributes$baseProfile = _elm_lang$virtual_dom$VirtualDom$attribute('baseProfile');
var _elm_lang$svg$Svg_Attributes$baseFrequency = _elm_lang$virtual_dom$VirtualDom$attribute('baseFrequency');
var _elm_lang$svg$Svg_Attributes$azimuth = _elm_lang$virtual_dom$VirtualDom$attribute('azimuth');
var _elm_lang$svg$Svg_Attributes$autoReverse = _elm_lang$virtual_dom$VirtualDom$attribute('autoReverse');
var _elm_lang$svg$Svg_Attributes$attributeType = _elm_lang$virtual_dom$VirtualDom$attribute('attributeType');
var _elm_lang$svg$Svg_Attributes$attributeName = _elm_lang$virtual_dom$VirtualDom$attribute('attributeName');
var _elm_lang$svg$Svg_Attributes$ascent = _elm_lang$virtual_dom$VirtualDom$attribute('ascent');
var _elm_lang$svg$Svg_Attributes$arabicForm = _elm_lang$virtual_dom$VirtualDom$attribute('arabic-form');
var _elm_lang$svg$Svg_Attributes$amplitude = _elm_lang$virtual_dom$VirtualDom$attribute('amplitude');
var _elm_lang$svg$Svg_Attributes$allowReorder = _elm_lang$virtual_dom$VirtualDom$attribute('allowReorder');
var _elm_lang$svg$Svg_Attributes$alphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('alphabetic');
var _elm_lang$svg$Svg_Attributes$additive = _elm_lang$virtual_dom$VirtualDom$attribute('additive');
var _elm_lang$svg$Svg_Attributes$accumulate = _elm_lang$virtual_dom$VirtualDom$attribute('accumulate');
var _elm_lang$svg$Svg_Attributes$accelerate = _elm_lang$virtual_dom$VirtualDom$attribute('accelerate');
var _elm_lang$svg$Svg_Attributes$accentHeight = _elm_lang$virtual_dom$VirtualDom$attribute('accent-height');

var _elm_community$material_icons$Material_Icons_Internal$toRgbaString = function (color) {
	var _p0 = _elm_lang$core$Color$toRgb(color);
	var red = _p0.red;
	var green = _p0.green;
	var blue = _p0.blue;
	var alpha = _p0.alpha;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'rgba(',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(red),
			A2(
				_elm_lang$core$Basics_ops['++'],
				',',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(green),
					A2(
						_elm_lang$core$Basics_ops['++'],
						',',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(blue),
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(alpha),
									')'))))))));
};
var _elm_community$material_icons$Material_Icons_Internal$icon = F4(
	function (viewBox, children, color, size) {
		var stringColor = _elm_community$material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$width(stringSize),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$height(stringSize),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$viewBox(viewBox),
						_1: {ctor: '[]'}
					}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$svg$Svg$g,
					{
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$fill(stringColor),
						_1: {ctor: '[]'}
					},
					children),
				_1: {ctor: '[]'}
			});
	});

var _elm_community$material_icons$Material_Icons_Action$zoom_out = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$zoom_in = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$youtube_searched_for = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34.02 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-12.99-13-12.99S9.03 12 9.02 19H4l7.68 8L20 19h-6.98c.01-5 4.03-8.99 9-8.99s9 4.03 9 9-4.03 9-9 9c-1.29 0-2.52-.28-3.63-.77l-2.96 2.96c1.93 1.14 4.18 1.81 6.59 1.81 3.23 0 6.17-1.18 8.44-3.13l.54.54V31l10.01 9.98L43.99 38l-9.97-10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$work = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 12h-8V8c0-2.21-1.79-4-4-4h-8c-2.21 0-4 1.79-4 4v4H8c-2.21 0-3.98 1.79-3.98 4L4 38c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zm-12 0h-8V8h8v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$watch_later = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.98 4C12.94 4 4 12.96 4 24s8.94 20 19.98 20C35.04 44 44 35.04 44 24S35.04 4 23.98 4zm8.52 28.3L22 26V14h3v10.5l9 5.34-1.5 2.46z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$visibility_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 14c5.52 0 10 4.48 10 10 0 1.29-.26 2.52-.71 3.65l5.85 5.85c3.02-2.52 5.4-5.78 6.87-9.5-3.47-8.78-12-15-22.01-15-2.8 0-5.48.5-7.97 1.4l4.32 4.31c1.13-.44 2.36-.71 3.65-.71zM4 8.55l4.56 4.56.91.91C6.17 16.6 3.56 20.03 2 24c3.46 8.78 12 15 22 15 3.1 0 6.06-.6 8.77-1.69l.85.85L39.45 44 42 41.46 6.55 6 4 8.55zM15.06 19.6l3.09 3.09c-.09.43-.15.86-.15 1.31 0 3.31 2.69 6 6 6 .45 0 .88-.06 1.3-.15l3.09 3.09C27.06 33.6 25.58 34 24 34c-5.52 0-10-4.48-10-10 0-1.58.4-3.06 1.06-4.4zm8.61-1.57l6.3 6.3L30 24c0-3.31-2.69-6-6-6l-.33.03z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$visibility = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_week = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 10H6c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm28 0h-6c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm-14 0h-6c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_stream = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 36h34V24H8v12zm0-26v12h34V10H8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_quilt = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 36h10V24H20v12zM8 36h10V10H8v26zm24 0h10V24H32v12zM20 10v12h22V10H20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_module = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 22h10V10H8v12zm0 14h10V24H8v12zm12 0h10V24H20v12zm12 0h10V24H32v12zM20 22h10V10H20v12zm12-12v12h10V10H32z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_list = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 28h8v-8H8v8zm0 10h8v-8H8v8zm0-20h8v-8H8v8zm10 10h24v-8H18v8zm0 10h24v-8H18v8zm0-28v8h24v-8H18z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_headline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 30h34v-4H8v4zm0 8h34v-4H8v4zm0-16h34v-4H8v4zm0-12v4h34v-4H8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_day = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M4 42h38v-6H4v6zm36-26H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2zM4 6v6h38V6H4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_column = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 36h10V10H20v26zM8 36h10V10H8v26zm24-26v26h10V10H32z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_carousel = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 38h20V8H14v30zM4 34h8V12H4v22zm32-22v22h8V12h-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_array = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 36h6V10H8v26zm28-26v26h6V10h-6zM16 36h18V10H16v26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$view_agenda = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 26H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2V28c0-1.1-.9-2-2-2zm0-20H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$verified_user = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 2L6 10v12c0 11.11 7.67 21.47 18 24 10.33-2.53 18-12.89 18-24V10L24 2zm-4 32l-8-8 2.83-2.83L20 28.34l13.17-13.17L36 18 20 34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$update = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 20.25H28.43l5.49-5.64c-5.46-5.41-14.3-5.61-19.76-.2-5.46 5.41-5.46 14.17 0 19.58 5.46 5.41 14.3 5.41 19.76 0 2.72-2.7 4.08-5.83 4.07-9.79H42c0 3.96-1.76 9.1-5.28 12.59-7.02 6.95-18.42 6.95-25.44 0s-7.07-18.22-.05-25.17c7.01-6.95 18.29-6.95 25.3 0L42 6v14.25zM25 16v8.5l7 4.16-1.44 2.42L22 26V16h3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$turned_in_not = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4zm0 30l-10-4.35L14 36V10h20v26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$turned_in = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$trending_up = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 12l4.59 4.59-9.76 9.75-8-8L4 33.17 6.83 36l12-12 8 8 12.58-12.59L44 24V12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$trending_flat = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M44 24l-8-8v6H6v4h30v6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$trending_down = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 36l4.59-4.59-9.76-9.75-8 8L4 14.83 6.83 12l12 12 8-8 12.58 12.59L44 24v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$translate = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M25.74 30.15l-5.08-5.02.06-.06c3.48-3.88 5.96-8.34 7.42-13.06H34V8H20V4h-4v4H2v3.98h22.34C22.99 15.84 20.88 19.5 18 22.7c-1.86-2.07-3.4-4.32-4.62-6.7h-4c1.46 3.26 3.46 6.34 5.96 9.12L5.17 35.17 8 38l10-10 6.22 6.22 1.52-4.07zM37 20h-4l-9 24h4l2.25-6h9.5L42 44h4l-9-24zm-5.25 14L35 25.33 38.25 34h-6.5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$track_changes = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.14 9.86l-2.82 2.82C38.2 15.58 40 19.58 40 24c0 8.84-7.16 16-16 16S8 32.84 8 24c0-8.16 6.1-14.88 14-15.86v4.04c-5.68.96-10 5.88-10 11.82 0 6.62 5.38 12 12 12s12-5.38 12-12c0-3.32-1.34-6.32-3.52-8.48l-2.82 2.82C31.1 19.8 32 21.8 32 24c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-3.72 2.56-6.82 6-7.72v4.28c-1.2.7-2 1.96-2 3.44 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.48-.8-2.76-2-3.44V4h-2C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20c0-5.52-2.24-10.52-5.86-14.14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$touch_app = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 22.48V15c0-2.76 2.24-5 5-5s5 2.24 5 5v7.48c2.41-1.61 4-4.36 4-7.48 0-4.97-4.03-9-9-9s-9 4.03-9 9c0 3.12 1.59 5.87 4 7.48zm19.67 9.26l-9.08-4.52c-.34-.14-.7-.22-1.09-.22H26V15c0-1.66-1.34-3-3-3s-3 1.34-3 3v21.47l-6.85-1.43c-.15-.03-.31-.05-.47-.05-.62 0-1.18.26-1.59.66l-1.58 1.6 9.88 9.88c.55.54 1.3.88 2.12.88H35.1c1.51 0 2.66-1.11 2.87-2.56l1.51-10.54c.02-.14.03-.27.03-.41-.01-1.24-.77-2.31-1.84-2.76z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$toll = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 24c0-5.22 3.34-9.65 8-11.3V8.52C7.1 10.3 2 16.55 2 24s5.1 13.7 12 15.48V35.3C9.34 33.65 6 29.22 6 24zM30 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16S38.84 8 30 8zm0 28c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$today = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-2V2h-4v4H16V2h-4v4h-2c-2.21 0-3.98 1.79-3.98 4L6 38c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32H10V16h28v22zM14 20h10v10H14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$toc = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 18h28v-4H6v4zm0 8h28v-4H6v4zm0 8h28v-4H6v4zm32 0h4v-4h-4v4zm0-20v4h4v-4h-4zm0 12h4v-4h-4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$timeline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M46 16c0 2.2-1.8 4-4 4-.36 0-.7-.04-1.02-.14l-7.12 7.1c.1.32.14.68.14 1.04 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-.36.04-.72.14-1.04l-5.1-5.1c-.32.1-.68.14-1.04.14s-.72-.04-1.04-.14l-9.1 9.12c.1.32.14.66.14 1.02 0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.36 0 .7.04 1.02.14l9.12-9.1c-.1-.32-.14-.68-.14-1.04 0-2.2 1.8-4 4-4s4 1.8 4 4c0 .36-.04.72-.14 1.04l5.1 5.1c.32-.1.68-.14 1.04-.14s.72.04 1.04.14l7.1-7.12c-.1-.32-.14-.66-.14-1.02 0-2.2 1.8-4 4-4s4 1.8 4 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$thumps_up_down = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 12c0-1.1-.9-2-2-2H11.63l1.33-6.35c.03-.15.05-.31.05-.47 0-.62-.25-1.18-.66-1.59L10.76 0 .88 9.88C.34 10.42 0 11.17 0 12v13c0 1.66 1.34 3 3 3h13.5c1.24 0 2.31-.75 2.76-1.83l4.53-10.58c.13-.34.21-.7.21-1.09V12zm21 8H31.5c-1.24 0-2.31.75-2.76 1.83l-4.53 10.58c-.13.34-.21.7-.21 1.09V36c0 1.1.9 2 2 2h10.37l-1.33 6.35c-.03.15-.05.31-.05.47 0 .62.25 1.18.66 1.59L37.24 48l9.88-9.88c.54-.54.88-1.29.88-2.12V23c0-1.66-1.34-3-3-3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$thumb_up = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1c.18-.46.29-.95.29-1.46v-3.83l-.02-.02L46 20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$thumb_down = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 6H12c-1.66 0-3.08 1.01-3.68 2.44l-6.03 14.1C2.11 23 2 23.49 2 24v3.83l.02.02L2 28c0 2.21 1.79 4 4 4h12.63l-1.91 9.14c-.04.2-.07.41-.07.63 0 .83.34 1.58.88 2.12L19.66 46l13.17-13.17C33.55 32.1 34 31.1 34 30V10c0-2.21-1.79-4-4-4zm8 0v24h8V6h-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$three_d_rotation = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M15.03 42.97C8.5 39.87 3.81 33.52 3.1 26h-3C1.12 38.32 11.42 48 24 48c.45 0 .88-.04 1.32-.07L17.7 40.3l-2.67 2.67zm1.78-13.05c-.38 0-.73-.05-1.05-.17-.31-.11-.58-.27-.8-.47-.22-.2-.39-.45-.51-.73-.12-.29-.18-.6-.18-.94h-2.6c0 .72.14 1.35.42 1.9.28.55.65 1.01 1.12 1.37.47.37 1.01.64 1.63.83.62.2 1.26.29 1.94.29.74 0 1.43-.1 2.07-.3.64-.2 1.19-.5 1.66-.89s.83-.87 1.1-1.44c.26-.57.4-1.22.4-1.95 0-.39-.05-.76-.14-1.12-.1-.36-.25-.7-.45-1.02-.21-.32-.48-.6-.81-.86-.33-.25-.74-.46-1.21-.63.4-.18.75-.4 1.05-.66.3-.26.55-.54.75-.83.2-.3.35-.6.45-.92.1-.32.15-.64.15-.95 0-.73-.12-1.37-.36-1.92-.24-.55-.58-1.01-1.02-1.38-.44-.37-.96-.65-1.58-.84-.64-.2-1.32-.29-2.06-.29-.72 0-1.39.11-2 .32-.61.21-1.13.51-1.57.89-.44.38-.78.83-1.03 1.35-.25.52-.37 1.09-.37 1.7h2.6c0-.34.06-.64.18-.9.12-.27.29-.5.5-.68.21-.19.47-.34.76-.44.29-.1.61-.16.95-.16.8 0 1.39.21 1.78.62.39.41.58.99.58 1.73 0 .36-.05.68-.16.97-.11.29-.27.54-.49.75-.22.21-.5.37-.82.49-.33.12-.72.18-1.16.18h-1.54v2.05h1.54c.44 0 .84.05 1.19.15.35.1.65.25.9.47.25.21.44.48.58.8.13.32.2.7.2 1.14 0 .81-.23 1.43-.7 1.86-.45.42-1.08.63-1.89.63zm17.12-11.85c-.63-.66-1.39-1.17-2.27-1.53-.89-.36-1.86-.54-2.93-.54H24v16h4.59c1.11 0 2.11-.18 3.02-.54.91-.36 1.68-.87 2.32-1.53.64-.66 1.14-1.46 1.48-2.39.35-.93.52-1.98.52-3.14v-.79c0-1.16-.18-2.2-.53-3.14-.35-.94-.84-1.74-1.47-2.4zm-.79 6.34c0 .83-.09 1.59-.29 2.25-.19.67-.47 1.23-.85 1.69-.38.46-.85.81-1.42 1.06-.57.24-1.23.37-1.99.37h-1.81V18.24h1.95c1.44 0 2.53.46 3.29 1.37.75.92 1.13 2.24 1.13 3.98v.82zM24 0c-.45 0-.88.04-1.32.07L30.3 7.7l2.66-2.66C39.5 8.13 44.19 14.48 44.9 22h3C46.88 9.68 36.58 0 24 0z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$theaters = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 6v4h-4V6H16v4h-4V6H8v36h4v-4h4v4h16v-4h4v4h4V6h-4zM16 34h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm20 16h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$tab_unselected = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M2 18h4v-4H2v4zm0 8h4v-4H2v4zm0-16h4V6c-2.21 0-4 1.79-4 4zm16 32h4v-4h-4v4zM2 34h4v-4H2v4zm4 8v-4H2c0 2.21 1.79 4 4 4zM42 6H26v12h20v-8c0-2.21-1.79-4-4-4zm0 28h4v-4h-4v4zM18 10h4V6h-4v4zm-8 32h4v-4h-4v4zm0-32h4V6h-4v4zm32 32c2.21 0 4-1.79 4-4h-4v4zm0-16h4v-4h-4v4zM26 42h4v-4h-4v4zm8 0h4v-4h-4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$tab = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 6H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32H6V10h20v8h16v20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$system_update_alt = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 32.5l8-8h-6v-18h-4v18h-6l8 8zm18-26H30v3.97h12v28.06H6V10.47h12V6.5H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$swap_vertical_circle = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zM13 18l7-7 7 7h-5v8h-4v-8h-5zm22 12l-7 7-7-7h5v-8h4v8h5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$swap_vert = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 34.02V20h-4v14.02h-6L30 42l8-7.98h-6zM18 6l-8 7.98h6V28h4V13.98h6L18 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$swap_horiz = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M13.98 22L6 30l7.98 8v-6H28v-4H13.98v-6zM42 18l-7.98-8v6H20v4h14.02v6L42 18z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$supervisor_account = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M33 24c2.76 0 4.98-2.24 4.98-5s-2.22-5-4.98-5c-2.76 0-5 2.24-5 5s2.24 5 5 5zm-15-2c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm15 6c-3.67 0-11 1.84-11 5.5V38h22v-4.5c0-3.66-7.33-5.5-11-5.5zm-15-2c-4.67 0-14 2.34-14 7v5h14v-4.5c0-1.7.67-4.67 4.74-6.94C21 26.19 19.31 26 18 26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$subject = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 34H8v4h20v-4zm12-16H8v4h32v-4zM8 30h32v-4H8v4zm0-20v4h32v-4H8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$store = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 8H8v4h32V8zm2 20v-4l-2-10H8L6 24v4h2v12h20V28h8v12h4V28h2zm-18 8H12v-8h12v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$stars = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zm8.47 32L24 30.9 15.54 36l2.24-9.62-7.46-6.47 9.84-.84L24 10l3.84 9.07 9.84.84-7.46 6.47L32.46 36z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$star_rate = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 18 18',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$spellcheck = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24.89 32h4.18L18.86 6h-3.71L4.93 32h4.18l2.25-6h11.29l2.24 6zM12.86 22L17 10.95 21.14 22h-8.28zm30.31 1.17L27 39.34 19.66 32l-2.83 2.83L27 45l19-19-2.83-2.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$speaker_notes_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M21.08 22L20 20.92 15.08 16 12 12.92 4.77 5.69 2.54 3.46 0 6l4.02 4.02L4 44l8-8h18l11.46 11.46L44 44.92 35.08 36l-14-14zM16 28h-4v-4h4v4zm-4-6v-4l4 4h-4zM40 4H8.16L20 15.84V12h16v4H20.16l2 2H36v4h-9.84l13.99 13.99C42.28 35.91 44 34.15 44 32V8c0-2.2-1.8-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$speaker_notes = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 4H8C5.79 4 4.02 5.79 4.02 8L4 44l8-8h28c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM16 28h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4v-4h4v4zm14 12H20v-4h10v4zm6-6H20v-4h16v4zm0-6H20v-4h16v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$shopping_cart = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96 0-1.11-.9-2-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$shopping_basket = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34.42 18L25.66 4.89c-.38-.58-1.02-.85-1.66-.85-.64 0-1.28.28-1.66.85L13.58 18H4c-1.1 0-2 .9-2 2 0 .19.03.37.07.54l5.07 18.54C7.61 40.76 9.16 42 11 42h26c1.84 0 3.39-1.24 3.85-2.93l5.07-18.54c.05-.16.08-.34.08-.53 0-1.1-.9-2-2-2h-9.58zM18 18l6-8.8 6 8.8H18zm6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$shop_two = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 10V6c0-2.21-1.79-4-4-4h-8c-2.21 0-4 1.79-4 4v4H10v22c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10H36zM24 6h8v4h-8V6zm0 24V16l11 6-11 8zM6 18H2v22c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4H6V18z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$shop = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 12V8c0-2.21-1.79-4-4-4h-8c-2.21 0-4 1.79-4 4v4H4v26c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12H32zM20 8h8v4h-8V8zm-2 28V18l15 8-15 10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_voice = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 48h4v-4h-4v4zm10-22c3.31 0 5.98-2.69 5.98-6L30 8c0-3.32-2.68-6-6-6-3.31 0-6 2.68-6 6v12c0 3.31 2.69 6 6 6zm-2 22h4v-4h-4v4zm8 0h4v-4h-4v4zm8-28h-3.4c0 6-5.07 10.2-10.6 10.2-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V40h4v-6.56c6.56-.97 12-6.61 12-13.44z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_remote = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 18H18c-1.11 0-2 .9-2 2v24c0 1.1.89 2 2 2h12c1.11 0 2-.9 2-2V20c0-1.1-.89-2-2-2zm-6 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-9.9-17.9l2.83 2.83C18.74 13.12 21.24 12 24 12s5.26 1.12 7.07 2.93l2.83-2.83C31.37 9.57 27.87 8 24 8s-7.37 1.57-9.9 4.1zM24 0C17.93 0 12.43 2.46 8.44 6.44l2.83 2.83C14.53 6.01 19.03 4 24 4s9.47 2.01 12.73 5.27l2.83-2.83C35.57 2.46 30.07 0 24 0z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_power = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 48h4v-4h-4v4zm8 0h4v-4h-4v4zm4-44h-4v20h4V4zm7.13 4.87l-2.89 2.89C33.69 13.87 36 17.66 36 22c0 6.63-5.37 12-12 12s-12-5.37-12-12c0-4.34 2.31-8.13 5.76-10.24l-2.89-2.89C10.72 11.76 8 16.56 8 22c0 8.84 7.16 16 16 16s16-7.16 16-16c0-5.44-2.72-10.24-6.87-13.13zM30 48h4v-4h-4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_phone = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M26 18h-4v4h4v-4zm8 0h-4v4h4v-4zm6 13c-2.49 0-4.89-.4-7.14-1.14-.69-.22-1.48-.06-2.03.49l-4.4 4.41c-5.67-2.88-10.29-7.51-13.18-13.17l4.4-4.41c.55-.55.71-1.34.49-2.03C17.4 12.9 17 10.49 17 8c0-1.11-.89-2-2-2H8c-1.11 0-2 .89-2 2 0 18.78 15.22 34 34 34 1.11 0 2-.89 2-2v-7c0-1.11-.89-2-2-2zm-2-13v4h4v-4h-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_overscan = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24.01 11L20 16h8l-3.99-5zM36 20v8l5-3.99L36 20zm-24 0l-5 4.01L12 28v-8zm16 12h-8l4.01 5L28 32zM42 6H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32.03H6V9.97h36v28.06z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_input_svideo = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M16 23c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm14-10c0-1.66-1.34-3-3-3h-6c-1.66 0-3 1.34-3 3s1.34 3 3 3h6c1.66 0 3-1.34 3-3zM17 30c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm7-28C11.87 2 2 11.87 2 24s9.87 22 22 22 22-9.87 22-22S36.13 2 24 2zm0 40c-9.93 0-18-8.08-18-18S14.07 6 24 6s18 8.08 18 18-8.07 18-18 18zm11-22c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-4 10c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_input_hdmi = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 14V8c0-2.21-1.79-4-4-4H16c-2.21 0-4 1.79-4 4v6h-2v12l6 12v6h16v-6l6-12V14h-2zM16 8h16v6h-4v-4h-2v4h-4v-4h-2v4h-4V8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_input_composite = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 4c0-1.1-.89-2-2-2s-2 .9-2 2v8H2v12h12V12h-4V4zm8 28c0 2.61 1.68 4.81 4 5.63V46h4v-8.37c2.32-.83 4-3.02 4-5.63v-4H18v4zM2 32c0 2.61 1.68 4.81 4 5.63V46h4v-8.37c2.32-.83 4-3.02 4-5.63v-4H2v4zm40-20V4c0-1.1-.89-2-2-2s-2 .9-2 2v8h-4v12h12V12h-4zM26 4c0-1.1-.89-2-2-2s-2 .9-2 2v8h-4v12h12V12h-4V4zm8 28c0 2.61 1.68 4.81 4 5.63V46h4v-8.37c2.32-.83 4-3.02 4-5.63v-4H34v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_input_component = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 4c0-1.1-.89-2-2-2s-2 .9-2 2v8H2v12h12V12h-4V4zm8 28c0 2.61 1.68 4.81 4 5.63V46h4v-8.37c2.32-.83 4-3.02 4-5.63v-4H18v4zM2 32c0 2.61 1.68 4.81 4 5.63V46h4v-8.37c2.32-.83 4-3.02 4-5.63v-4H2v4zm40-20V4c0-1.1-.89-2-2-2s-2 .9-2 2v8h-4v12h12V12h-4zM26 4c0-1.1-.89-2-2-2s-2 .9-2 2v8h-4v12h12V12h-4V4zm8 28c0 2.61 1.68 4.81 4 5.63V46h4v-8.37c2.32-.83 4-3.02 4-5.63v-4H34v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_input_antenna = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 10c-7.73 0-14 6.27-14 14h4c0-5.52 4.48-10 10-10s10 4.48 10 10h4c0-7.73-6.27-14-14-14zm2 18.58c1.76-.77 3-2.53 3-4.58 0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.05 1.24 3.81 3 4.58v6.59L15.17 42 18 44.83l6-6 6 6L32.83 42 26 35.17v-6.59zM24 2C11.85 2 2 11.85 2 24h4c0-9.94 8.06-18 18-18s18 8.06 18 18h4c0-12.15-9.85-22-22-22z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_ethernet = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M15.54 13.52l-3.08-2.55L1.64 24l10.82 13.04 3.08-2.55L6.84 24l8.7-10.48zM14 26h4v-4h-4v4zm20-4h-4v4h4v-4zm-12 4h4v-4h-4v4zm13.54-15.04l-3.08 2.55L41.16 24l-8.7 10.48 3.08 2.55L46.36 24 35.54 10.96z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_cell = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 48h4v-4h-4v4zm8 0h4v-4h-4v4zm8 0h4v-4h-4v4zM32 .02L16 0c-2.21 0-4 1.79-4 4v32c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V4c0-2.21-1.79-3.98-4-3.98zM32 32H16V8h16v24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_brightness = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 6H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32.03H6V9.97h36v28.06zM16 32h5l3 3 3-3h5v-5l3-3-3-3v-5h-5l-3-3-3 3h-5v5l-3 3 3 3v5zm8-14c3.31 0 6 2.69 6 6s-2.69 6-6 6V18z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_bluetooth = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 48h4v-4h-4v4zm-8 0h4v-4h-4v4zm16 0h4v-4h-4v4zm5.41-36.59L24 0h-2v15.17L12.83 6 10 8.83 21.17 20 10 31.17 12.83 34 22 24.83V40h2l11.41-11.41L26.83 20l8.58-8.59zM26 7.66l3.76 3.76L26 15.17V7.66zm3.76 20.93L26 32.34v-7.51l3.76 3.76z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_backup_restore = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 24c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4zM24 6C14.06 6 6 14.06 6 24H0l8 8 8-8h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.03 0-5.82-.97-8.12-2.61l-2.83 2.87C16.09 40.6 19.88 42 24 42c9.94 0 18-8.06 18-18S33.94 6 24 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings_application = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 20c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-3.5 18c0 .46-.04.92-.1 1.37l2.96 2.32c.26.21.34.59.16.89l-2.8 4.85c-.17.3-.54.42-.86.3l-3.49-1.41c-.72.56-1.51 1.02-2.37 1.38l-.52 3.71c-.04.33-.33.59-.68.59h-5.6c-.35 0-.64-.26-.69-.59l-.52-3.71c-.85-.35-1.64-.82-2.37-1.38l-3.48 1.4c-.32.12-.68 0-.86-.3l-2.8-4.85c-.18-.3-.1-.68.16-.89l2.96-2.31c-.06-.45-.1-.9-.1-1.37 0-.46.04-.92.1-1.37l-2.96-2.31c-.26-.21-.34-.59-.16-.89l2.8-4.85c.18-.3.54-.42.86-.3l3.48 1.4c.72-.55 1.51-1.02 2.37-1.38l.52-3.71c.05-.33.34-.59.69-.59h5.6c.35 0 .64.26.69.59l.52 3.71c.85.35 1.64.82 2.37 1.38l3.48-1.4c.32-.12.68 0 .86.3l2.8 4.85c.18.3.1.68-.16.89l-2.96 2.32c.06.44.1.9.1 1.36z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$settings = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97L9.9 10.1c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$search = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$schedule = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm1-26h-3v12l10.49 6.3L34 29.84l-9-5.34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$rowing = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M17 29l-9 9 3 3 7-7h4l-5-5zM30 2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm12 40.02L36 48l-5.98-6.02V39l-14.2-14.18c-.62.1-1.22.14-1.82.14v-4.32c3.32.06 7.22-1.74 9.34-4.08l2.8-3.1c.38-.42.86-.76 1.38-1 .58-.28 1.24-.46 1.92-.46h.06c2.48.02 4.5 2.04 4.5 4.52v11.5c0 1.68-.7 3.22-1.84 4.32L25 25.18v-4.54c-1.26 1.04-2.86 2.04-4.58 2.78L33 36h3l6 6.02z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$rounded_corner = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 38h4v4h-4v-4zm0-4h4v-4h-4v4zM6 26h4v-4H6v4zm0 8h4v-4H6v4zm0-16h4v-4H6v4zm0-8h4V6H6v4zm8 0h4V6h-4v4zm16 32h4v-4h-4v4zm-8 0h4v-4h-4v4zm8 0h4v-4h-4v4zm-16 0h4v-4h-4v4zm-8 0h4v-4H6v4zm36-26c0-5.51-4.49-10-10-10H22v4h10c3.31 0 6 2.69 6 6v10h4V16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$room = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$restore_page = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 4H12C9.8 4 8.02 5.8 8.02 8L8 40c0 2.2 1.78 4 3.98 4H36c2.2 0 4-1.8 4-4V16L28 4zm-4 32c-4.1 0-7.61-2.47-9.16-6h3.42c1.27 1.81 3.36 3 5.73 3 3.87 0 7-3.13 7-7s-3.13-7-7-7c-2.71 0-5.03 1.55-6.19 3.81L21 26h-8v-8l2.6 2.6c1.78-2.76 4.87-4.6 8.4-4.6 5.52 0 10 4.48 10 10s-4.48 10-10 10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$restore = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M25.99 6C16.04 6 8 14.06 8 24H2l7.79 7.79.14.29L18 24h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83C16.53 39.98 21.02 42 25.99 42 35.94 42 44 33.94 44 24S35.94 6 25.99 6zM24 16v10l8.56 5.08L34 28.65l-7-4.15V16h-3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$report_problem = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M2 42h44L24 4 2 42zm24-6h-4v-4h4v4zm0-8h-4v-8h4v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$reorder = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$remove_shopping_cart = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M45.46 45.46L5.54 5.54 4 4 2.54 2.54 0 5.08l8.78 8.78 4.42 9.32-2.7 4.9c-.32.56-.5 1.22-.5 1.92 0 2.2 1.8 4 4 4h14.92l2.76 2.76c-1 .73-1.66 1.91-1.66 3.24 0 2.2 1.78 4 3.98 4 1.33 0 2.51-.67 3.24-1.68L42.92 48l2.54-2.54zM14.84 30c-.28 0-.5-.22-.5-.5l.06-.24L16.2 26h4.72l4 4H14.84zm16.26-4c1.5 0 2.82-.82 3.5-2.06l7.16-12.98c.16-.28.24-.62.24-.96 0-1.1-.9-2-2-2H13.08l18 18h.02zM14 36c-2.2 0-3.98 1.8-3.98 4s1.78 4 3.98 4 4-1.8 4-4-1.8-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$redeem = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 12h-4.37c.22-.63.37-1.29.37-2 0-3.31-2.69-6-6-6-2.09 0-3.93 1.07-5 2.69l-1 1.36-1-1.36C21.93 5.07 20.09 4 18 4c-3.31 0-6 2.69-6 6 0 .71.14 1.37.37 2H8c-2.21 0-3.98 1.79-3.98 4L4 38c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zM30 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM18 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm22 30H8v-4h32v4zm0-10H8V16h10.16L14 21.67 17.25 24 22 17.53l2-2.72 2 2.72L30.75 24 34 21.67 29.84 16H40v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$record_voice_over = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 30c-5.34 0-16 2.68-16 8v4h32v-4c0-5.32-10.66-8-16-8zm15.52-19.27l-3.37 3.38c1.68 2.37 1.68 5.41 0 7.78l3.37 3.38c4.04-4.06 4.04-10.15 0-14.54zM40.15 4l-3.26 3.26c5.54 6.05 5.54 15.11-.01 21.47L40.15 32c7.8-7.77 7.8-19.91 0-28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$cx('18'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$cy('18'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$r('8'),
							_1: {ctor: '[]'}
						}
					}
				},
				{ctor: '[]'}),
			_1: {ctor: '[]'}
		}
	});
var _elm_community$material_icons$Material_Icons_Action$receipt = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 34H12v-4h24v4zm0-8H12v-4h24v4zm0-8H12v-4h24v4zM6 44l3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3V4l-3 3-3-3-3 3-3-3-3 3-3-3-3 3-3-3-3 3-3-3-3 3-3-3v40z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$question_answer = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 12h-4v18H12v4c0 1.1.9 2 2 2h22l8 8V14c0-1.1-.9-2-2-2zm-8 12V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v28l8-8h20c1.1 0 2-.9 2-2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$query_builder = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm1-26h-3v12l10.49 6.3L34 29.84l-9-5.34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$print = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 16H10c-3.31 0-6 2.69-6 6v12h8v8h24v-8h8V22c0-3.31-2.69-6-6-6zm-6 22H16V28h16v10zm6-14c-1.11 0-2-.89-2-2s.89-2 2-2c1.11 0 2 .89 2 2s-.89 2-2 2zM36 6H12v8h24V6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$pregnant_woman = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 8c0-2.22 1.78-4 4-4s4 1.78 4 4-1.78 4-4 4-4-1.78-4-4zm14 18c-.02-2.69-1.66-5.02-4-6 0-3.31-2.69-6-6-6s-6 2.69-6 6v14h4v10h6V34h6v-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$power_settings_new = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M26 6h-4v20h4V6zm9.67 4.33l-2.83 2.83C35.98 15.73 38 19.62 38 24c0 7.73-6.27 14-14 14s-14-6.27-14-14c0-4.38 2.02-8.27 5.16-10.84l-2.83-2.83C8.47 13.63 6 18.52 6 24c0 9.94 8.06 18 18 18s18-8.06 18-18c0-5.48-2.47-10.37-6.33-13.67z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$polymer = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 8h-8L14.21 33.26 9 24l9-16h-8L1 24l9 16h8l15.79-25.26L39 24l-9 16h8l9-16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$play_for_work = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 10v11.17h-7l9 9 9-9h-7V10h-4zM12 28c0 6.62 5.38 12 12 12s12-5.38 12-12h-4c0 4.42-3.58 8-8 8s-8-3.58-8-8h-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$picture_in_picture_alt = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 22H22v11.99h16V22zm8 16V9.96C46 7.76 44.2 6 42 6H6C3.8 6 2 7.76 2 9.96V38c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4zm-4 .04H6V9.94h36v28.1z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$picture_in_picture = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 14H22v12h16V14zm4-8H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96V10c0-2.21-1.79-4-4-4zm0 32.03H6V9.97h36v28.06z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$pets = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34.68 29.72c-1.75-2.03-3.21-3.78-4.96-5.81-.93-1.08-2.1-2.17-3.49-2.64-.21-.07-.43-.13-.66-.17-.51-.1-1.05-.1-1.57-.1s-1.06 0-1.57.1c-.22.04-.44.1-.66.17-1.39.47-2.56 1.56-3.49 2.64-1.75 2.03-3.21 3.78-4.96 5.81-2.62 2.61-5.83 5.52-5.25 9.59.58 2.03 2.04 4.07 4.67 4.65 1.46.29 6.12-.87 11.08-.87.06 0 .12.01.18.01s.12-.01.18-.01c4.96 0 9.62 1.16 11.08.87 2.62-.58 4.08-2.61 4.67-4.65.58-4.07-2.62-6.98-5.25-9.59z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$cx('9'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$cy('19'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$r('5'),
							_1: {ctor: '[]'}
						}
					}
				},
				{ctor: '[]'}),
			_1: {ctor: '[]'}
		}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_scan_wifi = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 6C13.91 6 6.29 9.7 0 14.47L24 44l24-29.5C41.71 9.74 34.09 6 24 6zm2 26h-4V20h4v12zm-4-16v-4h4v4h-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_phone_msg = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 31c-2.49 0-4.9-.4-7.14-1.14-.69-.22-1.48-.06-2.03.49l-4.4 4.41c-5.67-2.88-10.29-7.51-13.18-13.17l4.4-4.42c.55-.55.71-1.34.49-2.03C17.4 12.9 17 10.49 17 8c0-1.11-.89-2-2-2H8c-1.1 0-2 .89-2 2 0 18.78 15.22 34 34 34 1.11 0 2-.89 2-2v-7c0-1.11-.89-2-2-2zM24 6v20l6-6h12V6H24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_media = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M4 12H0v10h.02L0 40c0 2.21 1.79 4 4 4h36v-4H4V12zm40-4H28l-4-4H12C9.79 4 8.02 5.79 8.02 8L8 32c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM14 30l9-12 7 9.01L35 21l7 9H14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_identity = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 11.8c2.32 0 4.2 1.88 4.2 4.2s-1.88 4.2-4.2 4.2-4.2-1.88-4.2-4.2 1.88-4.2 4.2-4.2m0 18c5.95 0 12.2 2.91 12.2 4.2v2.2H11.8V34c0-1.29 6.25-4.2 12.2-4.2M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 18c-5.33 0-16 2.67-16 8v6h32v-6c0-5.33-10.67-8-16-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_device_information = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M26 14h-4v4h4v-4zm0 8h-4v12h4V22zm8-19.98L14 2c-2.21 0-4 1.79-4 4v36c0 2.21 1.79 4 4 4h20c2.21 0 4-1.79 4-4V6c0-2.21-1.79-3.98-4-3.98zM34 38H14V10h20v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_data_setting = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M37.98 23c.68 0 1.36.06 2.02.15V0L0 40h23.13c-.09-.66-.15-1.32-.15-2 0-8.28 6.72-15 15-15zm7.43 15.98c.04-.32.07-.64.07-.98 0-.33-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.37-2.65c-.04-.24-.25-.42-.5-.42h-4c-.25 0-.46.18-.49.42l-.37 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.13.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.37 2.65c.04.24.25.42.49.42h4c.25 0 .45-.18.49-.42l.37-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.1-1.65zM37.98 41c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_contact_calendar = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-2V2h-4v4H16V2h-4v4h-2c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-14 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm12 24H12v-2c0-4 8-6.2 12-6.2S36 30 36 34v2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$perm_camera_mic = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 10h-6.34L30 6H18l-3.66 4H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h14v-4.18c-5.67-.96-10-5.89-10-11.82h4c0 4.41 3.59 8 8 8s8-3.59 8-8h4c0 5.93-4.33 10.86-10 11.82V42h14c2.21 0 4-1.79 4-4V14c0-2.21-1.79-4-4-4zM28 26c0 2.21-1.79 4-4 4s-4-1.79-4-4v-8c0-2.21 1.79-4 4-4s4 1.79 4 4v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$payment = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H8V24h32v12zm0-20H8v-4h32v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$pan_tool = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M46 11v29c0 4.4-3.6 8-8 8H23.4c-2.16 0-4.2-.86-5.7-2.38L2 29.66s2.52-2.46 2.6-2.5c.44-.38.98-.58 1.58-.58.44 0 .84.12 1.2.32.08.02 8.62 4.92 8.62 4.92V8c0-1.66 1.34-3 3-3s3 1.34 3 3v14h2V3c0-1.66 1.34-3 3-3s3 1.34 3 3v19h2V5c0-1.66 1.34-3 3-3s3 1.34 3 3v17h2V11c0-1.66 1.34-3 3-3s3 1.34 3 3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$pageview = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23 18c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm-6.41 28.41l-5.81-5.81c-1.39.88-3.02 1.4-4.78 1.4-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9c0 1.76-.52 3.39-1.4 4.77l5.82 5.8-2.83 2.84z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$open_with = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 18h8v-6h6L24 2 14 12h6v6zm-2 2h-6v-6L2 24l10 10v-6h6v-8zm28 4L36 14v6h-6v8h6v6l10-10zm-18 6h-8v6h-6l10 10 10-10h-6v-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$open_in_new = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 38H10V10h14V6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V24h-4v14zM28 6v4h7.17L15.51 29.66l2.83 2.83L38 12.83V20h4V6H28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$open_in_browser = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h8v-4h-8V16h28v20h-8v4h8c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM24 20l-8 8h6v12h4V28h6l-8-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$opacity = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35.32 15.99L24 4.69l-11.32 11.3C9.56 19.11 8 23.27 8 27.27s1.56 8.22 4.68 11.34 7.22 4.7 11.32 4.7 8.2-1.58 11.32-4.7S40 31.27 40 27.27s-1.56-8.16-4.68-11.28zM12 28c.02-4 1.24-6.55 3.52-8.81L24 10.53l8.48 8.75C34.76 21.55 35.98 24 36 28H12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$offline_pin = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$note_add = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 4H12C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c2.21 0 4-1.79 4-4V16L28 4zm4 28h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4zm-6-14V7l11 11H26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$motorcycle = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.88 18.06L30.82 10H22v4h7.18l4 4H10C4.4 18 0 22.4 0 28s4.4 10 10 10c4.92 0 8.9-3.38 9.8-8h3.3l5.54-5.54C28.22 25.54 28 26.74 28 28c0 5.6 4.4 10 10 10s10-4.4 10-10c0-5.3-3.94-9.54-9.12-9.94zM15.64 30c-.84 2.3-3.08 4-5.64 4-3.26 0-6-2.74-6-6s2.74-6 6-6c2.56 0 4.8 1.7 5.64 4H10v4h5.64zM38 34c-3.32 0-6-2.68-6-6s2.68-6 6-6 6 2.68 6 6-2.68 6-6 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$markunread_mailbox = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 12H20v12h-4V8h12V0H12v12H8c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$loyalty = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42.82 23.16L24.83 5.17C24.11 4.45 23.11 4 22 4H8C5.79 4 4 5.79 4 8v14c0 1.11.45 2.11 1.18 2.83l18 18C23.9 43.55 24.9 44 26 44c1.11 0 2.11-.45 2.83-1.17l14-14C43.55 28.1 44 27.1 44 26c0-1.11-.45-2.11-1.18-2.84zM11 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm23.54 16.54L26 39.08l-8.54-8.54C16.56 29.63 16 28.38 16 27c0-2.76 2.24-5 5-5 1.38 0 2.64.56 3.54 1.47L26 24.93l1.46-1.46C28.37 22.56 29.62 22 31 22c2.76 0 5 2.24 5 5 0 1.38-.56 2.63-1.46 3.54z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$lock_outline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 34c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm12-18h-2v-4c0-5.52-4.48-10-10-10S14 6.48 14 12v4h-2c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V20c0-2.2-1.8-4-4-4zm-18.2-4c0-3.42 2.78-6.2 6.2-6.2s6.2 2.78 6.2 6.2v4H17.8v-4zM36 40H12V20h24v20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$lock_open = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 34c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm12-18h-2v-4c0-5.52-4.48-10-10-10S14 6.48 14 12h3.8c0-3.42 2.78-6.2 6.2-6.2 3.42 0 6.2 2.78 6.2 6.2v4H12c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V20c0-2.21-1.79-4-4-4zm0 24H12V20h24v20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$lock = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 16h-2v-4c0-5.52-4.48-10-10-10S14 6.48 14 12v4h-2c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V20c0-2.21-1.79-4-4-4zM24 34c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.2-18H17.8v-4c0-3.42 2.78-6.2 6.2-6.2 3.42 0 6.2 2.78 6.2 6.2v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$list = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 26h4v-4H6v4zm0 8h4v-4H6v4zm0-16h4v-4H6v4zm8 8h28v-4H14v4zm0 8h28v-4H14v4zm0-20v4h28v-4H14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$line_weight = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 34h36v-4H6v4zm0 6h36v-2H6v2zm0-14h36v-6H6v6zM6 8v8h36V8H6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$line_style = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 32h10v-4H6v4zm13 0h10v-4H19v4zm13 0h10v-4H32v4zM6 40h4v-4H6v4zm8 0h4v-4h-4v4zm8 0h4v-4h-4v4zm8 0h4v-4h-4v4zm8 0h4v-4h-4v4zM6 24h16v-4H6v4zm20 0h16v-4H26v4zM6 8v8h36V8H6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$lightbulb_outline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 42c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2H18v2zm6-38c-7.73 0-14 6.27-14 14 0 4.76 2.38 8.95 6 11.48V34c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.52c3.62-2.53 6-6.72 6-11.48 0-7.73-6.27-14-14-14zm5.71 22.2L28 27.39V32h-8v-4.6l-1.71-1.19C15.6 24.33 14 21.27 14 18.01c0-5.51 4.49-10 10-10s10 4.49 10 10c0 3.25-1.6 6.31-4.29 8.19z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$launch = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 38H10V10h14V6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V24h-4v14zM28 6v4h7.17L15.51 29.66l2.83 2.83L38 12.83V20h4V6H28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$language = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zm13.85 12h-5.9c-.65-2.5-1.56-4.9-2.76-7.12 3.68 1.26 6.74 3.81 8.66 7.12zM24 8.07c1.67 2.4 2.97 5.07 3.82 7.93h-7.64c.85-2.86 2.15-5.53 3.82-7.93zM8.52 28C8.19 26.72 8 25.38 8 24s.19-2.72.52-4h6.75c-.16 1.31-.27 2.64-.27 4 0 1.36.11 2.69.28 4H8.52zm1.63 4h5.9c.65 2.5 1.56 4.9 2.76 7.13-3.68-1.26-6.74-3.82-8.66-7.13zm5.9-16h-5.9c1.92-3.31 4.98-5.87 8.66-7.13-1.2 2.23-2.11 4.63-2.76 7.13zM24 39.93c-1.66-2.4-2.96-5.07-3.82-7.93h7.64c-.86 2.86-2.16 5.53-3.82 7.93zM28.68 28h-9.36c-.19-1.31-.32-2.64-.32-4 0-1.36.13-2.69.32-4h9.36c.19 1.31.32 2.64.32 4 0 1.36-.13 2.69-.32 4zm.51 11.12c1.2-2.23 2.11-4.62 2.76-7.12h5.9c-1.93 3.31-4.99 5.86-8.66 7.12zM32.72 28c.16-1.31.28-2.64.28-4 0-1.36-.11-2.69-.28-4h6.75c.33 1.28.53 2.62.53 4s-.19 2.72-.53 4h-6.75z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$label_outline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35.27 11.69C34.54 10.67 33.35 10 32 10l-22 .02c-2.21 0-4 1.77-4 3.98v20c0 2.21 1.79 3.98 4 3.98L32 38c1.35 0 2.54-.67 3.27-1.69L44 24l-8.73-12.31zM32 34H10V14h22l7.09 10L32 34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$label = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35.27 11.69C34.54 10.67 33.35 10 32 10l-22 .02c-2.21 0-4 1.77-4 3.98v20c0 2.21 1.79 3.98 4 3.98L32 38c1.35 0 2.54-.67 3.27-1.69L44 24l-8.73-12.31z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$invert_colors = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35.31 15.86L24 4.54 12.69 15.86c-6.25 6.25-6.25 16.38 0 22.63 3.12 3.12 7.22 4.69 11.31 4.69s8.19-1.56 11.31-4.69c6.25-6.25 6.25-16.38 0-22.63zM24 39.17c-3.21 0-6.22-1.25-8.48-3.52-2.27-2.26-3.52-5.27-3.52-8.48s1.25-6.22 3.52-8.49L24 10.2v28.97z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$input = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 6.02H6c-2.21 0-4 1.79-4 4V18h4V9.98h36v28.06H6V30H2v8.02c0 2.21 1.79 3.96 4 3.96h36c2.21 0 4-1.76 4-3.96v-28c0-2.21-1.79-4-4-4zM22 32l8-8-8-8v6H2v4h20v6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$info_outline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 34h4V22h-4v12zm2-30C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$info = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4V22h4v12zm0-16h-4v-4h4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$important_devices = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 18h-6.06L22 12l-1.94 6H14l4.94 3.52-1.88 5.82 4.94-3.6 4.94 3.6-1.88-5.82zm0 0h-6.06L22 12l-1.94 6H14l4.94 3.52-1.88 5.82 4.94-3.6 4.94 3.6-1.88-5.82zm16 4.01L36 22c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V24c0-1.1-.9-1.99-2-1.99zM46 40H36V26h10v14zM40 4H4C1.78 4 0 5.78 0 8v24c0 2.2 1.78 4 4 4h14v4h-4v4h16v-4h-4v-4h4v-4H4V8h36v10h4V8c0-2.22-1.8-4-4-4zM23.94 18L22 12l-1.94 6H14l4.94 3.52-1.88 5.82 4.94-3.6 4.94 3.6-1.88-5.82L30 18h-6.06z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$https = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 16h-2v-4c0-5.52-4.48-10-10-10S14 6.48 14 12v4h-2c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V20c0-2.21-1.79-4-4-4zM24 34c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.2-18H17.8v-4c0-3.42 2.78-6.2 6.2-6.2 3.42 0 6.2 2.78 6.2 6.2v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$http = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M9 22H5v-4H2v12h3v-5h4v5h3V18H9v4zm5-1h3v9h3v-9h3v-3h-9v3zm11 0h3v9h3v-9h3v-3h-9v3zm18-3h-7v12h3v-4h4c1.7 0 3-1.3 3-3v-2c0-1.7-1.3-3-3-3zm0 5h-4v-2h4v2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$hourglass_full = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 4H12v11h.02l-.02.02L20.98 24 12 32.98l.02.02H12v11h24V33h-.02l.02-.02L27.02 24 36 15.02l-.02-.02H36V4h-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$hourglass_empty = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 5v10l9 9-9 9v10h24V33l-9-9 9-9V5H12zm20 29v5H16v-5l8-8 8 8zm-8-12l-8-8V9h16v5l-8 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$home = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 40V28h8v12h10V24h6L24 6 4 24h6v16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$history = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M25.99 6C16.04 6 8 14.06 8 24H2l7.79 7.79.14.29L18 24h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83C16.53 39.98 21.02 42 25.99 42 35.94 42 44 33.94 44 24S35.94 6 25.99 6zM24 16v10l8.56 5.08L34 28.65l-7-4.15V16h-3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$highlight_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M29.17 16L24 21.17 18.83 16 16 18.83 21.17 24 16 29.17 18.83 32 24 26.83 29.17 32 32 29.17 26.83 24 32 18.83 29.17 16zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$help_outline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$help = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$group_work = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20s20-8.96 20-20c0-11.05-8.95-20-20-20zm-8 31c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3-19c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zm13 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$grade = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 34.54L36.36 42l-3.27-14.06L44 18.49l-14.38-1.24L24 4l-5.62 13.25L4 18.49l10.91 9.45L11.64 42z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$gif = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$get_app = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 18h-8V6H18v12h-8l14 14 14-14zM10 36v4h28v-4H10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$gavel = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M2 42h24v4H2zm8.49-25.858l5.658-5.657L44.432 38.77l-5.657 5.656zM24.627 2.006L35.94 13.32l-5.656 5.656L18.97 7.663zm-16.97 16.97L18.97 30.29l-5.656 5.657L2 24.633z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$g_translate = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 10H21.76L20 4H8C5.8 4 4 5.8 4 8v26c0 2.2 1.8 4 4 4h14l2 6h16c2.2 0 4-1.8 4-4V14c0-2.2-1.8-4-4-4zM14.33 29.17c-4.51 0-8.17-3.67-8.17-8.17s3.67-8.17 8.17-8.17c2.08 0 3.97.74 5.47 2.13l.13.13-2.44 2.36-.12-.11c-.57-.54-1.56-1.17-3.04-1.17-2.62 0-4.75 2.17-4.75 4.84s2.13 4.84 4.75 4.84c2.74 0 3.93-1.75 4.25-2.92h-4.42v-3.1h7.9l.03.14c.08.42.11.79.11 1.21-.01 4.71-3.24 7.99-7.87 7.99zm12.07-3.4c.67 1.2 1.48 2.35 2.38 3.4l-1.07 1.06-1.31-4.46zm1.54-1.54h-1.98l-.61-2.08h7.99s-.68 2.63-3.12 5.47c-1.07-1.23-1.81-2.43-2.28-3.39zM42 40c0 1.1-.9 2-2 2H26l4-4-1.63-5.53 1.84-1.84L35.58 36l1.46-1.46-5.41-5.37c1.8-2.07 3.2-4.5 3.83-7.01H38v-2.08h-7.27V18h-2.08v2.08h-3.92L22.35 12H40c1.1 0 2 .9 2 2v26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$flip_to_front = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 26h4v-4H6v4zm0 8h4v-4H6v4zm4 8v-4H6c0 2.21 1.79 4 4 4zM6 18h4v-4H6v4zm24 24h4v-4h-4v4zm8-36H18c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h20c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 24H18V10h20v20zM22 42h4v-4h-4v4zm-8 0h4v-4h-4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$flip_to_back = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 14h-4v4h4v-4zm0 8h-4v4h4v-4zm0-16c-2.21 0-4 1.79-4 4h4V6zm8 24h-4v4h4v-4zM38 6v4h4c0-2.21-1.79-4-4-4zM26 6h-4v4h4V6zm-8 28v-4h-4c0 2.21 1.79 4 4 4zm20-8h4v-4h-4v4zm0-8h4v-4h-4v4zm0 16c2.21 0 4-1.79 4-4h-4v4zM10 14H6v24c0 2.21 1.79 4 4 4h24v-4H10V14zm20-4h4V6h-4v4zm0 24h4v-4h-4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$flight_takeoff = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M5 38h38v4H5zm39.14-18.73c-.43-1.6-2.07-2.55-3.67-2.12L29.84 20 16.04 7.13l-3.86 1.04 8.28 14.35-9.94 2.66-3.93-3.09-2.9.78 3.64 6.31 1.53 2.65 3.21-.86 10.63-2.85 8.69-2.33 10.63-2.85c1.6-.43 2.55-2.07 2.12-3.67z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$flight_land = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M5 38h38v4H5zm14.37-11.46l8.69 2.33 10.63 2.85c1.6.43 3.24-.52 3.67-2.12.43-1.6-.52-3.24-2.12-3.67l-10.63-2.85L24.1 5.04 20.23 4v16.56L10.3 17.9l-1.86-4.64-2.9-.78v10.35l3.21.86 10.62 2.85z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$fingerprint = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35.62 8.94c-.16 0-.31-.04-.46-.11C31.33 6.85 28 6 24.02 6c-3.97 0-7.71.95-11.14 2.82-.49.26-1.09.09-1.36-.4-.26-.49-.09-1.09.4-1.36C15.65 5.03 19.72 4 24.02 4c4.26 0 7.98.94 12.06 3.05.49.25.68.86.43 1.35-.18.34-.53.54-.89.54zM7 19.44c-.2 0-.4-.06-.58-.18-.45-.32-.56-.94-.24-1.39 1.98-2.8 4.51-5 7.51-6.55 6.29-3.25 14.33-3.26 20.63-.02 2.99 1.54 5.51 3.72 7.5 6.5.32.45.22 1.07-.23 1.39-.45.32-1.08.22-1.4-.23-1.8-2.52-4.08-4.5-6.78-5.88-5.74-2.95-13.07-2.94-18.8.02-2.71 1.4-5 3.39-6.79 5.93-.2.27-.51.41-.82.41zm12.51 24.13c-.26 0-.51-.1-.71-.3-1.73-1.75-2.67-2.86-4.02-5.27-1.38-2.46-2.11-5.47-2.11-8.69 0-5.94 5.08-10.78 11.33-10.78s11.33 4.83 11.33 10.78c0 .55-.45 1-1 1s-1-.45-1-1c0-4.84-4.18-8.78-9.33-8.78-5.14 0-9.33 3.94-9.33 8.78 0 2.88.64 5.54 1.85 7.71 1.29 2.3 2.15 3.29 3.69 4.84.39.39.39 1.03-.01 1.41-.18.21-.44.3-.69.3zm14.33-3.7c-2.38 0-4.47-.6-6.2-1.77-2.97-2.02-4.75-5.3-4.75-8.78 0-.55.45-1 1-1s1 .45 1 1c0 2.81 1.45 5.47 3.88 7.12 1.41.96 3.07 1.43 5.07 1.43.48 0 1.29-.05 2.09-.19.54-.1 1.06.27 1.16.81.1.54-.27 1.06-.81 1.16-1.17.21-2.16.22-2.44.22zM29.81 44c-.09 0-.18-.01-.26-.04-3.19-.87-5.27-2.05-7.43-4.2-2.79-2.78-4.33-6.49-4.33-10.44 0-3.25 2.76-5.89 6.16-5.89 3.4 0 6.16 2.64 6.16 5.89 0 2.14 1.87 3.89 4.16 3.89s4.16-1.74 4.16-3.89c0-7.54-6.5-13.67-14.49-13.67-5.69 0-10.88 3.16-13.22 8.06-.78 1.62-1.17 3.51-1.17 5.61 0 1.56.14 4.02 1.33 7.21.19.52-.07 1.09-.59 1.29-.52.19-1.09-.07-1.29-.59-.98-2.63-1.46-5.21-1.46-7.91 0-2.4.46-4.58 1.37-6.47 2.67-5.58 8.57-9.19 15.02-9.19 9.09 0 16.49 7.03 16.49 15.67 0 3.25-2.77 5.89-6.16 5.89s-6.16-2.64-6.16-5.89c0-2.14-1.87-3.89-4.16-3.89s-4.16 1.74-4.16 3.89c0 3.41 1.33 6.62 3.74 9.02 1.89 1.88 3.73 2.92 6.55 3.69.53.15.85.7.7 1.23-.12.44-.52.73-.96.73z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$find_replace = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 12c2.76 0 5.26 1.12 7.07 2.93L24 20h12V8l-4.1 4.1C29.37 9.57 25.87 8 22 8 14.95 8 9.13 13.22 8.16 20h4.04c.93-4.56 4.96-8 9.8-8zm11.28 18.27c1.33-1.81 2.23-3.95 2.56-6.27H31.8c-.93 4.56-4.96 8-9.8 8-2.76 0-5.26-1.12-7.07-2.93L20 24H8v12l4.1-4.1c2.53 2.53 6.03 4.1 9.9 4.1 3.1 0 5.96-1.02 8.28-2.73L40 42.98 42.98 40l-9.7-9.73z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$find_in_page = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 39.17V16L28 4H12C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c.89 0 1.71-.3 2.37-.8l-8.87-8.87C27.93 35.38 26.04 36 24 36c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10c0 2.04-.62 3.93-1.66 5.51L40 39.17zM18 26c0 3.31 2.69 6 6 6s6-2.69 6-6-2.69-6-6-6-6 2.69-6 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$feedback = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 4H8C5.79 4 4.02 5.79 4.02 8L4 44l8-8h28c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM26 28h-4v-4h4v4zm0-8h-4v-8h4v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$favorite_border = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M33 6c-3.48 0-6.82 1.62-9 4.17C21.82 7.62 18.48 6 15 6 8.83 6 4 10.83 4 17c0 7.55 6.8 13.72 17.1 23.07L24 42.7l2.9-2.63C37.2 30.72 44 24.55 44 17c0-6.17-4.83-11-11-11zm-8.79 31.11l-.21.19-.21-.19C14.28 28.48 8 22.78 8 17c0-3.99 3.01-7 7-7 3.08 0 6.08 1.99 7.13 4.72h3.73C26.92 11.99 29.92 10 33 10c3.99 0 7 3.01 7 7 0 5.78-6.28 11.48-15.79 20.11z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$favorite = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 42.7l-2.9-2.63C10.8 30.72 4 24.55 4 17 4 10.83 8.83 6 15 6c3.48 0 6.82 1.62 9 4.17C26.18 7.62 29.52 6 33 6c6.17 0 11 4.83 11 11 0 7.55-6.8 13.72-17.1 23.07L24 42.7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$face = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 23.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm12 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16 0-.58.04-1.15.1-1.71 4.71-2.09 8.47-5.95 10.42-10.74 3.62 5.1 9.57 8.45 16.31 8.45 1.55 0 3.06-.19 4.5-.53.43 1.44.67 2.96.67 4.53 0 8.82-7.18 16-16 16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$extension = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M41 22h-3v-8c0-2.21-1.79-4-4-4h-8V7c0-2.76-2.24-5-5-5s-5 2.24-5 5v3H8c-2.21 0-3.98 1.79-3.98 4l-.01 7.6H7c2.98 0 5.4 2.42 5.4 5.4S9.98 32.4 7 32.4H4.01L4 40c0 2.21 1.79 4 4 4h7.6v-3c0-2.98 2.42-5.4 5.4-5.4 2.98 0 5.4 2.42 5.4 5.4v3H34c2.21 0 4-1.79 4-4v-8h3c2.76 0 5-2.24 5-5s-2.24-5-5-5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$explore = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 21.8c-1.21 0-2.2.99-2.2 2.2s.99 2.2 2.2 2.2c1.22 0 2.2-.99 2.2-2.2s-.98-2.2-2.2-2.2zM24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20s20-8.96 20-20c0-11.05-8.95-20-20-20zm4.38 24.38L12 36l7.62-16.38L36 12l-7.62 16.38z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$exit_to_app = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20.17 31.17L23 34l10-10-10-10-2.83 2.83L25.34 22H6v4h19.34l-5.17 5.17zM38 6H10c-2.21 0-4 1.79-4 4v8h4v-8h28v28H10v-8H6v8c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$event_seat = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 36v6h6v-6h20v6h6V30H8zm30-16h6v6h-6zM4 20h6v6H4zm30 6H14V10c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$event = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 24H24v10h10V24zM32 2v4H16V2h-4v4h-2c-2.21 0-3.98 1.79-3.98 4L6 38c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4h-2V2h-4zm6 36H10V16h28v22z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$euro_symbol = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 37c-5.01 0-9.36-2.84-11.53-7H30v-4H17.17c-.1-.65-.17-1.32-.17-2s.07-1.35.17-2H30v-4H18.47c2.17-4.16 6.51-7 11.53-7 3.23 0 6.18 1.18 8.45 3.13L42 10.6C38.82 7.75 34.61 6 30 6c-7.83 0-14.48 5.01-16.95 12H6v4h6.12c-.08.66-.12 1.32-.12 2 0 .68.04 1.34.12 2H6v4h7.05c2.47 6.99 9.12 12 16.95 12 4.61 0 8.82-1.75 12-4.6l-3.55-3.54C36.18 35.81 33.23 37 30 37z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$eject = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M5 17h14v2H5zm7-12L5.33 15h13.34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$donut_small = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 18.32V4C12 5 4 13.58 4 24s8 19 18 20V29.68c-2-.82-4-3.04-4-5.68s2-4.86 4-5.68zM29.72 22H44c-.96-9.5-8-17.06-18-18v14.32c2 .6 3.04 1.96 3.72 3.68zM26 29.68V44c10-.94 17.04-8.5 18-18H29.72c-.68 1.72-1.72 3.08-3.72 3.68z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$donut_large = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 10.16V4C12 5 4 13.62 4 24s8 19 18 20v-6.16c-6-.96-12-6.8-12-13.84s6-12.88 12-13.84zM37.94 22H44c-.94-10-8-17.06-18-18v6.16C32 11.02 37.08 16 37.94 22zM26 37.84V44c10-.94 17.06-8 18-18h-6.06C37.08 32 32 36.98 26 37.84z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$done_all = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 14l-2.83-2.83-12.68 12.69 2.83 2.83L36 14zm8.49-2.83L23.31 32.34 14.97 24l-2.83 2.83L23.31 38l24-24-2.82-2.83zM.83 26.83L12 38l2.83-2.83L3.66 24 .83 26.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$done = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 32.34L9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$dns = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 26H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2V28c0-1.1-.9-2-2-2zM14 38c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM40 6H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM14 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$description = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 4H12C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c2.21 0 4-1.79 4-4V16L28 4zm4 32H16v-4h16v4zm0-8H16v-4h16v4zm-6-10V7l11 11H26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$delete_forever = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24l2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$delete = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$date_range = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 22h-4v4h4v-4zm8 0h-4v4h4v-4zm8 0h-4v4h4v-4zm4-14h-2V4h-4v4H16V4h-4v4h-2c-2.22 0-3.98 1.8-3.98 4L6 40c0 2.2 1.78 4 4 4h28c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4zm0 32H10V18h28v22z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$dashboard = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 26h16V6H6v20zm0 16h16V30H6v12zm20 0h16V22H26v20zm0-36v12h16V6H26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$credit_card = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H8V24h32v12zm0-20H8v-4h32v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$copyright = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-3.84-18.27c.11-.65.31-1.23.6-1.74s.69-.92 1.18-1.23c.47-.29 1.06-.45 1.79-.46.48.01.92.09 1.3.26.41.18.75.42 1.04.72s.51.66.67 1.06.25.83.27 1.28h3.58c-.03-.94-.22-1.8-.55-2.58s-.81-1.45-1.41-2.02-1.32-1-2.16-1.31-1.77-.47-2.79-.47c-1.3 0-2.43.22-3.39.67s-1.76 1.06-2.4 1.84-1.12 1.68-1.43 2.71-.46 2.12-.46 3.27v.55c0 1.16.16 2.25.47 3.28s.79 1.93 1.43 2.7 1.44 1.38 2.41 1.83 2.1.67 3.4.67c.94 0 1.82-.15 2.64-.46s1.54-.73 2.16-1.27 1.12-1.16 1.48-1.88.57-1.48.6-2.3h-3.58c-.02.42-.12.8-.3 1.16s-.42.66-.72.91-.65.45-1.05.59c-.38.13-.78.2-1.21.2-.72-.02-1.31-.17-1.79-.47-.5-.32-.9-.73-1.19-1.24s-.49-1.09-.6-1.75-.15-1.3-.15-1.97v-.55c0-.68.05-1.35.16-2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$compare_arrows = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18.02 28H4v4h14.02v6L26 30l-7.98-8v6zm11.96-2v-6H44v-4H29.98v-6L22 18l7.98 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$code = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18.8 33.2L9.7 24l9.2-9.2L16 12 4 24l12 12 2.8-2.8zm10.4 0l9.2-9.2-9.2-9.2L32 12l12 12-12 12-2.8-2.8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$class = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 4H12C9.79 4 8 5.79 8 8v32c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM12 8h10v16l-5-3-5 3V8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$chrome_reader_mode = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M26 24h14v3H26zm0-5h14v3H26zm0 10h14v3H26zM42 8H6c-2.2 0-4 1.8-4 4v26c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4zm0 30H24V12h18v26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$check_circle = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$change_history = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 15.55L36.78 36H11.22L24 15.55M24 8L4 40h40L24 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$card_travel = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 12h-6V8c0-2.21-1.79-4-4-4H18c-2.21 0-4 1.79-4 4v4H8c-2.21 0-4 1.79-4 4v22c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zM18 8h12v4H18V8zm22 30H8v-4h32v4zm0-10H8V16h6v4h4v-4h12v4h4v-4h6v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$card_membership = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 4H8C5.79 4 4 5.79 4 8v22c0 2.21 1.79 4 4 4h8v10l8-4 8 4V34h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm0 26H8v-4h32v4zm0-10H8V8h32v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$card_giftcard = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 12h-4.37c.22-.63.37-1.3.37-2 0-3.31-2.69-6-6-6-2.09 0-3.93 1.07-5 2.69l-1 1.36-1-1.36C21.93 5.07 20.09 4 18 4c-3.31 0-6 2.69-6 6 0 .7.14 1.37.37 2H8c-2.21 0-3.98 1.79-3.98 4L4 38c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zM30 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM18 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm22 30H8v-4h32v4zm0-10H8V16h10.16L14 21.67 17.25 24 22 17.53l2-2.72 2 2.72L30.75 24 34 21.67 29.84 16H40v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$camera_enhance = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$cached = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 16l-8 8h6c0 6.63-5.37 12-12 12-2.03 0-3.93-.51-5.61-1.39l-2.92 2.92C17.95 39.08 20.86 40 24 40c8.84 0 16-7.16 16-16h6l-8-8zm-26 8c0-6.63 5.37-12 12-12 2.03 0 3.93.51 5.61 1.39l2.92-2.92C30.05 8.92 27.14 8 24 8 15.16 8 8 15.16 8 24H2l8 8 8-8h-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$build = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M45.4 37.9L27.1 19.6c1.8-4.6.8-10.1-2.9-13.8-4-4-10-4.8-14.8-2.5l8.7 8.7-6.1 6.1-8.7-8.7C1 14.2 1.8 20.2 5.8 24.2c3.7 3.7 9.2 4.7 13.8 2.9l18.3 18.3c.8.8 2.1.8 2.8 0l4.7-4.7c.8-.7.8-2 0-2.8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$bug_report = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 16h-5.62c-.9-1.56-2.14-2.91-3.63-3.92L34 8.83 31.17 6l-4.35 4.35c-.9-.22-1.85-.35-2.82-.35-.97 0-1.92.13-2.82.35L16.83 6 14 8.83l3.25 3.25c-1.49 1.01-2.73 2.36-3.63 3.92H8v4h4.18c-.11.65-.18 1.32-.18 2v2H8v4h4v2c0 .68.07 1.35.18 2H8v4h5.62c2.07 3.58 5.94 6 10.38 6s8.31-2.42 10.38-6H40v-4h-4.18c.11-.65.18-1.32.18-2v-2h4v-4h-4v-2c0-.68-.07-1.35-.18-2H40v-4zM28 32h-8v-4h8v4zm0-8h-8v-4h8v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$bookmark_border = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4zm0 30l-10-4.35L14 36V10h20v26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$bookmark = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$book = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 4H12C9.79 4 8 5.79 8 8v32c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM12 8h10v16l-5-3-5 3V8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$backup = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.71 20.07C37.35 13.19 31.28 8 24 8c-5.78 0-10.79 3.28-13.3 8.07C4.69 16.72 0 21.81 0 28c0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93zM28 26v8h-8v-8h-6l10-10 10 10h-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$autorenew = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 12v6l8-8-8-8v6C15.16 8 8 15.16 8 24c0 3.14.92 6.05 2.48 8.52l2.92-2.92c-.89-1.67-1.4-3.57-1.4-5.6 0-6.63 5.37-12 12-12zm13.52 3.48L34.6 18.4c.89 1.67 1.4 3.57 1.4 5.6 0 6.63-5.37 12-12 12v-6l-8 8 8 8v-6c8.84 0 16-7.16 16-16 0-3.14-.92-6.05-2.48-8.52z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$assignment_turned_in = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM24 6c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm-4 28l-8-8 2.83-2.83L20 28.34l13.17-13.17L36 18 20 34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$assignment_returned = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM24 6c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm0 30L14 26h6v-8h8v8h6L24 36z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$assignment_return = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM24 6c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm8 24h-8v6L14 26l10-10v6h8v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$assignment_late = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM26 36h-4v-4h4v4zm0-8h-4V16h4v12zm-2-18c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$assignment_ind = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM24 6c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm0 8c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm12 24H12v-2.8c0-4 8-6.2 12-6.2s12 2.2 12 6.2V38z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$assignment = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM24 6c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm4 28H14v-4h14v4zm6-8H14v-4h20v4zm0-8H14v-4h20v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$assessment = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM18 34h-4V20h4v14zm8 0h-4V14h4v20zm8 0h-4v-8h4v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$aspect_ratio = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 24h-4v6h-6v4h10V24zm-24-6h6v-4H10v10h4v-6zM42 6H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32.03H6V9.97h36v28.06z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$announcement = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 4H8C5.79 4 4.02 5.79 4.02 8L4 44l8-8h28c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM26 22h-4V10h4v12zm0 8h-4v-4h4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$android = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 36c0 1.1.9 2 2 2h2v7c0 1.66 1.34 3 3 3s3-1.34 3-3v-7h4v7c0 1.66 1.34 3 3 3s3-1.34 3-3v-7h2c1.1 0 2-.9 2-2V16H12v20zM7 16c-1.66 0-3 1.34-3 3v14c0 1.66 1.34 3 3 3s3-1.34 3-3V19c0-1.66-1.34-3-3-3zm34 0c-1.66 0-3 1.34-3 3v14c0 1.66 1.34 3 3 3s3-1.34 3-3V19c0-1.66-1.34-3-3-3zM31.06 4.32l2.61-2.61c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L29.3 3.25C27.7 2.46 25.91 2 24 2c-1.92 0-3.72.46-5.33 1.26L15.7.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.62 2.62C13.94 6.51 12 10.03 12 14h24c0-3.98-1.95-7.5-4.94-9.68zM20 10h-2V8h2v2zm10 0h-2V8h2v2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$all_out = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 8l8 8V8zm8 24l-8 8h8zm-24 8l-8-8v8zM8 16l8-8H8zm25.9-1.9c-5.47-5.47-14.33-5.47-19.8 0s-5.47 14.33 0 19.8 14.33 5.47 19.8 0 5.47-14.33 0-19.8zm-2.2 17.6c-4.25 4.25-11.15 4.25-15.4 0s-4.25-11.15 0-15.4 11.15-4.25 15.4 0 4.25 11.15 0 15.4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$alarm_on = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M44 11.44l-9.19-7.71-2.57 3.06 9.19 7.71L44 11.44zM15.76 6.78l-2.57-3.06L4 11.43l2.57 3.06 9.19-7.71zM23.99 8C14.04 8 6 16.06 6 26s8.04 18 17.99 18S42 35.94 42 26 33.94 8 23.99 8zM24 40c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.26 14-14 14zm-2.93-10.95l-4.24-4.24-2.12 2.12 6.36 6.36 12.01-12.01-2.12-2.12-9.89 9.89z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$alarm_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 12c7.73 0 14 6.27 14 14 0 1.69-.31 3.3-.86 4.8l3.04 3.04C41.34 31.47 42 28.81 42 26c0-9.94-8.06-18-18.01-18-2.81 0-5.46.66-7.84 1.81l3.05 3.05c1.5-.55 3.11-.86 4.8-.86zm20-.56l-9.19-7.71-2.57 3.06 9.19 7.71L44 11.44zM5.84 4.59L3.29 7.13l2.66 2.66-2.22 1.86 2.84 2.84 2.22-1.86 1.6 1.6C7.66 17.39 6 21.5 6 26c0 9.94 8.04 18 17.99 18 4.51 0 8.62-1.67 11.77-4.4l4.4 4.4 2.54-2.55L7.79 6.54 5.84 4.59zm27.1 32.19C30.51 38.79 27.4 40 24 40c-7.73 0-14-6.27-14-14 0-3.4 1.21-6.51 3.22-8.94l19.72 19.72zM16.03 6.55l-2.84-2.84-1.7 1.43 2.84 2.84 1.7-1.43z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$alarm_add = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M15.76 6.78l-2.57-3.06L4 11.43l2.57 3.06 9.19-7.71zM44 11.44l-9.19-7.71-2.57 3.06 9.19 7.71L44 11.44zM23.99 8C14.04 8 6 16.06 6 26s8.04 18 17.99 18S42 35.94 42 26 33.94 8 23.99 8zM24 40c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.26 14-14 14zm2-22h-4v6h-6v4h6v6h4v-6h6v-4h-6v-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$alarm = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M44 11.44l-9.19-7.71-2.57 3.06 9.19 7.71L44 11.44zM15.76 6.78l-2.57-3.06L4 11.43l2.57 3.06 9.19-7.71zM25 16h-3v12l9.49 5.71L33 31.24l-8-4.74V16zm-1.01-8C14.04 8 6 16.06 6 26s8.04 18 17.99 18S42 35.94 42 26 33.94 8 23.99 8zM24 40c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.26 14-14 14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$add_shopping_cart = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 18h4v-6h6V8h-6V2h-4v6h-6v4h6v6zm-8 18c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm20 0c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm-19.65-6.5c0-.09.02-.17.06-.24l1.8-3.26h14.9c1.5 0 2.81-.83 3.5-2.06l7.72-14.02L38.83 8h-.01l-2.21 4-5.51 10H17.07l-.26-.54L12.32 12l-1.9-4-1.89-4H2v4h4l7.2 15.17-2.71 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$account_circle = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm0 28.4c-5.01 0-9.41-2.56-12-6.44.05-3.97 8.01-6.16 12-6.16s11.94 2.19 12 6.16c-2.59 3.88-6.99 6.44-12 6.44z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$account_box = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4zm24 8c0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6s6 2.69 6 6zM12 34c0-4 8-6.2 12-6.2S36 30 36 34v2H12v-2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$account_balance_with_wallet = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 36v2c0 2.21-1.79 4-4 4H10c-2.21 0-4-1.79-4-4V10c0-2.21 1.79-4 4-4h28c2.21 0 4 1.79 4 4v2H24c-2.21 0-4 1.79-4 4v16c0 2.21 1.79 4 4 4h18zm-18-4h20V16H24v16zm8-5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$account_balance = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 20v14h6V20H8zm12 0v14h6V20h-6zM4 44h38v-6H4v6zm28-24v14h6V20h-6zM23 2L4 12v4h38v-4L23 2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Action$accessible = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 26v-4c-3.07.04-6.18-1.5-8.14-3.67l-2.59-2.86c-.35-.38-.77-.68-1.22-.91-.02-.01-.03-.02-.04-.03h-.02c-.69-.4-1.51-.6-2.38-.51-2.08.2-3.61 2.07-3.61 4.16V30c0 2.21 1.79 4 4 4h10v10h4V33c0-2.21-1.79-4-4-4h-6v-6.9c2.58 2.13 6.49 3.89 10 3.9zM25.65 36c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6 0-2.61 1.67-4.83 4-5.65V24.2c-4.56.93-8 4.96-8 9.8 0 5.52 4.48 10 10 10 4.84 0 8.87-3.44 9.8-8h-4.15z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$cx('24'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$cy('8'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$r('4'),
							_1: {ctor: '[]'}
						}
					}
				},
				{ctor: '[]'}),
			_1: {ctor: '[]'}
		}
	});
var _elm_community$material_icons$Material_Icons_Action$accessibility = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm18 14H30v26h-4V32h-4v12h-4V18H6v-4h36v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});

var _elm_community$material_icons$Material_Icons_Image$wb_sunny = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M13.51 9.69L9.93 6.1 7.1 8.93l3.59 3.59 2.82-2.83zM8 21H2v4h6v-4zM26 1.1h-4V7h4V1.1zm14.9 7.83L38.07 6.1l-3.59 3.59 2.83 2.83 3.59-3.59zm-6.41 27.38l3.59 3.59 2.83-2.83-3.59-3.59-2.83 2.83zM40 21v4h6v-4h-6zM24 11c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12zm-2 33.9h4V39h-4v5.9zM7.1 37.07l2.83 2.83 3.59-3.59-2.83-2.83-3.59 3.59z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$wb_iridescent = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 29h28V17H10v12zM22 1.1V7h4V1.1h-4zm16.07 5l-3.59 3.59 2.83 2.83 3.59-3.59-2.83-2.83zM26 44.9V39h-4v5.9h4zm14.9-7.83l-3.59-3.59-2.83 2.83 3.59 3.59 2.83-2.83zM7.1 8.93l3.59 3.59 2.83-2.83L9.93 6.1 7.1 8.93zM9.93 39.9l3.59-3.59-2.83-2.83-3.59 3.59 2.83 2.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$wb_incandescent = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M7.1 37.07l2.83 2.83 3.59-3.59-2.83-2.83-3.59 3.59zM22 44.9h4V39h-4v5.9zM8 21H2v4h6v-4zm22-8.38V3H18v9.62c-3.58 2.08-6 5.94-6 10.38 0 6.63 5.37 12 12 12s12-5.37 12-12c0-4.44-2.42-8.31-6-10.38zM40 21v4h6v-4h-6zm-5.51 15.31l3.59 3.59 2.83-2.83-3.59-3.59-2.83 2.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$wb_cloudy = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.71 20.07C37.35 13.19 31.28 8 24 8c-5.78 0-10.79 3.28-13.3 8.07C4.69 16.72 0 21.81 0 28c0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$wb_auto = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M13.7 25.3h4.6L16 18l-2.3 7.3zM44 14l-2.41 12.58L38.6 14h-3.2l-2.98 12.58L30 14h-1.52C25.55 10.35 21.05 8 16 8 7.16 8 0 15.16 0 24s7.16 16 16 16c6.27 0 11.68-3.61 14.31-8.86l.19.86H34l3-12.2L40 32h3.5l4.1-18H44zM20.6 32l-1.4-4h-6.4l-1.4 4H7.6L14 14h4l6.4 18h-3.8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$vignette = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 15c-4.42 0-8-2.69-8-6s3.58-6 8-6 8 2.69 8 6-3.58 6-8 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$view_compact = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 38h12V24H6v14zm14 0h24V24H20v14zM6 10v12h38V10H6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$view_comfy = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 18h8v-8H6v8zm0 10h8v-8H6v8zm10 0h8v-8h-8v8zm10 0h8v-8h-8v8zM16 18h8v-8h-8v8zm10-8v8h8v-8h-8zm10 18h8v-8h-8v8zM6 38h8v-8H6v8zm10 0h8v-8h-8v8zm10 0h8v-8h-8v8zm10 0h8v-8h-8v8zm0-28v8h8v-8h-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$tune = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 34v4h12v-4H6zm0-24v4h20v-4H6zm20 32v-4h16v-4H26v-4h-4v12h4zM14 18v4H6v4h8v4h4V18h-4zm28 8v-4H22v4h20zm-12-8h4v-4h8v-4h-8V6h-4v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$transform = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M44 36v-4H16V8h4l-6-6-6 6h4v4H4v4h8v16c0 2.21 1.79 4 4 4h16v4h-4l6 6 6-6h-4v-4h8zM20 16h12v12h4V16c0-2.21-1.79-4-4-4H20v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$tonality = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 35.86C14.11 38.88 8 32.16 8 24S14.11 9.12 22 8.14v31.72zm4-31.72c2.06.26 4 .9 5.74 1.86H26V8.14zM26 14h10.48c.5.63.96 1.3 1.36 2H26v-2zm0 6h13.48c.17.65.3 1.32.39 2H26v-2zm0 19.86V38h5.74c-1.74.96-3.68 1.6-5.74 1.86zM36.48 34H26v-2h11.84c-.4.7-.86 1.37-1.36 2zm3-6H26v-2h13.86c-.08.68-.22 1.35-.38 2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$timer_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.07 9.1l-2.85 2.85C32.15 9.48 28.24 8 23.99 8c-3.66 0-7.05 1.1-9.89 2.97l2.91 2.91C19.07 12.69 21.45 12 24 12c7.73 0 14 6.27 14 14 0 2.55-.69 4.93-1.88 6.99l2.91 2.91C40.9 33.06 42 29.66 42 26c0-4.25-1.48-8.15-3.95-11.23l2.85-2.85-2.83-2.82zM30 2H18v4h12V2zm-8 16.87l4 4V16h-4v2.87zM6.04 8l-2.55 2.54L9 16.05C7.11 18.9 6 22.32 6 26c0 9.94 8.04 18 17.99 18 3.68 0 7.1-1.11 9.95-3l5 5 2.54-2.55-15.4-15.41L6.04 8zM24 40c-7.73 0-14-6.27-14-14 0-2.57.7-4.97 1.91-7.04l19.13 19.13C28.97 39.3 26.57 40 24 40z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$timer_3 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.22 25.95c-.32-.48-.73-.92-1.23-1.31-.51-.39-1.12-.7-1.85-.95.61-.27 1.14-.61 1.6-1 .46-.4.84-.82 1.14-1.27.3-.45.53-.92.69-1.41.15-.49.23-.97.23-1.45 0-1.11-.19-2.08-.55-2.93-.37-.84-.89-1.55-1.56-2.11-.67-.56-1.47-.99-2.41-1.28-.94-.29-1.97-.43-3.1-.43-1.1 0-2.11.16-3.04.49-.93.33-1.73.78-2.4 1.36-.67.58-1.19 1.27-1.57 2.06-.38.79-.56 1.66-.56 2.59h3.96c0-.51.09-.97.28-1.38.19-.41.44-.76.77-1.04.33-.29.71-.51 1.16-.67.45-.16.93-.24 1.45-.24 1.22 0 2.12.31 2.72.94.59.63.89 1.5.89 2.63 0 .54-.08 1.04-.24 1.48-.16.45-.41.83-.75 1.14-.34.32-.76.56-1.26.74-.5.18-1.09.27-1.78.27h-2.35v3.13h2.35c.67 0 1.28.08 1.82.23.54.15 1 .39 1.38.71.38.32.67.73.88 1.22.21.49.31 1.07.31 1.75 0 1.24-.35 2.19-1.06 2.84-.71.65-1.67.98-2.9.98-.59 0-1.12-.08-1.6-.25-.48-.17-.89-.41-1.22-.72-.34-.31-.6-.68-.78-1.12-.19-.43-.28-.91-.28-1.44H8.37c0 1.1.21 2.07.64 2.9.42.84.99 1.54 1.71 2.1s1.55.98 2.49 1.26c.94.28 1.93.42 2.96.42 1.13 0 2.18-.16 3.16-.46.97-.31 1.82-.76 2.53-1.35.71-.59 1.27-1.32 1.67-2.19.4-.87.6-1.86.6-2.97 0-.59-.07-1.16-.22-1.71-.15-.56-.38-1.08-.69-1.56zm18.53 2.78c-.29-.57-.71-1.06-1.26-1.48-.55-.42-1.23-.77-2.02-1.06-.8-.29-1.7-.54-2.7-.75-.7-.15-1.27-.3-1.73-.46-.46-.15-.83-.32-1.1-.5-.27-.18-.46-.39-.57-.61-.11-.22-.16-.48-.16-.77 0-.29.06-.56.18-.83.12-.26.3-.49.54-.69.24-.2.54-.36.91-.48.36-.12.79-.18 1.28-.18.5 0 .94.07 1.32.22.38.14.7.34.95.59.26.25.45.53.58.84.13.32.19.64.19.97h3.9c0-.78-.16-1.51-.47-2.18-.32-.67-.77-1.26-1.37-1.76-.6-.5-1.33-.89-2.19-1.17-.87-.29-1.84-.43-2.93-.43-1.03 0-1.96.14-2.78.42-.83.28-1.53.67-2.12 1.15-.58.48-1.03 1.04-1.34 1.68-.31.64-.47 1.31-.47 2.01 0 .73.15 1.37.46 1.93.3.56.73 1.04 1.28 1.45.55.41 1.2.76 1.97 1.05.76.29 1.61.53 2.54.72.78.16 1.41.33 1.9.51s.86.38 1.13.59c.27.21.45.43.54.67.09.24.14.5.14.78 0 .63-.27 1.14-.8 1.53-.54.39-1.32.59-2.34.59-.44 0-.87-.05-1.28-.15-.42-.1-.79-.26-1.12-.49-.33-.22-.6-.52-.82-.88-.21-.36-.34-.81-.37-1.35h-3.79c0 .72.16 1.42.47 2.11.31.69.78 1.31 1.4 1.85.62.55 1.39.99 2.3 1.32.91.34 1.97.51 3.15.51 1.06 0 2.02-.13 2.89-.38.87-.26 1.61-.62 2.22-1.08.62-.47 1.09-1.02 1.42-1.66.33-.64.5-1.35.5-2.12 0-.79-.15-1.46-.43-2.03z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$timer_10 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M0 15.43v3.37l6-2V36h4V12h-.51L0 15.43zm47.57 13.3c-.29-.57-.71-1.06-1.26-1.48-.55-.42-1.23-.77-2.02-1.06-.8-.29-1.7-.54-2.7-.75-.7-.15-1.27-.3-1.73-.46-.46-.15-.83-.32-1.1-.5-.27-.18-.46-.39-.57-.61-.11-.22-.16-.48-.16-.77 0-.29.06-.56.18-.83.12-.26.3-.49.54-.69.24-.2.54-.36.91-.48.36-.12.79-.18 1.28-.18.5 0 .94.07 1.32.22.38.14.7.34.95.59.26.25.45.53.58.84.13.32.19.64.19.97h3.9c0-.78-.16-1.51-.47-2.18-.31-.67-.77-1.26-1.37-1.76-.6-.5-1.33-.89-2.19-1.17-.87-.29-1.84-.43-2.92-.43-1.03 0-1.96.14-2.78.42-.83.28-1.53.67-2.12 1.15-.58.48-1.03 1.04-1.34 1.68-.31.64-.47 1.31-.47 2.01 0 .73.15 1.37.46 1.93.3.56.73 1.04 1.28 1.45.55.41 1.2.76 1.97 1.05.76.29 1.61.53 2.54.72.78.16 1.41.33 1.9.51s.86.38 1.13.59c.27.21.45.43.54.67.09.24.14.5.14.78 0 .63-.27 1.14-.8 1.53-.54.39-1.32.59-2.34.59-.44 0-.87-.05-1.28-.15-.42-.1-.79-.26-1.12-.49-.33-.22-.6-.52-.82-.88-.21-.36-.34-.81-.37-1.35h-3.79c0 .72.16 1.42.47 2.11.31.69.78 1.31 1.4 1.85.62.55 1.39.99 2.3 1.32.91.34 1.97.51 3.15.51 1.06 0 2.02-.13 2.89-.38.87-.26 1.61-.62 2.22-1.08.62-.47 1.09-1.02 1.42-1.66.33-.64.5-1.35.5-2.12-.01-.79-.15-1.46-.44-2.03zM27.64 14.09c-.68-.81-1.5-1.39-2.45-1.75-.96-.36-2.02-.54-3.2-.54-1.16 0-2.22.18-3.18.54-.96.36-1.78.94-2.45 1.75-.68.81-1.2 1.87-1.57 3.17-.37 1.31-.55 2.9-.55 4.78v3.83c0 1.88.19 3.48.56 4.79.38 1.31.91 2.38 1.59 3.2.69.82 1.51 1.42 2.46 1.79.96.37 2.02.55 3.18.55 1.17 0 2.24-.19 3.19-.55.95-.37 1.76-.96 2.44-1.79.67-.82 1.2-1.89 1.57-3.2.37-1.31.55-2.91.55-4.79v-3.83c0-1.88-.19-3.47-.55-4.78-.38-1.3-.91-2.36-1.59-3.17zm-1.83 12.36c0 1.2-.08 2.21-.24 3.05-.16.84-.41 1.52-.73 2.04s-.72.9-1.18 1.14c-.47.24-1.01.36-1.63.36-.61 0-1.15-.12-1.63-.36s-.88-.62-1.21-1.14c-.33-.52-.58-1.2-.75-2.04-.17-.84-.26-1.85-.26-3.05v-5.01c0-1.21.08-2.22.25-3.04.17-.82.42-1.48.74-1.99.33-.51.73-.87 1.2-1.09.47-.22 1.01-.33 1.62-.33.61 0 1.15.11 1.62.33.47.22.87.59 1.2 1.09.33.51.57 1.17.74 1.99.17.82.25 1.84.25 3.04v5.01z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$timer = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 2H18v4h12V2zm-8 26h4V16h-4v12zm16.05-13.23l2.85-2.85c-.86-1.03-1.8-1.97-2.83-2.83l-2.85 2.85C32.15 9.48 28.24 8 23.99 8 14.04 8 6 16.06 6 26s8.04 18 17.99 18S42 35.94 42 26c0-4.25-1.48-8.15-3.95-11.23zM24 40c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$timelapse = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32.49 15.51C30.14 13.17 27.07 12 24 12v12l-8.49 8.49c4.69 4.69 12.28 4.69 16.97 0 4.69-4.69 4.69-12.29.01-16.98zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.96 20-20c0-11.05-8.95-20-20-20zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$texture = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M39.02 6.15L6.15 39.02c.18.69.53 1.31 1.02 1.8l.01.01c.49.49 1.11.84 1.8 1.02L41.85 8.98c-.37-1.38-1.45-2.46-2.83-2.83zM23.76 6L6 23.76v5.66L29.42 6h-5.66zM10 6c-2.2 0-4 1.8-4 4v4.01L14.01 6H10zm28 36c1.1 0 2.1-.45 2.82-1.17C41.55 40.1 42 39.1 42 38v-4.01L33.99 42H38zm-19.42 0h5.66L42 24.24v-5.66L18.58 42z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$tag_faces = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm7-18c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-14 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm7 13c4.66 0 8.61-2.91 10.21-7H13.79c1.6 4.09 5.55 7 10.21 7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$switch_video = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 19v-7c0-1.1-.89-2-2-2H6c-1.11 0-2 .9-2 2v24c0 1.1.89 2 2 2h28c1.11 0 2-.9 2-2v-7l8 8V11l-8 8zM26 31v-5H14v5l-7-7 7-7v5h12v-5l7 7-7 7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$switch_camera = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 8h-6.34L30 4H18l-3.66 4H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM30 31v-5H18v5l-7-7 7-7v5h12v-5l7 7-7 7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$style = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M5.06 39.31l2.69 1.11V22.37L2.9 34.08c-.84 2.03.13 4.38 2.16 5.23zm39-7.42L34.14 7.96c-.62-1.5-2.08-2.43-3.61-2.46-.53-.01-1.07.09-1.6.3L14.2 11.9c-1.5.62-2.42 2.07-2.46 3.6-.01.54.08 1.08.3 1.61l9.91 23.93c.63 1.52 2.1 2.44 3.66 2.46.52 0 1.04-.09 1.55-.3l14.73-6.1c2.03-.84 3.01-3.18 2.17-5.21zM15.75 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4 22c0 2.2 1.8 4 4 4h2.91l-6.91-16.68V39.5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$straighten = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 12H6c-2.21 0-4 1.79-4 4v16c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zm0 20H6V16h4v8h4v-8h4v8h4v-8h4v8h4v-8h4v8h4v-8h4v16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$slideshow = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 16v16l10-8-10-8zM38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32H10V10h28v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$rotate_right = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M31.1 11.1L22 2v6.14C14.11 9.12 8 15.84 8 24s6.11 14.88 14 15.86v-4.04c-5.67-.95-10-5.88-10-11.82s4.33-10.87 10-11.82V20l9.1-8.9zM39.86 22c-.34-2.78-1.45-5.46-3.25-7.78l-2.83 2.83c1.07 1.51 1.75 3.2 2.04 4.95h4.04zM26 35.81v4.05c2.78-.34 5.48-1.42 7.8-3.22l-2.87-2.87c-1.5 1.06-3.18 1.74-4.93 2.04zm7.78-4.86l2.83 2.83c1.8-2.32 2.91-5 3.25-7.78h-4.04c-.29 1.75-.97 3.44-2.04 4.95z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$rotate_left = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14.22 17.05l-2.83-2.83c-1.8 2.32-2.91 5-3.25 7.78h4.04c.29-1.75.97-3.44 2.04-4.95zM12.18 26H8.14c.34 2.78 1.45 5.46 3.25 7.78l2.83-2.83c-1.07-1.51-1.75-3.2-2.04-4.95zm2.02 10.63c2.32 1.81 5.02 2.88 7.8 3.22v-4.04c-1.75-.29-3.43-.98-4.93-2.05l-2.87 2.87zM26 8.14V2l-9.1 9.1L26 20v-7.82c5.67.95 10 5.88 10 11.82s-4.33 10.87-10 11.82v4.04c7.89-.99 14-7.7 14-15.86S33.89 9.13 26 8.14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$rotate_90_degrees_ccw = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14.69 12.83L1.72 25.8l12.97 12.97L27.66 25.8 14.69 12.83zM7.37 25.8l7.31-7.31L22 25.8l-7.31 7.31-7.32-7.31zm31.36-12.53C35.21 9.76 30.61 8 26 8V1.51L17.51 10 26 18.48V12c3.58 0 7.17 1.37 9.9 4.1 5.47 5.47 5.47 14.33 0 19.8-2.73 2.73-6.32 4.1-9.9 4.1-1.94 0-3.87-.41-5.67-1.21l-2.98 2.98C20.03 43.25 23.01 44 26 44c4.61 0 9.21-1.76 12.73-5.27 7.03-7.03 7.03-18.43 0-25.46z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$remove_red_eye = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15s18.54-6.22 22-15C42.54 15.22 34.01 9 24 9zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$portrait = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 24.5c2.48 0 4.5-2.01 4.5-4.5 0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5c0 2.49 2.02 4.5 4.5 4.5zm9 8c0-3-6-4.5-9-4.5s-9 1.5-9 4.5V34h18v-1.5zM38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32H10V10h28v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$picture_as_pdf = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 4H16c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM23 19c0 1.66-1.34 3-3 3h-2v4h-3V14h5c1.66 0 3 1.34 3 3v2zm10 4c0 1.66-1.34 3-3 3h-5V14h5c1.66 0 3 1.34 3 3v6zm8-6h-3v2h3v3h-3v4h-3V14h6v3zm-23 2h2v-2h-2v2zM8 12H4v28c0 2.21 1.79 4 4 4h28v-4H8V12zm20 11h2v-6h-2v6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$photo_size_select_small = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23 15h-2v2h2v-2zm0-4h-2v2h2v-2zm0 8h-2v2c1 0 2-1 2-2zM15 3h-2v2h2V3zm8 4h-2v2h2V7zm-2-4v2h2c0-1-1-2-2-2zM3 21h8v-6H1v4c0 1.1.9 2 2 2zM3 7H1v2h2V7zm12 12h-2v2h2v-2zm4-16h-2v2h2V3zm0 16h-2v2h2v-2zM3 3C2 3 1 4 1 5h2V3zm0 8H1v2h2v-2zm8-8H9v2h2V3zM7 3H5v2h2V3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$photo_size_select_large = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12V11H1zm2 8l2.5-3.21 1.79 2.15 2.5-3.22L13 19H3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$photo_size_select_actual = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$photo_library = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M44 32V8c0-2.21-1.79-4-4-4H16c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4zm-22-8l4.06 5.42L32 22l8 10H16l6-8zM4 12v28c0 2.21 1.79 4 4 4h28v-4H8V12H4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$photo_filter = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.04 20v18H10V10h18V6H10.04c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V20h-4zM34 20l1.88-4.12L40 14l-4.12-1.88L34 8l-1.88 4.12L28 14l4.12 1.88zm-7.5 1.5L24 16l-2.5 5.5L16 24l5.5 2.5L24 32l2.5-5.5L32 24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$photo_camera = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 4l-3.66 4H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4h-6.34L30 4H18zm6 30c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$cx('24'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$cy('24'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$r('6.4'),
							_1: {ctor: '[]'}
						}
					}
				},
				{ctor: '[]'}),
			_1: {ctor: '[]'}
		}
	});
var _elm_community$material_icons$Material_Icons_Image$photo_album = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 4H12C9.79 4 8 5.79 8 8v32c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM12 8h10v16l-5-3-5 3V8zm0 30l6-7.71 4.29 5.15 6-7.73L36 38H12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$photo = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$panorama_wide_angle = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 12c4.9 0 9.42.39 14.58 1.27C39.52 16.84 40 20.45 40 24c0 3.55-.48 7.16-1.42 10.73C33.42 35.61 28.9 36 24 36s-9.42-.39-14.58-1.27C8.48 31.16 8 27.55 8 24c0-3.55.48-7.16 1.42-10.73C14.58 12.39 19.1 12 24 12m0-4c-5.46 0-10.45.48-15.91 1.44l-1.85.33-.5 1.79C4.58 15.7 4 19.85 4 24s.58 8.3 1.74 12.44l.5 1.79 1.85.33C13.55 39.52 18.54 40 24 40s10.45-.48 15.91-1.44l1.85-.33.5-1.79C43.42 32.3 44 28.15 44 24s-.58-8.3-1.74-12.44l-.5-1.79-1.85-.33C34.45 8.48 29.46 8 24 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$panorama_vertical = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M39.88 42.24c-2.19-5.88-3.29-12.06-3.29-18.24 0-6.18 1.1-12.36 3.29-18.24.08-.22.12-.43.12-.63C40 4.47 39.53 4 38.75 4H9.25C8.47 4.01 8 4.47 8 5.13c0 .19.04.4.12.62 2.19 5.88 3.29 12.06 3.29 18.24 0 6.18-1.1 12.36-3.29 18.24-.08.23-.12.44-.12.64 0 .66.47 1.13 1.25 1.13h29.5c.78 0 1.25-.48 1.25-1.14 0-.19-.04-.4-.12-.62zM13.09 40c1.54-5.19 2.32-10.56 2.32-16 0-5.44-.78-10.8-2.32-16h21.82c-1.54 5.19-2.32 10.56-2.32 16 0 5.44.78 10.8 2.32 16H13.09z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$panorama_horizontal = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 13.09v21.82c-5.19-1.54-10.56-2.32-16-2.32-5.44 0-10.8.78-16 2.32V13.09c5.19 1.54 10.56 2.32 16 2.32 5.44 0 10.8-.78 16-2.32M42.86 8c-.19 0-.4.04-.62.12-5.88 2.19-12.06 3.29-18.24 3.29-6.18 0-12.36-1.1-18.24-3.29-.22-.08-.43-.12-.63-.12C4.47 8 4 8.47 4 9.25v29.5c.01.78.47 1.25 1.13 1.25.19 0 .4-.04.62-.12 5.88-2.19 12.06-3.29 18.24-3.29 6.18 0 12.36 1.1 18.24 3.29.22.08.43.12.62.12.66 0 1.14-.47 1.13-1.25V9.25C44 8.47 43.52 8 42.86 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$panorama_fish_eye = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$panorama = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M46 36V12c0-2.21-1.79-4-4-4H6c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4zM17 25l5 6.01L29 22l9 12H10l7-9z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$palette = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18c1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3H32c5.52 0 10-4.48 10-10 0-8.84-8.06-16-18-16zM13 24c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$navigate_next = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$navigate_before = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30.83 14.83L28 12 16 24l12 12 2.83-2.83L21.66 24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$nature_people = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M44.34 18.34c0-7.73-6.27-14-14-14s-14 6.27-14 14c0 6.93 5.04 12.67 11.66 13.79V40H12v-6h2v-8c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v8h2v10h32v-4h-6v-7.76c6.95-.82 12.34-6.73 12.34-13.9zM9 22c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$nature = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M26 32.24c6.95-.82 12.34-6.72 12.34-13.89 0-7.73-6.27-14-14-14s-14 6.27-14 14c0 6.93 5.04 12.67 11.66 13.79V40H10v4h28v-4H26v-7.76z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$music_note = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 6v21.11c-1.18-.69-2.54-1.11-4-1.11-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8V14h8V6H24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$movie_filter = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 8l4 6h-6l-4-6h-4l4 6h-6l-4-6h-4l4 6h-6l-4-6H8c-2.2 0-3.98 1.8-3.98 4L4 36c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V8h-8zM22.5 30.5L20 36l-2.5-5.5L12 28l5.5-2.5L20 20l2.5 5.5L28 28l-5.5 2.5zm11.38-6.62L32 28l-1.88-4.12L26 22l4.12-1.88L32 16l1.88 4.12L38 22l-4.12 1.88z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$movie_creation = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 8l4 8h-6l-4-8h-4l4 8h-6l-4-8h-4l4 8h-6l-4-8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V8h-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$monochrome_photos = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 16v3.6c3.5 0 6.4 2.9 6.4 6.4s-2.9 6.4-6.4 6.4V36c5.5 0 10-4.5 10-10s-4.5-10-10-10zm-6.4 10c0 3.5 2.9 6.4 6.4 6.4V19.6c-3.5 0-6.4 2.9-6.4 6.4zM24 16v3.6c3.5 0 6.4 2.9 6.4 6.4s-2.9 6.4-6.4 6.4V36c5.5 0 10-4.5 10-10s-4.5-10-10-10zm-6.4 10c0 3.5 2.9 6.4 6.4 6.4V19.6c-3.5 0-6.4 2.9-6.4 6.4zM40 10h-6.3L30 6H18l-3.7 4H8c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V14c0-2.2-1.8-4-4-4zm0 28H24v-2c-5.5 0-10-4.5-10-10s4.5-10 10-10v-2h16v24zm-6-12c0-5.5-4.5-10-10-10v3.6c3.5 0 6.4 2.9 6.4 6.4s-2.9 6.4-6.4 6.4V36c5.5 0 10-4.5 10-10zm-16.4 0c0 3.5 2.9 6.4 6.4 6.4V19.6c-3.5 0-6.4 2.9-6.4 6.4zm0 0c0 3.5 2.9 6.4 6.4 6.4V19.6c-3.5 0-6.4 2.9-6.4 6.4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$loupe = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M26 14h-4v8h-8v4h8v8h4v-8h8v-4h-8v-8zM24 4C12.97 4 4 12.97 4 24s8.97 20 20 20h16c2.21 0 4-1.79 4-4V24c0-11.03-8.97-20-20-20zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$looks_two = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-8 16c0 2.21-1.79 4-4 4h-4v4h8v4H18v-8c0-2.21 1.79-4 4-4h4v-4h-8v-4h8c2.21 0 4 1.79 4 4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$looks_one = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM28 34h-4V18h-4v-4h8v20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$looks_6 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 30h4v-4h-4v4zM38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-8 12h-8v4h4c2.21 0 4 1.79 4 4v4c0 2.21-1.79 4-4 4h-4c-2.21 0-4-1.79-4-4V18c0-2.21 1.79-4 4-4h8v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$looks_5 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-8 12h-8v4h4c2.21 0 4 1.79 4 4v4c0 2.21-1.79 4-4 4h-8v-4h8v-4h-8V14h12v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$looks_4 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-8 28h-4v-8h-8V14h4v8h4v-8h4v20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$looks_3 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.01 6h-28c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-8 15c0 1.66-1.34 3-3 3 1.66 0 3 1.34 3 3v3c0 2.21-1.79 4-4 4h-8v-4h8v-4h-4v-4h4v-4h-8v-4h8c2.21 0 4 1.79 4 4v3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$looks = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 20c-7.72 0-14 6.28-14 14h4c0-5.51 4.49-10 10-10s10 4.49 10 10h4c0-7.72-6.28-14-14-14zm0-8C11.87 12 2 21.87 2 34h4c0-9.92 8.08-18 18-18s18 8.08 18 18h4c0-12.13-9.87-22-22-22z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$linked_camera = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 6.66c5.16 0 9.34 4.18 9.34 9.34H44c0-6.62-5.38-12-12-12v2.66M32 12c2.22 0 4 1.78 4 4h2.66c0-3.68-2.98-6.66-6.66-6.66V12'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$cx('24'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$cy('28'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$r('6.4'),
							_1: {ctor: '[]'}
						}
					}
				},
				{ctor: '[]'}),
			_1: {ctor: '[]'}
		}
	});
var _elm_community$material_icons$Material_Icons_Image$lens = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$leak_remove = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 6h-4c0 .73-.09 1.44-.24 2.13l3.19 3.19C19.62 9.67 20 7.88 20 6zM6 8.55l5.68 5.68C10.06 15.34 8.11 16 6 16v4c3.22 0 6.17-1.1 8.53-2.92l2.85 2.85C14.29 22.47 10.32 24 6 24v4c5.43 0 10.39-1.97 14.22-5.23l5.01 5.01C21.97 31.61 20 36.57 20 42h4c0-4.32 1.53-8.29 4.07-11.39l2.85 2.85C29.1 35.83 28 38.78 28 42h4c0-2.11.66-4.06 1.78-5.68L39.46 42 42 39.45 8.55 6 6 8.55zM28 6h-4c0 3-.75 5.83-2.05 8.32l2.93 2.93C26.85 13.95 28 10.12 28 6zm11.87 26.24c.69-.15 1.4-.24 2.13-.24v-4c-1.88 0-3.67.38-5.31 1.05l3.18 3.19zm-9.12-9.12l2.93 2.93C36.17 24.75 39 24 42 24v-4c-4.12 0-7.95 1.15-11.25 3.12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$leak_add = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 6H6v6c3.31 0 6-2.69 6-6zm16 0h-4c0 9.94-8.06 18-18 18v4c12.15 0 22-9.85 22-22zm-8 0h-4c0 5.52-4.48 10-10 10v4c7.73 0 14-6.27 14-14zm0 36h4c0-9.94 8.06-18 18-18v-4c-12.15 0-22 9.85-22 22zm16 0h6v-6c-3.31 0-6 2.69-6 6zm-8 0h4c0-5.52 4.48-10 10-10v-4c-7.73 0-14 6.27-14 14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$landscape = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 12l-7.5 10 5.7 7.6L23 32c-3.38-4.5-9-12-9-12L2 36h44L28 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$iso = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm-27 9h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3zm27 23H10l28-28v28zm-4-4v-3H24v3h10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$image_aspect_ratio = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 20h-4v4h4v-4zm0 8h-4v4h4v-4zm-16-8h-4v4h4v-4zm8 0h-4v4h4v-4zM40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H8V12h32v24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$image = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$healing = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35.46 24.04l7.96-7.96c.78-.78.78-2.05 0-2.83l-8.67-8.67c-.78-.78-2.05-.78-2.83 0l-7.96 7.96L16 4.59c-.39-.39-.9-.59-1.41-.59-.51 0-1.02.2-1.41.59L4.5 13.26c-.78.78-.78 2.05 0 2.83l7.96 7.96L4.5 32c-.78.78-.78 2.05 0 2.83l8.67 8.67c.78.78 2.05.78 2.83 0l7.96-7.96 7.96 7.96c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l8.67-8.67c.78-.78.78-2.05 0-2.83l-7.95-7.96zM24 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-9.42 3.92l-7.25-7.25 7.26-7.26 7.25 7.25-7.26 7.26zM20 26c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4-8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm5.33 18.67l-7.25-7.25 7.26-7.26 7.25 7.25-7.26 7.26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$hdr_weak = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm24-4c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12zm0 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$hdr_strong = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 12c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12zm-24 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$hdr_on = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 23v-2c0-1.7-1.3-3-3-3h-7v12h3v-4h2.3l1.7 4h3l-1.8-4.2c1-.5 1.8-1.6 1.8-2.8zm-3 0h-4v-2h4v2zm-26-1H9v-4H6v12h3v-5h4v5h3V18h-3v4zm13-4h-7v12h7c1.7 0 3-1.3 3-3v-6c0-1.7-1.3-3-3-3zm0 9h-4v-6h4v6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$hdr_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35 30v-4h2.3l1.7 4h3l-1.8-4.2c1.1-.5 1.8-1.5 1.8-2.8v-2c0-1.7-1.3-3-3-3h-7v9.8l2.2 2.2h.8zm0-9h4v2h-4v-2zm-9 0v.8l3 3V21c0-1.7-1.3-3-3-3h-3.8l3 3h.8zm-7-2L4.9 4.9 2.8 7l11 11H13v4H9v-4H6v12h3v-5h4v5h3v-9.8l3 3V30h6.8L41 45.2l2.1-2.1L19 19z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$grid_on = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 4H8C5.79 4 4 5.79 4 8v32c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM16 40H8v-8h8v8zm0-12H8v-8h8v8zm0-12H8V8h8v8zm12 24h-8v-8h8v8zm0-12h-8v-8h8v8zm0-12h-8V8h8v8zm12 24h-8v-8h8v8zm0-12h-8v-8h8v8zm0-12h-8V8h8v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$grid_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M16 8v2.91l4 4V8h8v8h-6.91l4 4H28v2.91l4 4V20h8v8h-6.91l4 4H40v2.91l4 4V8c0-2.21-1.79-4-4-4H9.09l4 4H16zm16 0h8v8h-8V8zM2.55 2.55L0 5.09l4 4V40c0 2.21 1.79 4 4 4h30.91l4 4 2.54-2.55-42.9-42.9zM20 25.09L22.91 28H20v-2.91zm-12-12L10.91 16H8v-2.91zM16 40H8v-8h8v8zm0-12H8v-8h6.91L16 21.09V28zm12 12h-8v-8h6.91L28 33.09V40zm4 0v-2.91L34.91 40H32z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$grain = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 24c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-8-8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 16c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm24-16c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-8 16c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8-8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-8-8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-8-8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$gradient = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 18h4v4h-4zm-4 4h4v4h-4zm8 0h4v4h-4zm4-4h4v4h-4zm-16 0h4v4h-4zM38 6H10c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zM18 36h-4v-4h4v4zm8 0h-4v-4h4v4zm8 0h-4v-4h4v4zm4-14h-4v4h4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4h-4v4h-4v-4h4v-4h-4V10h28v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$flip = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 42h4v-4h-4v4zm8-24h4v-4h-4v4zM6 10v28c0 2.21 1.79 4 4 4h8v-4h-8V10h8V6h-8c-2.21 0-4 1.79-4 4zm32-4v4h4c0-2.21-1.79-4-4-4zM22 46h4V2h-4v44zm16-12h4v-4h-4v4zm-8-24h4V6h-4v4zm8 16h4v-4h-4v4zm0 16c2.21 0 4-1.79 4-4h-4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$flash_on = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 4v22h6v18l14-24h-8l8-16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$flash_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6.55 6L4 8.55l10 10V26h6v18l7.17-12.29L35.45 40 38 37.46 6.55 6zM34 20h-8l8-16H14v4.36l16.92 16.92L34 20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$flash_auto = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 4v24h6v18l14-24h-8l8-18H6zm32 0h-4l-6.4 18h3.8l1.4-4h6.4l1.4 4h3.8L38 4zm-4.3 11.3L36 8l2.3 7.3h-4.6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$flare = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 22H2v4h12v-4zm4.34-6.49l-4.24-4.24-2.83 2.83 4.24 4.24 2.83-2.83zM26 2h-4v12h4V2zm10.73 12.1l-2.83-2.83-4.24 4.24 2.83 2.83 4.24-4.24zM34 22v4h12v-4H34zm-10-4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm5.66 14.49l4.24 4.24 2.83-2.83-4.24-4.24-2.83 2.83zM11.27 33.9l2.83 2.83 4.24-4.24-2.83-2.83-4.24 4.24zM22 46h4V34h-4v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_vintage = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M37.39 24.8c-.56-.32-1.14-.58-1.72-.8.58-.22 1.16-.48 1.72-.8 3.84-2.22 5.98-6.25 5.99-10.39-3.59-2.06-8.15-2.22-11.99 0-.56.32-1.07.69-1.56 1.09.1-.63.17-1.25.17-1.9 0-4.44-2.42-8.31-6-10.38-3.58 2.07-6 5.94-6 10.38 0 .65.06 1.27.16 1.89-.49-.39-1-.76-1.56-1.09-3.84-2.22-8.4-2.06-11.99 0 .01 4.14 2.15 8.17 5.99 10.39.56.32 1.14.58 1.72.8-.58.22-1.16.48-1.72.8-3.84 2.22-5.98 6.25-5.99 10.39 3.59 2.06 8.15 2.22 11.99 0 .56-.32 1.07-.69 1.56-1.09-.09.64-.16 1.26-.16 1.91 0 4.44 2.42 8.31 6 10.38 3.58-2.08 6-5.94 6-10.38 0-.65-.07-1.27-.16-1.89.49.39 1 .76 1.56 1.09 3.84 2.22 8.4 2.06 11.99 0-.01-4.15-2.15-8.18-6-10.4zM24 32c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_tilt_shift = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M22 8.14V4.1c-4.02.4-7.68 2-10.65 4.42l2.85 2.85c2.22-1.71 4.88-2.87 7.8-3.23zm14.65.38C33.69 6.1 30.02 4.5 26 4.1v4.04c2.92.37 5.58 1.52 7.8 3.24l2.85-2.86zM39.86 22h4.04c-.4-4.02-2-7.68-4.42-10.65l-2.85 2.85c1.71 2.22 2.87 4.88 3.23 7.8zm-28.48-7.8l-2.85-2.85C6.1 14.32 4.5 17.98 4.1 22h4.04c.37-2.92 1.52-5.58 3.24-7.8zM8.14 26H4.1c.4 4.02 2 7.68 4.42 10.65l2.85-2.85c-1.71-2.22-2.86-4.89-3.23-7.8zM30 24c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6 6-2.69 6-6zm6.62 9.79l2.85 2.85C41.9 33.68 43.5 30.02 43.9 26h-4.04c-.36 2.91-1.52 5.58-3.24 7.79zM26 39.86v4.04c4.02-.4 7.68-2 10.65-4.42l-2.85-2.85c-2.22 1.71-4.88 2.86-7.8 3.23zm-14.65-.38C14.32 41.9 17.98 43.5 22 43.9v-4.04c-2.92-.37-5.58-1.52-7.8-3.24l-2.85 2.86z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_none = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_hdr = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 12l-7.5 10 5.7 7.6L23 32c-3.38-4.5-9-12-9-12L2 36h44L28 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_frames = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 8h-8l-8-8-8 8H8c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 32H8V12h9.03l7.04-7 6.96 7H40v28zm-4-24H12v20h24'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_drama = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38.71 20.07C37.35 13.19 31.28 8 24 8c-5.78 0-10.78 3.28-13.29 8.07C4.69 16.71 0 21.81 0 28c0 6.63 5.37 12 12 12h26c5.52 0 10-4.48 10-10 0-5.28-4.1-9.56-9.29-9.93zM38 36H12c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8h4c0-5.52-3.73-10.15-8.8-11.55C17.21 13.76 20.4 12 24 12c6.07 0 11 4.93 11 11v1h3c3.31 0 6 2.69 6 6s-2.69 6-6 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_center_focus = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 30H6v8c0 2.21 1.79 4 4 4h8v-4h-8v-8zm0-20h8V6h-8c-2.21 0-4 1.79-4 4v8h4v-8zm28-4h-8v4h8v8h4v-8c0-2.21-1.79-4-4-4zm0 32h-8v4h8c2.21 0 4-1.79 4-4v-8h-4v8zM24 18c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_b_and_w = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32L24 22v16H10l14-16V10h14v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_9_plus = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm22 14v-8c0-2.21-1.79-4-4-4h-2c-2.21 0-4 1.79-4 4v2c0 2.21 1.79 4 4 4h2v2h-6v4h6c2.21 0 4-1.79 4-4zm-6-6v-2h2v2h-2zM42 2H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 16h-4v-4h-4v4h-4v4h4v4h4v-4h4v12H14V6h28v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_9 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zM30 10h-4c-2.21 0-4 1.79-4 4v4c0 2.21 1.79 4 4 4h4v4h-8v4h8c2.21 0 4-1.79 4-4V14c0-2.21-1.79-4-4-4zm0 8h-4v-4h4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_8 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zm-16-4h4c2.21 0 4-1.79 4-4v-3c0-1.66-1.34-3-3-3 1.66 0 3-1.34 3-3v-3c0-2.21-1.79-4-4-4h-4c-2.21 0-4 1.79-4 4v3c0 1.66 1.34 3 3 3-1.66 0-3 1.34-3 3v3c0 2.21 1.79 4 4 4zm0-16h4v4h-4v-4zm0 8h4v4h-4v-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_7 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zm-16-4l8-16v-4H22v4h8l-8 16h4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_6 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zm-16-4h4c2.21 0 4-1.79 4-4v-4c0-2.21-1.79-4-4-4h-4v-4h8v-4h-8c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4zm0-8h4v4h-4v-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_5 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 2H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zM6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm28 16v-4c0-2.21-1.79-4-4-4h-4v-4h8v-4H22v12h8v4h-8v4h8c2.21 0 4-1.79 4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_4 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm24 20h4V10h-4v8h-4v-8h-4v12h8v8zM42 2H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_3 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 2H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zM6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm28 16v-3c0-1.66-1.34-3-3-3 1.66 0 3-1.34 3-3v-3c0-2.21-1.79-4-4-4h-8v4h8v4h-4v4h4v4h-8v4h8c2.21 0 4-1.79 4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_2 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zm-8-8h-8v-4h4c2.21 0 4-1.79 4-4v-4c0-2.21-1.79-4-4-4h-8v4h8v4h-4c-2.21 0-4 1.79-4 4v8h12v-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter_1 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm22 20h4V10h-8v4h4v16zM42 2H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$filter = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M31.93 20.57l-5.5 7.08-3.93-4.72L17 30h22l-7.07-9.43zM6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$exposure_zero = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32.28 25c0 2-.2 3.7-.59 5.1-.39 1.4-.95 2.53-1.67 3.41-.72.87-1.59 1.51-2.6 1.9-1.01.39-2.14.59-3.39.59-1.24 0-2.37-.2-3.39-.59-1.02-.39-1.89-1.03-2.62-1.9-.73-.87-1.3-2.01-1.69-3.41-.4-1.4-.6-3.1-.6-5.1v-4.08c0-2 .2-3.7.59-5.09.39-1.39.95-2.52 1.68-3.38.72-.86 1.59-1.49 2.61-1.87 1.02-.38 2.15-.57 3.39-.57 1.25 0 2.39.19 3.41.57 1.02.38 1.89 1.01 2.62 1.87.72.86 1.28 1.99 1.68 3.38.39 1.39.59 3.09.59 5.09V25zm-4.22-4.73c0-1.29-.09-2.37-.27-3.24-.18-.87-.44-1.58-.79-2.12-.35-.54-.77-.93-1.28-1.16-.5-.24-1.08-.36-1.73-.36-.65 0-1.23.12-1.73.36-.51.24-.93.63-1.28 1.16-.35.54-.61 1.25-.79 2.12-.18.87-.27 1.96-.27 3.24v5.34c0 1.27.09 2.36.28 3.25.19.89.45 1.62.8 2.17.35.56.78.96 1.29 1.22.51.25 1.09.38 1.74.38.66 0 1.24-.13 1.74-.38s.92-.66 1.26-1.22c.34-.56.6-1.28.77-2.17.17-.89.26-1.98.26-3.25v-5.34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$exposure_plus_2 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32.09 32.58l5.73-6.13c.75-.79 1.44-1.57 2.08-2.35.63-.78 1.18-1.56 1.64-2.33.46-.78.82-1.55 1.07-2.33.26-.78.39-1.57.39-2.37 0-1.07-.18-2.04-.54-2.92-.36-.87-.88-1.62-1.57-2.23-.69-.61-1.53-1.08-2.53-1.42-1-.33-2.14-.5-3.42-.5-1.38 0-2.62.21-3.7.64-1.08.43-1.99 1.01-2.73 1.75s-1.3 1.61-1.68 2.6c-.36.94-.54 1.95-.56 3.01h4.28c.01-.62.09-1.21.26-1.74.18-.58.45-1.08.81-1.5.36-.42.81-.74 1.35-.98.55-.23 1.19-.35 1.93-.35.61 0 1.15.1 1.62.31.47.21.87.49 1.19.85.32.36.57.8.74 1.29.17.5.25 1.04.25 1.63 0 .43-.06.87-.17 1.3-.11.43-.3.9-.58 1.4-.28.5-.65 1.05-1.11 1.66-.46.6-1.05 1.29-1.75 2.07l-8.35 9.11V36H44v-3.42H32.09zM16 14h-4v8H4v4h8v8h4v-8h8v-4h-8v-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$exposure_plus_1 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 14h-4v8H8v4h8v8h4v-8h8v-4h-8v-8zm20 22h-4V14.75l-6 2.05v-3.4l9.4-3.4h.6v26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$exposure_neg_2 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30.09 32.58l5.73-6.13c.75-.79 1.44-1.57 2.08-2.35.63-.78 1.18-1.56 1.64-2.33.46-.78.82-1.55 1.07-2.33.26-.78.39-1.57.39-2.37 0-1.07-.18-2.04-.54-2.92-.36-.87-.88-1.62-1.57-2.23-.69-.61-1.53-1.08-2.53-1.42-1-.33-2.14-.5-3.42-.5-1.38 0-2.62.21-3.7.64-1.08.43-1.99 1.01-2.73 1.75s-1.3 1.61-1.68 2.6c-.36.94-.54 1.95-.56 3.01h4.28c.01-.62.09-1.21.26-1.74.18-.58.45-1.08.81-1.5.36-.42.81-.74 1.35-.98.55-.23 1.19-.35 1.93-.35.61 0 1.15.1 1.62.31.47.21.87.49 1.19.85.32.36.57.8.74 1.29.17.5.25 1.04.25 1.63 0 .43-.06.87-.17 1.3-.11.43-.3.9-.58 1.4-.28.5-.65 1.05-1.11 1.66-.46.6-1.05 1.29-1.75 2.07l-8.35 9.11V36H42v-3.42H30.09zM4 22v4h16v-4H4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$exposure_neg_1 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 22v4h16v-4H8zm30 14h-4V14.75l-6 2.05v-3.4l9.4-3.4h.6v26z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$exposure = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 34v4h4v-4h4v-4h-4v-4h-4v4h-4v4h4zM40 4H8C5.79 4 4 5.79 4 8v32c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-30 6h12v4H10v-4zm30 30H8L40 8v32z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$edit = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$details = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 8l18 32L42 8H6zm6.75 4h22.5L24 32 12.75 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$dehaze = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M4 31v4h40v-4H4zm0-10v4h40v-4H4zm0-10v4h40v-4H4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_square = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 8H12c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H12V12h24v24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_rotate = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14.93 42.97C8.4 39.87 3.71 33.52 3 26H0c1.02 12.32 11.32 22 23.9 22 .45 0 .88-.04 1.32-.07L17.6 40.3l-2.67 2.67zM24.1 0c-.45 0-.88.04-1.32.07L30.4 7.7l2.66-2.66C39.6 8.13 44.29 14.48 45 22h3C46.98 9.68 36.68 0 24.1 0zM32 28h4V16c0-2.21-1.79-4-4-4H20v4h12v12zm-16 4V8h-4v4H8v4h4v16c0 2.21 1.79 4 4 4h16v4h4v-4h4v-4H16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_portrait = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 6H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h20c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32H14V10h20v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_original = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32H10V10h28v28zM27.93 24.57l-5.5 7.08-3.93-4.72L13 34h22l-7.07-9.43z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_landscape = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 10H10c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V14c0-2.21-1.79-4-4-4zm0 24H10V14h28v20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_free = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10v8h4v-8h8V6h-8c-2.21 0-4 1.79-4 4zm4 20H6v8c0 2.21 1.79 4 4 4h8v-4h-8v-8zm28 8h-8v4h8c2.21 0 4-1.79 4-4v-8h-4v8zm0-32h-8v4h8v8h4v-8c0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_din = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zm0 32H10V10h28v28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_7_5 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 14H10c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V18c0-2.21-1.79-4-4-4zm0 16H10V18h28v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_5_4 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 10H10c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V14c0-2.21-1.79-4-4-4zm0 24H10V14h28v20z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_3_2 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H10V12h28v24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop_16_9 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 12H10c-2.21 0-4 1.79-4 4v16c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V16c0-2.21-1.79-4-4-4zm0 20H10V16h28v16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$crop = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M34 30h4V14c0-2.21-1.79-4-4-4H18v4h16v16zm-20 4V2h-4v8H2v4h8v20c0 2.21 1.79 4 4 4h20v8h4v-8h8v-4H14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$control_point_duplicate = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 16h-4v6h-6v4h6v6h4v-6h6v-4h-6zM4 24c0-5.58 3.29-10.39 8.02-12.64V7.05C5.03 9.51 0 16.17 0 24s5.03 14.49 12.02 16.95v-4.31C7.29 34.39 4 29.58 4 24zM30 6c-9.93 0-18 8.07-18 18s8.07 18 18 18 18-8.07 18-18S39.93 6 30 6zm0 32c-7.72 0-14-6.28-14-14s6.28-14 14-14 14 6.28 14 14-6.28 14-14 14z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$control_point = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M26 14h-4v8h-8v4h8v8h4v-8h8v-4h-8v-8zM24 4C12.97 4 4 12.97 4 24s8.97 20 20 20 20-8.97 20-20S35.03 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$compare = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h10v4h4V2h-4v4zm0 30H10l10-12v12zM38 6H28v4h10v26L28 24v18h10c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$colorize = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M41.41 11.26l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-6.25 6.25L23.83 9 21 11.83l2.84 2.84L6 32.5V42h9.5l17.84-17.84L36.17 27 39 24.17l-3.84-3.84 6.25-6.25c.79-.78.79-2.04 0-2.82zM13.84 38L10 34.16l16.13-16.13 3.84 3.84L13.84 38z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$color_lens = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18c1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3H32c5.52 0 10-4.48 10-10 0-8.84-8.06-16-18-16zM13 24c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$collections_bookmark = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 24 24',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$collections = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M44 32V8c0-2.21-1.79-4-4-4H16c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4zm-22-8l4.06 5.42L32 22l8 10H16l6-8zM4 12v28c0 2.21 1.79 4 4 4h28v-4H8V12H4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$center_focus_weak = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 30H6v8c0 2.21 1.79 4 4 4h8v-4h-8v-8zm0-20h8V6h-8c-2.21 0-4 1.79-4 4v8h4v-8zm28-4h-8v4h8v8h4v-8c0-2.21-1.79-4-4-4zm0 32h-8v4h8c2.21 0 4-1.79 4-4v-8h-4v8zM24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$center_focus_strong = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM10 30H6v8c0 2.21 1.79 4 4 4h8v-4h-8v-8zm0-20h8V6h-8c-2.21 0-4 1.79-4 4v8h4v-8zm28-4h-8v4h8v8h4v-8c0-2.21-1.79-4-4-4zm0 32h-8v4h8c2.21 0 4-1.79 4-4v-8h-4v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$camera_roll = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 10c0-2.21-1.79-4-4-4h-2V4c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v2H8c-2.21 0-4 1.79-4 4v30c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4h16V10H28zm-4 26h-4v-4h4v4zm0-18h-4v-4h4v4zm8 18h-4v-4h4v4zm0-18h-4v-4h4v4zm8 18h-4v-4h4v4zm0-18h-4v-4h4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$camera_rear = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 40H10v4h10v4l6-6-6-6v4zm8 0v4h10v-4H28zm6-40H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h20c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zM23.99 12C21.78 12 20 10.21 20 8s1.78-4 3.99-4 4 1.79 4 4-1.79 4-4 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$camera_front = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 40H10v4h10v4l6-6-6-6v4zm8 0v4h10v-4H28zm-4-24c2.21 0 4-1.79 4-4s-1.79-4-4-4-3.99 1.79-3.99 4c.01 2.21 1.78 4 3.99 4zM34 0H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h20c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zM14 4h20v21c0-3.33-6.67-5-10-5s-10 1.67-10 5V4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$camera_alt = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 4l-3.66 4H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4h-6.34L30 4H18zm6 30c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$svg$Svg$circle,
				{
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$cx('24'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$cy('24'),
						_1: {
							ctor: '::',
							_0: _elm_lang$svg$Svg_Attributes$r('6.4'),
							_1: {ctor: '[]'}
						}
					}
				},
				{ctor: '[]'}),
			_1: {ctor: '[]'}
		}
	});
var _elm_community$material_icons$Material_Icons_Image$camera = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18.8 21l9.53-16.51C26.94 4.18 25.49 4 24 4c-4.8 0-9.19 1.69-12.64 4.51l7.33 12.69.11-.2zm24.28-3c-1.84-5.85-6.3-10.52-11.99-12.68L23.77 18h19.31zm.52 2H28.62l.58 1 9.53 16.5C41.99 33.94 44 29.21 44 24c0-1.37-.14-2.71-.4-4zm-26.53 4l-7.8-13.5C6.01 14.06 4 18.79 4 24c0 1.37.14 2.71.4 4h14.98l-2.31-4zM4.92 30c1.84 5.85 6.3 10.52 11.99 12.68L24.23 30H4.92zm22.54 0l-7.8 13.51c1.4.31 2.85.49 4.34.49 4.8 0 9.19-1.69 12.64-4.51L29.31 26.8 27.46 30z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$burst_mode = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M2 10h4v28H2zm8 0h4v28h-4zm34 0H20c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zM22 34l5-6.3 3.57 4.3 5-6.44L42 34H22z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brush = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 28c-3.31 0-6 2.69-6 6 0 2.62-2.31 4-4 4 1.84 2.44 4.99 4 8 4 4.42 0 8-3.58 8-8 0-3.31-2.69-6-6-6zM41.41 9.26l-2.67-2.67c-.78-.78-2.05-.78-2.83 0L18 24.5l5.5 5.5 17.91-17.91c.79-.79.79-2.05 0-2.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$broken_image = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M42 10v13.2l-6-6-8 8-8-8-8 8-6-6V10c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4zm-6 12.8l6 6V38c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V24.8l6 6 8-8 8 8 8-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brightness_7 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 17.37V8h-9.37L24 1.37 17.37 8H8v9.37L1.37 24 8 30.63V40h9.37L24 46.63 30.63 40H40v-9.37L46.63 24 40 17.37zM24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12zm0-20c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brightness_6 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 30.63L46.63 24 40 17.37V8h-9.37L24 1.37 17.37 8H8v9.37L1.37 24 8 30.63V40h9.37L24 46.63 30.63 40H40v-9.37zM24 36V12c6.63 0 12 5.37 12 12s-5.37 12-12 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brightness_5 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 30.63L46.63 24 40 17.37V8h-9.37L24 1.37 17.37 8H8v9.37L1.37 24 8 30.63V40h9.37L24 46.63 30.63 40H40v-9.37zM24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brightness_4 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 17.37V8h-9.37L24 1.37 17.37 8H8v9.37L1.37 24 8 30.63V40h9.37L24 46.63 30.63 40H40v-9.37L46.63 24 40 17.37zM24 36c-1.79 0-3.48-.4-5-1.1 4.13-1.9 7-6.06 7-10.9s-2.87-9-7-10.9c1.52-.7 3.21-1.1 5-1.1 6.63 0 12 5.37 12 12s-5.37 12-12 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brightness_3 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 4c-2.09 0-4.11.32-6 .92C20.11 7.47 26 15.05 26 24c0 8.95-5.89 16.53-14 19.08 1.89.59 3.91.92 6 .92 11.05 0 20-8.95 20-20S29.05 4 18 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brightness_2 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 4c-3.65 0-7.06.99-10 2.7 5.97 3.46 10 9.9 10 17.3s-4.03 13.84-10 17.3c2.94 1.71 6.35 2.7 10 2.7 11.05 0 20-8.95 20-20S31.05 4 20 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$brightness_1 = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$circle,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$cx('24'),
				_1: {
					ctor: '::',
					_0: _elm_lang$svg$Svg_Attributes$cy('24'),
					_1: {
						ctor: '::',
						_0: _elm_lang$svg$Svg_Attributes$r('20'),
						_1: {ctor: '[]'}
					}
				}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$blur_on = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 26c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6-9c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm30 11c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-14-7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM6 27c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm14 14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-34c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 11c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm16 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-14 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-8-24c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 17c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8-9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$blur_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-.4 8.96c.13.02.26.04.4.04 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .14.02.27.04.41.18 1.32 1.23 2.37 2.56 2.55zM28 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-8 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm22 14c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-22-7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm16 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-8 27c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM5 10.55l7.57 7.57c-.19-.06-.37-.12-.57-.12-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.2-.06-.38-.11-.57l5.62 5.62C18.08 25.29 17 26.51 17 28c0 1.66 1.34 3 3 3 1.49 0 2.71-1.08 2.95-2.5l5.62 5.62c-.18-.06-.37-.12-.57-.12-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.2-.06-.38-.11-.57L37.45 43 40 40.45 7.55 8 5 10.55zM20 34c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm22-7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-30-1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6-7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm14 22c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-8-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6-7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$blur_linear = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 35c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm8-9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM6 42h36v-4H6v4zm4-23c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm8 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm16-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM6 6v4h36V6H6zm28 11c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-8-7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$blur_circular = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6-7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-6-6c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6-12c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-3c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm6 12c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm4-7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$audiotrack = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 6v18.55c-.94-.33-1.94-.55-3-.55-4.97 0-9 4.03-9 9s4.03 9 9 9c4.63 0 8.4-3.51 8.9-8h.1V12h8V6H24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$assistant_photo = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M28.8 12L28 8H10v34h4V28h11.2l.8 4h14V12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$assistant = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 4H10C7.79 4 6 5.79 6 8v28c0 2.21 1.79 4 4 4h8l6 6 6-6h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zM27.75 25.75L24 34l-3.75-8.25L12 22l8.25-3.75L24 10l3.75 8.25L36 22l-8.25 3.75z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$adjust = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.97 4 4 12.97 4 24s8.97 20 20 20 20-8.97 20-20S35.03 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm6-16c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$add_to_photos = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 12H4v28c0 2.21 1.79 4 4 4h28v-4H8V12zm32-8H16c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-2 18h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Image$add_a_photo = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 8V2h4v6h6v4h-6v6H6v-6H0V8h6zm6 12v-6h6V8h14l3.66 4H42c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4V20h6zm14 18c5.52 0 10-4.48 10-10s-4.48-10-10-10-10 4.48-10 10 4.48 10 10 10zm-6.4-10c0 3.54 2.86 6.4 6.4 6.4s6.4-2.86 6.4-6.4-2.86-6.4-6.4-6.4-6.4 2.86-6.4 6.4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});

var _elm_community$material_icons$Material_Icons_Navigation$unfold_more = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 11.66L30.34 18l2.83-2.83L24 6l-9.17 9.17L17.66 18 24 11.66zm0 24.68L17.66 30l-2.83 2.83L24 42l9.17-9.17L30.34 30 24 36.34z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$unfold_less = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14.83 37.17L17.66 40 24 33.66 30.34 40l2.83-2.83L24 28l-9.17 9.17zm18.34-26.34L30.34 8 24 14.34 17.66 8l-2.83 2.83L24 20l9.17-9.17z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$subdirectory_arrow_right = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M-31 29l-12 12-2.83-2.83 7.17-7.17H-61V7h4v20h18.34l-7.17-7.17L-43 17l12 12zm71 1L28 42l-2.83-2.83L32.34 32H8V6h4v22h20.34l-7.17-7.17L28 18l12 12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$subdirectory_arrow_left = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 18l2.83 2.83L15.66 28H36V6h4v26H15.66l7.17 7.17L20 42 8 30l12-12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$refresh = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M35.3 12.7C32.41 9.8 28.42 8 24 8 15.16 8 8.02 15.16 8.02 24S15.16 40 24 40c7.45 0 13.69-5.1 15.46-12H35.3c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55L26 22h14V8l-4.7 4.7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$more_vert = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 16c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$more_horiz = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M12 20c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm24 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-12 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$menu = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$last_page = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M11.18 14.82L20.36 24l-9.18 9.18L14 36l12-12-12-12zM32 12h4v24h-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$fullscreen_exit = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 32h6v6h4V28H10v4zm6-16h-6v4h10V10h-4v6zm12 22h4v-6h6v-4H28v10zm4-22v-6h-4v10h10v-4h-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$fullscreen = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4H10v10zm24 14h-6v4h10V28h-4v6zm-6-24v4h6v6h4V10H28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$first_page = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36.82 33.18L27.64 24l9.18-9.18L34 12 22 24l12 12zM12 12h4v24h-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$expand_more = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M33.17 17.17L24 26.34l-9.17-9.17L12 20l12 12 12-12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$expand_less = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 16L12 28l2.83 2.83L24 21.66l9.17 9.17L36 28z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$close = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$chevron_right = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$chevron_left = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30.83 14.83L28 12 16 24l12 12 2.83-2.83L21.66 24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$check = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 32.34L9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$cancel = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 27.17L31.17 34 24 26.83 16.83 34 14 31.17 21.17 24 14 16.83 16.83 14 24 21.17 31.17 14 34 16.83 26.83 24 34 31.17z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$arrow_upward = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$arrow_forward = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 8l-2.83 2.83L32.34 22H8v4h24.34L21.17 37.17 24 40l16-16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$arrow_drop_up = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 28l10-10 10 10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$arrow_drop_down_circle = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 24l-8-8h16l-8 8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$arrow_drop_down = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M14 20l10 10 10-10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$arrow_downward = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 24l-2.82-2.82L26 32.34V8h-4v24.34L10.84 21.16 8 24l16 16 16-16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$arrow_back = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 22H15.66l11.17-11.17L24 8 8 24l16 16 2.83-2.83L15.66 26H40v-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Navigation$apps = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M8 16h8V8H8v8zm12 24h8v-8h-8v8zM8 40h8v-8H8v8zm0-12h8v-8H8v8zm12 0h8v-8h-8v8zM32 8v8h8V8h-8zm-12 8h8V8h-8v8zm12 12h8v-8h-8v8zm0 12h8v-8h-8v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});

var _elm_community$material_icons$Material_Icons_Social$whatshot = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M27 1.34s1.48 5.3 1.48 9.6c0 4.12-2.7 7.47-6.83 7.47s-7.25-3.34-7.25-7.47l.05-.72C10.43 15.03 8 21.23 8 28c0 8.84 7.16 16 16 16s16-7.16 16-16c0-10.79-5.19-20.41-13-26.66zM23.42 38c-3.56 0-6.45-2.81-6.45-6.28 0-3.25 2.09-5.53 5.63-6.24s7.2-2.41 9.23-5.15c.78 2.58 1.19 5.3 1.19 8.07 0 5.29-4.3 9.6-9.6 9.6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$share = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M36 32.17c-1.52 0-2.89.59-3.93 1.54L17.82 25.4c.11-.45.18-.92.18-1.4s-.07-.95-.18-1.4l14.1-8.23c1.07 1 2.5 1.62 4.08 1.62 3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6c0 .48.07.95.18 1.4l-14.1 8.23c-1.07-1-2.5-1.62-4.08-1.62-3.31 0-6 2.69-6 6s2.69 6 6 6c1.58 0 3.01-.62 4.08-1.62l14.25 8.31c-.1.42-.16.86-.16 1.31 0 3.22 2.61 5.83 5.83 5.83s5.83-2.61 5.83-5.83-2.61-5.83-5.83-5.83z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$sentiment_very_satisfied = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm2-20.12L28.12 22l2.12-2.12L32.36 22l2.13-2.12-4.25-4.24zm-8.24 0L19.88 22 22 19.88l-4.24-4.24-4.25 4.24L15.64 22zM24 35c4.66 0 8.62-2.92 10.22-7H13.78c1.6 4.08 5.56 7 10.22 7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$sentiment_very_dissatisfied = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm8.36-24.49l-2.12 2.13-2.12-2.13L26 17.64l2.12 2.12L26 21.88 28.12 24l2.12-2.12L32.36 24l2.13-2.12-2.13-2.12 2.13-2.12zM15.64 24l2.12-2.12L19.88 24 22 21.88l-2.12-2.12L22 17.64l-2.12-2.13-2.12 2.13-2.12-2.13-2.13 2.13 2.13 2.12-2.13 2.12zM24 28c-4.66 0-8.62 2.92-10.22 7h20.44c-1.6-4.08-5.56-7-10.22-7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$sentiment_satisfied = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M31 22c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-14 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm6.98-18C12.94 4 4 12.96 4 24s8.94 20 19.98 20C35.04 44 44 35.04 44 24S35.04 4 23.98 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm0-8c-2.95 0-5.5-1.62-6.89-4h-3.35c1.6 4.09 5.58 7 10.24 7s8.64-2.91 10.24-7h-3.35c-1.39 2.38-3.94 4-6.89 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$sentiment_neutral = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M18 28h12v3H18zm13-12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-11 3c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm3.98-15C12.94 4 4 12.96 4 24s8.94 20 19.98 20C35.04 44 44 35.04 44 24S35.04 4 23.98 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$sentiment_dissatisfied = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M31 22c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-14 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm6.98-18C12.94 4 4 12.96 4 24s8.94 20 19.98 20C35.04 44 44 35.04 44 24S35.04 4 23.98 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm0-12c-4.66 0-8.64 2.91-10.24 7h3.35c1.39-2.38 3.94-4 6.89-4s5.5 1.62 6.89 4h3.35c-1.6-4.09-5.58-7-10.24-7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$school = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M10 26.36v8L24 42l14-7.64v-8L24 34l-14-7.64zM24 6L2 18l22 12 18-9.82V34h4V18L24 6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$public = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 35.86C14.11 38.88 8 32.16 8 24c0-1.23.15-2.43.42-3.58L18 30v2c0 2.21 1.79 4 4 4v3.86zm13.79-5.07C35.28 33.17 33.78 32 32 32h-2v-6c0-1.1-.9-2-2-2H16v-4h4c1.1 0 2-.9 2-2v-4h4c2.21 0 4-1.79 4-4v-.83c5.86 2.37 10 8.11 10 14.83 0 4.16-1.6 7.94-4.21 10.79z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$poll = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM18 34h-4V20h4v14zm8 0h-4V14h4v20zm8 0h-4v-8h4v8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$plus_one = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M20 16h-4v8H8v4h8v8h4v-8h8v-4h-8zm9-3.84v3.64l5-1V36h4V10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$person_outline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 11.8c2.32 0 4.2 1.88 4.2 4.2s-1.88 4.2-4.2 4.2-4.2-1.88-4.2-4.2 1.88-4.2 4.2-4.2m0 18c5.95 0 12.2 2.91 12.2 4.2v2.2H11.8V34c0-1.29 6.25-4.2 12.2-4.2M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 18c-5.33 0-16 2.67-16 8v6h32v-6c0-5.33-10.67-8-16-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$person_add = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 24c4.42 0 8-3.59 8-8 0-4.42-3.58-8-8-8s-8 3.58-8 8c0 4.41 3.58 8 8 8zm-18-4v-6H8v6H2v4h6v6h4v-6h6v-4h-6zm18 8c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$person = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 24c4.42 0 8-3.59 8-8 0-4.42-3.58-8-8-8s-8 3.58-8 8c0 4.41 3.58 8 8 8zm0 4c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$people_outline = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M33 26c-2.41 0-6.15.67-9 2.01-2.85-1.34-6.59-2.01-9-2.01-4.33 0-13 2.17-13 6.5V38h44v-5.5c0-4.33-8.67-6.5-13-6.5zm-8 9H5v-2.5c0-1.07 5.12-3.5 10-3.5s10 2.43 10 3.5V35zm18 0H28v-2.5c0-.91-.4-1.72-1.04-2.44C28.73 29.46 30.89 29 33 29c4.88 0 10 2.43 10 3.5V35zM15 24c3.87 0 7-3.14 7-7s-3.13-7-7-7c-3.86 0-7 3.14-7 7s3.14 7 7 7zm0-11c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm18 11c3.87 0 7-3.14 7-7s-3.13-7-7-7c-3.86 0-7 3.14-7 7s3.14 7 7 7zm0-11c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$people = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 22c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm-16 0c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm0 4c-4.67 0-14 2.34-14 7v5h28v-5c0-4.66-9.33-7-14-7zm16 0c-.58 0-1.23.04-1.93.11C32.39 27.78 34 30.03 34 33v5h12v-5c0-4.66-9.33-7-14-7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$party_mode = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 8h-6.34L30 4H18l-3.66 4H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm-16 6c3.26 0 6.13 1.59 7.96 4H24c-3.31 0-6 2.69-6 6 0 .71.14 1.37.37 2H14.2c-.13-.65-.2-1.31-.2-2 0-5.52 4.48-10 10-10zm0 20c-3.26 0-6.13-1.58-7.95-4H24c3.31 0 6-2.69 6-6 0-.7-.14-1.37-.37-2h4.17c.13.65.2 1.31.2 2 0 5.52-4.48 10-10 10z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$pages = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M6 10v12h10l-2-8 8 2V6H10c-2.21 0-4 1.79-4 4zm10 16H6v12c0 2.21 1.79 4 4 4h12V32l-8 2 2-8zm18 8l-8-2v10h12c2.21 0 4-1.79 4-4V26H32l2 8zm4-28H26v10l8-2-2 8h10V10c0-2.21-1.79-4-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$notifications_paused = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 44c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4zm12-12V22c0-6.15-3.27-11.28-9-12.64V8c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.36c-5.73 1.36-9 6.49-9 12.64v10l-4 4v2h32v-2l-4-4zm-7-12.4l-5.6 6.8H29V30H19v-3.6l5.6-6.8H19V16h10v3.6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$notifications_off = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M40 37.39L15.68 12.3l-5.13-5.29L8 9.55l5.6 5.6.01.01C12.56 17.14 12 19.48 12 22v10l-4 4v2h27.46l4 4L42 39.45l-2-2.06zM24 44c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4zm12-14.64V22c0-6.15-3.27-11.28-9-12.64V8c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.36c-.29.07-.57.15-.85.24-.21.07-.41.14-.61.22 0 0-.01 0-.01.01-.01 0-.02.01-.03.01-.46.18-.91.39-1.35.62-.01 0-.02.01-.03.01L36 29.36z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$notifications_none = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 44c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4zm12-12V22c0-6.15-3.27-11.28-9-12.64V8c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.36c-5.73 1.36-9 6.49-9 12.64v10l-4 4v2h32v-2l-4-4zm-4 2H16V22c0-4.97 3.03-9 8-9s8 4.03 8 9v12z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$notifications_active = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M15.16 8.16L12.3 5.3C7.51 8.95 4.35 14.59 4.05 21h4c.31-5.3 3.04-9.94 7.11-12.84zM39.95 21h4c-.3-6.41-3.46-12.05-8.25-15.7l-2.85 2.85c4.06 2.91 6.79 7.55 7.1 12.85zM36 22c0-6.15-3.27-11.28-9-12.64V8c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.36c-5.73 1.36-9 6.49-9 12.64v10l-4 4v2h32v-2l-4-4V22zM24 44c.28 0 .55-.03.81-.08 1.3-.27 2.37-1.17 2.88-2.36.2-.48.31-1 .31-1.56h-8c0 2.21 1.79 4 4 4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$notifications = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 44c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4zm12-12V22c0-6.15-3.27-11.28-9-12.64V8c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.36c-5.73 1.36-9 6.49-9 12.64v10l-4 4v2h32v-2l-4-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$mood_bad = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm7-18c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-14 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm17.21 13c-1.6-4.09-5.55-7-10.21-7s-8.61 2.91-10.21 7'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$mood = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm7-18c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-14 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm7 13c4.66 0 8.61-2.91 10.21-7H13.79c1.6 4.09 5.55 7 10.21 7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$location_city = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M30 22V10l-6-6-6 6v4H6v28h36V22H30zM14 38h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm12 16h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm12 24h-4v-4h4v4zm0-8h-4v-4h4v4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$group_add = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M16 20h-6v-6H6v6H0v4h6v6h4v-6h6v-4zm20 2c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-.64 0-1.25.1-1.83.29 1.13 1.62 1.81 3.59 1.81 5.71s-.68 4.09-1.81 5.71c.58.19 1.19.29 1.83.29zm-10 0c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm13.24 4.32C40.9 27.77 42 29.64 42 32v4h6v-4c0-3.08-4.75-4.97-8.76-5.68zM26 26c-4 0-12 2-12 6v4h24v-4c0-4-8-6-12-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$group = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M32 22c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm-16 0c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm0 4c-4.67 0-14 2.34-14 7v5h28v-5c0-4.66-9.33-7-14-7zm16 0c-.58 0-1.23.04-1.93.11C32.39 27.78 34 30.03 34 33v5h12v-5c0-4.66-9.33-7-14-7z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$domain = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 14V6H4v36h40V14H24zM12 38H8v-4h4v4zm0-8H8v-4h4v4zm0-8H8v-4h4v4zm0-8H8v-4h4v4zm8 24h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm20 24H24v-4h4v-4h-4v-4h4v-4h-4v-4h16v20zm-4-16h-4v4h4v-4zm0 8h-4v4h4v-4z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});
var _elm_community$material_icons$Material_Icons_Social$cake = A2(
	_elm_community$material_icons$Material_Icons_Internal$icon,
	'0 0 48 48',
	{
		ctor: '::',
		_0: A2(
			_elm_lang$svg$Svg$path,
			{
				ctor: '::',
				_0: _elm_lang$svg$Svg_Attributes$d('M24 12c2.21 0 4-1.79 4-4 0-.75-.21-1.46-.57-2.06L24 0l-3.43 5.94C20.21 6.54 20 7.25 20 8c0 2.21 1.79 4 4 4zm9.19 19.97l-2.15-2.15-2.16 2.15c-2.61 2.61-7.17 2.61-9.78 0l-2.15-2.15-2.16 2.15C13.5 33.28 11.77 34 9.92 34c-1.45 0-2.8-.46-3.92-1.23V42c0 1.1.9 2 2 2h32c1.1 0 2-.9 2-2v-9.23c-1.12.77-2.46 1.23-3.92 1.23-1.85 0-3.58-.72-4.89-2.03zM36 18H26v-4h-4v4H12c-3.31 0-6 2.69-6 6v3.08C6 29.24 7.76 31 9.92 31c1.05 0 2.03-.41 2.77-1.15l4.28-4.27 4.27 4.26c1.48 1.48 4.06 1.48 5.54 0l4.28-4.26 4.27 4.26c.74.74 1.72 1.15 2.77 1.15 2.16 0 3.92-1.76 3.92-3.92V24c-.02-3.31-2.71-6-6.02-6z'),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'}),
		_1: {ctor: '[]'}
	});

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom$blur = _elm_lang$dom$Native_Dom.blur;
var _elm_lang$dom$Dom$focus = _elm_lang$dom$Native_Dom.focus;
var _elm_lang$dom$Dom$NotFound = function (a) {
	return {ctor: 'NotFound', _0: a};
};

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$dom$Dom_Size$width = _elm_lang$dom$Native_Dom.width;
var _elm_lang$dom$Dom_Size$height = _elm_lang$dom$Native_Dom.height;
var _elm_lang$dom$Dom_Size$VisibleContentWithBordersAndMargins = {ctor: 'VisibleContentWithBordersAndMargins'};
var _elm_lang$dom$Dom_Size$VisibleContentWithBorders = {ctor: 'VisibleContentWithBorders'};
var _elm_lang$dom$Dom_Size$VisibleContent = {ctor: 'VisibleContent'};
var _elm_lang$dom$Dom_Size$Content = {ctor: 'Content'};

var _elm_lang$dom$Dom_Scroll$toX = _elm_lang$dom$Native_Dom.setScrollLeft;
var _elm_lang$dom$Dom_Scroll$x = _elm_lang$dom$Native_Dom.getScrollLeft;
var _elm_lang$dom$Dom_Scroll$toRight = _elm_lang$dom$Native_Dom.toRight;
var _elm_lang$dom$Dom_Scroll$toLeft = function (id) {
	return A2(_elm_lang$dom$Dom_Scroll$toX, id, 0);
};
var _elm_lang$dom$Dom_Scroll$toY = _elm_lang$dom$Native_Dom.setScrollTop;
var _elm_lang$dom$Dom_Scroll$y = _elm_lang$dom$Native_Dom.getScrollTop;
var _elm_lang$dom$Dom_Scroll$toBottom = _elm_lang$dom$Native_Dom.toBottom;
var _elm_lang$dom$Dom_Scroll$toTop = function (id) {
	return A2(_elm_lang$dom$Dom_Scroll$toY, id, 0);
};

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _elm_lang$http$Native_Http = function() {


// ENCODING AND DECODING

function encodeUri(string)
{
	return encodeURIComponent(string);
}

function decodeUri(string)
{
	try
	{
		return _elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch(e)
	{
		return _elm_lang$core$Maybe$Nothing;
	}
}


// SEND REQUEST

function toTask(request, maybeProgress)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NetworkError' }));
		});
		xhr.addEventListener('timeout', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'Timeout' }));
		});
		xhr.addEventListener('load', function() {
			callback(handleResponse(xhr, request.expect.responseToResult));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'BadUrl', _0: request.url }));
		}

		configureRequest(xhr, request);
		send(xhr, request.body);

		return function() { xhr.abort(); };
	});
}

function configureProgress(xhr, maybeProgress)
{
	if (maybeProgress.ctor === 'Nothing')
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_elm_lang$core$Native_Scheduler.rawSpawn(maybeProgress._0({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function configureRequest(xhr, request)
{
	function setHeader(pair)
	{
		xhr.setRequestHeader(pair._0, pair._1);
	}

	A2(_elm_lang$core$List$map, setHeader, request.headers);
	xhr.responseType = request.expect.responseType;
	xhr.withCredentials = request.withCredentials;

	if (request.timeout.ctor === 'Just')
	{
		xhr.timeout = request.timeout._0;
	}
}

function send(xhr, body)
{
	switch (body.ctor)
	{
		case 'EmptyBody':
			xhr.send();
			return;

		case 'StringBody':
			xhr.setRequestHeader('Content-Type', body._0);
			xhr.send(body._1);
			return;

		case 'FormDataBody':
			xhr.send(body._0);
			return;
	}
}


// RESPONSES

function handleResponse(xhr, responseToResult)
{
	var response = toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadStatus',
			_0: response
		});
	}

	var result = responseToResult(response);

	if (result.ctor === 'Ok')
	{
		return _elm_lang$core$Native_Scheduler.succeed(result._0);
	}
	else
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadPayload',
			_0: result._0,
			_1: response
		});
	}
}

function toResponse(xhr)
{
	return {
		status: { code: xhr.status, message: xhr.statusText },
		headers: parseHeaders(xhr.getAllResponseHeaders()),
		url: xhr.responseURL,
		body: xhr.response
	};
}

function parseHeaders(rawHeaders)
{
	var headers = _elm_lang$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
				if (oldValue.ctor === 'Just')
				{
					return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
				}
				return _elm_lang$core$Maybe$Just(value);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function expectStringResponse(responseToResult)
{
	return {
		responseType: 'text',
		responseToResult: responseToResult
	};
}

function mapExpect(func, expect)
{
	return {
		responseType: expect.responseType,
		responseToResult: function(response) {
			var convertedResponse = expect.responseToResult(response);
			return A2(_elm_lang$core$Result$map, func, convertedResponse);
		}
	};
}


// BODY

function multipart(parts)
{
	var formData = new FormData();

	while (parts.ctor !== '[]')
	{
		var part = parts._0;
		formData.append(part._0, part._1);
		parts = parts._1;
	}

	return { ctor: 'FormDataBody', _0: formData };
}

return {
	toTask: F2(toTask),
	expectStringResponse: expectStringResponse,
	mapExpect: F2(mapExpect),
	multipart: multipart,
	encodeUri: encodeUri,
	decodeUri: decodeUri
};

}();

var _elm_lang$http$Http_Internal$map = F2(
	function (func, request) {
		return _elm_lang$core$Native_Utils.update(
			request,
			{
				expect: A2(_elm_lang$http$Native_Http.mapExpect, func, request.expect)
			});
	});
var _elm_lang$http$Http_Internal$RawRequest = F7(
	function (a, b, c, d, e, f, g) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
	});
var _elm_lang$http$Http_Internal$Request = function (a) {
	return {ctor: 'Request', _0: a};
};
var _elm_lang$http$Http_Internal$Expect = {ctor: 'Expect'};
var _elm_lang$http$Http_Internal$FormDataBody = {ctor: 'FormDataBody'};
var _elm_lang$http$Http_Internal$StringBody = F2(
	function (a, b) {
		return {ctor: 'StringBody', _0: a, _1: b};
	});
var _elm_lang$http$Http_Internal$EmptyBody = {ctor: 'EmptyBody'};
var _elm_lang$http$Http_Internal$Header = F2(
	function (a, b) {
		return {ctor: 'Header', _0: a, _1: b};
	});

var _elm_lang$http$Http$decodeUri = _elm_lang$http$Native_Http.decodeUri;
var _elm_lang$http$Http$encodeUri = _elm_lang$http$Native_Http.encodeUri;
var _elm_lang$http$Http$expectStringResponse = _elm_lang$http$Native_Http.expectStringResponse;
var _elm_lang$http$Http$expectJson = function (decoder) {
	return _elm_lang$http$Http$expectStringResponse(
		function (response) {
			return A2(_elm_lang$core$Json_Decode$decodeString, decoder, response.body);
		});
};
var _elm_lang$http$Http$expectString = _elm_lang$http$Http$expectStringResponse(
	function (response) {
		return _elm_lang$core$Result$Ok(response.body);
	});
var _elm_lang$http$Http$multipartBody = _elm_lang$http$Native_Http.multipart;
var _elm_lang$http$Http$stringBody = _elm_lang$http$Http_Internal$StringBody;
var _elm_lang$http$Http$jsonBody = function (value) {
	return A2(
		_elm_lang$http$Http_Internal$StringBody,
		'application/json',
		A2(_elm_lang$core$Json_Encode$encode, 0, value));
};
var _elm_lang$http$Http$emptyBody = _elm_lang$http$Http_Internal$EmptyBody;
var _elm_lang$http$Http$header = _elm_lang$http$Http_Internal$Header;
var _elm_lang$http$Http$request = _elm_lang$http$Http_Internal$Request;
var _elm_lang$http$Http$post = F3(
	function (url, body, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'POST',
				headers: {ctor: '[]'},
				url: url,
				body: body,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$get = F2(
	function (url, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'GET',
				headers: {ctor: '[]'},
				url: url,
				body: _elm_lang$http$Http$emptyBody,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$getString = function (url) {
	return _elm_lang$http$Http$request(
		{
			method: 'GET',
			headers: {ctor: '[]'},
			url: url,
			body: _elm_lang$http$Http$emptyBody,
			expect: _elm_lang$http$Http$expectString,
			timeout: _elm_lang$core$Maybe$Nothing,
			withCredentials: false
		});
};
var _elm_lang$http$Http$toTask = function (_p0) {
	var _p1 = _p0;
	return A2(_elm_lang$http$Native_Http.toTask, _p1._0, _elm_lang$core$Maybe$Nothing);
};
var _elm_lang$http$Http$send = F2(
	function (resultToMessage, request) {
		return A2(
			_elm_lang$core$Task$attempt,
			resultToMessage,
			_elm_lang$http$Http$toTask(request));
	});
var _elm_lang$http$Http$Response = F4(
	function (a, b, c, d) {
		return {url: a, status: b, headers: c, body: d};
	});
var _elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {ctor: 'BadPayload', _0: a, _1: b};
	});
var _elm_lang$http$Http$BadStatus = function (a) {
	return {ctor: 'BadStatus', _0: a};
};
var _elm_lang$http$Http$NetworkError = {ctor: 'NetworkError'};
var _elm_lang$http$Http$Timeout = {ctor: 'Timeout'};
var _elm_lang$http$Http$BadUrl = function (a) {
	return {ctor: 'BadUrl', _0: a};
};
var _elm_lang$http$Http$StringPart = F2(
	function (a, b) {
		return {ctor: 'StringPart', _0: a, _1: b};
	});
var _elm_lang$http$Http$stringPart = _elm_lang$http$Http$StringPart;

var _elm_lang$navigation$Native_Navigation = function() {


// FAKE NAVIGATION

function go(n)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function pushState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function replaceState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}


// REAL NAVIGATION

function reloadPage(skipCache)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		document.location.reload(skipCache);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function setLocation(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		try
		{
			window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			document.location.reload(false);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


// GET LOCATION

function getLocation()
{
	var location = document.location;

	return {
		href: location.href,
		host: location.host,
		hostname: location.hostname,
		protocol: location.protocol,
		origin: location.origin,
		port_: location.port,
		pathname: location.pathname,
		search: location.search,
		hash: location.hash,
		username: location.username,
		password: location.password
	};
}


// DETECT IE11 PROBLEMS

function isInternetExplorer11()
{
	return window.navigator.userAgent.indexOf('Trident') !== -1;
}


return {
	go: go,
	setLocation: setLocation,
	reloadPage: reloadPage,
	pushState: pushState,
	replaceState: replaceState,
	getLocation: getLocation,
	isInternetExplorer11: isInternetExplorer11
};

}();

var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
var _elm_lang$navigation$Navigation$reloadPage = _elm_lang$navigation$Native_Navigation.reloadPage;
var _elm_lang$navigation$Navigation$setLocation = _elm_lang$navigation$Native_Navigation.setLocation;
var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
_elm_lang$navigation$Navigation_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
	});
var _elm_lang$navigation$Navigation$notify = F3(
	function (router, subs, location) {
		var send = function (_p1) {
			var _p2 = _p1;
			return A2(
				_elm_lang$core$Platform$sendToApp,
				router,
				_p2._0(location));
		};
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(_elm_lang$core$List$map, send, subs)),
			_elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'}));
	});
var _elm_lang$navigation$Navigation$cmdHelp = F3(
	function (router, subs, cmd) {
		var _p3 = cmd;
		switch (_p3.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$go(_p3._0);
			case 'New':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$pushState(_p3._0));
			case 'Modify':
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$replaceState(_p3._0));
			case 'Visit':
				return _elm_lang$navigation$Navigation$setLocation(_p3._0);
			default:
				return _elm_lang$navigation$Navigation$reloadPage(_p3._0);
		}
	});
var _elm_lang$navigation$Navigation$killPopWatcher = function (popWatcher) {
	var _p4 = popWatcher;
	if (_p4.ctor === 'Normal') {
		return _elm_lang$core$Process$kill(_p4._0);
	} else {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Process$kill(_p4._0),
			_elm_lang$core$Process$kill(_p4._1));
	}
};
var _elm_lang$navigation$Navigation$onSelfMsg = F3(
	function (router, location, state) {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
			_elm_lang$core$Task$succeed(state));
	});
var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$Location = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {href: a, host: b, hostname: c, protocol: d, origin: e, port_: f, pathname: g, search: h, hash: i, username: j, password: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$navigation$Navigation$State = F2(
	function (a, b) {
		return {subs: a, popWatcher: b};
	});
var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
	A2(
		_elm_lang$navigation$Navigation$State,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$Reload = function (a) {
	return {ctor: 'Reload', _0: a};
};
var _elm_lang$navigation$Navigation$reload = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(false));
var _elm_lang$navigation$Navigation$reloadAndSkipCache = _elm_lang$navigation$Navigation$command(
	_elm_lang$navigation$Navigation$Reload(true));
var _elm_lang$navigation$Navigation$Visit = function (a) {
	return {ctor: 'Visit', _0: a};
};
var _elm_lang$navigation$Navigation$load = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Visit(url));
};
var _elm_lang$navigation$Navigation$Modify = function (a) {
	return {ctor: 'Modify', _0: a};
};
var _elm_lang$navigation$Navigation$modifyUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Modify(url));
};
var _elm_lang$navigation$Navigation$New = function (a) {
	return {ctor: 'New', _0: a};
};
var _elm_lang$navigation$Navigation$newUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$New(url));
};
var _elm_lang$navigation$Navigation$Jump = function (a) {
	return {ctor: 'Jump', _0: a};
};
var _elm_lang$navigation$Navigation$back = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(0 - n));
};
var _elm_lang$navigation$Navigation$forward = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(n));
};
var _elm_lang$navigation$Navigation$cmdMap = F2(
	function (_p5, myCmd) {
		var _p6 = myCmd;
		switch (_p6.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$Jump(_p6._0);
			case 'New':
				return _elm_lang$navigation$Navigation$New(_p6._0);
			case 'Modify':
				return _elm_lang$navigation$Navigation$Modify(_p6._0);
			case 'Visit':
				return _elm_lang$navigation$Navigation$Visit(_p6._0);
			default:
				return _elm_lang$navigation$Navigation$Reload(_p6._0);
		}
	});
var _elm_lang$navigation$Navigation$Monitor = function (a) {
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$program = F2(
	function (locationToMessage, stuff) {
		var init = stuff.init(
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$program(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (locationToMessage, stuff) {
		var init = function (flags) {
			return A2(
				stuff.init,
				flags,
				_elm_lang$navigation$Native_Navigation.getLocation(
					{ctor: '_Tuple0'}));
		};
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$programWithFlags(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p7) {
		var _p8 = _p7;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p9) {
				return func(
					_p8._0(_p9));
			});
	});
var _elm_lang$navigation$Navigation$InternetExplorer = F2(
	function (a, b) {
		return {ctor: 'InternetExplorer', _0: a, _1: b};
	});
var _elm_lang$navigation$Navigation$Normal = function (a) {
	return {ctor: 'Normal', _0: a};
};
var _elm_lang$navigation$Navigation$spawnPopWatcher = function (router) {
	var reportLocation = function (_p10) {
		return A2(
			_elm_lang$core$Platform$sendToSelf,
			router,
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
	};
	return _elm_lang$navigation$Native_Navigation.isInternetExplorer11(
		{ctor: '_Tuple0'}) ? A3(
		_elm_lang$core$Task$map2,
		_elm_lang$navigation$Navigation$InternetExplorer,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)),
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'hashchange', _elm_lang$core$Json_Decode$value, reportLocation))) : A2(
		_elm_lang$core$Task$map,
		_elm_lang$navigation$Navigation$Normal,
		_elm_lang$core$Process$spawn(
			A3(_elm_lang$dom$Dom_LowLevel$onWindow, 'popstate', _elm_lang$core$Json_Decode$value, reportLocation)));
};
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p11) {
		var _p12 = _p11;
		var _p15 = _p12.popWatcher;
		var stepState = function () {
			var _p13 = {ctor: '_Tuple2', _0: subs, _1: _p15};
			_v6_2:
			do {
				if (_p13._0.ctor === '[]') {
					if (_p13._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$navigation$Navigation$killPopWatcher(_p13._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v6_2;
					}
				} else {
					if (_p13._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$map,
							function (_p14) {
								return A2(
									_elm_lang$navigation$Navigation$State,
									subs,
									_elm_lang$core$Maybe$Just(_p14));
							},
							_elm_lang$navigation$Navigation$spawnPopWatcher(router));
					} else {
						break _v6_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p15));
		}();
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
					cmds)),
			stepState);
	});
_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};

var _user$project$Types$Photo = F2(
	function (a, b) {
		return {relativeFilePath: a, dateCreated: b};
	});

var _user$project$Model$prevPhoto = function (_p0) {
	var _p1 = _p0;
	return A3(
		_elm_lang$core$List$foldl,
		function (_p2) {
			return _elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(_p2));
		},
		_elm_lang$core$Maybe$Nothing,
		_p1._0.photosBefore);
};
var _user$project$Model$nextPhoto = function (_p3) {
	var _p4 = _p3;
	return _elm_lang$core$List$head(_p4._0.photosAfter);
};
var _user$project$Model$photoOrder = F2(
	function (photoA, photoB) {
		var timestampB = A2(_elm_lang$core$Maybe$withDefault, 0, photoB.dateCreated);
		var timestampA = A2(_elm_lang$core$Maybe$withDefault, 0, photoA.dateCreated);
		return (_elm_lang$core$Native_Utils.eq(timestampA, 0) && _elm_lang$core$Native_Utils.eq(timestampB, 0)) ? A2(_elm_lang$core$Basics$compare, photoA.relativeFilePath, photoB.relativeFilePath) : A2(_elm_lang$core$Basics$compare, timestampA, timestampB);
	});
var _user$project$Model$albums = function (_p5) {
	var _p6 = _p5;
	return _p6._0.albums;
};
var _user$project$Model$message = function (_p7) {
	var _p8 = _p7;
	return _p8._0.message;
};
var _user$project$Model$photos = function (_p9) {
	var _p10 = _p9;
	var _p12 = _p10._0;
	var _p11 = _p12.photoShown;
	if (_p11.ctor === 'Nothing') {
		return A2(_elm_lang$core$Basics_ops['++'], _p12.photosBefore, _p12.photosAfter);
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_p12.photosBefore,
			{ctor: '::', _0: _p11._0, _1: _p12.photosAfter});
	}
};
var _user$project$Model$photoShown = function (_p13) {
	var _p14 = _p13;
	return _p14._0.photoShown;
};
var _user$project$Model$albumShown = function (_p15) {
	var _p16 = _p15;
	return _p16._0.albumShown;
};
var _user$project$Model$hash = function (model) {
	var _p17 = _user$project$Model$albumShown(model);
	if (_p17.ctor === 'Nothing') {
		return '';
	} else {
		var _p19 = _p17._0;
		var _p18 = _user$project$Model$photoShown(model);
		if (_p18.ctor === 'Nothing') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'#',
				_elm_lang$http$Http$encodeUri(_p19));
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'#',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$http$Http$encodeUri(_p19),
					A2(
						_elm_lang$core$Basics_ops['++'],
						':',
						_elm_lang$http$Http$encodeUri(_p18._0.relativeFilePath))));
		}
	}
};
var _user$project$Model$InternalModel = F6(
	function (a, b, c, d, e, f) {
		return {albums: a, albumShown: b, photosBefore: c, photoShown: d, photosAfter: e, message: f};
	});
var _user$project$Model$PhotoSplit = F3(
	function (a, b, c) {
		return {left: a, middle: b, right: c};
	});
var _user$project$Model$splitAt = F2(
	function (path, list) {
		var _p20 = A2(
			_elm_lang$core$List$filter,
			function (p) {
				return _elm_lang$core$Native_Utils.eq(p.relativeFilePath, path);
			},
			list);
		if ((_p20.ctor === '::') && (_p20._1.ctor === '[]')) {
			return _elm_lang$core$Maybe$Just(
				A3(
					_user$project$Model$PhotoSplit,
					A2(
						_elm_community$list_extra$List_Extra$takeWhile,
						function (p) {
							return !_elm_lang$core$Native_Utils.eq(p.relativeFilePath, path);
						},
						list),
					_p20._0,
					A2(
						_elm_lang$core$List$drop,
						1,
						A2(
							_elm_community$list_extra$List_Extra$dropWhile,
							function (p) {
								return !_elm_lang$core$Native_Utils.eq(p.relativeFilePath, path);
							},
							list))));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _user$project$Model$Model = function (a) {
	return {ctor: 'Model', _0: a};
};
var _user$project$Model$initialModel = _user$project$Model$Model(
	A6(
		_user$project$Model$InternalModel,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing,
		{ctor: '[]'},
		'Starting'));
var _user$project$Model$removePhotoShown = function (_p21) {
	var _p22 = _p21;
	return _user$project$Model$Model(
		_elm_lang$core$Native_Utils.update(
			_p22._0,
			{photoShown: _elm_lang$core$Maybe$Nothing}));
};
var _user$project$Model$withAlbumShown = F2(
	function (album, _p23) {
		var _p24 = _p23;
		return _user$project$Model$Model(
			_elm_lang$core$Native_Utils.update(
				_p24._0,
				{albumShown: album}));
	});
var _user$project$Model$withAlbums = F2(
	function (albumList, _p25) {
		var _p26 = _p25;
		return _user$project$Model$Model(
			_elm_lang$core$Native_Utils.update(
				_p26._0,
				{albums: albumList}));
	});
var _user$project$Model$withPhotoShown = F2(
	function (filename, _p27) {
		var _p28 = _p27;
		var _p32 = _p28._0;
		var _p29 = filename;
		if (_p29.ctor === 'Nothing') {
			return _user$project$Model$Model(
				_elm_lang$core$Native_Utils.update(
					_p32,
					{
						photosBefore: _user$project$Model$photos(
							_user$project$Model$Model(_p32)),
						photosAfter: {ctor: '[]'},
						photoShown: _elm_lang$core$Maybe$Nothing
					}));
		} else {
			var newSplit = A2(
				_user$project$Model$splitAt,
				_p29._0,
				_user$project$Model$photos(
					_user$project$Model$Model(_p32)));
			var _p30 = newSplit;
			if (_p30.ctor === 'Nothing') {
				return _user$project$Model$Model(
					_elm_lang$core$Native_Utils.update(
						_p32,
						{photoShown: _elm_lang$core$Maybe$Nothing}));
			} else {
				var _p31 = _p30._0;
				return _user$project$Model$Model(
					_elm_lang$core$Native_Utils.update(
						_p32,
						{
							photosBefore: _p31.left,
							photosAfter: _p31.right,
							photoShown: _elm_lang$core$Maybe$Just(_p31.middle)
						}));
			}
		}
	});
var _user$project$Model$withMessage = F2(
	function (message, _p33) {
		var _p34 = _p33;
		return _user$project$Model$Model(
			_elm_lang$core$Native_Utils.update(
				_p34._0,
				{message: message}));
	});
var _user$project$Model$withPhotos = F2(
	function (photos, _p35) {
		var _p36 = _p35;
		return _user$project$Model$Model(
			_elm_lang$core$Native_Utils.update(
				_p36._0,
				{
					photosBefore: A2(_elm_lang$core$List$sortWith, _user$project$Model$photoOrder, photos)
				}));
	});
var _user$project$Model$updateCurrentPhotoPath = F2(
	function (newPath, _p37) {
		var _p38 = _p37;
		var _p40 = _p38._0;
		var _p39 = _p40.photoShown;
		if (_p39.ctor === 'Nothing') {
			return _user$project$Model$Model(_p40);
		} else {
			var newPhoto = _elm_lang$core$Native_Utils.update(
				_p39._0,
				{relativeFilePath: newPath});
			return _user$project$Model$Model(
				_elm_lang$core$Native_Utils.update(
					_p40,
					{
						photoShown: _elm_lang$core$Maybe$Just(newPhoto)
					}));
		}
	});

var _user$project$Update$errorMessage = function (error) {
	var _p0 = error;
	switch (_p0.ctor) {
		case 'BadUrl':
			return A2(_elm_lang$core$Basics_ops['++'], 'Bad URL: ', _p0._0);
		case 'Timeout':
			return 'Timeout';
		case 'NetworkError':
			return 'Network error';
		case 'BadStatus':
			return 'Bad status ';
		default:
			return A2(_elm_lang$core$Basics_ops['++'], 'Bad payload: ', _p0._0);
	}
};
var _user$project$Update$UserClickedThumbnail = function (a) {
	return {ctor: 'UserClickedThumbnail', _0: a};
};
var _user$project$Update$UserChangedAlbum = function (a) {
	return {ctor: 'UserChangedAlbum', _0: a};
};
var _user$project$Update$UrlHasChanged = function (a) {
	return {ctor: 'UrlHasChanged', _0: a};
};
var _user$project$Update$GetAlbumsResult = F2(
	function (a, b) {
		return {ctor: 'GetAlbumsResult', _0: a, _1: b};
	});
var _user$project$Update$ScanPhotosResult = F2(
	function (a, b) {
		return {ctor: 'ScanPhotosResult', _0: a, _1: b};
	});
var _user$project$Update$getAlbumPhotos = F2(
	function (albumName, photoToShow) {
		var apiUrl = A2(
			_elm_lang$core$Basics_ops['++'],
			'api/scan?dir=',
			_elm_lang$http$Http$encodeUri(albumName));
		var photoMetadataDecoder = A3(
			_elm_lang$core$Json_Decode$map2,
			_user$project$Types$Photo,
			A2(_elm_lang$core$Json_Decode$field, 'path', _elm_lang$core$Json_Decode$string),
			A2(
				_elm_lang$core$Json_Decode$field,
				'date',
				_elm_lang$core$Json_Decode$nullable(_elm_lang$core$Json_Decode$int)));
		var request = A2(
			_elm_lang$http$Http$get,
			apiUrl,
			_elm_lang$core$Json_Decode$list(photoMetadataDecoder));
		return A2(
			_elm_lang$http$Http$send,
			_user$project$Update$ScanPhotosResult(photoToShow),
			request);
	});
var _user$project$Update$PhotoWasRotated = function (a) {
	return {ctor: 'PhotoWasRotated', _0: a};
};
var _user$project$Update$rotatePhoto = F2(
	function (angle, photoPath) {
		var request = A2(
			_elm_lang$http$Http$get,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'api/rotate?angle=',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(angle),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'&photo=',
						_elm_lang$http$Http$encodeUri(photoPath)))),
			_elm_lang$core$Json_Decode$string);
		return A2(_elm_lang$http$Http$send, _user$project$Update$PhotoWasRotated, request);
	});
var _user$project$Update$PhotoWasDeleted = function (a) {
	return {ctor: 'PhotoWasDeleted', _0: a};
};
var _user$project$Update$deletePhoto = function (photoPath) {
	var request = A2(
		_elm_lang$http$Http$get,
		A2(
			_elm_lang$core$Basics_ops['++'],
			'api/delete?photo=',
			_elm_lang$http$Http$encodeUri(photoPath)),
		_elm_lang$core$Json_Decode$string);
	return A2(_elm_lang$http$Http$send, _user$project$Update$PhotoWasDeleted, request);
};
var _user$project$Update$UserClickedPhoto = {ctor: 'UserClickedPhoto'};
var _user$project$Update$UserAskedToRotateAPhoto = F2(
	function (a, b) {
		return {ctor: 'UserAskedToRotateAPhoto', _0: a, _1: b};
	});
var _user$project$Update$UserAskedToDeleteAPhoto = function (a) {
	return {ctor: 'UserAskedToDeleteAPhoto', _0: a};
};
var _user$project$Update$ScrollPhotosFinished = {ctor: 'ScrollPhotosFinished'};
var _user$project$Update$update = F2(
	function (msg, model) {
		var _p1 = msg;
		switch (_p1.ctor) {
			case 'ScrollPhotosFinished':
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			case 'UserClickedThumbnail':
				var newModel = A2(
					_user$project$Model$withPhotoShown,
					_elm_lang$core$Maybe$Just(_p1._0.relativeFilePath),
					model);
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _elm_lang$navigation$Navigation$newUrl(
						_user$project$Model$hash(newModel))
				};
			case 'UserClickedPhoto':
				var newModel = A2(_user$project$Model$withPhotoShown, _elm_lang$core$Maybe$Nothing, model);
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _elm_lang$navigation$Navigation$newUrl(
						_user$project$Model$hash(newModel))
				};
			case 'UserAskedToDeleteAPhoto':
				return {
					ctor: '_Tuple2',
					_0: model,
					_1: _user$project$Update$deletePhoto(_p1._0)
				};
			case 'UserAskedToRotateAPhoto':
				return {
					ctor: '_Tuple2',
					_0: model,
					_1: A2(_user$project$Update$rotatePhoto, _p1._0, _p1._1)
				};
			case 'PhotoWasDeleted':
				if (_p1._0.ctor === 'Ok') {
					if (!_elm_lang$core$Native_Utils.eq(_p1._0._0, '')) {
						var newModel = _user$project$Model$removePhotoShown(model);
						var newHash = _user$project$Model$hash(newModel);
						return {
							ctor: '_Tuple2',
							_0: newModel,
							_1: _elm_lang$navigation$Navigation$modifyUrl(newHash)
						};
					} else {
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
					}
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_user$project$Model$withMessage,
							_user$project$Update$errorMessage(_p1._0._0),
							model),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'PhotoWasRotated':
				if (_p1._0.ctor === 'Ok') {
					return {
						ctor: '_Tuple2',
						_0: A2(_user$project$Model$updateCurrentPhotoPath, _p1._0._0, model),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_user$project$Model$withMessage,
							_user$project$Update$errorMessage(_p1._0._0),
							model),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'ScanPhotosResult':
				if (_p1._1.ctor === 'Err') {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_user$project$Model$withMessage,
							_user$project$Update$errorMessage(_p1._1._0),
							model),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					var newModel = A2(
						_user$project$Model$withMessage,
						'',
						A2(
							_user$project$Model$withPhotoShown,
							_p1._0,
							A2(_user$project$Model$withPhotos, _p1._1._0, model)));
					return {
						ctor: '_Tuple2',
						_0: newModel,
						_1: A2(
							_elm_lang$core$Task$attempt,
							function (_p2) {
								return _user$project$Update$ScrollPhotosFinished;
							},
							_elm_lang$dom$Dom_Scroll$toTop('photos'))
					};
				}
			case 'GetAlbumsResult':
				if (_p1._1.ctor === 'Err') {
					return {
						ctor: '_Tuple2',
						_0: A2(_user$project$Model$withMessage, 'Error getting albums', model),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_user$project$Model$withMessage,
							'',
							A2(_user$project$Model$withAlbums, _p1._1._0, model)),
						_1: function () {
							var _p3 = _user$project$Model$albumShown(model);
							if (_p3.ctor === 'Nothing') {
								return _elm_lang$core$Platform_Cmd$none;
							} else {
								return A2(_user$project$Update$getAlbumPhotos, _p3._0, _p1._0);
							}
						}()
					};
				}
			case 'UserChangedAlbum':
				var _p4 = _p1._0;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					A2(
						_user$project$Model$withAlbumShown,
						_elm_lang$core$Maybe$Just(_p4),
						model),
					{
						ctor: '::',
						_0: _elm_lang$navigation$Navigation$newUrl(
							_user$project$Model$hash(model)),
						_1: {
							ctor: '::',
							_0: A2(_user$project$Update$getAlbumPhotos, _p4, _elm_lang$core$Maybe$Nothing),
							_1: {ctor: '[]'}
						}
					});
			default:
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});

var _user$project$ViewPhotos$viewPhoto = function (model) {
	var _p0 = _user$project$Model$photoShown(model);
	if (_p0.ctor === 'Nothing') {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'display', _1: 'none'},
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'});
	} else {
		var nextPhotoButton = function () {
			var _p1 = _user$project$Model$nextPhoto(model);
			if (_p1.ctor === 'Nothing') {
				return A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('disabled'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_elm_community$material_icons$Material_Icons_Navigation$arrow_forward, _elm_lang$core$Color$black, 40),
						_1: {ctor: '[]'}
					});
			} else {
				return A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onClick(
							_user$project$Update$UserClickedThumbnail(_p1._0)),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_elm_community$material_icons$Material_Icons_Navigation$arrow_forward, _elm_lang$core$Color$black, 40),
						_1: {ctor: '[]'}
					});
			}
		}();
		var prevPhotoButton = function () {
			var _p2 = _user$project$Model$prevPhoto(model);
			if (_p2.ctor === 'Nothing') {
				return A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('disabled'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_elm_community$material_icons$Material_Icons_Navigation$arrow_back, _elm_lang$core$Color$black, 40),
						_1: {ctor: '[]'}
					});
			} else {
				return A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onClick(
							_user$project$Update$UserClickedThumbnail(_p2._0)),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_elm_community$material_icons$Material_Icons_Navigation$arrow_back, _elm_lang$core$Color$black, 40),
						_1: {ctor: '[]'}
					});
			}
		}();
		var path = _p0._0.relativeFilePath;
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('lightbox'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('lightbox-inner'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onClick(_user$project$Update$UserClickedPhoto),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$img,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$src(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'/preview?photo=',
										_elm_lang$http$Http$encodeUri(path))),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$span,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(_user$project$Update$UserClickedPhoto),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('close'),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: A2(_elm_community$material_icons$Material_Icons_Action$highlight_off, _elm_lang$core$Color$red, 30),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('buttons'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: prevPhotoButton,
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(
											_user$project$Update$UserAskedToDeleteAPhoto(path)),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(_elm_community$material_icons$Material_Icons_Action$delete_forever, _elm_lang$core$Color$black, 40),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$button,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$a,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$href(
														A2(
															_elm_lang$core$Basics_ops['++'],
															'/socialise#share:',
															_elm_lang$http$Http$encodeUri(path))),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: A2(_elm_community$material_icons$Material_Icons_Social$share, _elm_lang$core$Color$black, 40),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: nextPhotoButton,
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	}
};
var _user$project$ViewPhotos$viewThumbnail = function (metadata) {
	return {
		ctor: '_Tuple2',
		_0: metadata.relativeFilePath,
		_1: A2(
			_elm_lang$html$Html$li,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Events$onClick(
					_user$project$Update$UserClickedThumbnail(metadata)),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$img,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$src(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'/thumb?photo=',
										_elm_lang$http$Http$encodeUri(metadata.relativeFilePath))),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('thumbnail'),
									_1: {ctor: '[]'}
								}
							},
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			})
	};
};
var _user$project$ViewPhotos$viewThumbnails = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h2,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(
								_elm_lang$core$List$length(
									_user$project$Model$photos(model))),
							' photos')),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html_Keyed$ul,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('contact-print'),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$List$map,
						_user$project$ViewPhotos$viewThumbnail,
						_user$project$Model$photos(model))),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$ViewPhotos$viewPhotos = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$id('photos'),
			_1: {ctor: '[]'}
		},
		function () {
			var _p3 = _user$project$Model$albumShown(model);
			if (_p3.ctor === 'Nothing') {
				return {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h1,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Select an album'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				};
			} else {
				return {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h1,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(_p3._0),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _user$project$ViewPhotos$viewThumbnails(model),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _user$project$ViewPhotos$viewPhoto(model),
							_1: {ctor: '[]'}
						}
					}
				};
			}
		}());
};

var _user$project$View$viewMessage = function (messageText) {
	var _p0 = messageText;
	if (_p0 === '') {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'display', _1: 'none'},
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			},
			{ctor: '[]'});
	} else {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('error'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(messageText),
				_1: {ctor: '[]'}
			});
	}
};
var _user$project$View$viewAlbumList = function (model) {
	var liFn = function (u) {
		return A2(
			_elm_lang$html$Html$li,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Events$onClick(
					_user$project$Update$UserChangedAlbum(u)),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('album'),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(u),
				_1: {ctor: '[]'}
			});
	};
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('albums'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h1,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$a,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$href('/'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Waterfall'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$a,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$href('/socialise'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Go social'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$h2,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Albums'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$ul,
							{ctor: '[]'},
							A2(
								_elm_lang$core$List$map,
								liFn,
								_user$project$Model$albums(model))),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _user$project$View$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('outer'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('columns'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _user$project$View$viewAlbumList(model),
					_1: {
						ctor: '::',
						_0: _user$project$ViewPhotos$viewPhotos(model),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$View$viewMessage(
					_user$project$Model$message(model)),
				_1: {ctor: '[]'}
			}
		});
};

var _user$project$Main$getAlbumList = function (photoToShow) {
	var apiUrl = 'api/dirs';
	var request = A2(
		_elm_lang$http$Http$get,
		apiUrl,
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string));
	return A2(
		_elm_lang$http$Http$send,
		_user$project$Update$GetAlbumsResult(photoToShow),
		request);
};
var _user$project$Main$hashRegex = _elm_lang$core$Regex$regex('^#([^:]*):?(.*)$');
var _user$project$Main$fromHash = function (location) {
	var matches = A3(
		_elm_lang$core$Regex$find,
		_elm_lang$core$Regex$AtMost(1),
		_user$project$Main$hashRegex,
		A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			_elm_lang$http$Http$decodeUri(location.hash)));
	var _p0 = A2(
		_elm_lang$core$List$map,
		function (_) {
			return _.submatches;
		},
		matches);
	if (((((_p0.ctor === '::') && (_p0._0.ctor === '::')) && (_p0._0._1.ctor === '::')) && (_p0._0._1._1.ctor === '[]')) && (_p0._1.ctor === '[]')) {
		return {ctor: '_Tuple2', _0: _p0._0._0, _1: _p0._0._1._0};
	} else {
		return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing};
	}
};
var _user$project$Main$init = function (location) {
	var hashParams = _user$project$Main$fromHash(location);
	return {
		ctor: '_Tuple2',
		_0: A2(
			_user$project$Model$withAlbumShown,
			_elm_lang$core$Tuple$first(hashParams),
			A2(
				_user$project$Model$withPhotoShown,
				_elm_lang$core$Tuple$second(hashParams),
				_user$project$Model$initialModel)),
		_1: _user$project$Main$getAlbumList(
			_elm_lang$core$Tuple$second(hashParams))
	};
};
var _user$project$Main$main = A2(
	_elm_lang$navigation$Navigation$program,
	_user$project$Update$UrlHasChanged,
	{
		view: _user$project$View$view,
		update: _user$project$Update$update,
		init: _user$project$Main$init,
		subscriptions: function (_p1) {
			return _elm_lang$core$Platform_Sub$none;
		}
	})();

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _user$project$Main$main !== 'undefined') {
    _user$project$Main$main(Elm['Main'], 'Main', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

