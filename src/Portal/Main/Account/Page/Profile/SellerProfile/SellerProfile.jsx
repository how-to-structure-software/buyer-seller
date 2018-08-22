import React from 'react';
import {
  Form, FormGroup, Input, Alert, Button,
} from 'reactstrap';
import PropType from 'prop-types';

const serviceOptions = [
  { value: '', key: 'Choose...' },
  { value: 'Sneakers', key: 'Sneakers' },
  { value: 'High Heels', key: 'High Heels' },
  { value: 'Man Dress Shoes', key: 'Man Dress Shoes' },
];

const priceOptions = [
  { value: '', key: 'Choose...' },
  { value: '50', key: '50 €' },
  { value: '100', key: '100 €' },
  { value: '200', key: '200 €' },
];

/* eslint-disable jsx-a11y/label-has-for */
const SellerProfile = ({
  error, success, isInvalid, handleSubmit,
  name, onNameChange,
  description, onDescriptionChange,
  videoURL, onVideoURLChange,
  logoURL, onLogoURLChange,
  service, onServiceChange,
  price, onPriceChange,
}) => (
  <Form className="pl-2 pr-2" onSubmit={handleSubmit}>
    <FormGroup>

      <div className="row">
        <div className="col-md-12">
          <label htmlFor="sellerName">Name</label>
          <Input
            value={name}
            onChange={onNameChange}
            className=""
            type="text"
            name="sellerName"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <label htmlFor="sellerDescription">Description</label>
          <textarea
            value={description}
            onChange={onDescriptionChange}
            className="form-control"
            type="text"
            name="sellerDescription"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <label htmlFor="sellerVideoURL">Video URL</label>
          <Input
            value={videoURL}
            onChange={onVideoURLChange}
            className=""
            type="text"
            name="sellerVideoURL"
            placeholder="https://"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <label htmlFor="sellerLogo">Logo URL</label>
          <Input
            value={logoURL}
            onChange={onLogoURLChange}
            className=""
            type="text"
            name="sellerLogo"
            placeholder="https://"
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <label htmlFor="sellerService">Service</label>
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
      </div>

      <div className="row">
        <div className="col-md-12">
          <label htmlFor="sellerPrice">Price</label>
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
SellerProfile.propTypes = {
  error: PropType.string.isRequired,
  success: PropType.string.isRequired,
  isInvalid: PropType.bool.isRequired,
  handleSubmit: PropType.func.isRequired,

  name: PropType.string.isRequired,
  onNameChange: PropType.func.isRequired,

  description: PropType.string.isRequired,
  onDescriptionChange: PropType.func.isRequired,

  videoURL: PropType.string.isRequired,
  onVideoURLChange: PropType.func.isRequired,

  logoURL: PropType.string.isRequired,
  onLogoURLChange: PropType.func.isRequired,

  service: PropType.string.isRequired,
  onServiceChange: PropType.func.isRequired,

  price: PropType.string.isRequired,
  onPriceChange: PropType.func.isRequired,
};


export default SellerProfile;
