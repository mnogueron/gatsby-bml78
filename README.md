<div align="center" >
    <a href="https://www.gatsbyjs.com" target="_blank">
      <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" height="40" />
    </a>
      &nbsp;
    <a href="https://www.decapcms.org/" target="_blank">
      <img alt="Decap CMS" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Netlify_CMS_logo.svg" height="30" />
    </a>
</div>
<h1 align="center">
  Gatsby v3 - Decap CMS - Chakra-UI - Starter
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/b13fc0e1-9fca-48c2-b078-12722c7e0357/deploy-status)](https://app.netlify.com/sites/infallible-varahamihira-058515/deploys)

An example website built using Gatsby v3, Decap CMS and Chakra-UI.

It's a website of a fake urban gardening agency and comprises of a landing page, a project portfolio, about page with team members, and a contact form.

 👉 Check out the [demo site](https://infallible-varahamihira-058515.netlify.app/)!

## 🦾 Technologies and Plugins

- ⚛️ **Gatsby v3**
- ✍️ **Decap CMS** (incl. Admin live preview for all pages)
- 💨 **Chakra-UI** for styling
- 🌃 Performant images with gatsby-plugin-image and gatsby-plugin-sharp
- 🗺 Sitemap with gatsby-plugin-sitemap
- 🤖 Robots.txt with gatsby-plugin-robots-txt
- 🧩 Persistent navbar and footer with gatsby-plugin-layout
- ...

## 💻 Local Development

Start development environment with

```
$ npm install
$ gatsby develop
```

The site is now available at `localhost:8000/`.

You can connect Decap CMS to your [local git repo](https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository) (currenly a beta feature) by running this command in a separate terminal.

```
$ npx decap-server
```

The Decap CMS Admin will then be available at `localhost:8000/admin`.

For more details on how to set up the CMS, check out the [Decap CMS Docs](https://decapcms.org/docs/intro/).

## 🚨 Known issues

When running Decap CMS locally and updating a page, I regularly get the following error:

`There was an error in your GraphQL query: Field "image" must not have a selection since type "String" has no subfields.`

This seems to have to do with the `gatsby-remark-relative-images` plugin. However, the solution suggested in the [docs](https://www.gatsbyjs.com/plugins/gatsby-remark-relative-images/?=gatsby-remark-relative-images#im-getting-the-error-field-image-must-not-have-a-selection-since-type-string-has-no-subfields) didn't fix the issue for me.

I've you find a solution that works, please let me know or submit a pull request. Thanks!

## 🙌 Credits and thanks

- This template was inspired by [gatsby-starter-netlify-cms](https://github.com/netlify-templates/gatsby-starter-netlify-cms)
- Taylor Bell for his great course [Build a Blog with React and Markdown using Gatsby](https://egghead.io/courses/build-a-blog-with-react-and-markdown-using-gatsby), available for free on Egghead.io
- [Unsplash](https://unsplash.com/) and photographers for amazing photos
- How to hide and show navbar on scroll: https://dev.to/pratiksharm/navbar-hide-and-show-on-scroll-using-custom-react-hooks-1k98
- How to use prevent layout components from unmounting: https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting

## 🛠 Todo

- Google analytics? https://www.gatsbyjs.com/plugins/gatsby-plugin-gtag/?=google%20analytics#gatsby-plugin-gtag
- gatsby plugin offline?
