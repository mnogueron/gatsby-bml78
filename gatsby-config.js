const siteUrl = process.env.URL || `https://badml.com/`;

const excerptExcludedRegexes = [
  /^(#)+/,
  /^<gallery>(.*?)<\/gallery>$/,
  /^<scoreboard>(.*?)<\/scoreboard>$/,
  /^<teamscoreboard>(.*?)<\/teamscoreboard>$/,
  /^`youtube:\s(.*)`$/,
];

// TODO change title and description
module.exports = {
  siteMetadata: {
    title: 'Badminton Maisons-Laffitte',
    titleTemplate: '%s - BML',
    description:
      'Retrouvez toutes les actus et info du club de badminton de Maisons-Laffitte',
    siteUrl,
    image: '/assets/bml-icon.png',
  },
  plugins: [
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: false,
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout`),
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: '100%',
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: 'lazy', //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: 'embedVideo-container', //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          // gatsby-remark-relative-images must go before gatsby-remark-images
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
              showCaptions: ['title'],
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
        excerpt: (file, options) => {
          /*if (file.title === 'Tournoi en équipe Les Géants de Gayant : le BML invaincu !') {*/
            /*console.log(file.content.split('\n'));*/
          /*}*/


          /*const test = [
            'Six de nos jeunes étaient présent au tournoi de doubles du circuit jeune 78 : Clément, Emilie, Amaury, Steevy, Charles-Frédérik et Marius.',
            '',
            '### Mixte pour Clément et Emilie',
            '',
            'Clément et Emilie terminent 3ème de leur poule malgré de très bon matches. Il finissent en beauté en gagnant leur dernier match en faisant un belle remontée sur le 3eme set en étant mené 20/15, ils finissent par arracher la victoire avec un 22/20',
            '',
            '<scoreboard>{"matches":[{"score":{"set":[{"scoreA":21,"scoreB":18},{"scoreA":23,"scoreB":25},{"scoreA":24,"scoreB":26}]},"teamA":[{"lastname":"Mieusset-Mongrolle","firstname":"Clément","ranking":"D9","club":"BML"},{"lastname":"Geissel","firstname":"Emilie","ranking":"D9","club":"BML"}],"teamB":[{"lastname":"Segons","firstname":"Lalie","ranking":"D9","club":"CBS"},{"lastname":"Mercier","firstname":"Sacha","ranking":"NC","club":"CBS"}],"type":"Poule"},{"score":{"set":[{"scoreA":8,"scoreB":21},{"scoreA":11,"scoreB":21}]},"teamA":[{"lastname":"Mieusset-Mongrolle","firstname":"Clément","ranking":"D9","club":"BML"},{"lastname":"Geissel","firstname":"Emilie","ranking":"D9","club":"BML"}],"teamB":[{"lastname":"Barrier","firstname":"Pierre","ranking":"D9","club":"BCV"},{"lastname":"Dumes","firstname":"Floriane","ranking":"D9","club":"CBS"}],"type":"Poule"},{"score": {"set":[{"scoreA":21,"scoreB":12},{"scoreA":21,"scoreB":23},{"scoreA":22,"scoreB":20}]},"teamA":[{"lastname": "Mieusset-Mongrolle","firstname":"Clément","ranking":"D9","club":"BML"},{"lastname":"Geissel","firstname":"Emilie","ranking":"D9","club":"BML"}],"teamB":[{"lastname":"Simpson","firstname":"Ayden","ranking":"D9","club":"BCV"},{"lastname":"Vo","firstname":"An-phi","ranking":"NC","club":"BCV"}],"type":"Poule"}]}</scoreboard>',
            '',
            '### Double pour Amaury et Steevy',
            '',
            'Amaury et Steevy remporte 2 matches et finissent 2ème de leur poule.',
            '',
            '<scoreboard>{"matches":[{"score":{"set":[{"scoreA":21,"scoreB":13},{"scoreA":12,"scoreB":21},{"scoreA":21,"scoreB":16}]},"teamA":[{"lastname":"Guinouet","firstname":"Amaury","ranking":"P11","club":"BML"},{"lastname":"Surendran","firstname":"Steevy","ranking":"P11","club":"BML"}],"teamB":[{"lastname":"Lefeuvre","firstname": "Lucas","ranking":"P11","club":"BCV"},{"lastname":"Rauzier-Laflaquiere","firstname":"Paul","ranking":"P11","club":"BCV"}],"type":"Poule"},{"score":{"set":[{"scoreA":21,"scoreB":17},{"scoreA":21,"scoreB":16}]},"teamA":[{"lastname":"Guinouet","firstname":"Amaury","ranking":"P11","club":"BML"},{"lastname":"Surendran","firstname":"Steevy","ranking":"P11","club":"BML"}],"teamB":[{"lastname":"Bruneau","firstname":"Alexis","ranking":"P11", "club":"LCV"},{"lastname":"Provencal","firstname":"Matthieu","ranking":"P11","club":"LCV"}],"type":"Poule"},{"score":{"set":[{"scoreA":8,"scoreB":21},{"scoreA":17,"scoreB":21}]},"teamA":[{"lastname":"Guinouet","firstname":"Amaury","ranking":"P11","club":"BML"},{"lastname":"Surendran","firstname":"Steevy","ranking":"P11","club":"BML"}],"teamB":[{"lastname":"Klobb","firstname":"Alexandre","ranking":"P11","club":"USC"},{"lastname":"Daniel","firstname":"Victor","ranking":"P11","club":"USC"}],"type":"Poule"}]}</scoreboard>',
            '',
            '### Double pour Charles-Frédérik et Marius',
            '',
            'Charles-Frédérik et Marius ne remportent pas de matches mais font de super matches.',
            '',
            '<scoreboard>{"matches":[{"score":{"set":[{"scoreA":7,"scoreB":21},{"scoreA":9,"scoreB":21}]},"teamA":[{"lastname":"Calosso Xue","firstname":"Marius","ranking":"P10","club":"BML"},{"lastname":"Ilonga Jolibois","firstname":"Charles-Frédérik","ranking":"D9","club":"BML"}],"teamB":[{"lastname":"Simpson","firstname":"Ayden","ranking":"D8","club":"BCV"},{"lastname":"Deshayes","firstname":"Maxime","ranking":"D8","club":"BCV"}],"type":"Poule"},{"score":{"set":[{"scoreA":6,"scoreB":21},{"scoreA":5,"scoreB":21}]},"teamA":[{"lastname":"CalossoXue","firstname":"Marius","ranking":"P10","club":"BML"},{"lastname":"Ilonga Jolibois","firstname":"Charles-Frédérik","ranking":"D9","club":"BML"}],"teamB":[{"lastname":"Barrier","firstname":"Pierre","ranking":"D8","club":"BCV"},{"lastname":"Berte","firstname":"Alessio","ranking":"D8","club":"BCV"}],"type":"Poule"},{"score":{"set":[{"scoreA":13,"scoreB":21},{"scoreA":14,"scoreB":21}]},"teamA":[{"lastname":"CalossoXue","firstname":"Marius","ranking":"P10","club":"BML"},{"lastname":"IlongaJolibois","firstname":"Charles-Frédérik","ranking":"D9","club":"BML"}],"teamB":[{"lastname":"Akjaly","firstname":"Jules","ranking":"D9","club":"BCV"},{"lastname":"Brissaud","firstname":"Lois","ranking":"D9","club":"BCV"}],"type":"Poule"}]}</scoreboard>',
            '',
            '## Galerie',
            '',
            '<gallery>{"pictures":[{"image":"/assets/image_6483441.jpg"},{"image":"/assets/image_50420737.jpg"}]}</gallery>'
          ]*/
          file.excerpt = file.content
            .split('\n')
            .filter((s) => s && !excerptExcludedRegexes.some((r) => r.test(s)))
            .join(' ')
            .slice(0, 140);
          console.log(file.excerpt);
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Badminton Maisons-Laffitte`,
        short_name: `BML`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2C5282`,
        display: `standalone`,
        icon: `src/img/bml-icon.png`,
      },
    },
    'gatsby-transformer-remark-frontmatter',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        /**
         * One convention is to place your Netlify CMS customization code in a
         * `src/cms` directory.
         */
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentityWidget: true,
        htmlFavicon: `src/img/bml-icon.png`,
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        resolveSiteUrl: () => siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};
