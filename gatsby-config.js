module.exports = {
  siteMetadata: {
    title: 'Nicholas Jackson\'s Blog',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/blog`,
        name: 'pages'
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-netlify-cms'
  ],
};
