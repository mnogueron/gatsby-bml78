import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import MobileDropdownNavLink from './MobileDropdownNavLink';
import DesktopDropdownNavLink from './DesktopDropdownNavLink';

const DropdownNavLink = ({ label, options, onClick, isRecursive }) => {
  const collapsibleMenu = useBreakpointValue({ base: true, md: false });

  if (collapsibleMenu) {
    return (
      <MobileDropdownNavLink
        label={label}
        options={options}
        onClick={onClick}
        isRecursive={isRecursive}
      />
    );
  }

  return (
    <DesktopDropdownNavLink
      label={label}
      options={options}
      onClick={onClick}
      isRecursive={isRecursive}
    />
  );
};

export default DropdownNavLink;
