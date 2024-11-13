// 2. Система управления библиотекой
// Создайте класс Book с следующими свойствами:
// ● Название
// ● Автор
// ● ISBN
// ● Статус (взята или доступна)
// Далее создайте класс Library, который:
// ● Позволяет добавлять новые книги.
// ● Позволяет брать книгу по её ISBN.
// ● Позволяет возвращать взятую книгу по её ISBN.
// ● Показывает список доступных книг.
// Реализуйте методы для управления книгами и их статусами.

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = 'available'
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) { 
    this.books.push(book);    
  }

  borrowBook(isbn) { // взять книгу
    const book = this.books.find((b) => b.isbn === isbn)
    if (book) {
      if (book.status === 'available') {
        book.status = 'borrowed';
        return `Вы взяли книгу ${book.title}`;
      } else {
        return `Книга "${book.title}" уже взята`;
      }
    } else {
      return 'Книга с таким ISBN не найдена';
    }
  }

  returnBook(isbn) { // вернуть книгу
    const book = this.books.find((b) => b.isbn === isbn)
    if (book) {
      if (book.status === 'borrowed') {
        book.status = 'available';
        return `Вы вернули книгу ${book.title}`;
      } else {
        return `Книга ${book.title} не была взята`
      }
    } else {
      return 'Книга с таким ISBN не найдена';
    }
  }

  listAvailableBooks() { // список свободных книг
    const availableBooks = this.books.filter((b) => b.status === 'available');

    if (availableBooks.length > 0) {
      return availableBooks.map((b) => `${b.title} by ${b.author} (ISBN: ${b.isbn})`).join('\n');
    } else {
      return 'Нет доступных книг';
    }
  }
}

const library = new Library();
const book1 = new Book('1984', 'George Orwell', '123456789');
const book2 = new Book('Martin Eden', 'Jack London', '987654321');

library.addBook(book1);
library.addBook(book2);

console.log(library.listAvailableBooks()); // Список доступных книг

console.log(library.borrowBook('123456789')); // Вы взяли книгу: "1984"
console.log(library.borrowBook('123456789')); // Книга "1984" уже взята.

console.log(library.listAvailableBooks()); // Список доступных книг после взятия

console.log(library.returnBook('123456789')); // Вы вернули книгу: "1984"
console.log(library.listAvailableBooks()); // Список доступных книг после возврата

// Запустить можно в терминале
// cd task_4
// node library.js