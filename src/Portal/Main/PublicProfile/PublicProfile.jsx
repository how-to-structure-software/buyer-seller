import React from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Button, Alert } from 'reactstrap';
import isURL from 'is-url';

const PublicProfile = ({
  newRequestPath, addToWatchlist,
  success, error,
  name, logoURL, videoURL, city, email, street, zipCode, phoneNumber, service, price, description,
}) => (
  <div className="container">

    <div className="row mt-2">
      <h1 className="">{name}</h1>
    </div>

    {isURL(logoURL) && (
    <div className="row">
      <div className="col-md-12">
        <img src={logoURL} alt="" height="200px" />
      </div>
    </div>
    )}

    {isURL(videoURL) && (
    <div className="row">
      <div className="col-md-12">
        <ReactPlayer url={videoURL} />
      </div>
    </div>
    )}

    <div className="row mt-3">
      <div>description: {description}</div>
    </div>

    <div className="row mt-3">
      <div>service: {service}</div>
    </div>

    <div className="row mt-3">
      <div>price: {price}</div>
    </div>

    <div className="row mt-3">
        Address:<br />
      {street}<br />
      {zipCode} {city}
    </div>
    <div className="row mt-3 mb-5">
        Contact:<br />
      {phoneNumber}<br />
      {email}
    </div>

    <div className="row">
      <Link className="btn btn-primary m-1" to={newRequestPath}>make request</Link>
      <Button className="m-1" onClick={addToWatchlist}>add to watchlist</Button>
    </div>
    { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }
    { success && <Alert className="d-block mt-2" color="success">{success}</Alert> }

  </div>
);

PublicProfile.propTypes = {
  newRequestPath: PropTypes.string.isRequired,

  success: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,

  name: PropTypes.string.isRequired,
  logoURL: PropTypes.string.isRequired,
  videoURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,

  addToWatchlist: PropTypes.func.isRequired,
};

export default PublicProfile;
