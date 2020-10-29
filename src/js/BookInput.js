import getId from './utils';

class BookInput {
  constructor(archive) {
    this.archive = archive;
    this.radioSelf = document.getElementById('self');
    this.radioLoad = document.getElementById('load');
    this.nameInput = document.getElementById('name');
    this.loadFileBox = document.querySelector('.load-file__variant');
    this.loadFileInput = document.querySelector('.load-file__input');
    this.loadFileBtn = this.loadFileBox.querySelector('.load-file__button');
    this.typedTextBox = document.querySelector('.typed-text__variant');
    this.typedTextEl = this.typedTextBox.querySelector('.typed-text__textarea');
    this.loadTypedBtn = this.typedTextBox.querySelector('.typed-text__button');

    this.addListners();
  }

  addListners() {
    this.radioSelf.addEventListener('change', () => {
      this.toggleVariants();
    });

    this.radioLoad.addEventListener('change', () => {
      this.toggleVariants();
    });

    this.loadTypedBtn.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (this.validateTextInput()) {
        const newBook = {
          title: this.nameInput.value,
          text: this.typedTextEl.value,
          addTime: Date.now(),
          read: false,
          liked: false,
          id: getId(),
        };

        this.archive.getNewBook(newBook);
        this.clearInputs();
      }
    });

    this.loadFileBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (this.validateFileInput()) {
        this.loadFileInput.files.forEach(async (item) => {
          const newBook = new FormData();
          newBook.append('login', item.name);
          newBook.append('file', item);
          await this.archive.uploadNewBook(newBook);
        });

        this.clearInputs();
      }
    });
  }

  validateTextInput() {
    if (!this.nameInput.value) {
      // eslint-disable-next-line no-console
      console.log('No book name');
      return false;
    } if (!this.typedTextEl.value) {
      // eslint-disable-next-line no-console
      console.log('No book text');
      return false;
    }

    return true;
  }

  validateFileInput() {
    if (this.loadFileInput.files.length) {
      return true;
    }
    // eslint-disable-next-line no-console
    console.log('No file chosen');
    return false;
  }

  clearInputs() {
    this.typedTextEl.value = '';
    this.nameInput.value = '';
    this.loadFileInput.value = '';
  }

  toggleVariants() {
    this.loadFileBox.classList.toggle('hidden');
    this.loadFileBox.classList.toggle('active');
    this.typedTextBox.classList.toggle('hidden');
    this.typedTextBox.classList.toggle('active');
  }
}

export default BookInput;
