// 5
var numbers = {
  *[Symbol.iterator]([start = 0, end = 100, step = 1] = [0,100,1]){
    console.log(end)
    for(let i = start; i<=end; step++){
      yield i;
    }
  }
};

// should print 0..100 by 1s
for (let num of numbers) {
	console.log(num);
}

// console.log( [...numbers[Symbol.iterator]( 100 )])

// should print 6..30 by 4s
console.log(`My lucky numbers are: ${[...numbers[Symbol.iterator]([0, 100, 1])]}`);

// Hint:
//     [...numbers[Symbol.iterator]( ?? )]




Number.prototype[Symbol.iterator] = function* () {
for (let i = 0; i < Object; i++) {
  array[i]
}
}










// 5f

// var numbers = {
// 	*[Symbol.iterator]({
// 		start = 0,
// 		stop = 100,
// 		step = 1,
// 	} = {}) {
// 		for (let num = start; num <= stop; num += step) {
// 			yield num;
// 		}
// 	}
// };
//
// // should print 0..100 by 1s
// for (let num of numbers) {
// 	console.log(num);
// }
//
// console.log(
// 	`My lucky numbers are: ${
// 	[...numbers[Symbol.iterator]({
// 		start: 6,
// 		stop: 30,
// 		step: 4,
// 	})]}`
// );
