import React from 'react';
import {Link} from 'gatsby';
import Image from './Image';
import * as dateFns from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  ResponsiveValue,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

type BigCardProps = {
  image: any; // TODO type the image
  heading: string | null;
  date: string | null;
  subtitle: string | null;
  url: string | null;
  size: ResponsiveValue<'sm' | 'md' | 'lg'>;
} & BoxProps;

const BigCard = ({
  image,
  heading,
  date,
  subtitle,
  size: responsiveSize,
  url,
  ...rest
}: BigCardProps) => {
  const size = useBreakpointValue(
    typeof responsiveSize === 'string' ? {base: responsiveSize} : responsiveSize
  );
  return (
    <Box
      as={Link}
      to={url}
      display="block"
      position="relative"
      borderRadius={20}
      boxShadow="md"
      sx={{
        transitionDuration: '200ms',
        ':hover': {
          transform: 'translateY(-0.5rem)',
        },
      }}
      {...rest}
    >
      <Box data-testid="card-image">
        <Box
          as={Image}
          width="100%"
          height={
            size === 'lg'
              ? {base: 400, sm: 500, md: 500, lg: 600}
              : size === 'md'
                ? {base: 300, sm: 300, md: 400, lg: 400}
                : {base: 250, sm: 250, md: 300, lg: 400}
          }
          borderRadius={20}
          image={image?.image || {url: '/static/assets/shuttle.jpg'}}
          alt={image?.alt || 'image de volant'}
        />
      </Box>
      <Flex
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        top={0}
        p={size === 'lg' ? {base: 6, md: 12} : {base: 6, md: 8}}
        alignItems="flex-end"
      >
        <VStack
          spacing={2}
          alignItems="initial"
          position="relative"
          width="100%"
        >
          <Box
            position="absolute"
            top={size === 'lg' ? {base: -6, md: -12} : {base: -6, md: -8}}
            bottom={size === 'lg' ? {base: -6, md: -12} : {base: -6, md: -8}}
            right={size === 'lg' ? {base: -6, md: -12} : {base: -6, md: -8}}
            left={size === 'lg' ? {base: -6, md: -12} : {base: -6, md: -8}}
            borderBottomLeftRadius={20}
            borderBottomRightRadius={20}
            bg="linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.4) 25.2%, #000000 81.21%)"
          />
          {date && (
            <Text color="white" fontSize="sm" zIndex={1}>
              {dateFns.format(new Date(date), 'PP', {
                locale: frLocale,
              })}
            </Text>
          )}
          <Heading
            zIndex={1}
            as="h3"
            color="white"
            fontSize={
              size === 'lg'
                ? {base: 'xl', sm: '3xl', md: '4xl', lg: '5xl'}
                : {
                    base: 'md',
                    sm: 'lg',
                    md: 'xl',
                    lg: '2xl',
                  }
            }
          >
            {heading}
          </Heading>
          {subtitle && (
            <Text as="h4" fontSize="md" color="white" zIndex={1}>
              {subtitle}
            </Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

BigCard.defaultProps = {
  size: 'lg',
};

export default BigCard;
