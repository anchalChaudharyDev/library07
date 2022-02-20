class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Library {
    constructor(books) {
        this.books = books;
    }
    addBookToLibrary(book) {
        this.books.push(book);
        console.log(this.books);
        localStorage.setItem("books", JSON.stringify(this.books));
    }
    displayBooks() {
        let booksTable = document.getElementById("booksList");

        let newBookTable = document.createElement("table");
        newBookTable.setAttribute("class", "table table-striped");
        newBookTable.setAttribute("id", "booksList");

        newBookTable.appendChild(booksTable.children[0]);

        let i = 0;

        this.books.forEach(element => {

            let bookRow = `<tr>
                            <td>${++i}</td>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                           </tr>`

            newBookTable.children[0].innerHTML += bookRow;
        });

        booksTable = newBookTable;

        document.getElementById("booksList").replaceWith(newBookTable);

    }
}

let library = new Library(getBooksList());

function getBooksList() {
    let alreadyAddedBooks = localStorage.getItem("books");
    return alreadyAddedBooks === null ? [] : JSON.parse(alreadyAddedBooks);
}

library.displayBooks();

document.getElementById("addBook").addEventListener("click", () => {

    let bookName = document.getElementById("bookName").value;
    let bookAuthor = document.getElementById("bookAuthor").value;

    if (bookName === "" || bookAuthor === " "){
        alert("Some entries are missing");
        return;
    }

    let fictionType = document.getElementById("fiction").checked;
    let nonFictiontType = document.getElementById("nonFiction").checked;
    let biographyType = document.getElementById("biographyType").checked;

    let newBook = new Book(bookName, bookAuthor, determineBookType(fictionType, nonFictiontType, biographyType));

    library.addBookToLibrary(newBook);

    // alertDiv.setAttribute("class", "alert alert-warning alert-dismissible fade show");
    // alertDiv.setAttribute("role", "alert");
    // alertDiv.innerText = "Successfully added";

    // let buttonDiv = document.createElement("button");
    // buttonDiv.setAttribute("type", "button");
    // buttonDiv.setAttribute("class", "btn-close");
    // buttonDiv.setAttribute("data-bs-dismiss", "alert");
    // buttonDiv.setAttribute("aria-lable", "close");

    library.displayBooks();
    alert("Successfully added");

});

function determineBookType(fiction, nonFiction, biography) {
    if (fiction)
        return "Fiction";
    if (nonFiction)
        return "Non-fiction";
    if (biography)
        return "Biography";
}