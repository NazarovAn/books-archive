import Input from './BookInput';
import ListItem from './ListItem';
import { getId, sortBooks } from './utils';

class Archive {
  constructor() {
    this.allBooksList = document.querySelector('.all-books__list');
    this.likedBooksList = document.querySelector('.favorites__list');
    this.booksArray = [];
    this.Input = new Input(this);
  }

  init() {
    this.loadStoredBooks();
  }

  loadStoredBooks() {
    const storageList = JSON.parse(localStorage.getItem('BooksList'));
    if (storageList) {
      this.booksArray = sortBooks([...storageList]);
      this.printAllBooks();
      return;
    }

    this.booksArray = [];
  }

  clearLists() {
    this.allBooksList.innerHTML = '';
    this.likedBooksList.innerHTML = '';
  }

  saveToLocalStorage(book) {
    this.booksArray.push(book);
    localStorage.setItem('BooksList', JSON.stringify(this.booksArray));
  }

  makeNewListItem(book) {
    const newItem = new ListItem(book, this);
    if (newItem.liked) {
      this.insertToLikedBooks(newItem);
      return;
    }
    this.insertToAllBooks(newItem);
  }

  insertToAllBooks(book) {
    book.insertListItem(this.allBooksList);
  }

  insertToLikedBooks(book) {
    book.insertListItem(this.likedBooksList);
  }

  printAllBooks() {
    this.booksArray.forEach((book) => {
      this.makeNewListItem(book);
    });
  }

  getNewBook(book) {
    this.saveToLocalStorage(book);
    this.makeNewListItem(book);
  }

  async uploadNewBook(book) {
    const url = 'https://apiinterns.osora.ru/';
    const resp = await fetch(url, {
      method: 'POST',
      body: book,
    });
    const json = await resp.json();
    this.getNewBook({
      title: json.title,
      text: json.text,
      addTime: Date.now(),
      read: false,
      liked: false,
      id: getId(),
    });
  }
}

export default Archive;
