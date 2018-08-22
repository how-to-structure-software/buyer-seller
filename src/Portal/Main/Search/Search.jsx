import React from 'react';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import { PUBLIC_PROFILE } from '../../../Provider/Routes';

const countryOptions = [
  { value: '', key: 'Select...' },
  { value: 'United Kingdom', key: 'United Kingdom' },
  { value: 'Germany', key: 'Germany' },
  { value: 'Croatia', key: 'Croatia' },
  { value: 'Italy', key: 'Italy' },
  { value: 'France', key: 'France' },
  { value: 'Poland', key: 'Poland' },
  { value: 'Sweden', key: 'Sweden' },
  { value: 'Spain', key: 'Spain' },
  { value: 'Romania', key: 'Romania' },
  { value: 'Greece', key: 'Greece' },
  { value: 'Bulgaria', key: 'Bulgaria' },
  { value: 'Austria', key: 'Austria' },
  { value: 'Netherlands', key: 'Netherlands' },
  { value: 'Czech Republic', key: 'Czech Republic' },
  { value: 'Belgium', key: 'Belgium' },
  { value: 'Republic of Ireland', key: 'Republic of Ireland' },
  { value: 'Denmark', key: 'Denmark' },
];

const serviceOptions = [
  { value: '', key: 'Select...' },
  { value: 'Sneakers', key: 'Sneakers' },
  { value: 'High Heels', key: 'High Heels' },
  { value: 'Man Dress Shoes', key: 'Man Dress Shoes' },
];

const priceOptions = [
  { value: '', key: 'Select...' },
  { value: '50', key: '50 €' },
  { value: '100', key: '100 €' },
  { value: '200', key: '200 €' },
];

/* eslint-disable react/no-array-index-key */
const Search = ({
  sellers, country, service, price,
  onCountryChange, onServiceChange, onPriceChange,
  handleSearch,
}) => (
  <div className="container">
    <div className="row mt-5">
      <div className="col-md-3">
        <Label htmlFor="state">Country</Label>
        <select
          value={country}
          onChange={onCountryChange}
          className="custom-select"
        >
          {countryOptions.map(({ key, value }) => (
            <option key={key} value={value}>{key}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <Label htmlFor="type">Service</Label>
        <select
          value={service}
          onChange={onServiceChange}
          className="custom-select"
        >
          {serviceOptions.map(({ key, value }) => (
            <option key={key} value={value}>{key}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <Label htmlFor="price">Shoe Size</Label>
        <select
          value={price}
          onChange={onPriceChange}
          className="custom-select"
        >
          {priceOptions.map(({ key, value }) => (
            <option key={key} value={value}>{key}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3 mt-4">
        <Button onClick={handleSearch}>search</Button>
      </div>
    </div>

    <div className="mt-5">
      { sellers && sellers.map(seller => (
        <div className="card m-2" key={seller.profileID}>
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <ReactPlayer
                  height="130px"
                  width="200px"
                  url={seller.videoURL}
                />
              </div>
              <div className="col-9">
                <div className="row">
                  <h3>{seller.name}</h3>
                </div>
                <div className="row">
                  {seller.description.substring(0, 300).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
                </div>
                <div className="row mt-3">
                  <Link className="btn btn-secondary" to={PUBLIC_PROFILE.replace(':profileID', seller.profileID)}>visit profile</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
);

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
Search.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    profileID: PropTypes.string.isRequired,
    videoURL: PropTypes.string.isRequired,
  })),

  country: PropTypes.string.isRequired,
  onCountryChange: PropTypes.func.isRequired,

  service: PropTypes.string.isRequired,
  onServiceChange: PropTypes.func.isRequired,

  price: PropTypes.string.isRequired,
  onPriceChange: PropTypes.func.isRequired,

  handleSearch: PropTypes.func.isRequired,
};

Search.defaultProps = {
  sellers: [],
};

export default Search;
