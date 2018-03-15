/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

 const path = require('path');
 const _ = require('lodash');

 exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators;

  const postTemplate = path.resolve('src/templates/post.js');
  const tagTemplate = path.resolve('src/templates/tag.js');

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            path
            title
            date
            tags
          }
        }
      }
    }
  }`)
  .then(res => {
    if (res.errors) {
      return Promise.reject(res.errors);
    }

    let posts = [];
    res.data.allMarkdownRemark.edges.map(node => posts.push(node));

    // Create pages for each post
    posts.forEach( ({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      });
    });

    // Get all the unique tags so we can create a tags page
    let tags = [];
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });

    // Get rid of duplicate tags
    tags = _.uniq(tags);

    tags.forEach(tag => { 
      createPage({ 
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag
        }
      });
    });

  });
 }