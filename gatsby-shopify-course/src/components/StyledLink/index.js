import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

// styled-compoenentのrenderには必ずclassNameが必要
const Link = ({ to, className, children }) => {
  return (
    <GatsbyLink to={to} className={className}>
      {children}
    </GatsbyLink>
  );
};

export const StyledLink = styled(Link)``;
