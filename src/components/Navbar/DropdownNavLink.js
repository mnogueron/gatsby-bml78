import React, { useRef } from 'react';
import { Link } from 'gatsby';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useBreakpointValue,
  Collapse,
  Icon,
} from '@chakra-ui/react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import NavLabel from './NavLabel';
import NavLink from './NavLink';

const DropdownNavLink = ({ label, options, onClick }) => {
  const collapsibleMenu = useBreakpointValue({ base: true, md: false });
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

  if (collapsibleMenu) {
    return (
      <>
        <NavLabel
          label={label}
          onClick={onToggle}
          icon={
            isOpen ? (
              <Icon as={MdExpandLess} boxSize={26} />
            ) : (
              <Icon as={MdExpandMore} boxSize={26} />
            )
          }
        />
        <Collapse in={isOpen} animateOpacity>
          {options.map(({ label, to, key }) => (
            <NavLink
              key={key}
              to={to}
              onClick={handleClose}
              label={label}
              fontStyle="italic"
              fontSize="sm"
            />
          ))}
        </Collapse>
      </>
    );
  }

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        onClick={onToggle}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <NavLabel
          label={label}
          isHover={isOpen}
          icon={<Icon as={MdExpandMore} boxSize={26} />}
        />
      </MenuButton>
      <MenuList onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        {options.map(({ label, to, key }) => (
          <MenuItem key={key} as={Link} to={to} onClick={handleClose}>
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownNavLink;
