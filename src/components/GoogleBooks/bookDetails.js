import React from "react";
import BookStyles from "./books.module.scss";
import Input from "../input";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

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
        this.setState({ bookInfo: book, loading: false }, () =>
          console.log(this.state.bookInfo.volumeInfo.description)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    const {
      title,
      authors,
      imageLinks,
      description,
    } = this.state.bookInfo.volumeInfo;
    const { saleInfo } = this.state.bookInfo;

    //REMOVE HTML TAGS
    const rex = /(<([^>]+)>)/gi;
    return (
      <div>
        <img alt={title} src={imageLinks.small || imageLinks.thumbnail}></img>
        <p>{title}</p>
        <p>By {authors}</p>
        <p>{description.replace(rex, "")}</p>
        {saleInfo.buyLink ? (
          <div>
            <a rel="noopener noreferrer" target="_blank" href={saleInfo.buyLink}>
              <button>Buy from Google</button>
            </a>
          </div>
        ) : (
          <p>Not for sale</p>
        )}
      </div>
    );
  }
}

export default BookDetails;
