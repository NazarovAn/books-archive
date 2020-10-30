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
    this.finishedBtn = null;
    this.readBtn = null;
    this.likeBtn = null;
    this.editBtn = null;
    this.draged = null;
    this.shiftX = null;
    this.shiftY = null;
    this.createItemEl();
    this.addListners();
  }

  addListners() {
    document.addEventListener('mousemove', (ev) => {
      ev.preventDefault();
      if (this.draged) {
        this.moveClonedElement(ev);
      }
    });

    document.addEventListener('mouseup', (ev) => {
      ev.preventDefault();
      if (this.draged) {
        this.deleteClonedElement();
        this.showListEl();
        this.insertDraged(ev);
        this.shiftX = null;
        this.shiftY = null;
      }
    });

    this.listEl.addEventListener('mousedown', (ev) => {
      if (ev.target === this.listEl) {
        this.shiftX = ev.pageX - this.listEl.getBoundingClientRect().left;
        this.shiftY = ev.pageY - this.listEl.getBoundingClientRect().top;
        this.cloneElement(ev);
      }
    });

    this.readBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.archive.openBook(this);
    });

    this.deleteBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.deleteItem();
    });

    this.finishedBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.toggleReadStatus();
      this.archive.redrawLists();
    });

    this.likeBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.toggleLikedStatus();
    });

    this.editBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.archive.editForm.openEditForm(this);
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
      <span class="list-book__title">${this.title}</span>
      <button class="delete-book-btn">&times;</button>
      <button class="finished-book-btn">Прочитано</button>
      <button class="read-book-btn">Читать</button>
      <button class="edit-book-btn">&#10000;</button>
      <button class="like-book-btn">${likedSymbl}</button>
    `;
    this.deleteBtn = this.listEl.querySelector('.delete-book-btn');
    this.finishedBtn = this.listEl.querySelector('.finished-book-btn');
    this.readBtn = this.listEl.querySelector('.read-book-btn');
    this.likeBtn = this.listEl.querySelector('.like-book-btn');
    this.editBtn = this.listEl.querySelector('.edit-book-btn');
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

    this.archive.redrawLists();
  }

  moveToLikedList() {
    this.archive.insertToLikedBooks(this);
  }

  moveToAllList() {
    this.archive.insertToAllBooks(this);
  }

  cloneElement(ev) {
    this.draged = this.listEl.cloneNode(true);
    this.hideListEl();
    this.draged.classList.add('draged');
    document.body.append(this.draged);
    this.moveClonedElement(ev);
  }

  hideListEl() {
    this.listEl.classList.add('hidden');
  }

  showListEl() {
    this.listEl.classList.remove('hidden');
  }

  moveClonedElement(ev) {
    this.draged.style.left = `${ev.clientX - this.shiftX}px`;
    this.draged.style.top = `${ev.clientY - this.shiftY}px`;
  }

  deleteClonedElement() {
    this.draged.parentElement.removeChild(this.draged);
    this.draged = null;
  }

  insertDraged(ev) {
    const insertList = ev.target.closest('.books-list');
    if (insertList) {
      if (!insertList.contains(this.listEl)) {
        this.toggleLikedStatus();
      }
    }
  }
}

export default ListItem;
