import React from 'react';
import {
  Form, FormGroup, Label, Input, Button, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */
const New = ({
  error,
  description, price,
  onDescriptionChange, onPriceChange,
  handleNewOffer, isInvalid,
}) => (
  <div>

    <div className="row">
      <div className="col-md-12">
        <h4>new offer</h4>
      </div>
    </div>

    <Form className="pl-2 pr-2" onSubmit={handleNewOffer}>
      <FormGroup>

        <div className="row">
          <div className="col-md-6">
            <Label htmlFor="description">description</Label>
            <textarea
              value={description}
              onChange={onDescriptionChange}
              className="form-control"
              type="text"
              name="description"
              id="description"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormGroup tag="fieldset">
              <Label htmlFor="price">price</Label>
              <Input
                value={price}
                onChange={onPriceChange}
                className=""
                type="text"
                name="price"
                id="price"
                required
              />
            </FormGroup>
          </div>
        </div>

        <div className="d-block clearfix">
          <Button disabled={isInvalid} className="float-right">make an offer</Button>
        </div>
        { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }
      </FormGroup>
    </Form>
  </div>
);

New.propTypes = {
  error: PropTypes.string.isRequired,

  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,

  onDescriptionChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,

  isInvalid: PropTypes.bool.isRequired,
  handleNewOffer: PropTypes.func.isRequired,
};

export default New;
