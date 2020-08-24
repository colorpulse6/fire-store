import React from "react";

import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";

class HomePage extends React.Component {
  state = {
    books: [],
    filteredBooks: [],
    isLoading: true,
  };
  componentDidMount() {
    // console.log(this.props.firebase.auth.currentUser);
    this.fetchApiData();
  }

  fetchApiData = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=search-terms`
    )
      .then((allBooks) => allBooks.json())
      .then((allBooks) => {
        this.setState(
          {
            books: allBooks.items,
            isLoading: false,
            filteredBooks: allBooks.items,
          },
          () => console.log(this.state.filteredBooks)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFilter = (e) => {
    e.preventDefault();
    let input = e.target.value || 'search-terms';
    

      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${input}&langRestrict=en`
      )
        .then((filteredBooks) => filteredBooks.json())
        .then((filteredBooks) => {
         
            this.setState({ filteredBooks: filteredBooks.items }, () =>
            console.log(this.state.filteredBooks)
          );
          
          
        });
    
    
  };

  render() {
    if (this.state.isLoading) {
      return <span>Loading...</span>;
    }
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <h1>Hello {authUser.displayName} </h1>
            <input
              type="text"
              onChange={this.handleFilter}
              placeholder="Search All Books..."
            ></input>
          {this.state.filteredBooks ? 
          this.state.filteredBooks.map((book, index) => {
              return (
                <img
                  key={index}
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                ></img>
              )
            }) : <p>No Books Found</p>
            }
            

            
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
