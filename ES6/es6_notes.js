// getify@gmail.com
// As soon as we stop writing 1's and 0's directly, we abstracted the code we are writing and the command we direct the computer
// C language was the second gneratino of programming languaes
// Now we are in the 3/4th gen of language with TSL and frameworks introduce
// So we are far removed from the machine level code from long ago
// conclusion, we are only suggesting to the computer which code will get the job done
// our most important job is to communicate with other human beings, so our code is transparent
// Martin fowler - it takes a genius to write code a human can understand
// 70% of our day is spend reading code
// global average of lines of code written a day is 5 lines
// Know how code works before you try to fix it

// Goal is to get other developers to do their jobs better
// Arrow functions
// Why do block scoping, let, var, const (let is not the new var)
//  Destructuring JS
// String literals are not template strings

//TO START
//how to improve the original function and syntax
function sum(x,y){
  return x + y;
}
// Reading the word function is easier for humans than more concatinated words
// research shows new ES6 alone is not objectively more readable even though it's shorter and less verbose
() => 2

// Function keyword has a 22 year head start on readability than new syntax
// ** Keynote presentations
_ => 2
x => 2
// These are parameterless functions
// This primes the reader to think the x parameter is being used in the function

// v => v
// (...v) => v
// (v = 2) => v
// ([v]) => v
// ({v}) => v

// These are functions with a single parameter

// statements vs expressions
// try {} catch {} is a statement
//  In ES6 a statement cannot be alone () => statement, needs to be wrapped in curly braces

// Arrow functions are anonymous so its ahrder to follow in the stack trace
// arrow functions have lexical `this` allowing for
// Arrow functions do not have a this keyword, which means if you use `this` its a lexical variable lookup, the JS engine will go up the scope chain to see where it is used in an outer scope
//  <2% of code requires this tool, so its not really needed

// Javascript should be embraced for prototype feature and not new class system. It doesn't really have a class system, but syntactic sugar created to make it more class-like. People are preinclined to see classes as the best design pattern
// Prototyping is used for delegation

// Javascript and Lua are the only two true object oriented languages
// Other languages are class-oriented
// Two approaches: Dumb down the code for new members of the team. vs use the best and newest approach and take hit with drawbacks

// Developers need to constantly be learning - you don't really know somethig unless you can reexplain to others
// Code review is a good way to ensure your code is headig in the right direction. This is about exposing code to new ideas, examine if the code could be expressed more clearly

// ES6 object literals
// concise properties, if a variable exists before setting an object property you can just use the variable name

var foo = 2;
var obj = {
  foo // same as foo: foo
}

//  Objects with functions can have a concise method
var obj = {
  foo(){ // The method here has a name, so its shorthand without an anonymous function

  }
}

// You can use computer properties directly within the object literals
// var obj = {
//   [prop]: 1 // instead of obj[prop] = 1
// }

// Computer concise methods and generators = generators are new form function
// var obj {
//   *[prop+"gen"](){}
// }

// Syntax is now transpiled with babel, so we can use getters and setters
// used to abstract assignment and retrievals of property values
// var obj {
//   __t: 4,
//   set prop(v){
//     this.__t = v;
//   }
// }
// obj.prop = 5;

// **Typescript, bucklescript?

// Block scoping
// Most recent changes introduced real block scoping to JavaScript. To defend against people using variables in places we wouldn't expect
// by assinging a variable within an if statment we are saying we want to use this variable specifically in this location instead of moving all vars to top of function in anticipation of hoisting
// Javascript hoisting refers to the idea that a variable will be avilable to the entire scope of the function
//  JS engine actually takes a first pass to compile the code and second pass to execute- people use hoisting to say javascript does it all in a single pass

// By using the vars within the scope they are being used there is better readability

function diff(x,y) {
  if (x>y) {
    let tmp = x; //use let here to scope the var within this block and not to the function scope
    x= y;
    y= tmp;
  }
}

// Using let in for loop is also stylistically more accurate
// **Reduced functions

// Var keyword is preferred in a try-catch block since it allows for escaping the context to use the variable outside the block where let wouldn't allow

function lookup(searchString) {

  try {
    var id = 45;
  } catch (e) {
    var id = -1
  }
  return id;
}

// using let for for loops also allows for closing over each i
// sometimes it reads better to wrap where let variables in an explicit scope block with curly braces, more indentation
function functionName() {
  {let one, two;
    one = 1;
    two = 2;
  }
}

// const
// constant is a variable that can't be reassigned
// Object.freeze makes the variable immutable,read-only
//  but use a var/let

// EXERCISE, use block scope, vars, lets, where appropriate
// take aways = use const for values used as markers, values that don't change, use function where name is important, use let for for loops and specific {} defined scope and var everywhere else

// DEFAULT PARAMETERS

function lookup(id) {
  id = id || -1;
  id = id !== undefined ? id : -1; // imperative, need to figure it out in your head
}

// imperative code = focused on how to do something, like a for loop. You loop throguh list of numbers and return accumulated values. To understand it you need to execute code in your head to understand what it will do
// declarative code =

function lookup(id=1) { // declarative alternative
//
}

// These are lazy, so they are not evaluated and executed unless needed; unless the function is called without a parameter

// SPREAD/REST OPERATOR
// More like gather and rest,

function lookup(id, ...params) { // takes remaing params and bundles into an array, indefinitely
  return db.lookup(
    "people-records", id, ...params // spreads an array out as individual items
  );
}

// This is declarative, easier to understand than .concat() on an array

// Destructuring
//  decomposing a structure into its individual parts
// a structure is an object or an array, assigning individual values
function getValues() {
  var [
    {
      name: firstName,
      email: firstEmail = "sample@s.com"
  },
    {
      name: firstName,
      email: firstEmail = "none@s.com"
  },
  ] = getRecord();
}

// destructuring pattern in an assignment context
//  Says to get the result from a function and assume two objects will be returned in this structure, and assign variables within these objects
// lodash _.get

// used to do
function food() {
  return [1,2,3];
}
var temp = food(),
x = temp[0],
y = temp[1],
z = temp[2];

// Now with destructuring, each can get asigned with the variable names we specify:

var[
  x, // same as returnItem[0]
  y,
  z = 45, // uses default value
  ...others // Gathers the remaining variables
] = food() || []; // if foo returns undefined or null we can defualt value of destructure to an empty array

// **Backbone vue.js over react and angular- loosely coupled == modular, not just separate files
// **Dave hermann effective Javascript
// Ecosystem effect
// **read JavaScript Spec

// You don't even need var declaration for assigning during destructuring

var a = [1,2,3];
var o = {};

[o.x = 4,o.y,o.z] = a; // destructures array and assigns to variables within

// All statements have a compelteion value, the return result of a statement.
// var a = 1; doesn't have one, but b = a; equals to the result of the expression
//  So you can chain assignments with c = b = a; with right-associativity, a takes precendence then moves leftward
// The end result of a destructuring assignment is the value assigned
var a = [1,2,3];
var b,c,d;

e = [,d =4] = [b=2, c] = a; // assigns d and c to second index and b to first and e to a

// OBJECT destructuring

function goo() {
  return {
    a: 1,
    b: 2,
    c: 3
  }
}

var{
  a: x,
  b, // Using same variable name does not need mapping
  c: z
} = goo() || {};

// Additional properties are ignored, the ... operator on arrays does not work for objects
// You can also destructure in parameter declaration

function too({ // if object with x and y come in you set up local variables based on those object properties
  x: a,
  y: b
} = {}) {

}

// **_.extend() underscore extend or Object.assign({}, defaults, settings)
// ajax(_.extend({},defaults,settings))

function trying(data = {d, f:e = 5}) { // data will be the structured params
  tryNext(data);
}

function tryNext(data) {
  console.log(data);
}

// trying({d: 23, g:0})


// INTERPOLATED STRING LITERALS
//  Not template literals, a pattern for some output that cn be rerendered with new data more than once
//  These are not templates, they run once
// You can tag string literals with function calls
// Tag functions are passed the individual parts of the string literal before they are assembled to preprocess the final result in the assignment
// **JSX using xml syntax directly in JavaScript
//  There is a JSX tag function that will parse jsx and return dom object
// Cast as a string with String(variableName)

// SYMBOLS in JS...

// ITERATORS and generators
//  iterators are an interface to consume data one at a time over a set
// you call .next on the iterator to step through dataset
// Strings and arrays are iterable, they are iterator interfaces

var str = "hello"

var itr = str[Symbol.iterator]();
itr.next();

// Plain old simple objects are not iterable
//  You can step through an interator with for _ of __ loops
// ** Use this or forEach, reduce, map

for(let c of itr){
  console.log(c);
}

// ... works on any iterable, string, array, map

// Generators
function *main() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

var it = main();

it.next(); // {value: 1, done: false}

[...main()]; // [1,2,3]
