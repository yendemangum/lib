let myLibrary = [];

class Book {
    constructor (title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead; }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    bookForm.style.display = "none";
}

const bookForm = document.querySelector(".book-form");

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookForm);
    
    const book = new Book(formData.get("title"), formData.get("author"), formData.get("page-num"), formData.get("is-read"));
    addBookToLibrary(book);
    showBooks();
    newBook.style.display = 'inline-block'
    newBook.style.alignSelf = 'center'
})

const newBook = document.querySelector(".new-book")

newBook.addEventListener("click", () => {
    bookForm.style.display = "flex"
    bookForm.style.flexDirection = "column"
    bookForm.style.alignItems = "center"
    bookForm.style.gap = ".5rem"
    bookForm.style.padding = ".5rem"
    newBook.style.display = "none"
})

function showBooks() {
    const books = document.querySelector(".books")
    books.textContent = ""
    for (let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement("div")
        book.setAttribute("class", "each-book")
        const button = document.createElement("button")
        const button2 = document.createElement("button")
        button2.textContent = "Mark as read/unread"
        button.textContent = "Delete"
        const thisBook = myLibrary[i];
        book.textContent = thisBook.title + " by " + thisBook.author + ", " + thisBook.pageNum + " pages, " + thisBook.isRead;
        books.appendChild(book)        
        book.appendChild(button)
        book.appendChild(button2)
        button2.addEventListener("click", () =>{
            if (thisBook.isRead == "read") {
                thisBook.isRead = "unread"
            }
            else if (thisBook.isRead == "unread") {
                thisBook.isRead = "read"
            }
            showBooks();
        })
        button.addEventListener("click", () => {
            myLibrary = myLibrary.splice(i,i)
            books.removeChild(book)
            book.removeChild(button)
            book.removeChild(button2)
        })
    }
}

const title = document.getElementById("title")
title.addEventListener("input", (event) => {
    if (title.validity.valueMissing) {
        title.setCustomValidity("Title is a required field")
    } else {
        title.setCustomValidity("")
    }
})

const author = document.querySelector("#author")
author.addEventListener("input", (event) => {
    if (author.validity.valueMissing) {
        author.setCustomValidity("Author is a required field")
    } else {
        author.setCustomValidity("")
    }
})

const pageNum = document.querySelector("#page-num")
pageNum.addEventListener("input", (event) => {
    if (pageNum.validity.rangeUnderflow) {
        pageNum.setCustomValidity("Must have greater than 0 pages")
    } else {
        pageNum.setCustomValidity("")
    }
})