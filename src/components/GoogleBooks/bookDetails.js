import React from "react";
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";
import BookStyles from "./books.module.scss";
import Input from "../input";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import app from "firebase/app";

class BookDetails extends React.Component {
  state = {
    bookInfo: {},
    loading: true,
  };

  componentDidMount() {
    
    
    let id = this.props.match.params.bookId;
    fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}`
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
  }

  addBook(id, title, authors, imageLinks, authUser) {
    
    this.props.firebase.user(authUser.uid).once('value', function(snapshot) {
        console.log(snapshot.child("booksRead").val().id)
      });
   
    const {small, thumbnail} = imageLinks
    this.props.firebase
    .user(`${authUser.uid}/booksRead`)
    .push({
            "id": id,
            "title": title,
            "authors": authors,
            "imageUrl": small || thumbnail
      });
      


  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    const {
      title,
      authors,
      imageLinks,
      description
      
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
            <p>By {authors + ", "}</p>
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
            <button onclick={this.addBook(id, title, authors, imageLinks, authUser)}>Add To Read</button>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(BookDetails);
