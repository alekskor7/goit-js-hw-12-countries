import '../sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import countryCardTemplate from '../templates/countryCard.hbs';
import countryListTemplate from '../templates/countryList.hbs';

import { error } from '@pnotify/core';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const refs = {
  countriesContainer: document.querySelector('.country-wraper'),
  searchInput: document.querySelector('#search-box'),
};

refs.searchInput.addEventListener('input', debounce(searchCountries, 500));

function searchCountries(event) {
  const searchQuery = event.target.value.trim();
  if (!searchQuery) {
    clearCountryContainer();
    return; 
  }

  fetchCountries(searchQuery).then(checkCountCountries).catch(onFetchError);
}

function onFetchError() {
  showErrorNotification('Something went wrong. Please try other combination.');
}

function checkCountCountries(countries) {
  if (countries.length > 1 && countries.length <= 10) {
    renderCountriesList(countries);
    return;
  }

  if (countries.length > 10) {
    showErrorNotification();
    return; 
  }
  if (countries.length === 1) {
    renderCountryCard(countries[0]);
    return;
  }
  showErrorNotification('Oops, there is no country with this name');
}

function renderCountriesList(countries) {
    refs.countriesContainer.innerHTML = countryListTemplate(countries);
}

function renderCountryCard(country) {
    refs.countriesContainer.innerHTML = countryCardTemplate(country);
}

function clearCountryContainer() {
    refs.countriesContainer.innerHTML = '';
}

function showErrorNotification(
  message = 'Too many matches found. Please enter a more specific query!',
) {
  clearCountryContainer();
  error({
    text: message,
    delay: 2000,
    sticker: false,
    closer: false,
  });
}



