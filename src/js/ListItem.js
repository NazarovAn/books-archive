class ListItem {
  constructor(book) {
    this.title = book.title;
    this.text = book.text;
    this.addTime = book.addTime;
    this.read = book.read;
    this.listEl = null;
    this.createItemEl();
  }

  createItemEl() {
    this.listEl = document.createElement('li');
    this.listEl.classList.add('books-list__item');
    if (this.read) {
      this.listEl.classList.add('read');
    }
    this.listEl.textContent = this.title;
  }

  insertListItem(list) {
    list.insertAdjacentElement('beforeend', this.listEl);
  }
}

export default ListItem;
