import React from "react";
import { withAuthorization } from "../Session";

class YourShelfPage extends React.Component {

userId = this.props.firebase.auth.currentUser.uid;

state = {
    bookShelf:[]
}

componentDidMount(){
    this.handleGetBooks()
}

  handleGetBooks() {
    this.props.firebase
      .user(`${this.userId}/booksRead`)
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.setState({bookShelf:[...this.state.bookShelf, childSnapshot.val()]}, () => console.log(this.state.bookShelf))
        });
      });
  }

  render() {
    return <div>
    {this.state.bookShelf.map((book)=> {
        return <div>
        <img alt={book.title} src={book.imageUrl}></img>
        <p>{book.title}</p>

        </div>
    })}
        
    </div>;
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(YourShelfPage);