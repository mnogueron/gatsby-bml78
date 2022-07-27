import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import {
  Flex,
  Box,
  Heading,
  Stack,
  VStack,
  Link,
  Text,
  Divider,
} from '@chakra-ui/react';

const SectionHeader = ({ children, ...rest }) => (
  <Heading
    as="h3"
    size="sm"
    textTransform="uppercase"
    color="gray.600"
    fontWeight="semibold"
    textAlign={{ base: 'center', md: 'left' }}
    {...rest}
  >
    {children}
  </Heading>
);

const FooterLink = ({ to, children }) => (
  <Link
    as={GatsbyLink}
    to={to}
    fontSize="sm"
    color="gray.600"
    textDecoration="none"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <Box as="footer" className="bg-gray-100">
      <div className="max-w-7xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 4, md: 8 }}
        >
          <Box mx="auto">
            <Link
              as={GatsbyLink}
              className="flex items-center gap-1"
              to="/"
              textDecoration="none"
              _hover={{ textDecoration: 'none' }}
            >
              <StaticImage
                src="../img/bml-icon.png"
                alt="Badminton Maisons-Laffitte icon"
                layout="fixed"
                width={114}
                height={85}
                backgroundColor="transparent"
                placeholder="blurred"
              />
              <Heading size={'sm'}>Badminton Maisons-Laffitte</Heading>
            </Link>
          </Box>

          <Box mx="auto !important">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: 6, md: 12 }}
            >
              <Box>
                <SectionHeader>Infos Pratiques</SectionHeader>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  spacing={{ base: 2, sm: 20, md: 10 }}
                  mt={2}
                >
                  <VStack
                    spacing={2}
                    alignItems={{ base: 'center', sm: 'flex-start' }}
                  >
                    <FooterLink to="/infos-pratiques/sections">
                      Nos Sections
                    </FooterLink>
                    <FooterLink to="/infos-pratiques/inscription">
                      Comment s'inscrire
                    </FooterLink>
                    <FooterLink to="/infos-pratiques/entrainements">
                      Les entraînements
                    </FooterLink>
                  </VStack>
                  <VStack
                    spacing={2}
                    alignItems={{ base: 'center', sm: 'flex-start' }}
                  >
                    <FooterLink to="/infos-pratiques/avantages">
                      Les avantages du club
                    </FooterLink>
                    <FooterLink to="/infos-pratiques/acces-horaires">
                      Accès / Horaires
                    </FooterLink>
                  </VStack>
                </Stack>
              </Box>
              <Box>
                <SectionHeader>Contact</SectionHeader>
                <VStack
                  spacing={2}
                  alignItems={{ base: 'center', md: 'flex-start' }}
                  mt={2}
                >
                  {/*<span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  +1 526 654 8965
                </span>*/}
                  <Link
                    href={'mailto:club.badml@gmail.com'}
                    fontSize="sm"
                    color="gray.600"
                  >
                    club.badml@gmail.com
                  </Link>
                </VStack>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Divider borderColor={'gray.400'} my={6} />

        <div>
          <Text textAlign="center" color="gray.700" fontSize="sm">
            © BML 2022 - Tous Droits Réservés - All Rights Reserved
          </Text>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
