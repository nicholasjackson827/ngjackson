import React from 'react'
import Link from 'gatsby-link'

const PostExcerpt = (props) => {

  const post = props.post.node;
  const {frontmatter} = post;

  const postDate = new Date(frontmatter.date);
  // Use the default 'en-US' language for pre-render since navigator isn't defined yet
  const locale = typeof(navigator) == 'undefined' ? 'en-US' : navigator.language;
  const postMonth = postDate.toLocaleString(locale, {month: "long"});
  const postDay = postDate.toLocaleString(locale, {day: "2-digit"});
  const postYear = postDate.toLocaleString(locale, {year: "numeric"});
  const smallPostDate = postMonth + ' ' + postDay + ' ' + postYear;

  return (
    <div className="post">
      <div className="post-top-row">
        <div className="post-date">
          <span className="post-month">{postMonth}</span>
          <span className="post-day">{postDay}</span>
          <span className="post-year">{postYear}</span>
        </div>
        <h3 className="post-title">
          <Link
            key={post.id}
            to={frontmatter.path}>
            {frontmatter.title}
          </Link>
        </h3>
      </div>
      <span className="post-date-small">{smallPostDate}</span>
      <p className="post-preview">
        {post.excerpt}
      </p>
      <div className="post-tags">
        {frontmatter.tags &&
         frontmatter.tags.map(tag => (
          <span className="tag">{tag}</span>
        ))}
      </div>
      {!props.lastPost &&
        <div className="post-connector"></div>
      }
    </div>
  )

}

export default PostExcerpt