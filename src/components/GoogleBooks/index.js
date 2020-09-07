import React from "react";
import BookStyles from "./books.module.scss";
import Input from "../input";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import LoadingGif from "../LoadingGif";
import LocalStorage from "../LocalStorage";
class SearchBooks extends React.Component {
  state = {
    filteredBooks: [],
    loading: true,
    input: JSON.parse(localStorage.getItem("input")) || "",
    existingEntries: JSON.parse(localStorage.getItem("allEntries")) || [],
    saved: false,
    savedEntry: "",
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
    this.setSearchTerm(input);
  };

  //LOCAL STORAGE OF SEARCH TERM

  setSearchTerm = (input) => {
    this.setState({ input: input }, () => {
      localStorage.setItem("input", JSON.stringify(this.state.input));
    });
  };

  handleSaveSearch = () => {
    let allEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (!allEntries.includes(this.state.input)) {
      this.setState(
        {
          existingEntries: [...this.state.existingEntries, this.state.input],
          saved: true,
          savedEntry:"Search Books..."
        },
        () => {
          localStorage.setItem(
            "allEntries",
            JSON.stringify(this.state.existingEntries)
          );
          setTimeout(() => {
            this.setState({ saved: false });
          }, 1000);
        }
      );
    }
  };

  handleSavedSearchLink = (entry) => {
    this.setState({ savedEntry: entry });
    this.getBooks(entry);
  };

  render() {
    if (this.state.loading) {
      return <LoadingGif />;
    }
    return (
      <div>
        <Input
          onChange={this.handleFilter}
          placeholder={this.state.savedEntry || "Search Books..."}
        ></Input>
        <LocalStorage
          input={this.state.input}
          isActive={this.state.isActive}
          existingEntries={this.state.existingEntries}
          saved={this.state.saved}
          setisActive={this.setisActive}
          handleSaveSearch={this.handleSaveSearch}
          handleSavedSearchLink={this.handleSavedSearchLink}
        />

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
