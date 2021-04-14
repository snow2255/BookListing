// class to great book instances
function Book(name, author, isbn) {
    this.name = name;
    this.author = author;
    this.isbn = isbn;
}

//class to create the UI functionalities
function UI(){}


//add a book method to the UI object
UI.prototype.addBookToList = function(book) {
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

//clear ui fields 

UI.prototype.cleanFields = function() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn#').value = '';
}

//add error and success notification to the ui

UI.prototype.displayMessage = function(message, messagename){
      const div = document.createElement('div');
      div.className = `alert ${messagename}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container'),
            form = document.querySelector('#book-form');

      container.insertBefore(div, form);

      setTimeout(() => {
            document.querySelector('.alert').remove();}, 3000);

}

// delete book list from UI
UI.prototype.deleteBook = (target)=>{
      if (target.className === 'delete'){
            target.parentElement.parentElement.remove();
      }

}

//event listener to the form 
document.getElementById('book-form').addEventListener('submit', function(e) {

    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn#').value;
    const book = new Book(title, author, isbn);
          // instantiate the UI object
    const ui = new UI();

    if (title !== "" && author !== "" && isbn !== ""){
        // instantiate the book object
      

        ui.addBookToList(book);

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
        ui.displayMessage('Book Removed Succesfully', 'success');
     }

      e.preventDefault();
});