import React, { useRef } from 'react';
import { Link } from 'gatsby';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { MdExpandMore, MdChevronRight } from 'react-icons/md';
import NavLabel from '../NavLabel';

const DesktopDropdownNavLink = ({ label, options, onClick, isRecursive }) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const onCloseTimeout = useRef(0);

  const handleClose = () => {
    onCloseTimeout.current = setTimeout(onClose, 100);
    onClick();
  };

  const handleOpen = () => {
    clearTimeout(onCloseTimeout.current);
    onOpen();
  };

  return (
    <Menu isOpen={isOpen} {...(isRecursive ? { placement: 'end-start', offset: [-10, 6] } : {})}>
      <MenuButton
        onClick={onToggle}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        {...(isRecursive ? { width: 'full' } : {})}
      >
        {isRecursive ? (
          <MenuItem justifyContent="space-between">
            {label}
            <Icon as={MdChevronRight} boxSize={5} />
          </MenuItem>
        ) : (
          <NavLabel
            label={label}
            isHover={isOpen}
            icon={<Icon as={MdExpandMore} boxSize={26} />}
          />
        )}
      </MenuButton>
      <MenuList onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        {options.map(({ label, to, key, options }) => {
          if (options) {
            return (
              <DesktopDropdownNavLink
                label={label}
                onClick={onClick}
                options={options}
                isRecursive={true}
              />
            );
          }
          return (
            <MenuItem key={key} as={Link} to={to} onClick={handleClose}>
              {label}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default DesktopDropdownNavLink;
