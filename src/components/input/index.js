import React from "react";
import InputStyles from "./input.module.scss";

export default function Input(props) {
  return (
    <div className={InputStyles.input}>
      <input
        id="input-a"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        
      ></input>
      <label for="input-a">{props.placeholder}</label>
    </div>
  );
}
