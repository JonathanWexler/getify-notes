// 1
let x = 2, fns = [];

(()=>{
	const x = 5;

	for (let i=0; i<x; i++) {
		// ..
	}
})();

console.log(
	(x * 2) === fns[x*2]()
);
// true

// 1f
// const x = 2;
// var fns = [];
//
// { const x = 5;
// 	for (let i=0; i<x; i++) {
// 		fns[i] = function num() {
// 			return i;
// 		};
// 	}
// }
//
// console.log(
// 	(x * 2) === fns[x*2]()
// );
// // true
