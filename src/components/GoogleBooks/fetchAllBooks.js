import React from "react";

class FetchAllBooks extends React.Component {
    state = {
      books: [],
    };

componentDidMount() {
    this.fetchApiData();
  }

  fetchApiData = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=technology&maxResults=20&orderBy=newest`
    )
      .then((allBooks) => allBooks.json())
      .then((allBooks) => {
        this.setState(
          {
            books: allBooks.items,
            isLoading: false,
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    
    return (
      <div>
        
      </div>
    );
  }
}

export default FetchAllBooks;