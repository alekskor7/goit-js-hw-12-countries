export default function fetchCountries(searchQuery) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;capital;population;flag;languages`,
  )
    .then(resp => {
      if (resp.ok) return resp.json();
      return { countries: [] };
    })
    .catch(err => {
      throw new Error(err.message);
    });
}