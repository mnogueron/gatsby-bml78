import React from 'react';
import {Link as GatsbyLink} from 'gatsby';
import {
  Flex,
  Box,
  Heading,
  Stack,
  VStack,
  Link,
  Text,
  Divider,
  Icon,
  HStack,
  LinkProps,
} from '@chakra-ui/react';
import {
  FaInstagram,
  FaFacebookSquare,
  FaYoutube,
  FaDiscord,
} from 'react-icons/fa';
import BigLogo from './BigLogo';

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
} & LinkProps;

const FooterLink = ({to, children, ...rest}: FooterLinkProps) => (
  <Link
    as={rest.isExternal ? 'a' : GatsbyLink}
    to={rest.isExternal ? undefined : to}
    href={rest.isExternal ? to : undefined}
    fontSize="sm"
    color="text.inverted.secondary"
    textDecoration="none"
    {...rest}
  >
    {children}
  </Link>
);

const footerSections: {
  title: string;
  links: ({title: string; to: string} & LinkProps)[];
}[] = [
  {
    title: 'Infos Pratiques',
    links: [
      {
        title: 'Inscription',
        to: '/infos-pratiques/inscription',
      },
      {
        title: 'Nos sections',
        to: '/infos-pratiques/sections',
      },
      {
        title: 'Entraînements',
        to: '/infos-pratiques/entrainements',
      },
      {
        title: 'Accès / Horaires',
        to: '/infos-pratiques/acces-horaires',
      },
      {
        title: 'Partenaires et sponsors',
        to: '/infos-pratiques/avantages',
      },
      {
        title: 'Les membres du bureau',
        to: '/infos-pratiques/bureau',
      },
      {
        title: 'Tournois',
        to: '/tournois/tournoi-2023',
      },
    ],
  },
  {
    title: 'Actualités',
    links: [
      {
        title: 'Les actus du club',
        to: '/articles',
      },
      {
        title: 'Les résultats',
        to: '/results',
      },
    ],
  },
  {
    title: 'A propos',
    links: [
      {
        title: 'Contact',
        to: '/contact',
      },
      {
        title: 'MyFFBaD',
        to: 'https://myffbad.fr/club/819',
        isExternal: true,
      },
      {
        title: 'Mairie Maisons-Laffitte',
        to: 'https://www.maisonslaffitte.fr/Associations/10192/1516',
        isExternal: true,
      },
    ],
  },
];

const Footer = () => {
  return (
    <Box
      as="footer"
      background="linear-gradient(273.79deg, #C53030 -3.03%, #9B2C2C 100%)"
      borderTopRadius={10}
    >
      <Box maxW={'7xl'} px={8} pt={8} pb={6} margin="auto">
        <Stack
          direction={{base: 'column-reverse', md: 'row'}}
          justifyContent="space-between"
          alignItems={{base: 'center', md: 'initial'}}
          spacing={{base: 8, md: 0}}
          py={3}
        >
          <VStack alignItems={{base: 'center', md: 'flex-start'}} spacing={4}>
            <BigLogo />
            <VStack
              as="address"
              alignItems="flex-start"
              color="text.inverted.main"
              fontSize="sm"
              ps={{base: 0, md: 4}}
            >
              <Box>
                <Text>99 rue de la Muette</Text>
                <Text>78600 Maisons-Laffitte</Text>
              </Box>
              <Box>
                <Box>
                  <Link href={'tel:+33643596385'}>+33643596385</Link>
                </Box>
                <Box>
                  <Link href={'mailto:club.badml@gmail.com'}>
                    club.badml@gmail.com
                  </Link>
                </Box>
              </Box>
            </VStack>
          </VStack>

          <Box>
            <Flex flexWrap={{base: 'wrap', lg: 'nowrap'}}>
              {footerSections.map((section, index) => (
                <VStack
                  key={`${section.title}-${index}`}
                  alignItems={{base: 'center', md: 'flex-start'}}
                  spacing={1}
                  flex={1}
                  flexBasis={{
                    base: '40%',
                    sm: '25%',
                    md: '40%',
                    lg: 'fit-content',
                  }}
                  ms={{
                    base: index % 2 > 0 ? 4 : 0,
                    sm: index % 3 > 0 ? 4 : 0,
                    md: index % 2 > 0 ? 8 : 0,
                    lg: index > 0 ? 8 : 0,
                  }}
                  mt={{
                    base: index / 2 >= 1 ? 4 : 0,
                    sm: index / 3 >= 1 ? 4 : 0,
                    md: index / 2 >= 1 ? 4 : 0,
                    lg: 0,
                  }}
                >
                  <Heading as="div" size="xs" color="text.inverted.secondary">
                    {section.title}
                  </Heading>
                  {section.links.map(({title, to, ...rest}, index) => (
                    <FooterLink
                      key={`${title}-${index}`}
                      to={to}
                      textAlign={{base: 'center', md: 'left'}}
                      {...rest}
                    >
                      {title}
                    </FooterLink>
                  ))}
                </VStack>
              ))}
            </Flex>
          </Box>
        </Stack>

        <Divider borderColor={'gray.200'} my={6} />

        <Stack
          direction={{base: 'column', md: 'row'}}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack>
            <Link
              href="https://www.instagram.com/badminton_maisonslaffitte/"
              isExternal={true}
              color="white"
            >
              <Icon as={FaInstagram} boxSize={8} />
            </Link>

            <Link
              href="https://www.facebook.com/Badminton-Maisons-Laffitte-174696235978505"
              isExternal={true}
              color="white"
            >
              <Icon as={FaFacebookSquare} boxSize={8} />
            </Link>

            <Link
              href="https://www.youtube.com/channel/UC9cBewd4vtXbI2ZwGLY9OlQ"
              isExternal={true}
              color="white"
            >
              <Icon as={FaYoutube} boxSize={8} />
            </Link>

            <Link
              href="https://discord.gg/kVQygGKvH4"
              isExternal={true}
              color="white"
            >
              <Icon as={FaDiscord} boxSize={8} />
            </Link>
          </HStack>
          <Text
            textAlign="center"
            color="text.inverted.secondary"
            fontSize="sm"
          >
            © BML 2023 - Tous Droits Réservés - All Rights Reserved
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
