const myLibrary = [];


// ==========================================
// BOOK CONSTRUCTOR
// ==========================================

function Book(title, author, pages, read) {

    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// ==========================================
// BOOK PROTOTYPE FUNCTION
// ==========================================

Book.prototype.toggleRead = function () {

    this.read = !this.read;

};


// ==========================================
// ADD BOOK TO LIBRARY
// ==========================================

function addBookToLibrary(title, author, pages, read) {

    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    displayBooks();
}


// ==========================================
// DISPLAY BOOKS
// ==========================================

function displayBooks() {

    const libraryContainer =
        document.querySelector("#library-container");

    // Clear existing cards
    libraryContainer.innerHTML = "";


    // Loop through every book
    myLibrary.forEach(function(book) {

        // Create card
        const bookCard = document.createElement("div");

        bookCard.classList.add("book-card");

        // Store book ID in data attribute
        bookCard.dataset.id = book.id;


        // Title
        const title = document.createElement("h2");

        title.textContent = book.title;


        // Author
        const author = document.createElement("p");

        author.textContent = `Author: ${book.author}`;


        // Pages
        const pages = document.createElement("p");

        pages.textContent = `Pages: ${book.pages}`;


        // Read status
        const readStatus = document.createElement("p");

        readStatus.classList.add("read-status");


        if (book.read) {

            readStatus.textContent = "Read";
            readStatus.classList.add("read");

        } else {

            readStatus.textContent = "Not Read";
            readStatus.classList.add("not-read");

        }


        // Toggle read button
        const toggleButton =
            document.createElement("button");

        toggleButton.textContent =
            book.read ? "Mark as Not Read" : "Mark as Read";

        toggleButton.classList.add("toggle-read");


        // Remove button
        const removeButton =
            document.createElement("button");

        removeButton.textContent = "Remove Book";

        removeButton.classList.add("remove-book");


        // ==========================================
        // TOGGLE READ STATUS
        // ==========================================

        toggleButton.addEventListener("click", function() {

            book.toggleRead();

            displayBooks();

        });


        // ==========================================
        // REMOVE BOOK
        // ==========================================

        removeButton.addEventListener("click", function() {

            const bookIndex =
                myLibrary.findIndex(function(item) {

                    return item.id === book.id;

                });


            if (bookIndex !== -1) {

                myLibrary.splice(bookIndex, 1);

            }


            displayBooks();

        });


        // Add elements to card
        bookCard.appendChild(title);

        bookCard.appendChild(author);

        bookCard.appendChild(pages);

        bookCard.appendChild(readStatus);

        bookCard.appendChild(toggleButton);

        bookCard.appendChild(removeButton);


        // Add card to page
        libraryContainer.appendChild(bookCard);

    });
}


// ==========================================
// NEW BOOK BUTTON
// ==========================================

const newBookButton =
    document.querySelector("#new-book-btn");

const bookDialog =
    document.querySelector("#book-dialog");


newBookButton.addEventListener("click", function() {

    bookDialog.showModal();

});


// ==========================================
// FORM SUBMISSION
// ==========================================

const bookForm =
    document.querySelector("#book-form");


bookForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();


    // Get form values
    const title =
        document.querySelector("#title").value;

    const author =
        document.querySelector("#author").value;

    const pages =
        document.querySelector("#pages").value;

    const read =
        document.querySelector("#read").checked;


    // Add book
    addBookToLibrary(
        title,
        author,
        pages,
        read
    );


    // Reset form
    bookForm.reset();


    // Close dialog
    bookDialog.close();

});


// ==========================================
// CANCEL BUTTON
// ==========================================

const cancelButton =
    document.querySelector("#cancel-btn");


cancelButton.addEventListener("click", function() {

    bookForm.reset();

    bookDialog.close();

});


// ==========================================
// INITIAL BOOKS
// ==========================================

addBookToLibrary(
    "The Hobbit",
    "J.R.R. Tolkien",
    310,
    true
);

addBookToLibrary(
    "Atomic Habits",
    "James Clear",
    320,
    false
);

addBookToLibrary(
    "Harry Potter",
    "J.K. Rowling",
    309,
    true
);