import React from 'react';
import PostExcerpt from '../components/PostExcerpt'
import TagsSection from '../components/TagsSection'

import './tag.styl'

export default function Template({ pathContext, data }) {

  let posts = [];

  data.allMarkdownRemark.edges.map(node => posts.push(node));
  const {tag} = pathContext;

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
    <div className="tags-index">
      <h1>Posts tagged with "{tag}"</h1>
      <div className="post-overviews">
        {posts.map((post, i) => (
          <PostExcerpt post={post} lastPost={i == posts.length - 1} />
        ))}
      </div>
      <TagsSection tags={tags} />
    </div>
  )
}

export const tagQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            path
            date
            tags
          }
        }
      }
    }
  }
`