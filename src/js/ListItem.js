class ListItem {
  constructor(book) {
    this.title = book.title;
    this.text = book.text;
    this.listEl = null;
    this.createItemEl();
  }

  createItemEl() {
    this.listEl = document.createElement('li');
    this.listEl.classList.add('books-list__item');
    this.listEl.textContent = this.title;
  }

  insertListItem(list) {
    list.insertAdjacentElement('beforeend', this.listEl);
  }
}

export default ListItem;
