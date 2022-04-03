import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAPI } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { fetchAPIDispatch } = this.props;
    await fetchAPIDispatch();
  }

  currenciesOptions = () => {
    const { currencies } = this.props;
    const options = currencies && currencies
      .map((currency, index) => (
        <option key={ index } value={ currency }>
          { currency }
        </option>));
    return options;
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
        <form>
          <input data-testid="value-input" type="number" />
          <label htmlFor="currency">
            Moeda
            <select data-testid="currency-input" id="currency">
              { this.currenciesOptions() }
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento
            <select data-testid="method-input" id="method">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select data-testid="tag-input" id="tag">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <input data-testid="description-input" type="text" />

        </form>
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
