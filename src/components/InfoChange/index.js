import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import FormStyles from '../form.module.scss'
import ButtonStyles from '../../constants/buttons.module.scss'

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

    const isInvalid = displayName === "";

    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return (
      <form onSubmit={this.onSubmit} className={FormStyles.container}>
      <p>Change name?</p>
        <input
          name="displayName"
          value={displayName}
          onChange={this.onChange}
          type="username"
          placeholder="New Name"
        />

        <button
          disabled={isInvalid}
          type="submit"
          className={ButtonStyles.buttonPrimary}
        >
          Change Name
        </button>
      </form>
    );
  }
}
 
export default withFirebase(InfoChangeForm);