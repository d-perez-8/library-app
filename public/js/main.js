const deleteBtn = document.querySelectorAll(".del");
const todoItem = document.querySelectorAll("span.not");
const todoComplete = document.querySelectorAll("span.completed");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteTodo);
});

Array.from(todoItem).forEach((el) => {
  el.addEventListener("click", markComplete);
});

Array.from(todoComplete).forEach((el) => {
  el.addEventListener("click", markIncomplete);
});

async function deleteTodo() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/deleteTodo", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/markComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("todos/markIncomplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  // checks to see if there's an identical book in the library
  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  // delete book using the filter method
  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  // retrieves the book by using its title
  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  // checks to see if book is already in the library
  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// DOM Elements
const libraryGrid = document.querySelector(".library");
const addBookForm = document.getElementById("addBookForm");
const addBookBtn = document.getElementById("addBookBtn");
document.querySelector(".open-button").addEventListener("click", openForm);
document.querySelector(".cancel").addEventListener("click", closeForm);

// form pop up
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  addBookForm.reset();
  document.getElementById("myForm").style.display = "none";
}

// Updates the library with new entry
const updateLibraryGrid = () => {
  resetLibraryGrid();
  for (let book of library.books) {
    createBookCard(book);
  }
};

const resetLibraryGrid = () => {
  libraryGrid.innerHTML = "";
};

const createBookCard = (book) => {
  // design of the book card
  const bookCard = document.createElement("div");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");

  bookCard.classList.add("book-card");
  buttonGroup.classList.add("button-group");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn");

  readBtn.addEventListener("click", toggleRead);
  removeBtn.addEventListener("click", removeBook);

  // contents of the book card
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  removeBtn.textContent = "Remove";

  // changes read section based on text content of the read button
  if (book.read) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Not Read";
    readBtn.classList.add("btn-light-red");
  }

  // cards that will be shown on the DOM
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  libraryGrid.appendChild(bookCard);
};

function getBookFromInput() {
  // makes an object for the new book entry
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("is-read").checked;
  return new Book(title, author, pages, read);
}

const addBook = (e) => {
  e.preventDefault();
  library.addBook(getBookFromInput());
  saveLocal();
  updateLibraryGrid();
  closeForm();
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );

  library.removeBook(title);
  saveLocal();
  updateLibraryGrid();
};

const toggleRead = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  const book = library.getBook(title);
  book.read = !book.read;
  saveLocal();
  updateLibraryGrid();
};

// local storage
const saveLocal = () => {
  localStorage.setItem("library", JSON.stringify(library.books));
};

const restoreLocal = () => {
  const books = JSON.parse(localStorage.getItem("library"));
  if (books) {
    library.books = books.map((book) => JSONToBook(book));
  } else {
    library.books = [];
  }
};

const JSONToBook = (book) => {
  return new Book(book.title, book.author, book.pages, book.read);
};

// gets party started
document.getElementById("addBookForm").addEventListener("submit", addBook);

// Loads the saved entries
function loadLocalStorage() {
  library.books = JSON.parse(localStorage.getItem("library"));

  for (let book of library.books) {
    createBookCard(book);
  }
}

loadLocalStorage();
