import React from 'react';
import {
  Form, FormGroup, Input, Alert, Button,
} from 'reactstrap';
import PropType from 'prop-types';

const countryOptions = [
  { value: '', key: 'Choose...' },
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

/* eslint-disable jsx-a11y/label-has-for */
const sellerUserData = ({
  error, success, isInvalid, handleSubmit,
  firstName, onFirstNameChange,
  lastName, onLastNameChange,
  phoneNumber, onPhoneNumberChange,
  street, onStreetChange,
  zipCode, onZipCodeChange,
  city, onCityChange,
  country, onCountryChange,
  email, onEmailChange,
}) => (
  <Form className="pl-2 pr-2" onSubmit={handleSubmit}>
    <FormGroup>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName">First Name</label>
          <Input
            value={firstName}
            onChange={onFirstNameChange}
            className=""
            type="text"
            name="firstName"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="lastName">Last Name</label>
          <Input
            value={lastName}
            onChange={onLastNameChange}
            className=""
            type="text"
            name="lastName"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            className=""
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="email">Email</label>
          <Input
            value={email}
            onChange={onEmailChange}
            className=""
            type="text"
            name="email"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="street">Street</label>
          <Input
            value={street}
            onChange={onStreetChange}
            className=""
            type="text"
            name="street"
            id="street"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="zipCode">Zip code</label>
          <Input
            value={zipCode}
            onChange={onZipCodeChange}
            className=""
            type="text"
            name="zipCode"
            id="zipCode"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="city">City</label>
          <Input
            value={city}
            onChange={onCityChange}
            className=""
            type="text"
            name="city"
            id="city"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="country">Country</label>
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
      </div>

    </FormGroup>

    <div className="d-block clearfix">
      <Button disabled={isInvalid} className="float-right">save</Button>
    </div>
    { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }
    { success && <Alert className="d-block mt-2" color="success">{success}</Alert> }

  </Form>
);

/* eslint-disable react/forbid-prop-types */
sellerUserData.propTypes = {
  error: PropType.string.isRequired,
  success: PropType.string.isRequired,
  isInvalid: PropType.bool.isRequired,
  handleSubmit: PropType.func.isRequired,

  firstName: PropType.string.isRequired,
  onFirstNameChange: PropType.func.isRequired,

  lastName: PropType.string.isRequired,
  onLastNameChange: PropType.func.isRequired,

  phoneNumber: PropType.string.isRequired,
  onPhoneNumberChange: PropType.func.isRequired,

  street: PropType.string.isRequired,
  onStreetChange: PropType.func.isRequired,

  zipCode: PropType.string.isRequired,
  onZipCodeChange: PropType.func.isRequired,

  city: PropType.string.isRequired,
  onCityChange: PropType.func.isRequired,

  country: PropType.string.isRequired,
  onCountryChange: PropType.func.isRequired,

  email: PropType.string.isRequired,
  onEmailChange: PropType.func.isRequired,
};

export default sellerUserData;
