import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
 
const INITIAL_STATE = {
  displayName: '',
  error: null,
};
 
class InfoChangeForm extends Component {
 
    
 
  state = { ...INITIAL_STATE };
  
 
  onSubmit = event => {
    const { displayName } = this.state;
 
    this.props.firebase
      .doUpdateProfile({displayName: displayName})
      .then(() => {
        console.log('success')
      }, this.props.history.push('/account'))
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ displayName: event.target.value }, () => console.log(this.state.displayName));
  };
 
  render() {
    const { displayName } = this.state;
 
    const isInvalid =
     displayName === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="displayName"
          value={displayName}
          onChange={this.onChange}
          type="username"
          placeholder="New Name"
        />
        
        
        <button disabled={isInvalid} type="submit">
          Change Name
        </button>
 
      </form>
    );
  }
}
 
export default withFirebase(InfoChangeForm);