import React from "react";
import BookStyles from './books.module.scss'
import Input from '../input'
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class SearchBooks extends React.Component {
  state = {
    filteredBooks: [],
    isLoading: true,
    input: "",
  };

  handleFilter = (e) => {
    e.preventDefault();
    
    //Handle no input
    let input = e.target.value;
    
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&langRestrict=en&maxResults=40`
    )
      .then((filteredBooks) => filteredBooks.json())
      .catch((err) => {
        console.log(err)
      })
      .then((filteredBooks) => {
        this.setState({ filteredBooks: filteredBooks.items, input:input });
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
        ) : (
          <p>No Books Found</p>
        ) }
        
      </div>
    );
  }
}

export default SearchBooks;
