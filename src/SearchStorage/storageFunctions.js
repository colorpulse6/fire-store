import React, { Component } from "react";
import LocalStorage from "./LocalStorage";

export default class storageFunctions extends Component {
  state = {
    input: JSON.parse(localStorage.getItem("input")) || "",
    existingEntries: JSON.parse(localStorage.getItem("allEntries")) || [],
    saved: false,
    savedEntry: "",
  };

  componentDidMount(){
      this.setSearchTerm(this.props.input)
      console.log(this.state.existingEntries.length)
  }

  setSearchTerm = (input) => {
    this.setState({ input: input }, () => {
      localStorage.setItem("input", JSON.stringify(this.state.input));
    });
  };

  handleSaveSearch = () => {
    let allEntries = JSON.parse(localStorage.getItem("allEntries"));

    if (allEntries === null || !allEntries.includes(this.props.input)) {
      this.setState(
        {
          existingEntries: [...this.state.existingEntries, this.props.input],
          saved: true,
          savedEntry: "Search Books...",
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
    this.props.getBooks(entry);
  };

  handleDeleteSeachTerm = (index) => {
    var getTerm = JSON.parse(localStorage.getItem('allEntries'));
    getTerm.forEach((term)=> {
        if(term = getTerm[index]){
            getTerm.splice(index, 1)
            localStorage.setItem('allEntries', JSON.stringify(getTerm));
            

        }
    })
    this.setState({existingEntries:getTerm})
}


  render() {
    return (
      <>
        <LocalStorage
          input={this.props.input}
          existingEntries={this.state.existingEntries}
          saved={this.state.saved}
          handleSaveSearch={this.handleSaveSearch}
          handleSavedSearchLink={this.handleSavedSearchLink}
          deleteSearchTerm={this.handleDeleteSeachTerm}
        />
      </>
    );
  }
}
