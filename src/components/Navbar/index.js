import React, {useMemo, useState} from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import {Box, Flex, HStack, Icon, IconButton} from '@chakra-ui/react';
import MobileMenu from './MobileMenu';
import DropdownNavLink from './DropdownNavLink';
import NavLink from './NavLink';
import {useScroll} from '../../hooks/useScroll';
import Logo from '../Logo';
import LegacyContainer from '../LegacyContainer';
import {GiShuttlecock} from 'react-icons/gi';
import {
  FiAward,
  FiHexagon,
  FiHome,
  FiMail,
  FiMenu,
  FiRadio,
  FiShoppingCart,
  FiYoutube,
} from 'react-icons/fi';

let betaFeature =
  typeof localStorage !== 'undefined' &&
  localStorage.getItem('beta') === 'enabled';

if (typeof window !== 'undefined') {
  window.toggleBetaFeature = () => {
    if (!localStorage.getItem('beta')) {
      localStorage.setItem('beta', 'enabled');
      betaFeature = true;
    } else {
      localStorage.removeItem('beta');
      betaFeature = false;
    }
  };
}

const getMenuIcon = title => {
  switch (title) {
    case 'Toutes les vidéos':
      return FiYoutube;
    default:
      return undefined;
  }
};

// TODO use dark / light mode instead of isTransparent
// TODO review animation on scroll with isTransparent
const Navbar = ({isTransparentAtTop, ...rest}) => {
  const {scrollY, scrollDirection} = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const {infosPratiquesMenu, badmintonMenu, resultsMenu} = useStaticQuery(
    graphql`
      query NAVBAR {
        infosPratiquesMenu: markdownRemark(
          frontmatter: {menuKey: {eq: "infos-pratiques"}}
        ) {
          frontmatter {
            menuKey
            items {
              title
              url
              items {
                title
                url
              }
            }
          }
        }

        badmintonMenu: markdownRemark(
          frontmatter: {menuKey: {eq: "badminton"}}
        ) {
          frontmatter {
            menuKey
            items {
              title
              url
              items {
                title
                url
              }
            }
          }
        }

        resultsMenu: markdownRemark(frontmatter: {menuKey: {eq: "resultats"}}) {
          frontmatter {
            menuKey
            items {
              title
              url
              items {
                title
                url
              }
            }
          }
        }
      }
    `
  );

  const {mobileMenu, desktopMenu} = useMemo(() => {
    const extractSubMenus = (item, index) => {
      if (item.items) {
        return {
          key: `${item.title} - ${index}`,
          label: item.title,
          options: item.items.map(item => ({
            key: `${item.url} - ${item.title}`,
            label: item.title,
            to: item.url,
          })),
          icon: getMenuIcon(item.title),
        };
      }

      return {
        key: `${item.url} - ${item.title}`,
        label: item.title,
        to: item.url,
        icon: getMenuIcon(item.title),
      };
    };
    const infoPratiquesCategories =
      infosPratiquesMenu.frontmatter.items.map(extractSubMenus);
    const badmintonCategories =
      badmintonMenu.frontmatter.items.map(extractSubMenus);
    const resultsCategories =
      resultsMenu.frontmatter.items.map(extractSubMenus);

    const desktopMenu = [
      {
        key: 'actus',
        label: 'Actualités',
        to: '/articles',
        partial: true,
        icon: FiRadio,
      },
      {
        key: 'leclub',
        label: 'Le Club',
        options: [...infoPratiquesCategories],
        isDefaultExpanded: true,
        icon: FiHexagon,
      },
      betaFeature && {
        key: 'badminton',
        label: 'Le Badminton',
        options: badmintonCategories,
        icon: GiShuttlecock,
      },
      {
        key: 'interclubs',
        label: 'Interclubs',
        options: [
          {
            key: 'allintercblusresults',
            label: "Tous les résultats d'ICs",
            to: '/results',
          },
          ...resultsCategories,
        ],
        icon: FiAward,
      },
      betaFeature && {
        key: 'Boutique',
        label: 'La Boutique',
        to: '/boutique',
        icon: FiShoppingCart,
      },
      {
        key: 'contact',
        label: 'Contact',
        to: '/contact',
        icon: FiMail,
      },
    ].filter(Boolean);

    return {
      mobileMenu: [
        {
          key: 'accueil',
          label: 'Accueil',
          to: '/',
          icon: FiHome,
        },
        ...desktopMenu,
      ],
      desktopMenu: desktopMenu,
    };
  }, [
    badmintonMenu.frontmatter.items,
    infosPratiquesMenu.frontmatter.items,
    resultsMenu.frontmatter.items,
  ]);

  const isTransparent = isTransparentAtTop && scrollY < 1;

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <Box
      as="nav"
      shadow={scrollY < 1 ? undefined : 'xl'}
      backgroundColor={isTransparent ? 'transparent' : 'bg.main'}
      sx={{
        w: '100%',
        zIndex: 30,
        top: 0,
        position: 'fixed',
        transitionDuration: '300ms, 500ms, 300ms',
        transitionProperty: 'transform, background-color, box-shadow',
        transitionTimingFunction: 'ease-in-out',
        transform:
          scrollDirection === 'down' || scrollY < 200
            ? 'translateY(0)'
            : 'translateY(-100%)',
      }}
      {...rest}
    >
      <LegacyContainer
        py={0}
        display={{base: 'block', lg: 'flex'}}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" py={2} justifyContent="space-between">
          <Logo
            color={isTransparent ? 'text.inverted.main' : 'text.main'}
            sx={{
              transitionDuration: '1000ms',
              transitionProperty: 'color',
              transitionTimingFunction: 'ease-in-out',
            }}
          />

          {/* Mobile menu button */}
          <Box display={{base: 'flex', lg: 'none'}}>
            <IconButton
              aria-label={'menu'}
              icon={<Icon as={FiMenu} boxSize={6} />}
              onClick={() => setMenuOpen(!menuOpen)}
              variant="ghost"
            />
          </Box>
        </Flex>

        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(!menuOpen)}
          menu={mobileMenu}
        />

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <Box display={{base: 'none', lg: 'flex'}} alignItems="center">
          <HStack w="full" alignItems="center" mx={6} my={2} spacing={0}>
            {desktopMenu.map(menu => {
              if (menu.options) {
                return (
                  <DropdownNavLink
                    key={menu.key}
                    label={menu.label}
                    options={menu.options}
                    onClick={handleMenuClose}
                    isTransparent={isTransparent}
                  />
                );
              }

              return (
                <NavLink
                  key={menu.key}
                  to={menu.to}
                  onClick={handleMenuClose}
                  label={menu.label}
                  isTransparent={isTransparent}
                />
              );
            })}
          </HStack>
        </Box>
      </LegacyContainer>
    </Box>
  );
};

export default Navbar;
