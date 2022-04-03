export const ADDITIONAL_USER = 'ADDITIONAL_USER';
export const additionalUser = (user) => ({
  type: ADDITIONAL_USER,
  user,
});

export const ADDITIONAL_CURRENCIES = 'ADDITIONAL_CURRENCIES';
export const allCurrencies = (currencies) => ({
  type: ADDITIONAL_CURRENCIES,
  currencies,
});

export const fetchCurrenciesAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const result = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(allCurrencies(result));
};
