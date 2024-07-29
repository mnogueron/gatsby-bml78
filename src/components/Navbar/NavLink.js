import React from 'react';
import {Link} from 'gatsby';
import NavLabel from './NavLabel';

const NavLink = ({to, label, ...rest}) => {
  return <NavLabel label={label} as={Link} to={to} {...rest} />;
};

export default NavLink;
