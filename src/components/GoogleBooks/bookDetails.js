import React from "react";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";

class BookDetails extends React.Component {
  bookId = this.props.match.params.bookId;
  userId = this.props.firebase.auth.currentUser.uid;

  state = {
    bookInfo: {},
    loading: true,
    isAlreadyRead: false,
  };

  componentDidMount() {
    this.fetchBookDetails();
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
    if (!this.state.isAlreadyRead) {
      const { small, thumbnail, medium } = imageLinks;
      this.props.firebase
        .user(`${this.userId}/booksRead`)
        .push({
          id: id,
          title: title,
          authors: authors,
          imageUrl: small || thumbnail || medium,
        })
        .then(() => this.setState({ isAlreadyRead: true }));
    }
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    const {
      title,
      authors,
      imageLinks,
      description,
    } = this.state.bookInfo.volumeInfo;
    const { saleInfo, id } = this.state.bookInfo;

    //REMOVE HTML TAGS
    const rex = /(<([^>]+)>)/gi;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <img
              alt={title}
              src={imageLinks.small || imageLinks.thumbnail}
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
                  <button>Buy from Google</button>
                </a>
              </div>
            ) : (
              <p>Not for sale</p>
            )}
            {this.state.isAlreadyRead ? (
              <p>Book in Shelf!</p>
            ) : (
              <button
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
