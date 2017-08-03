// More about concurrency than async
//  Async usually the most issues with flow of data and code readability

// ASYNC PATTERNS
// PARALLEL vs. ASYNC
// What is callback hell? readability of nesting?
// Callbacks
//  THUNKS - This is the key idea to get from callbacks to promises
// Need to understand Generators and Coroutines
// We are really first modeling single request and single response. But most bit apps are streams of data, multi-value responses. Like bloomberg launch tickers.
// So we'll look at observables- reactive, event-based programming
// Go and Closure have adopted CSP communicated sequential processes- was thought up originally by alexander hor?
// CHANNEL-ORIENTED concurrency
//  Worth knowing Redux and redux-saga (redux thunk? too)
// redux saga doesn't want mention of CSP,

// PARALLEL VS ASYNC
// Parallelism is when two or more things happen at the same instance
// The core of the processor can only do one bit-wise operation at any instant. So you need multiple cores to handle multiple bit-wise operations at the same instant
<!--  -->THREADS
// Need to instead create threads to handle different processes. Two threads mean there are now two lines of people being serviced at a store instead of one. These virtual threads are from a pool of threads that can be handled by your core, and parallelism is achieved.
// Threaded programming is one of the easiest things to do in programming: spin up a thread and things are magically running together
// What's hard is when things running in parallel need to coordinate over shared resources, shared ram, registers, DB, etc. These two running processes may need to "race" for the same resources
To model this (shared relocks, mutexes, and semaphores) we set up locks and prevent some threads from performing some tasks (preemptive concurrency- one thread can interrupt what another thread accomplished)
