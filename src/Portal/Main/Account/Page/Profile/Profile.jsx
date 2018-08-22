import React from 'react';
import PropTypes from 'prop-types';

import Seller from './Seller';
import Buyer from './Buyer';

const Profile = ({ role }) => (
  <div>
    {role && (role === 'seller' ?
      <Seller /> :
      <Buyer />
    )}
  </div>
);

Profile.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Profile;
