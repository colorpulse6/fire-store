import React from "react";
import BookStyles from "./books.module.scss";
import Input from "../input";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import LoadingGif from "../LoadingGif";
import SearchStorage from "../../SearchStorage/storageFunctions";
class SearchBooks extends React.Component {
  state = {
    filteredBooks: [],
    loading: true,
    input: "",
    
  };

  componentDidMount() {
    this.getBooks(this.state.input);
  }


  handleFilter = (e) => {
    e.preventDefault();

    //Handle no input
    var input = e.target.value || this.state.input;

    this.getBooks(input);
  };

  getBooks = (input) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&langRestrict=en&maxResults=35`
    )
      .then((filteredBooks) => filteredBooks.json())
      .catch((err) => {
        console.log(err);
      })
      .then((filteredBooks) => {
        console.log(filteredBooks);

        this.setState({
          filteredBooks: filteredBooks.items,
          input: input,
          loading: false,
        });
      });
  };

  render() {
    if (this.state.loading) {
      return <LoadingGif />;
    }
    return (
      <div>
        <Input
          onChange={this.handleFilter}
          placeholder={"Search Books..."}
        ></Input>
        <SearchStorage input={this.state.input} getBooks={this.getBooks}/>

        <div className={BookStyles.container}>
          {this.state.filteredBooks
            ? this.state.filteredBooks.map((book, index) => {
                return (
                  <Link to={`${ROUTES.BOOK_DETAILS}/${book.id}`}>
                    <img
                      alt={book.volumeInfo.title}
                      className={BookStyles.books}
                      key={index}
                      src={
                        book.volumeInfo.imageLinks &&
                        book.volumeInfo.imageLinks.smallThumbnail
                      }
                    ></img>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
