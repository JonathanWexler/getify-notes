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