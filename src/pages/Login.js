import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { additionalUser } from '../actions';

const PASSWORD_MIN = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onInputChange = ({ target }, name) => {
    this.setState({ [name]: target.value });
  };

  isEmailValid = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // https://regexr.com/3e48o
    if (emailRegex.test(email)) {
      return true;
    }
    return false;
  }

  isPasswordValid = (password) => {
    if (password.length >= PASSWORD_MIN) {
      return true;
    }
    return false;
  }

  submitButton = () => {
    const { history, additionalUserDispatch } = this.props;
    const { email } = this.state;

    additionalUserDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const isValid = this.isPasswordValid(password) && this.isEmailValid(email);

    return (
      <div>
        <input
          data-testid="email-input"
          placeholder="E-mail"
          id="email"
          type="email"
          value={ email }
          onChange={ (event) => this.onInputChange(event, 'email') }
          required
        />
        <input
          data-testid="password-input"
          placeholder="Senha"
          type="password"
          value={ password }
          onChange={ (event) => this.onInputChange(event, 'password') }
          required
        />
        <button
          type="submit"
          disabled={ !isValid }
          onClick={ this.submitButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  additionalUser: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  additionalUserDispatch: (email) => dispatch(additionalUser(email)) });

export default connect(null, mapDispatchToProps)(Login);
