import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

import { SHOW_CONTRACT } from '../../../../../Provider/Routes/index';

/* eslint-disable react/no-array-index-key */
const List = ({ error, contracts }) => (
  <div>
    { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }

    <div className="row">
      { contracts && contracts.map(contract => (
        <div className="card col-md-12" key={contract.ID}>
          <div className="card-body">
            <div className="row">
              <div className="container">
                <div className="row">
                Titel: {contract.title}
                </div>
                <div className="row">
                Description: {contract.description.substring(0, 200).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
                </div>
                <div className="row">
                  <Link className="btn btn-secondary m-1" to={SHOW_CONTRACT.replace(':contractID', contract.ID)}>Show Contract</Link>
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
List.propTypes = {
  error: PropTypes.string.isRequired,
  contracts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      ID: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default List;
