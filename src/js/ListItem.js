class ListItem {
  constructor(book) {
    this.title = book.title;
    this.text = book.text;
    this.id = book.id;
    this.addTime = book.addTime;
    this.read = book.read;
    this.listEl = null;
    this.deleteBtn = null;
    this.createItemEl();
    this.addListners();
  }

  addListners() {
    this.deleteBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.deleteItem();
    });
  }

  createItemEl() {
    this.listEl = document.createElement('li');
    this.listEl.classList.add('books-list__item');
    if (this.read) {
      this.listEl.classList.add('read');
    }
    this.listEl.innerHTML = `
      <span>${this.title}</span>
      <button class="delete-book-btn">&times;</button>
    `;
    this.deleteBtn = this.listEl.querySelector('.delete-book-btn');
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
}

export default ListItem;
