import React from "react";
import { Link } from 'react-router-dom'
import { withAuthorization } from "../Session";
import BookStyles from "../GoogleBooks/books.module.scss";

class YourShelfPage extends React.Component {
  userId = this.props.firebase.auth.currentUser.uid;

  state = {
    bookShelf: [],
  };

  componentDidMount() {
    this.handleGetBooks();
    console.log(this.state.bookShelf)
  }

  handleGetBooks() {
    let values = [{}];
    this.props.firebase
      .user(`${this.userId}/booksRead`)
      .once("value")
      //GET KEY
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          values.push({
            key: childSnapshot.key,
            book: childSnapshot.val(),
          });
        });
        //SET KEY AND BOOK VALUE TO STATE OBJECT
        values.shift();
        this.setState({ bookShelf: values });
      });
  }

  handleRemoveBooks(index) {
    if (window.confirm("Are you sure you want to delete this book?")) {
      let bookItem = this.state.bookShelf[index];
      //REMOVE ITEM FROM DB

      this.props.firebase
        .user(`${this.userId}/booksRead/${bookItem.key}`)
        .remove();
      //REMOVE ITEM FROM STATE
      this.state.bookShelf.splice(index, 1);
      this.setState({ bookShelf: this.state.bookShelf });
    }
  }

  render() {
    return (
      <div className={BookStyles.container}>
        {this.state.bookShelf.length !== 0 ? this.state.bookShelf.map((book, index) => {
          return (
            <div key={index}>
              <img
                className={BookStyles.books}
                alt={book.book.title}
                src={book.book.imageUrl}
              ></img>
              <p>{book.book.title}</p>
              <button onClick={this.handleRemoveBooks.bind(this, index)}>
                Remove Book
              </button>
            </div>
          );
        }) : <p>You have not saved any books, <Link to="/home">Add Books?</Link></p>}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(YourShelfPage);
