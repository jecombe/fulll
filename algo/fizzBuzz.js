const fizzBuzz = (n) => {
  if (n < 1) return;

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      // la condition d'ensemble doit etre placé au debut, si placé apres les condition individuelle, alors elle ne sera jamais atteinte.
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
};

const N = 15;
fizzBuzz(15);
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
