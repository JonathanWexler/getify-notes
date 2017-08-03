# ASYNC PATTERNS
More about concurrency than async. Async usually has the most issues with flow of data and code readability.

* PARALLEL vs. ASYNC
* Callbacks - What is callback hell? readability of nesting?
*  THUNKS - This is the key idea to get from callbacks to promises. Need to understand Generators and Coroutines. We are really first modeling single request and single response. But most big apps are streams of data, multi-value responses. Like Bloomberg launch tickers.
* Observables - reactive, event-based programming
* CSP - Go and Closure have adopted CSP communicated sequential processes- was thought up originally by alexander hor?
* CHANNEL-ORIENTED concurrency. Worth knowing Redux and redux-saga (redux thunk? too). Redux saga doesn't want mention of CSP,

## PARALLEL VS ASYNC
_Parallelism_ is when two or more things happen at the same instant. The core of the processor can only do one bit-wise operation at any instant. So you need multiple cores to handle multiple bit-wise operations at the same instant

### THREADS
Need to instead create threads to handle different processes. Two threads mean there are now two lines of people being serviced at a store instead of one. These virtual threads are from a pool of threads that can be handled by your core, and parallelism is achieved.

_Threaded programming_ is one of the easiest things to do in programming: spin up a thread and things are magically running together. What's hard is when things running in parallel need to coordinate over shared resources, shared ram, registers, DB, etc. These two running processes may need to "race" for the same resources. To model this (shared relocks, mutexes, and semaphores) we set up locks and prevent some threads from performing some tasks (preemptive concurrency- one thread can interrupt what another thread accomplished)

In JaScript there is only one seat on the rollercoaster, and as soon as you leave for your ride another seat shows up at any given instant, 100s or 1000s of people experiencing the roller coaster ride- within the same period of time everyone experiences the ride, whereas 30 riding at the same time. _Concurrency_ is two or more things happening in the same period of time, not the same time. There are micro-level operations and macro (make an AJAX request-response, which is many micro tasks). Concurrency is multiple macro-tasks happening in the same period of time

JavaScript has the event-loop, which is like a while true loop- keep putting people on the ride. Google used to synchronously track every single click on a link to track where people click. That's a bad idea.

What if two macro-tasks are interwoven, the user can continue to operate between tasks and they will still both complete at the same time as running them individually.

Ryan Dhal was a ruby programmer who wanted low latency socket communication (low IO.) Most of the initial commits to Node.js was in Ruby. But then he noticed JavaScript does this better.

Parallelism is well-suited for CPU-bound tasks, things that need to happen for the computer operating math, not needing IO. This is particularly well-suited for a parallel system. But IO is not ideal of parallel system. Disk responds multiple of magnitudes slower than CPU tasks- so this delay can impact of the program. Socket communications
high throughput low latency socket communication with Node.js.

* Probably do a lot of IO communication
* Go has light-weight threads so its cheap to spin a thread

It's not hard to be asynchronous, its hard to coordinate interdependent asynchronous processes running. It's all time-related, on a micro-scale, what makes independent parts of tasks run faster than independent parks of other tasks.

> If you can't understand the system you can't trust it

## Callbacks
```javascript
setTimeout(function () {
  console.log("callback");
}, 1000);
```

We are hoping the system does what it is supposed to do and give us a callback when the task is complete. But we are crossing our fingers that the dependency of a callback will ensure the task is complete.

One way to describe a callback: We'll do some stuff now and pause while the system does other work, then we'll come back to continue this task. We mark in the code where the JavaScript engine will continue to run our code.

#### Exercise 1
Collect responses and print **in order** as soon as they are complete, must create an object to store responses

```javascript
function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		// what do we do here?
	});
}

// request all files concurrently
getFile("file1");
getFile("file2");
getFile("file3");
```

### Callback Hell
(callbackhell.com) it's not about the readability only.

Martin Fowler, defined the difference between a library and a framework in that a framework employs inversion of control. The framework calls you and you call the library.

Inversion of control, is handing control of the task over to another part of the system. Like the `setTimeout()` function gives control to the timer part of the system. We assume control is given back.

Don't make the wrong assumption about how a callback will be handled by the system. It may arrive late.early/too many times/too few times/ with lost context. Callbacks cannot be trusted: callback hell is when you cannot trace and depend on chain of callbacks.

Need to re-approach trusting callbacks will do their jobs. Callbacks are not reasonable. Nested callbacks are a syntactic response that reorders the way our brains want processes to run. It's unnatural reordering so the code will do what we want.

When we want to have a task pause what the system is really doing is other tasks while tasks wait.

Humans are single task oriented, but with fast context-switching. We are doing things concurrently but not in parallel. We fundamentally work sequentially. You can respond to interruption and go back to a task, but cannot do both at the same time.


## Thunks

A _thunk_ is a function that has all of the stuff in it it needs, it just needs to be called to compute the answer.

```javascript
function add(x,y) {
return x+y;
}
// This thunk can be referenced and called to get the specific result we want
var thunk = function() {
  return add(10,15);
}

thunk(); // 25
```

This a synchronous thunk, an async thunk assignment would be with a callback.

```javascript
function addAsync(x,y, cb) {
  setTimeout(function() {
    cb(x+y);
  }, 1000)
}
// This thunk can be referenced and called to get the specific result we want
var thunk = function(cb) {
  addAsync(10,15, cb);
}
thunk(function (sum) {
  sum;
});
```

#### Exercise 2
Turn getFile utility into a makeThunk, must generate a thunk (eagerly), unwrapped in order received, but performed concurrently.

```javascript
function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	// return ??
}

// request all files concurrently
// ?? = getFile("file1");
// ?? = getFile("file2");
// ?? = getFile("file3");
```

The thunk uses a callback and within it any subsequent thunk calls. We abstract away any time component that might impact other tasks from running.

```javascript
thunk1(function() {
  doSomething();
  thunk2(function () {
    doSomthing(); // this will not run until completion of first doSomething();
  })
})
  ```
This controls flow. We ensure the first thunk contents complete before the next wrapped thunk. There is no longer a time component.

A promise is a time independent wrapper over a function. A promise is a thunk with a nice API.

## Promises
A promise a placeholder until the request is fulfilled. A promise is a future cheeseburger.

The thunk eliminates the race condition, because of the time-independent wrapper on the value. We can now better manage the state of the application. Ask: Do I struggle to manage state over time? A promise will help with that.

A promise is a notification that an event has occurred, being notified of completion at some future time.

We can subscribe to a task

```javascript
var listener = trackProcess(info);

listener.on("complete", doSomething());
listener.on("error", doSomethingElse());
```

Assuming the `trackProcess()` function returns some event regarding the task we are trying to process. Promises work the same way in that they can be returned and resolves/rejected based on what happens in the task.

```javascript
var promise = trackProcess(info);
// If trackProcess returns a promise
promise.then(finish, error);
```

Promises are resolved once either as a success or error. They solve the inversion control issue with callbacks. Now they manage the callbacks in a trustable fashion- we are guaranteed some response.

The Promise model:
* Start one thing
  * If error occurs escape to error branch
* Do the next thing
  * If error occurs escape to error branch
* Return promise

At any point if an error occurs, the following promise is not executed. Success handlers keep skipping until error handler occurs.

The idea of using the promise is to wrap the natural asynchronous calls in JavaScript.

Map transforms a list from one set of values to another set.
Reduce takes two inputs, accumulator and value, and produces a single composite value from the list.

```javascript
// Map
[1,2,3,4,5].map(function (v) {
  return v*2;
})
//reduce
[1,2,3,4,5].reduce(function (accum, v) {
  return accum+v;
})
```

You can use reduce to transform an array into chained promises.

`Promise.all([])` will run all promises in the order in the array they are listed. You can then add  `.then()`.

> The Halting problem

What if the promise is never resolved? The most common approximation is a `timeout`. Assume it will never finish, and `Promise.race([])` takes a list of promises, it will wait to see which promise completes first.

### Asynquence
https://davidwalsh.name/asynquence-part-1

## Generators

We'll use generators as coroutines. A generator is a new type of function in ES6, changing the most fundamental assumptions about javascript. Functions won't always run to completion synchronously before another function runs. A click handler will not run and interfere another task.

_Cooperative concurrency_ is when a function says it doesn't want to be interrupted, but may be able to yield control to the system.

_Preemptive concurrency_ is a function being interrupted at any point.

Some generators never finish, but they are designed to yield control before they can be paused.

```javascript
function *gen(){
  console.log("hello");
  yield; // Pauses locally within the generator until next() is called again
  console.log("World");
}

var it = gen();
it.next();
it.next();
```

> `*` needs to be between `function` and name.

The `yield` result will be an object with `value` and `done` boolean.

An iterator returning function is the same as a generator. 
