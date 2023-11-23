import React, {useCallback, useState} from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Box,
  AccordionButton,
  AccordionIcon,
} from '@chakra-ui/react';
import {StaticImage} from 'gatsby-plugin-image';
import {Link} from 'gatsby';

const SubMenu = ({label, options, onClose}) => {
  const [index, setIndex] = useState([]);
  return (
    <AccordionItem>
      <h3 onClick={() => setIndex([])}>
        <AccordionButton color="gray.600" _focus="none">
          <Box as="span" flex="1" textAlign="left" py={2}>
            {label}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel ps={1} pt={0}>
        <Accordion
          index={index}
          allowMultiple
          allowToggle
          onChange={expandedIndex => setIndex(expandedIndex)}
        >
          {options.map(m => (
            <MenuItem key={m.key} item={m} onClose={onClose} />
          ))}
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
  );
};

const MenuItem = ({item, onClose}) => {
  const [isActive, setIsActive] = useState(false);

  const getProps = useCallback(
    ({isCurrent, isPartiallyCurrent}) => {
      const active = item.partial ? isPartiallyCurrent : isCurrent;
      setIsActive(active);
    },
    [item.partial]
  );

  if (item.options) {
    return (
      <SubMenu label={item.label} options={item.options} onClose={onClose} />
    );
  }

  return (
    <Box
      _hover={{bg: 'blackAlpha.50', color: 'blue.500'}}
      color={isActive ? 'blue.500' : 'gray.800'}
      fontWeight={isActive ? 'semibold' : 'medium'}
      borderTopWidth="1px"
    >
      <Box
        as={Link}
        to={item.to}
        getProps={getProps}
        width="100%"
        py={4}
        px={4}
        display="block"
        onClick={onClose}
      >
        {item.label}
      </Box>
    </Box>
  );
};

const MobileMenu = ({onClose, isOpen, menu}) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader as={HStack} p="0.5rem 1rem" spacing={1}>
          <StaticImage
            src="../../img/bml-icon.png"
            alt="Badminton Maisons-Laffitte icon"
            className="w-12 h-8 sm:w-14 sm:h-10"
            layout="constrained"
            width={114}
            height={85}
            loading="eager"
            backgroundColor="transparent"
            placeholder="blurred"
          />
          <Heading fontSize={{base: 'md', sm: 'lg'}}>
            Badminton Maisons-Laffitte
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <Accordion allowMultiple allowToggle>
            {menu.map(m => (
              <MenuItem key={m.key} item={m} onClose={onClose} />
            ))}
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
