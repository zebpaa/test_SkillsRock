// 2. FizzBuzz
// Напишите функцию, которая выводит числа от 1 до 100. Но для кратных трём
// выводите "Fizz" вместо числа, а для кратных пяти — "Buzz". Для чисел, кратных как
// трём, так и пяти, выводите "FizzBuzz".

function fizzBuzz() {
  for (let i = 1; i < 101; i += 1) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz")
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}
 
fizzBuzz();
 