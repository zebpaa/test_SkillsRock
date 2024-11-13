// 2. Глубокое клонирование объекта
// Напишите функцию, которая выполняет глубокое клонирование объекта, т.е.
// вложенные объекты также должны быть склонированы, а не переданы по ссылке.
// 

const original = {
  name: 'John',
  address: {
  city: 'New York',
  country: 'USA',
  },
};

const deepClone = (obj) => {
  const newObj = {};

    for (key in obj) {
      if (typeof obj[key] !== 'object') {
        newObj[key] = obj[key];
      } else {
        newObj[key] = deepClone(obj[key]);
      }
    }

  return newObj;
};

const copy = deepClone(original);
copy.address.city = 'Los Angeles';
console.log(original.address.city); // New York (оригинальный объект не должен измениться)
console.log(copy.address.city); // Los Angeles