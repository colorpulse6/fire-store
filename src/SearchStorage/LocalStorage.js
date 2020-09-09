import React, { useState } from "react";
import ButtonStyles from "../constants/buttons.module.scss";
import StorageStyles from './searchStorage.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import onClickOutside from "react-onclickoutside";

function LocalStorage(props) {
  const [isActive, setisActive] = useState(false);
  LocalStorage.handleClickOutside = () => setisActive(false);

  return (
    <div className={StorageStyles.container}>
      
      {!props.saved ? <button
        onClick={props.handleSaveSearch}
        className={ButtonStyles.buttonPrimary}
      >
        Save Search
      </button> : <p>Search Saved!</p>}

      <div className={`dropdown ${isActive ? "is-active" : ""}`}>
        <div class="dropdown-trigger">
          <li
            onClick={() => {
              setisActive(!isActive);
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
{props.existingEntries.length > 0 ?
<div class="dropdown-menu" id="dropdown-menu2" role="menu">
          <div class="dropdown-content" >
            {props.existingEntries
              .slice(
                props.existingEntries.length - 10,
                props.existingEntries.length
              )
              .map((entry, index) => {
                return (
                  <div key={index} className={StorageStyles.content}>
                    <button
                      onClick={() => {
                        props.handleSavedSearchLink(entry);
                        setisActive(!isActive);
                      }}
                      class="dropdown-item"
                    >
                      {entry}
                      <button onClick={() => {props.deleteSearchTerm(index)}}>x</button>
                    </button>
                    
                  </div>
                );
              })}
          </div>
        </div> : null
}
        
      </div>
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => LocalStorage.handleClickOutside,
};

export default onClickOutside(LocalStorage, clickOutsideConfig);
