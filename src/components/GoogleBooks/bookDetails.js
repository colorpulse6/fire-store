import React from "react";
import { Link } from "react-router-dom";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";
import ButtonStyles from "../../constants/buttons.module.scss";
class BookDetails extends React.Component {
  bookId = this.props.match.params.bookId;
  userId = this.props.firebase.auth.currentUser.uid;

  state = {
    bookInfo: {},
    loading: true,
    isAlreadyRead: false,
    sameTitle: false,
  };

  componentDidMount() {
    this.fetchBookDetails();
    console.log(this.state.sameTitle);
    this.handleIfRead();
  }

  fetchBookDetails = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes/${this.bookId}?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
    )
      .then((book) => book.json())
      .catch((err) => {
        console.log(err);
      })
      .then((book) => {
        this.setState({ bookInfo: book, loading: false });
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        var stringSimilarity = require("string-similarity");

        this.props.firebase
          .user(`${this.userId}/booksRead`)
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              let amountSimilar = stringSimilarity.compareTwoStrings(
                childSnapshot.val().title,
                this.state.bookInfo.volumeInfo.title
              );
              console.log(amountSimilar < 0.3, childSnapshot.val().title);
              if (amountSimilar > 0.3) {
                this.setState({ sameTitle: true });
              }
            });
          });
      });
  };

  handleIfRead() {
    //TEST IF BOOK IS ALREADY READ
    this.props.firebase
      .user(`${this.userId}/booksRead`)
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().id === this.bookId) {
            this.setState({ isAlreadyRead: true });
          }
        });
      });
  }

  handleAddBook(id, title, authors, imageLinks) {
    //ADD BOOK TO DB
    //CHANGE THIS CONDITIONAL
    const { small, thumbnail, medium, smallThumbnail, large } = imageLinks;
    if (this.state.sameTitle) {
      var confirm = window.confirm(
        "You have a book in your shelf that is similar to this title, are you sure you want to add it?"
      );
      if (!this.state.isAlreadyRead && confirm) {
        this.props.firebase
          .user(`${this.userId}/booksRead`)
          .push({
            id: id,
            title: title,
            authors: authors,
            imageUrl: small || thumbnail || medium || smallThumbnail || large,
          })
          .then(() => this.setState({ isAlreadyRead: true }));
      }
    }
    if (!this.state.sameTitle) {
      if (!this.state.isAlreadyRead) {
        this.props.firebase
          .user(`${this.userId}/booksRead`)
          .push({
            id: id,
            title: title,
            authors: authors,
            imageUrl: small || thumbnail || medium || smallThumbnail || large,
          })
          .then(() => this.setState({ isAlreadyRead: true }));
      }
    }
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    const {
      title,
      authors,
      imageLinks,
      description,
    } = this.state.bookInfo.volumeInfo;
    const { saleInfo, id } = this.state.bookInfo;

    //REMOVE HTML TAGS
    const rex = /(<([^>]+)>)/gi;
    const { thumbnail, medium, smallThumbnail, large, small } = imageLinks;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <img
              alt={title}
              src={smallThumbnail || medium || thumbnail || large || small}
            ></img>
            <p>{title}</p>
            <p>By {authors}</p>
            <p>
              {description ? (
                description.replace(rex, "")
              ) : (
                <p>No Description Availabe</p>
              )}
            </p>
            {saleInfo.buyLink ? (
              <div>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={saleInfo.buyLink}
                >
                  <button className={ButtonStyles.buttonPrimary}>
                    Buy from Google
                  </button>
                </a>
              </div>
            ) : (
              <p>Not for sale</p>
            )}
            {this.state.isAlreadyRead ? (
              <Link to="/your-shelf">
                <p>Book in Shelf!</p>
              </Link>
            ) : (
              <button
                className={ButtonStyles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  this.handleAddBook(id, title, authors, imageLinks);
                }}
              >
                Add To Read
              </button>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(BookDetails);
