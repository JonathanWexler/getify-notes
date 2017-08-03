// Exponential operators
var x = Math.pow(3,4);

var y = 3**4;
// Which of these above should be used?

// Array.includes() we've been using indexOf() operator to get a boolean of the index of an item in an array
// Do not extend global natives

var arr = [1,2,3,4,5];

~arr.indexOf(2); //truthy
arr.includes(2); // true is now the approach

// ES2017, used to be ES6, now it's year based
// * Async
// * Object.values() Object.entries()
// * String padding, no more left-pad
// * trailing commas

// ES6 gave promises, not chains are vertical instead of horizontal

function *print(name) {
  var person = yield lookup(name);
  var orders = yield lookup(person.id);
  for(let order of orders){
    //
  }
}

print("Jon Wexler");

// This mimicks sync in an async function, generators allow waiting.
// But now we have async/await

async function print(name) {
  var person = await lookup(name);
  var orders = await lookup(person.id);
  for(let order of orders){
    // await newFunc();
  }
}

// Promise.all allows you to run await on multiple returning promises
// All async functions return promises
// use

let results = await Promise.all(/*Return of multiple promises*/)
// **going too fast through material

// Object.values()
// Objects are not iterable, so you cannot use for(let in arr)
// We can extend an object as iterable and use for(let g of obj)
Object.values(obj)
Object.entries(obj)

for (let[k,v] of Object.entries(obj)){
  // destructures into tuples with entries
}

// Array.values will not work because .values is already extended on the Array prototype
// ** npm left-pad

// There is now built-in support for trailing commas

// Shared Memory among multiple threads for web workers
// Web workers supported on most mobile and web platforms
// Used to have to serialize the data between threads, and only through transferables only one thread had access at a time, but now multiple threads can use data without performance overheads
// Mutexes and semaphores liekley to be introduced at some point*sarcasm


var shared = new SharedArrayBuffer(40);
var local = new Int32Array(shared);
var worker = new Worker('worker.js');
worker.postMessage({shared}); // reference to shared Memory
Atomics.store(/*...*/)

self.onMessage = function({data: {shared}}){
  var remote = new Int32Array(shared);

  Atomics.wait(remote ,5, 0); //will put locks on shared data to block thread until readable
  Atomics.load(remote, 5); //once available it will load
}

// **Atomics look at repo and improvements for shared memory in ES6
// **Null propogation operator in JS
