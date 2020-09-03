import React from "react";
import { Link } from "react-router-dom";
import { withAuthorization } from "../Session";
import BookStyles from "../GoogleBooks/books.module.scss";
import ButtonStyles from "../../constants/buttons.module.scss";
import * as ROUTES from "../../constants/routes";

import LoadingGif from '../LoadingGif'

class YourShelfPage extends React.Component {
  userId = this.props.firebase.auth.currentUser.uid;

  state = {
    bookShelf: [],
    loading:true
  };

  componentDidMount() {
    this.handleGetBooks();
    

    
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
        this.setState({ bookShelf: values, loading:false }, () => console.log(this.state.bookShelf)
        );
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
   if(this.state.loading){
    return <LoadingGif/>
   }
   
    return (
      <div className={BookStyles.container}>

      {/* TEST THIS */}
        {this.state.bookShelf.length !== 0 ? (
          this.state.bookShelf.map((book, index) => {
            return (
              <div key={index}>
                <Link to={`${ROUTES.BOOK_DETAILS}/${book.book.id}`}>
                  <img
                    className={BookStyles.books}
                    alt={book.book.title}
                    src={book.book.imageUrl}
                  ></img>
                </Link>
                <p>{book.book.title}</p>
                <button
                  onClick={this.handleRemoveBooks.bind(this, index)}
                  className={ButtonStyles.buttonPrimary}
                >
                  Remove Book
                </button>
              </div>
            );
          })
        ) : (
          <p>
            You have not saved any books, <Link to="/home">Add Books?</Link>
          </p>
        )}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(YourShelfPage);
