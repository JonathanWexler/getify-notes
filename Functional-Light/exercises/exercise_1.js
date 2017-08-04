const y = 1;
const f = [1,2]
f[1] = 9;

function foo(x) {
return x+f[0];
}
console.log(foo(1))

// function pureFoo(y) {
//   var z;
//   foo1(x);
//   return [y,z];
//   function foo1(x) {
//     y++;
//     z = x *y ;
//   }
// }
//
// pureFoo(5, 20);
//
// function oFoo(x) {
//
// }
//
// function bar(curX, ) {
//
// }
//
// //
// //
// // function foo(y, x) {
// //   y++;
// //   return [y, x * y];
// // }
// //
// // var y = 5, z;
// //
// // [y, z] = foo(y, 20);
// // console.log(z);
// // console.log(foo(y, 25));
// // [y, z] = foo(y, 25);
// // console.log(z)
