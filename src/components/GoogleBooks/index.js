import React from "react";
import BookStyles from './books.module.scss'
import Input from '../input'
class SearchBooks extends React.Component {
  state = {
    filteredBooks: [],
    isLoading: true,
    notFound: false,
  };



  handleFilter = (e) => {
    e.preventDefault();

    //Handle no input
    let input = e.target.value || "technology";

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&langRestrict=en&maxResults=40`
    )
      .then((filteredBooks) => filteredBooks.json())
      .catch((err) => {
        console.log(err)
      })
      .then((filteredBooks) => {
        this.setState({ filteredBooks: filteredBooks.items });
      });
  };

  render() {
    
    return (
      <div>
        <Input 
        onChange={this.handleFilter}
        placeholder="Search Books...">
        </Input>

        {this.state.filteredBooks ? (
          this.state.filteredBooks.map((book, index) => {
            return (
              <img
                alt={book.volumeInfo.title}
                className={BookStyles.books}
                key={index}
                src={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.smallThumbnail
                }
              ></img>
            );
          })
        ) : (
          <p>No Books Found</p>
        )}
      </div>
    );
  }
}

export default SearchBooks;
