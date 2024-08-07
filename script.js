const myLibrary = [];

const addBookButton = document.getElementById('add-book-btn');
const library = document.getElementById('library');

const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pages = document.getElementById('pages-input');

let bookTitle;
let bookAuthor;
let bookPageCount;
let readStatus;
let toggleButtons;
let removeButtons;
let books;

const dialog = document.getElementById('dialog');
const newBookButton = document.getElementById('new-book-btn');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function() {
    this.read === 'yes' ? this.read = 'no' : this.read = 'yes';
  };
}

function addBookToLibrary() {
  let newBook = new Book(bookTitle, bookAuthor, bookPageCount, readStatus);
  myLibrary.push(newBook);
  updateLibrary();
}

function updateLibrary() {
  while(library.firstChild) {
    library.removeChild(library.firstChild);
  }

  myLibrary.forEach((el) => {
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.innerHTML = `
    <h3>${el.title}</h3>
    <p>By ${el.author}</p>
    <p class="pages-read">${el.pages} pages, <strong>${el.read === 'yes' ? 'Read' : 'Not Read'}</strong></p>
    <button class="toggle-read-btn">Toggle Read Status</button>
    <button class="remove-btn">Remove Book</button>
  `;
    library.appendChild(bookDiv);
  })

  toggleButtons = document.querySelectorAll('.toggle-read-btn');
  toggleButtons.forEach((el) => {
    el.addEventListener('click', () => {
      const parentDiv = event.target.parentNode;
      const childrenArray = Array.from(library.children);
      myLibrary[childrenArray.indexOf(parentDiv)].toggleRead();
      updateLibrary();
    })
  })

  removeButtons = document.querySelectorAll('.remove-btn')
  removeButtons.forEach((el) => {
    el.addEventListener('click', () => {
      const parentDiv = event.target.parentNode;
      const divArray = Array.from(library.children);
      myLibrary.splice(divArray.indexOf(parentDiv), 1);
      parentDiv.remove();
    })
  })
} 

const resetDialog = () => {
  titleInput.value = '';
  authorInput.value = '';
  pages.value = '';
  const radios = document.querySelectorAll('input[name="read"]');
  radios.forEach((radio) => {
    if (radio.value === "yes") {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  })
}

addBookButton.addEventListener('click', () => {
  event.preventDefault();
  if (!titleInput.value || !authorInput.value || !pages.value) {
    alert('Please fill out every parameter');
    return;
  }
  
  bookTitle = titleInput.value;
  bookAuthor = authorInput.value;
  bookPageCount = pages.value;
  readStatus = document.querySelector('input[name="read"]:checked').value;

  dialog.close();
  addBookToLibrary();
  resetDialog();
})

newBookButton.addEventListener('click', () => {
  dialog.showModal();
})