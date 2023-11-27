import React, {useRef} from 'react';
import {Link} from 'gatsby';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Icon,
  Portal,
} from '@chakra-ui/react';
import {MdExpandMore, MdChevronRight} from 'react-icons/md';
import NavLabel from '../NavLabel';

const DesktopDropdownNavLink = ({
  label,
  options,
  onClick,
  isRecursive,
  isTransparent,
}) => {
  const {isOpen, onClose, onOpen, onToggle} = useDisclosure();
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
    <Menu
      isOpen={isOpen}
      {...(isRecursive ? {placement: 'end-start', offset: [-10, 6]} : {})}
    >
      <MenuButton
        onClick={onToggle}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        {...(isRecursive
          ? {
              sx: {
                width: 'full',
                '&:hover': {
                  backgroundColor: 'red.100',
                },
              },
            }
          : {
              sx: {
                '*': {
                  color: isOpen
                    ? 'primary'
                    : isTransparent
                      ? 'text.inverted.main'
                      : 'text.main',
                },
                '&:hover *': {
                  color: 'primary',
                },
              },
            })}
      >
        {isRecursive ? (
          <MenuItem justifyContent="space-between">
            {label}
            <Icon as={MdChevronRight} boxSize={5} />
          </MenuItem>
        ) : (
          <NavLabel
            label={label}
            icon={<Icon as={MdExpandMore} boxSize={26} />}
          />
        )}
      </MenuButton>
      <Portal>
        <MenuList
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          maxW={'350px'}
        >
          {options.map(({label, to, key, options}) => {
            if (options) {
              return (
                <DesktopDropdownNavLink
                  key={key}
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
      </Portal>
    </Menu>
  );
};

export default DesktopDropdownNavLink;
