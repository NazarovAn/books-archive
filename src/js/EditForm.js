class EditForm {
  constructor(archive) {
    this.archive = archive;
    this.editForm = document.querySelector('.page__edit-form');
    this.editFormSaveBtn = this.editForm.querySelector('.edit-form__save-btn');
    this.editFormInput = this.editForm.querySelector('.edit-form__input');
    this.editFormTextarea = this.editForm.querySelector('.edit-form__textarea');
    this.editedBook = null;
    this.addListners();
  }

  addListners() {
    this.editFormSaveBtn.addEventListener('click', (ev) => {
      ev.preventDefault();

      this.saveEdited();
      const editedBook = {
        title: this.editedBook.title,
        text: this.editedBook.text,
        addTime: this.editedBook.addTime,
        read: this.editedBook.read,
        liked: this.editedBook.liked,
        id: this.editedBook.id,
      };

      this.editedBook.deleteItem();
      this.archive.getEditedBook(editedBook);

      this.hideEditForm();
    });
  }

  openEditForm(book) {
    this.editedBook = book;
    this.editForm.classList.remove('hidden');
    this.editFormInput.value = this.editedBook.title;
    this.editFormTextarea.value = this.editedBook.text;
  }

  hideEditForm() {
    this.clearForm();
    this.editForm.classList.add('hidden');
  }

  saveEdited() {
    this.editedBook.title = this.editFormInput.value;
    this.editedBook.text = this.editFormTextarea.value;
  }

  clearForm() {
    this.editFormInput.value = '';
    this.editFormTextarea.value = '';
    this.editedBook = null;
  }
}

export default EditForm;
