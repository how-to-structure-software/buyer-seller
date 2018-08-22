import React from 'react';
import {
  Form, FormGroup, Label, Input, Button, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

const shoeSizeOptions = [
  { value: '', key: 'Choose...' },
  { value: '35', key: '35' },
  { value: '36', key: '36' },
  { value: '37', key: '37' },
  { value: '38', key: '38' },
  { value: '39', key: '39' },
  { value: '40', key: '40' },
  { value: '41', key: '41' },
  { value: '42', key: '42' },
  { value: '43', key: '43' },
  { value: '44', key: '44' },
  { value: '45', key: '45' },
  { value: '50', key: '50' },
];

const serviceOptions = [
  { value: '', key: 'Choose...' },
  { value: 'Sneekers', key: 'Sneekers' },
  { value: 'High Heels', key: 'High Heels' },
  { value: 'Man Dress Shoes', key: 'Man Dress Shoes' },
];

const mostImportantList = [
  'price',
  'quality',
  'speed',
];

/* eslint-disable react/no-array-index-key */
const NewRequest = ({
  error,
  service, shoeSize, title, description,
  onServiceChange, onShoeSizeChange, onTitleChange, onDescriptionChange,
  mostImportant, onMostImportantChange,
  handleNewRequest, isInvalid,
}) => (
  <div>

    <div className="row">
      <div className="col-md-12">
        <h4>userdaten</h4>
      </div>
    </div>

    <div className="row">
      <Form className="col-md-12 pl-2 pr-2" onSubmit={handleNewRequest}>
        <FormGroup>

          <div className="row">
            <div className="col">
              <Label htmlFor="videoType">Videoart</Label>
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
            <div className="col">
              <Label htmlFor="shoeSize">Dauer des Videos</Label>
              <select
                value={shoeSize}
                onChange={onShoeSizeChange}
                className="custom-select"
              >
                {shoeSizeOptions.map(({ key, value }) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FormGroup tag="fieldset">
                <legend>Mir ist am wichtigsten:</legend>
                {mostImportantList.map((value, index) => (
                  <div className="ml-5" key={index}>
                    <Label>
                      <Input
                        type="radio"
                        checked={mostImportant === value}
                        onChange={onMostImportantChange(value)}
                      />{' '}
                      {value}
                    </Label>
                  </div>
                ))}
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <FormGroup tag="fieldset">
                <Label htmlFor="title">Titel</Label>
                <Input
                  value={title}
                  onChange={onTitleChange}
                  className=""
                  type="text"
                  name="title"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <FormGroup tag="fieldset">
                <Label htmlFor="title">Description</Label>
                <textarea
                  value={description}
                  onChange={onDescriptionChange}
                  className="form-control"
                  type="text"
                  name="description"
                />
              </FormGroup>
            </div>
          </div>

          <div className="d-block clearfix">
            <Button disabled={isInvalid} className="float-right">make a request</Button>
          </div>
          { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }
        </FormGroup>
      </Form>
    </div>
  </div>
);

NewRequest.propTypes = {
  error: PropTypes.string.isRequired,

  service: PropTypes.string.isRequired,
  shoeSize: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  onServiceChange: PropTypes.func.isRequired,
  onShoeSizeChange: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,

  mostImportant: PropTypes.string.isRequired,
  onMostImportantChange: PropTypes.func.isRequired,

  isInvalid: PropTypes.bool.isRequired,
  handleNewRequest: PropTypes.func.isRequired,
};

export default NewRequest;
