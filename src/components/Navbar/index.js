import React, { useMemo, useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Heading, Box } from '@chakra-ui/react';
import MobileMenu from './MobileMenu';
import DropdownNavLink from './DropdownNavLink';
import NavLink from './NavLink';
import { useScroll } from '../../hooks/useScroll';

const Navbar = ({ className, isTransparentAtTop }) => {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const { infosPratiquesMenu, resultsMenu } = useStaticQuery(
    graphql`
      query NAVBAR {
        infosPratiquesMenu: markdownRemark(
          frontmatter: { menuKey: { eq: "infos-pratiques" } }
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

        resultsMenu: markdownRemark(
          frontmatter: { menuKey: { eq: "resultats" } }
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
      }
    `
  );

  const MENU = useMemo(() => {
    const extractSubMenus = (item, index) => {
      if (item.items) {
        return {
          key: `${item.title} - ${index}`,
          label: item.title,
          options: item.items.map((item) => ({
            key: `${item.url} - ${item.title}`,
            label: item.title,
            to: item.url,
          })),
        };
      }

      return {
        key: `${item.url} - ${item.title}`,
        label: item.title,
        to: item.url,
      };
    };
    const infoPratiquesCategories =
      infosPratiquesMenu.frontmatter.items.map(extractSubMenus);
    const resultsCategories =
      resultsMenu.frontmatter.items.map(extractSubMenus);
    return [
      {
        key: 'accueil',
        label: 'Accueil',
        to: '/',
      },
      {
        key: 'actus',
        label: 'Actualités',
        to: '/articles',
        partial: true,
      },
      {
        key: 'infospratiques',
        label: 'Infos Pratiques',
        options: [
          ...infoPratiquesCategories,
          /*{
            key: 'Category test',
            label: 'Category test',
            options: [
              {
                key: `test1`,
                label: 'Test 1',
                to: '/infos-pratiques/inscription',
              },
              {
                key: `test2`,
                label: 'Test 2',
                to: '/infos-pratiques/bureau',
              }
            ],
          },*/
        ],
      },
      {
        key: 'resultats',
        label: 'Résultats',
        options: [
          {
            key: 'allresults',
            label: 'Tous les résultats',
            to: '/results',
          },
          ...resultsCategories,
        ],
      },
      {
        key: 'contact',
        label: 'Contact',
        to: '/contact',
      },
    ];
  }, [infosPratiquesMenu, resultsMenu]);

  const isTransparent = isTransparentAtTop && scrollY < 1;

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <Box
      as="nav"
      shadow={scrollY < 1 ? undefined : 'xl'}
      bg={isTransparent ? 'transparent' : 'bg.main'}
      className={`fixed top-0 w-full z-30 ${className}`}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto lg:flex lg:justify-between lg:items-center">
        <div className="flex items-center justify-between py-2">
          {/* TODO use Logo component instead */}
          <Link className="flex items-center gap-1" to="/">
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
            <Heading
              fontSize={{ base: 'md', sm: 'lg' }}
              color={isTransparent ? 'text.inverted.main' : 'text.main'}
            >
              Badminton Maisons-Laffitte
            </Heading>
            {/*<div className="text-xl font-bold tracking-wide lg:text-2xl">
              <span className="text-gray-800 font-semibold">Badminton</span>
              <span className="text-red-700"> Maisons-Laffitte</span>
            </div>*/}
          </Link>

          {/* Mobile menu button */}
          <Box display={{ base: 'flex', lg: 'none' }}>
            <Box
              as="button"
              type="button"
              className="focus:outline-none"
              _hover={{
                color: isTransparent ? 'gray.200' : 'gray.600',
              }}
              _focus={{
                color: isTransparent ? 'gray.200' : 'gray.600',
              }}
              color={isTransparent ? 'gray.100' : 'gray.500'}
              aria-label="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </Box>
          </Box>
        </div>

        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(!menuOpen)}
          menu={MENU}
        />

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div className={'items-center hidden lg:flex'}>
          <div className="flex flex-col w-full lg:flex-row lg:mx-6 lg:my-2 items-center">
            {MENU.map((menu) => {
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
                  partial={menu.partial}
                  isTransparent={isTransparent}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
