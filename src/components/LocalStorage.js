import React, { Component } from "react";
import ButtonStyles from '../constants/buttons.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default class LocalStorage extends Component {
  state = {
    existingEntries: JSON.parse(localStorage.getItem("allEntries")) || [],
    input: "",
    saved: false,
  };

  handleSaveSearch = () => {
    let allEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (!allEntries.includes(this.props.input)) {
      this.setState(
        { existingEntries: [...this.state.existingEntries, this.props.input], saved:true },
        () => {
          localStorage.setItem(
            "allEntries",
            JSON.stringify(this.state.existingEntries)
            
          );
          setTimeout(() => {
               this.setState({saved:false}) 
        }, 1000);
        }
      );
    }
  };

  setisActive(){
      this.setState({
          isActive:!this.state.isActive
      })
  }

  render() {
    return (
      <div>
          <button onClick={this.handleSaveSearch} className={ButtonStyles.buttonPrimary}>Save Search</button>
          {this.state.saved ? (
          <p>Search Saved!</p>
        ) : null}

        

        <div className={`dropdown ${this.state.isActive ? "is-active" : ""}`}>
          <div class="dropdown-trigger">
            <li
              onClick={() => {
                this.setisActive();
              }}
              style={{ borderStyle: "none", cursor: "pointer" }}
              aria-haspopup="true"
              aria-controls="dropdown-menu2"
            >
              <a>Saved Searches</a>
              <span class="icon is-small">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  alt="angle down"
                  style={{ marginLeft: "10px", width: "8px" }}
                />
              </span>
            </li>
          </div>
          
          <div class="dropdown-menu" id="dropdown-menu2" role="menu">
            <div class="dropdown-content">
            {this.state.existingEntries.slice(0, 10).map((entry) => {
          return <p class="dropdown-item">{entry}</p>;
        })}
              
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
