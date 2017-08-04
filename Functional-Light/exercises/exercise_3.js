const total = 6;

function v() {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

function lotteryNum() {
  // return(Math.round(Math.random()*100)%58) + 1;
  return 3;
}
// function pickNumber(nums){
//   let dup = nums.slice();
//   let num = lotteryNum();
//   dup.push(num);
//   dup.sort((a,b) =>{
//     return a-b;
//   });
//   return dup
//
// }

// var luckyLotteryNumbers = [];
//
// for (let i = 0; i < total; i++) {
//   luckyLotteryNumbers = pickNumber(
//     Object.freeze(luckyLotteryNumbers)
//   );
// }

// console.log(luckyLotteryNumbers);
// keep list unique and sorted
// use let, const, and var
var a = [1,2,3,4,5,6]
var results = [];
results = Object.freeze(a.map(function() {
  let val = lotteryNum();
  while(results.includes(val)){
    console.log(val)
    val = lotteryNum();
  }
  console.log(lotteryNum())
  return val;
}));

console.log(results)
