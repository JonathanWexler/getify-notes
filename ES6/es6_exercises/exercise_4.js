// 4
function upper(string,...values) {
  var str = "";
  for(let i = 0; i< string.length; i++){
    if(i>0){
      str += String(values[i-1]).toUpperCase();
    }
    str += string[i]
  }
  return str;
}

var name = "kyle",
	twitter = "getify",
	classname = "es6 workshop";

console.log(
  upper `Hello ${name} (@${twitter}), welcome to the ${classname}!` ===
	"Hello KYLE (@GETIFY), welcome to the ES6 WORKSHOP!"
);



// 4f
// function upper(strings,...values) {
// 	var s = "";
// 	for (let i=0; i<strings.length; i++) {
// 		if (i > 0) {
// 			s += values[i-1].toUpperCase();
// 		}
// 		s += strings[i];
// 	}
// 	return s;
// }
//
// var name = "kyle",
// 	twitter = "getify",
// 	classname = "es6 workshop";
//
// console.log(
// 	upper`Hello ${name} (@${twitter}), welcome to the ${classname}!` ===
// 	"Hello KYLE (@GETIFY), welcome to the ES6 WORKSHOP!"
// );
