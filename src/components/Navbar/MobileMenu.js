import React, {useState} from 'react';
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
  VStack,
  Icon,
} from '@chakra-ui/react';
import {StaticImage} from 'gatsby-plugin-image';
import {Link} from 'gatsby';

const AUTO_EXPAND_LEVEL = -1;

const SubSection = ({
  label,
  icon,
  options,
  onClose,
  level,
  isDefaultExpanded,
}) => {
  const [index, setIndex] = useState([]);
  if (level > AUTO_EXPAND_LEVEL && !isDefaultExpanded) {
    return (
      <AccordionItem border="none">
        <AccordionButton
          as={HStack}
          spacing={2}
          _focus="none"
          p={2}
          borderRadius="md"
          fontWeight={
            level === 0 ? 'semibold' : level === 1 ? 'normal' : 'light'
          }
          fontSize={level > 1 ? 'sm' : 'md'}
          color={level === 0 ? 'text.main' : 'text.secondary'}
          _hover={{bg: 'blackAlpha.50', color: 'red.600'}}
        >
          {icon && <Icon as={icon} boxSize={5} />}
          <Box as="span" flex="1" textAlign="left">
            {label}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel ps={4} py={0} pe={0}>
          <Accordion
            index={index}
            allowMultiple
            onChange={expandedIndex => setIndex(expandedIndex)}
          >
            {options.map(m => (
              <MenuItem
                key={m.key}
                item={m}
                onClose={onClose}
                level={level + 1}
              />
            ))}
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    );
  }

  return (
    <Box>
      <HStack
        spacing={2}
        p={2}
        pointerEvents="none"
        fontWeight={level === 0 ? 'semibold' : level === 1 ? 'normal' : 'light'}
        color={level === 0 ? 'text.main' : 'text.secondary'}
        borderRadius="md"
      >
        {icon && <Icon as={icon} boxSize={5} />}
        <Box width="100%" display="block">
          {label}
        </Box>
      </HStack>
      <VStack alignItems="initial" spacing={0} ps={4}>
        {options.map(o => (
          <MenuItem key={o.key} item={o} level={level + 1} onClose={onClose} />
        ))}
      </VStack>
    </Box>
  );
};

const MenuItem = ({item, onClose, level}) => {
  if (item.options) {
    return (
      <SubSection
        label={item.label}
        icon={item.icon}
        options={item.options}
        isDefaultExpanded={item.isDefaultExpanded}
        level={level}
        onClose={onClose}
      />
    );
  }

  return (
    <HStack
      spacing={2}
      as={Link}
      to={item.to}
      _hover={{bg: 'blackAlpha.50', color: 'red.600'}}
      fontWeight={level === 0 ? 'semibold' : level === 1 ? 'normal' : 'light'}
      fontSize={level > 1 ? 'sm' : 'md'}
      color={level === 0 ? 'text.main' : 'text.secondary'}
      borderRadius="md"
      p={2}
      onClick={onClose}
    >
      {item.icon && <Icon as={item.icon} boxSize={5} />}
      <Box width="100%" display="block">
        {item.label}
      </Box>
    </HStack>
  );
};

const MobileMenu = ({onClose, isOpen, menu}) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          as={HStack}
          p="0.5rem 1rem"
          spacing={1}
          width="calc(100% - 32px)"
        >
          <Box w={{base: 12, sm: 14}} h={{base: 8, sm: 10}}>
            <StaticImage
              src="../../../static/assets/bml-icon.png"
              alt="Badminton Maisons-Laffitte icon"
              layout="constrained"
              width={114}
              height={85}
              loading="eager"
              backgroundColor="transparent"
              placeholder="blurred"
            />
          </Box>
          <Heading fontSize="sm">Badminton Maisons-Laffitte</Heading>
        </DrawerHeader>

        <DrawerBody px={3}>
          <Accordion allowMultiple>
            {menu.map(m => (
              <MenuItem key={m.key} item={m} onClose={onClose} level={0} />
            ))}
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
