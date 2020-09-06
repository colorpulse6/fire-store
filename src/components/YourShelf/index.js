import React from "react";
import { Link } from "react-router-dom";
import { withAuthorization } from "../Session";
import BookStyles from "../GoogleBooks/books.module.scss";
import ButtonStyles from "../../constants/buttons.module.scss";
import * as ROUTES from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import LoadingGif from "../LoadingGif";
import FireGif from "../FireGif";

import {confirmWindowShelf} from './confirmWindow'
class ShelfTemplate extends React.Component {
  userId = this.props.firebase.auth.currentUser.uid;

  state = {
    bookShelf: [],
    isAlreadyRead: false,
    loading: true,
    lightFire: false,
  };

  componentDidMount() {
    this.handleGetBooksRead();
    console.log(this.props.location.state);
  }

  handleGetBooksRead() {
    let values = [{}];
    this.props.firebase
      .user(`${this.userId}/${this.props.shelfUrl}`)
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
        this.setState({ bookShelf: values, loading: false }, () =>
          console.log(this.state.bookShelf)
        );
      });
  }

  

  deleteFromDb(index) {
    let bookItem = this.state.bookShelf[index];
    //REMOVE ITEM FROM DB

    this.props.firebase
      .user(`${this.userId}/${this.props.shelfUrl}/${bookItem.key}`)
      .remove();
    //REMOVE ITEM FROM STATE
    // this.setState({ lightFire: true });

    this.state.bookShelf.splice(index, 1);
    this.setState({ bookShelf: this.state.bookShelf });
  }

  handleRemoveBooks(index) {
    confirmWindowShelf(
      index,
      this.deleteFromDb.bind(this, index),
      "Are you sure you want to remove this book?",
      "You won't be able to revert this!",
      "Yes, delete it!",
      "Deleted!",
      "Book has been deleted.",
      "Your book is safe :)"
    );
  }

  moveToReadingList(index, id, title, authors, imageUrl) {
    let bookItem = this.state.bookShelf[index];
    this.props.firebase
      .user(`${this.userId}/booksRead`)
      .push({
        id: id,
        title: title,
        authors: authors,
        imageUrl: imageUrl,
      })
      .then(() => {
        this.props.firebase
          .user(`${this.userId}/${this.props.shelfUrl}/${bookItem.key}`)
          .remove();
        //REMOVE ITEM FROM STATE
        this.state.bookShelf.splice(index, 1);
        this.setState({ bookShelf: this.state.bookShelf });
      });
  }
  handleAddBookToRead(index, id, title, authors, imageUrl) {
    confirmWindowShelf(
      index,
      this.moveToReadingList.bind(this, index, id, title, authors, imageUrl),
      "Are you sure you finished this book?",
      "You can always move it back!",
      "Yes, move it!",
      "Book Moved!",
      "Book has been moved to Reading List.",
      "Your book has not been moved :)"
    );
  }

  render() {
    if (this.props.location.state){
      var {bookId, bookTitle } = this.props.location.state
    }
    
    if (this.state.loading) {
      return <LoadingGif />;
    }

    return (
      <div className={BookStyles.main}>
        <h1>{this.props.header}</h1>
        <div className={BookStyles.container}>
          {/* TEST THIS */}
          {this.state.bookShelf.length !== 0 ? (
            this.state.bookShelf.map((book, index) => {
              return (
                <div key={index} className={BookStyles.bookDiv}>
                  <Link to={`${ROUTES.BOOK_DETAILS}/${book.book.id}`}>
                    <img
                      className={BookStyles.books}
                      alt={book.book.title}
                      src={book.book.imageUrl}
                    ></img>
                    {this.state.lightFire ? <FireGif /> : null}
                  </Link>
                  <div className={BookStyles.buttons}>
                    <button
                      onClick={this.handleRemoveBooks.bind(this, index)}
                      className={ButtonStyles.removeBook}
                    >
                      Remove Book
                    </button>
                    {this.props.shelfUrl === "readingList" ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleAddBookToRead(
                            index,
                            book.book.id,
                            book.book.title,
                            book.book.authors,
                            book.book.imageUrl
                          );
                        }}
                        className={ButtonStyles.removeBook}
                      >
                        Finished?
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })
          ) : (
            <p>
              You have not saved any books, <Link to="/home">Add Books?</Link>
            </p>
          )}
        </div>
        {bookId ? <div>
          <Link to={`/book-details/${bookId}`}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            alt="angle down"
            style={{ marginLeft: "10px", width: "20px" }}
          />

          <p>Back to {bookTitle}</p>
          </Link>
        </div> : null}
        
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ShelfTemplate);
