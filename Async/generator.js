function *gen() {
  yield 1;
  yield 4;
  yield 3;
}

var it = gen();

console.log(it.next());
