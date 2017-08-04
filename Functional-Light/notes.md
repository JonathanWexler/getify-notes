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
