class Book {
    constructor(name, author, isbn){
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI {


    addBookToList(book){

        // create on the fly html elements
        const list = document.getElementById('book-list'),
        row = document.createElement('tr');

        // insert col into the tr

        row.innerHTML = `
           <td>${book.name}</td>
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);

    } 

    cleanFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn#').value = '';

    }
 
    displayMessage(message, messagename){
        const div = document.createElement('div');
        div.className = `alert ${messagename}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container'),
              form = document.querySelector('#book-form');
  
        container.insertBefore(div, form);
  
        setTimeout(() => {

            document.querySelector('.alert').remove();}, 3000);
    }

    deleteBook(target){
        if (target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
 
    }
}


class Storage {

    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));

        }

        return books;
    }

    static displayBooks(){
        let books = Storage.getBook();
        books.forEach((book) =>{
            const ui = new UI();

            ui.addBookToList(book)
        });
    }

    static addBook(book){
        const books = Storage.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));


    }

    static removeBook(isbn){
        const books = Storage.getBook();

        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }

        });

        localStorage.setItem('books', JSON.stringify(books));

    }
}

//load data from LocalStorage
document.addEventListener('DOMContentLoaded', Storage.displayBooks);

//event listener to the form 
document.getElementById('book-form').addEventListener('submit', function(e) {

    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn#').value;
    const book = new Book(title, author, isbn);
          // instantiate the UI object
    const ui = new UI();
    const storage = new Storage;

    if (title !== "" && author !== "" && isbn !== ""){
        // instantiate the book object
      

        ui.addBookToList(book);
        Storage.addBook(book);


        ui.cleanFields();

        ui.displayMessage('Data Entry Successful', 'success');
        //ui.displayMessage('Check The Data Entered and try again', 'error');   

    }
    else{
         // show the error notification
         ui.displayMessage('Check The Data Entered and try again', 'error')   
    } 

   


    e.preventDefault();
});

// add event listener to the book list

document.getElementById('book-list').addEventListener('click', (e) =>{
    if (confirm('Are you Sure you want to delete') === true){

        const ui = new UI();
        ui.deleteBook(e.target);
        Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
        ui.displayMessage('Book Removed Succesfully', 'success');
    }

    e.preventDefault();
});