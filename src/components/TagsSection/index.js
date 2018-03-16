import React from 'react';
import Link from 'gatsby-link';
import Tag from '../Tag';

const TagSection = (props) => {
  return (
    <div className="tags-section">
      <h1>Tags</h1>
      <div className="tags">
        {props.tags.map(tag => (
          <Tag tag={tag} />
        ))}
      </div>
    </div>

  )
}

export default TagSection