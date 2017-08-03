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

_If you can't understand the system you can't trust it_

## Callbacks
```javascript
setTimeout(function () {
  console.log("callback");
}, 1000);
```

We are hoping the system does what it is supposed to do and give us a callback when the task is complete. But we are crossing our fingers that the dependency of a callback will ensure the task is complete.

One way to describe a callback: We'll do some stuff now and pause while the system does other work, then we'll come back to continue this task. We mark in the code where the JavaScript engine will continue to run our code.

#### Exercise 1
Collect responses and print *in order* as soon as they are complete, must create an object to store responses

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
