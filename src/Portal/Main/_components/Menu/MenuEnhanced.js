import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withProps } from 'recompose';

import Menu from './Menu';

const enhance = compose(
  withRouter,
  withProps(
    ({ location }) => ({ pathname: location.pathname }),
  ),
);

const MenuEnhanced = enhance(Menu);

MenuEnhanced.propTypes = {

};

export default MenuEnhanced;
