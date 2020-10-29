class ListItem {
  constructor(book, archive) {
    this.archive = archive;
    this.title = book.title;
    this.text = book.text;
    this.id = book.id;
    this.addTime = book.addTime;
    this.read = book.read;
    this.liked = book.liked;
    this.listEl = null;
    this.deleteBtn = null;
    this.readBtn = null;
    this.likeBtn = null;
    this.createItemEl();
    this.addListners();
  }

  addListners() {
    this.deleteBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.deleteItem();
    });

    this.readBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.toggleReadStatus();
    });

    this.likeBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.toggleLikedStatus();
    });
  }

  createItemEl() {
    this.listEl = document.createElement('li');
    this.listEl.classList.add('books-list__item');
    let likedSymbl = '&star;';

    if (this.read) {
      this.listEl.classList.add('read');
    }

    if (this.liked) {
      this.listEl.classList.add('liked');
      likedSymbl = '&starf;';
    }

    this.listEl.innerHTML = `
      <span>${this.title}</span>
      <button class="delete-book-btn">&times;</button>
      <button class="read-book-btn">Прочитано</button>
      <button class="like-book-btn">${likedSymbl}</button>
    `;
    this.deleteBtn = this.listEl.querySelector('.delete-book-btn');
    this.readBtn = this.listEl.querySelector('.read-book-btn');
    this.likeBtn = this.listEl.querySelector('.like-book-btn');
  }

  insertListItem(list) {
    list.insertAdjacentElement('beforeend', this.listEl);
  }

  deleteItem() {
    this.removeFromPage();
    this.removeFromLocalStorage();
  }

  removeFromPage() {
    this.listEl.parentElement.removeChild(this.listEl);
  }

  removeFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem('BooksList'));
    const filteredBooks = storedBooks.filter((item) => item.id !== this.id);
    localStorage.setItem('BooksList', JSON.stringify(filteredBooks));
  }

  toggleReadStatus() {
    const storedBooks = JSON.parse(localStorage.getItem('BooksList'));
    const modifiedBooks = storedBooks.map((item) => {
      if (item.id !== this.id) {
        return item;
      }

      const book = item;
      if (!item.read) {
        book.read = true;
      } else {
        book.read = false;
      }

      return book;
    });

    localStorage.setItem('BooksList', JSON.stringify(modifiedBooks));
    this.listEl.classList.toggle('read');
  }

  toggleLikedStatus() {
    const storedBooks = JSON.parse(localStorage.getItem('BooksList'));
    const modifiedBooks = storedBooks.map((item) => {
      if (item.id !== this.id) {
        return item;
      }

      const book = item;
      if (!item.liked) {
        book.liked = true;
      } else {
        book.liked = false;
      }

      return book;
    });

    localStorage.setItem('BooksList', JSON.stringify(modifiedBooks));
    this.changeLikedStyle();
  }

  changeLikedStyle() {
    this.listEl.classList.toggle('liked');
    if (this.listEl.classList.contains('liked')) {
      this.likeBtn.innerHTML = '&starf;';
      this.moveToLikedList();
    } else {
      this.likeBtn.innerHTML = '&star;';
      this.moveToAllList();
    }
  }

  moveToLikedList() {
    this.archive.insertToLikedBooks(this);
  }

  moveToAllList() {
    this.archive.insertToAllBooks(this);
  }
}

export default ListItem;
