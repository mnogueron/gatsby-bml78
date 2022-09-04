import React, { useRef } from 'react';
import { useDisclosure, Collapse, Icon } from '@chakra-ui/react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import NavLabel from '../NavLabel';
import NavLink from '../NavLink';

const MobileDropdownNavLink = ({ label, options, onClick, isRecursive }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const onCloseTimeout = useRef(0);

  const handleClose = () => {
    onCloseTimeout.current = setTimeout(onClose, 100);
    onClick();
  };

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
        cursor="pointer"
        {...isRecursive ? { fontStyle: 'italic', fontSize: 'sm' } : {}}
      />
      <Collapse in={isOpen} animateOpacity>
        {options.map(({ label, to, key, options }) => {
          if (options) {
            return (
              <MobileDropdownNavLink
                label={label}
                onClick={handleClose}
                options={options}
                isRecursive={true}
              />
            );
          }
          return (
            <NavLink
              key={key}
              to={to}
              onClick={handleClose}
              label={label}
              fontStyle="italic"
              fontSize="sm"
            />
          );
        })}
      </Collapse>
    </>
  );
};

export default MobileDropdownNavLink;
