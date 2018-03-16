import React from 'react'
import Link from 'gatsby-link'
import _ from 'lodash'
import PostExcerpt from '../components/PostExcerpt'
import TagsSection from '../components/TagsSection'

export const indexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10, 
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            title
            date
            tags
          }
        }
      }
    }
  }
`

export default function IndexPage({data}) {
  const numArticles = data.allMarkdownRemark.edges.length;
  console.log(numArticles);

  let posts = [];
  data.allMarkdownRemark.edges.map(node => posts.push(node));

  // Get all the unique tags so we can create a tags page
  let tags = [];
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });

  // Get rid of duplicate tags
  tags = _.uniq(tags);

  return (
    <div className="index">

      <h1 className="snazzy-title">Some snazzy title about my website.</h1>
      <div className="post-overviews">
        <h1>Posts</h1>
        {posts.map((post, i) => (
          <PostExcerpt post={post} lastPost={i == numArticles - 1} />
        ))}
      </div>

    <TagsSection tags={tags} />

    </div>
  );
}