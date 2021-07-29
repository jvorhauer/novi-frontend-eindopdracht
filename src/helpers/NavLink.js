import React from 'react';
import {Link} from 'react-router-dom';

class NavLink extends React.Component {
  render() {
    const isActive = this.context.router.isActive(this.props.to, true);
    const className = isActive ? 'active' : '';

    return(
      <Link className={className} {...this.props}>
        {this.props.children}
      </Link>
    );
  }
}

NavLink.contextTypes = {
  router: React.PropTypes.object
};

export default NavLink;
