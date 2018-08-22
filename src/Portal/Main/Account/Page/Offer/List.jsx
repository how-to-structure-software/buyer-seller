import React from 'react';
import PropTypes from 'prop-types';

import Preview from './Preview';

const List = ({
  offers,
}) => (
  <div>

    <div className="row">
      { offers && offers.map(offer => (
        <div className="card col-md-12" key={offer.ID}>
          <div className="card-body">
            <div className="row">
              <Preview
                title={offer.title}
                description={offer.description}
                offerID={offer.ID}
              />
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
);

/* eslint-disable react/forbid-prop-types */
List.propTypes = {
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      ID: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default List;
