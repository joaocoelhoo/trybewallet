import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAPI } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { fetchAPIDispatch } = this.props;
    await fetchAPIDispatch();
  }

  render() {
    const { user, currencies } = this.props;
    return (
      <div>
        <div>TrybeWallet</div>
        <div>
          <header data-testid="email-field">{ user }</header>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">{ currencies }</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  user: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchAPIDispatch: () => dispatch(fetchCurrenciesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
