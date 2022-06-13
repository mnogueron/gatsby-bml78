import React, {useRef} from "react";
import {Link} from "gatsby";
import {Menu, MenuButton, MenuItem, MenuList, useDisclosure} from "@chakra-ui/react";
import NavLabel from "./NavLabel";

const DropdownNavLink = ({ label, options }) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const onCloseTimeout = useRef(0);

  const handleClose = () => {
    onCloseTimeout.current = setTimeout(onClose, 100);
  };

  const handleOpen = () => {
    clearTimeout(onCloseTimeout.current);
    onOpen();
  };

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        onClick={onToggle}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <NavLabel label={label} isHover={isOpen} />
      </MenuButton>
      <MenuList onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        {options.map(({label, to, key}) => <MenuItem key={key} as={Link} to={to}>{label}</MenuItem>)}
      </MenuList>
    </Menu>
  );
};

export default DropdownNavLink;
