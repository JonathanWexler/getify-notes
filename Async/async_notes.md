 More about concurrency than async
 Async usually the most issues with flow of data and code readability

# ASYNC PATTERNS
* PARALLEL vs. ASYNC
* What is callback hell? readability of nesting?
* Callbacks
*  THUNKS - This is the key idea to get from callbacks to promises. Need to understand Generators and Coroutines. We are really first modeling single request and single response. But most bit apps are streams of data, multi-value responses. Like bloomberg launch tickers.
* So we'll look at observables- reactive, event-based programming
* Go and Closure have adopted CSP communicated sequential processes- was thought up originally by alexander hor?
* CHANNEL-ORIENTED concurrency. Worth knowing Redux and redux-saga (redux thunk? too). redux saga doesn't want mention of CSP,

## PARALLEL VS ASYNC
Parallelism is when two or more things happen at the same instance. The core of the processor can only do one bit-wise operation at any instant. So you need multiple cores to handle multiple bit-wise operations at the same instant
### THREADS
Need to instead create threads to handle different processes. Two threads mean there are now two lines of people being serviced at a store instead of one. These virtual threads are from a pool of threads that can be handled by your core, and parallelism is achieved.

_Threaded programming_ is one of the easiest things to do in programming: spin up a thread and things are magically running together
// What's hard is when things running in parallel need to coordinate over shared resources, shared ram, registers, DB, etc. These two running processes may need to "race" for the same resources
To model this (shared relocks, mutexes, and semaphores) we set up locks and prevent some threads from performing some tasks (preemptive concurrency- one thread can interrupt what another thread accomplished)
In JaaScript there is only one seat on the rollercoaster, and as soon as you leave for your ride another seat shows up at any given instant, 100s or 1000s of people experiencing the roller coaster ride- within the same period of time everyone experiences the ride, whereas 30 riding at the same time. _Concurrency_ is two or more things happening in the same period of time, not the same time. There are micro-level operations and macro (make an ajax request-response, which is many micro tasks). Concurrency is multiple macro-tasks happening in the same period of time

JavaScript has the event-loop, which is like a while true loop- keep putting people on the ride.
