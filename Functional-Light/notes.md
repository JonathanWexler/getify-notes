# Functional-Light JavaScript

<!-- Start with intro, why you got into teaching and anecdote about the topic. Why are we learning it: because we wouldn't know it otherwise until we really try to understand it well enough to explain it to others. -->

> Our industry incentivizes a shallow enough amount to get the job done but not much more than that
>
Agile should not be an excuse for bad code.

Documenting journey of understanding functional programming. _Functional-Light_ is about functional programming from the perespective of a programmer who isn't a functional programmer.

_Light_ is not "beginner", "intro", "easy". You need to think outside the box to understand how you work with your programs.

__Imperative__ code requires some thought before it can be understood.
__Declarative__ code is easily understood by the reader of the code.

We want to remove the noise from our code to focus on the stuff that matters. Functional coding is about declarative coding, worrying about the results, and understanding the code immediately.

Though, we default to imperative programming. We design the code sometimes to be clever more than to be efficient.

> Get to the point where you're so familiar with declarative code that you can glance at it and recognize what it is doing right away.

The readability will pay off. _Provability_  of your code leads to less code to read.

> "Functional programming is not all about functions." But it's not about the function keyword.



## What is a Function?

A function is a piece of your program that takes an input and computes/returns an output. If there is a function without a return keyword it is not a function.

```javascript
function foo(x,y,z) {
  console.log(x,y,z);
}

function bar(x=2, ...args){
  return foo(x, 42, ...args);
}
```

`foo` is not a function, it is an arbitrary procedure of statements, it is not a function. `bar` is not a function either because it trickles down.

```javascript
function foo2(x,y) {
  return [x + 1, y-1];
}
var [a,b] = foo(...[5,10]);
```

Technically speaking a function can produce more than one output. In `foo2`, an array is returned with ES6 array destructuring. From the readability of the code, `foo2` returns two outputs. It isn't required that a function return only one output.

It is essential that the inputs and outputs are direct. inputs are parameters, and outputs are what are returned with the `return` keyword. If there are indirect inputs and outputs we violate another definition of the function.

> We need a concrete definition for before we can understand

```javascript
function f() {
  y = 2* Math.pow(x,2) + 3;
}
var x,y;
x= 0;
f();
y: // 3
```
This `f`'s inputs and outputs are indirect. To understand what `f` will do you need to read the procedure of statements to compute the values. Only the JavaScript engine is suitable for reading and computing code, so the thing to avoid is indirect inputs and outputs. You need execute the previous context to understand what is happening.

### Side Effects

_Side effects_ are modifications to values and elements outside of the function, or to variables from multiple locations in the program; modifying the DOM- be conservative about where in the code the dom is modified (React and redux manages state flow and only modifies the DOM at the end. Side effects only happen at the end). A program with no side-effects cannot be proven that it is even useful in the program if removed. It is impossible to have a side-effect-free program. Functional programmers say not to have side effects unless absolutely necessary.

> Avoid side effects wherever possible.

Be as obvious as possible about where side effects will occur.

```javascript
// Without side effects
function f(x) {
  return 2* Math.pow(x,2) + 3;
}
var x;
y = f(0); // 3
```

## Pure function

_Pure function_ only takes direct inputs and only produces direct outputs.

```javascript
function pureF(x,y) {
  return x+y+3;
}
var z = 9;
function impureF(x,y) {
  return x+y+z;
}
```

Pure functions may involve other impure functions as long as its input and output are direct.

```javascript
function pureF(x) {
  var y;
  f();
  return y;
  function impureF(){
    y = 2*Math.pow(x,2) + 3;
  }
}
```

Here, `pureF` is direct even though it involves an impure function.

>Avoid global variables wherever possible. Minimize that side effect.
> Haskell doesn't have global variables. We have the option in JavaScript but you should prefer not to use them.

Be intentional, and state if your code has side effects as comments.

In pure functions state changes are explicit- when you want to use certain functions within functions.

#### Exercise 1

```javascript
const y = 1;

function foo() {
  return x+y;
}
foo(1);
```
As long as you don't redefine your functions, they are essentially treated like constants. And if you use a variable or function within a pure function that does not change, it is still pure.

> A pure function is when you call it with the same inputs you'll always get the same outputs

```javascript
// foo is pure
function foo(bar) {
  return function(x) {
    return bar(x);
  }
}
//foo with its provided callback will always be the same
foo(function (v) {
  return v*2;
})(3);
```

> An exception is a direct observable output from a function

```javascript
// getId seems pure unless the getter get id() returns random numbers
function getId(obj) {
  return obj.id;
}

// This makes our confidence in retrieval of the ID very low
getId({
  get id(){
    return Math.random();
  }
});
```

It all comes down to what the reader can understand about your code and instill confidence in the code you've written. The more complicated the code, the more you erode other reader's confidence.

## Arguments

A _higher order function_ takes input functions or produces functions as output.

_Variatic functions_ has indefinite arity. _Arity_ refers to the number of arguments/inputs into a function or operation. A variatic function can be unary, having only one input, even though that input can be broken down further.

>What to do is more important than why it is called

```javascript
function reverseArgs(fn) {
  return function reversed(...args ) {
    return fn(...args.reverse());
  }
}

function f(...args) {
  console.log(args)
}

var g = reverseArgs(f);
g(1,2,3,4);
```

Higher order functions here will pass an unknown number of arguments to a function that collects them and passes them to a common function.

## Point-Free

The point free style is making stylistic choices just to make it more readable. We want to be less verbose in the code, but also make sure the code is understood quickly.

_Point_ refers to mathematical functions' use of fixed-point functions. A point refers to a function's input, a function's input is its point. A point-free function is one where you don't need explicitly define its inputs.


```javascript
foo(function (v) {
  return bar(v);
})

//can be rewritten as
foo(bar);
```

Point-free style allows for quick reference to existing functions without rewriting.


```javascript
function isOdd(v) {
  return v % 2 == 1;
}

var isEven = not(isOdd);

// Where not is
function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  }
}
```

## Composition

_Abstraction_ is not to hide a detail, that's encapsulation. Software that is complex is tightly coupled. Simple vs complex is not the same as easy vs. hard.

Rich Hickey - simplicity matters https://www.youtube.com/watch?v=rI8tNMsozo0

> Repetition is not a terrible thing

We need a semantic boundary between how it is computed and what we do. Abstraction is that semantic boundary, the name of the function.

```javascript
function sum(x,y) {
  return x + y;
}

function mult(x,y) {
  return x + y;
}
// This x_y is an intermediary step, so maybe it isn't necessary
// so instead sum(mult(3, 4), 5);
var x_y = mult(3, 4);
sum(x_y, 5);
```

Why can't we take a number of operations and wrap them into one function? This way we can just think about input and output.

```javascript
// ...
function sumAndMult(x,y,z) {
  return sum(mult(x, y), z);
}
```

Now users of `sumAndMult` don't need to think about what is happening inside.

Most of the time data flow is implicit and hard to track. Functional programming is about being explicit about the flow of data.

> Build a machine that takes smaller machines that take their own arguments to output instead of a new machine from scratch for each custom function

If you write a function whose composition should reflect the functions used later on, then it makes sense to order the arguments in the same order.

NOTE: `compose` and `pipe` and `flow`- `flowRight` in Lodash.

Functional programming is cleaner with these unary functions.


> `maybe` monad can be a value or empty- once it is empty the rest of the functions in the chain break off?


## Immutability

`const` keyword has nothing to do with functional principles.
* Prevents you from reassigning things (true)
* Signals intent for an immutable variable, makes code more readable. (but when the const is changes you lose confidence in the code)

`const` is block scoped. Blocks should be short, but likely these blocks are a whole file.

`Object.freeze` performs a shallow level read-only immutable value. The immutability of a frozen object isn't concerning. This tells the reader of the code that the array cannot be changed in:


```javascript
var z  = Object.freeze([3,4,5, [5,6,4]])
```

`Immutable.js` removes performance implications for many immutable objects. State changes are explicit. You need to use specific functions to set and get values from immutable objects created with this library.

When you get the input value in a function you need to treat the input as immutable. Never change the input value, especially an object by reference- this is a side effect.

Make a new object/list/variable. The performance tradeoff is work the code confidence in functional programming.

Immutability is about the values, not assignment. Freezing an object will shallowly make an object immutable. Immutable.js or Mori.js will apply a more robust data structure.

> Don't use `const` and `Object.freeze` together to prevent confusion that people have about const performing the immutability.

## Closure

One of the most important and pervasive concepts in computer science, on par with variables and functions themselves.

History of closure goes back to 1950s. Takes a full generation of programmers to catch on to useful features.

> Closure must be truly great because it took two full generations to catch on.

People wanted things to look like Java, even though JavaScript is Scheme under the covers. JavaScript has more in common with Scheme and functional programming languages than C and Object-oriented languages. No one realized it because they didn't talk about functions and closures.

Pretty much any language these days have closure now because it's so important. Closure is at the heart of functional programming.

_Closure_ is when a function remembers the variables around it, continues to access them even if you take that function and execute it in an entirely different scope.

Remember ,lexical scope and functions as values (that they can be passed around). Without closure you wouldn't be able to pass functions around or it would lose track of its variables.

By closing over variables, using a function within another function's scope, allows for referencing variables outside of itself.

A click handler's callback referenced elements outside of its environment.

#### Exercise 4

```javascript
function foo(x, y) {
  return function inner() {
      return x + y;
  }
}

var x = foo(3,4);

x();	// 7
x();	// 7
```

We have a high degree of confidence that `foo` and the inner function are pure. But they are lazy function because they aren't executed until `x()`. The benefit to lazy operations is deferral of work until it needs to be done. For example, only running when user clicks. Tradeoff is every time we need it we redo the work.

An eager approach is to do the work once ahead of time by adding a local variable to `foo`.

```javascript
function foo(x, y) {
  let sum = x + y;
  return function inner() {
      return sum;
  }
}
// here the work is done once at this line below
var x = foo(3,4);
```
Or do the work but only once. Check if it is still undefined and set once.

```javascript
function foo(x, y) {
  let sum;
  return function inner() {
    if (sum === undefined) sum = x + y;
    return sum;
  }
}
// here the work is done once at this line below
var x = foo(3,4);
```

This might make sense but it is less obviously pure. Maybe more imperative?

_Memoization_, given a set of inputs it will only compute the output once, cache, and give cached results in the future. Save more performance than lose overall.

Closures memoize their original context. A function that remembers its variables is lexical scope. Being able to execute that elsewhere is closure.



```javascript
function foo() {
  return function() {
    return x++ * 2;
  };
}
var f = foo(3);
f();

```

> Closure over a state that changes is not consistent with functional purity
