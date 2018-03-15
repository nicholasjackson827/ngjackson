import React from 'react';
import Link from 'gatsby-link';
import _ from 'lodash';

const Tag = (props) => (
  <Link className="tag" to={`/tags/${_.kebabCase(props.tag)}`}>
    {props.tag}
  </Link>
)

export default Tag