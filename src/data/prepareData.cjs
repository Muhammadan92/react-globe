const fs = require('node:fs');

const countries = require('./countries.json');
const cities = require('./cities.json');

const filteredCountries = ['United States of America', 'India', 'Pakistan', 'Canada', 'Nigeria'];
const filteredCities = ['Los Angeles', 'Vancouver', 'Chicago', 'San Francisco'];

const smcCountries = countries.features.filter((country) =>
  filteredCountries.includes(country.properties.ADMIN),
);
const smcCities = cities.features.filter((city) => filteredCities.includes(city.properties.name));

fs.writeFileSync('smcCountries.json', JSON.stringify(smcCountries), 'utf8');
fs.writeFileSync('smcCities.json', JSON.stringify(smcCities), 'utf8');