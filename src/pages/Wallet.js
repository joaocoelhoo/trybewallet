import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAPI, additionalExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      total: 0,
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

  totalChange = () => {
    const { expenses } = this.props;
    let expensesResult = 0;
    expenses.forEach((expense) => {
      const { exchangeRates, currency } = expense;
      expensesResult += expense.value * exchangeRates[currency].ask;
    });
    this.setState({ total: expensesResult.toFixed(2), value: 0 });
  };

  addExpenses = async (event) => {
    event.preventDefault();
    const { additionalExpensesDispatch, fetchAPIDispatch, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const exchangeRates = await fetchAPIDispatch();
    const id = expenses.length;
    const expense = {
      id, value, currency, method, tag, description, exchangeRates,
    };
    additionalExpensesDispatch(expense);
    this.totalChange();
  }

  tableColumns = () => {
    const columnNames = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    const columnHeaders = columnNames
      .map((name, index) => (
        <th key={ index } role="columnheader" scope="col">{name}</th>
      ));

    return columnHeaders;
  }

  render() {
    const { user } = this.props;
    const { total, value } = this.state;

    return (
      <div>
        <div>TrybeWallet</div>
        <div>
          <header data-testid="email-field">{ user }</header>
          <span data-testid="total-field">{ total }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>

        <form>
          <input
            data-testid="value-input"
            type="number"
            value={ value }
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
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ (event) => this.onInputChange(event, 'tag') }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <input
            data-testid="description-input"
            type="text"
            onChange={ (event) => this.onInputChange(event, 'description') }
          />
          <button type="submit" onClick={ this.addExpenses }>Adicionar despesa</button>
        </form>
        <table>
          <thead>
            <tr role="row">
              { this.tableColumns() }
            </tr>
          </thead>
          <tbody />
        </table>
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
