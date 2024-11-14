// Задание 4: Объектно-ориентированный JavaScript (1-1.5 часа)
// 1. Реализация простого калькулятора
// Создайте класс Calculator, который симулирует работу простого калькулятора с
// методами:
// ● add(a, b) - возвращает сумму a и b.
// ● subtract(a, b) - возвращает разность a и b.
// ● multiply(a, b) - возвращает произведение a и b.
// ● divide(a, b) - возвращает результат деления a на b. Если b равно 0,
// возвращает сообщение об ошибке.
// Создайте экземпляр класса и продемонстрируйте его использование, вызывая методы
// с разными аргументами.

class Calculator {
  constructor() {
  // Ваш код здесь
  }

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) return 'На 0 делить нельзя';
    return a / b;
  }
}

const calc = new Calculator();

console.log(calc.add(2, 4));
console.log(calc.subtract(2, 4));
console.log(calc.multiply(2, 4));
console.log(calc.divide(2, 4));
console.log(calc.divide(2, 0));