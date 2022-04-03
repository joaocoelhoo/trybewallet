import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAPI, additionalExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      description: '',
    };
  }

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

  onInputChange = ({ target }, key) => {
    this.setState({ [key]: target.value });
  };

  addExpenses = async () => {
    const { additionalExpensesDispatch, fetchAPIDispatch, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const exchangeRates = await fetchAPIDispatch();
    const id = expenses.length;
    const expense = {
      id, value, currency, method, tag, description, exchangeRates,
    };

    additionalExpensesDispatch(expense);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <div>TrybeWallet</div>
        <div>
          <header data-testid="email-field">{ user }</header>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>

        <form>
          <input
            data-testid="value-input"
            type="number"
            onChange={ (event) => this.onInputChange(event, 'value') }
          />
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              onChange={ (event) => this.onInputChange(event, 'currency') }
            >
              { this.currenciesOptions() }
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento
            <select
              data-testid="method-input"
              id="method"
              onChange={ (event) => this.onInputChange(event, 'method') }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ (event) => this.onInputChange(event, 'tag') }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <input
            data-testid="description-input"
            type="text"
            onChange={ (event) => this.onInputChange(event, 'description') }
          />
          <button type="submit" onClick={ this.addExpenses }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  user: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchAPIDispatch: () => dispatch(fetchCurrenciesAPI()),
  additionalExpensesDispatch: (expenses) => dispatch(additionalExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
