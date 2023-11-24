import React, {useCallback, useState} from 'react';
import {Link} from 'gatsby';
import NavLabel from './NavLabel';

const NavLink = ({to, label, partial, ...rest}) => {
  const [isActive, setIsActive] = useState(false);

  const getProps = useCallback(
    ({isCurrent, isPartiallyCurrent}) => {
      const active = partial ? isPartiallyCurrent : isCurrent;
      setIsActive(active);
    },
    [partial]
  );

  return (
    <NavLabel
      label={label}
      isActive={isActive}
      as={Link}
      to={to}
      getProps={getProps}
      {...rest}
    />
  );
};

export default NavLink;
