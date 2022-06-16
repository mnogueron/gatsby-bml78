import React, { useState } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Heading } from '@chakra-ui/react';
import NavLink from './NavLink';
import DropdownNavLink from './DropdownNavLink';

const MENU = [
  {
    key: 'accueil',
    label: 'Accueil',
    to: '/',
  },
  {
    key: 'infospratiques',
    label: 'Infos Pratiques',
    options: [
      {
        key: 'inscription',
        label: 'Inscription',
        to: '/inscription',
      },
      {
        key: 'avantageclub',
        label: 'Avantage Club',
        to: '/avantages',
      },
      {
        key: 'entrainements',
        label: 'Entraînements',
        to: '/entrainements',
      },
      {
        key: 'calendrier',
        label: 'Calendrier',
        to: '/calendrier',
      },
    ],
  },
  {
    key: 'interclub',
    label: 'Interclub',
    options: [
      {
        key: 'n1',
        label: 'N1',
        to: '/interclub/n1',
      },
    ],
  },
  {
    key: 'actus',
    label: 'Actualités',
    to: '/articles',
    partial: true,
  },
  {
    key: 'about',
    label: 'Nos Sections',
    to: '/about',
  },
  {
    key: 'contact',
    label: 'Contact',
    to: '/contact',
  },
];

const Navbar = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-30 bg-white shadow-xl ${className}`}>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between py-2">
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
            <Heading size={'md'}>Badminton Maisons-Laffitte</Heading>
            {/*<div className="text-xl font-bold tracking-wide lg:text-2xl">
              <span className="text-gray-800 font-semibold">Badminton</span>
              <span className="text-red-700"> Maisons-Laffitte</span>
            </div>*/}
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={
            'items-center ' + (menuOpen ? 'block' : 'hidden') + ' md:flex'
          }
        >
          <div className="flex flex-col w-full md:flex-row md:mx-6 md:my-2 items-center">
            {MENU.map((menu) => {
              if (menu.options) {
                return (
                  <DropdownNavLink
                    key={menu.key}
                    label={menu.label}
                    options={menu.options}
                    onClick={handleMenuClose}
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
                />
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
