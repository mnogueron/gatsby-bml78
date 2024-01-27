const siteUrl = process.env.URL || `https://badml.com/`;
const GA_ID = process.env.GA_ID || 'undefined';

/*const excerptExcludedRegexes = [
  /^(#)+/,
  /^<gallery>(.*?)<\/gallery>$/,
  /^<scoreboard>(.*?)<\/scoreboard>$/,
  /^<teamscoreboard>(.*?)<\/teamscoreboard>$/,
  /^`youtube:\s(.*)`$/,
];*/

// TODO change title and description
module.exports = {
  trailingSlash: `ignore`,
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
                  embedURL: videoId =>
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
        /*excerpt: (file, options) => {
          file.excerpt = file.content
            .split('\n')
            .filter((s) => s && !excerptExcludedRegexes.some((r) => r.test(s)))
            .join(' ')
            .slice(0, 140);
          console.log(file.excerpt);
        },*/
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
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/sitemap',
        resolveSiteUrl: () => siteUrl,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{userAgent: '*', allow: '/'}],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          GA_ID, // Google Analytics / GA
          //"AW-CONVERSION_ID", // Google Ads / Adwords / AW
          //"DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          //optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: false,
          // Avoids sending pageview hits from custom paths
          //exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          //origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
  ],
};
