import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import MobileDropdownNavLink from './MobileDropdownNavLink';
import DesktopDropdownNavLink from './DesktopDropdownNavLink';

const DropdownNavLink = ({ label, options, onClick, isRecursive, isTransparent }) => {
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
      isTransparent={isTransparent}
    />
  );
};

export default DropdownNavLink;
