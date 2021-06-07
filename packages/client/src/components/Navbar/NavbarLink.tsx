import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';

interface NavbarLinkProps {
  content: string;
  to: string;
}

export default function NavbarLink({ content, to }: NavbarLinkProps) {
  return (
    <span css={navbarLinkStyleCSS}>
      <Link href={to}>{content}</Link>
    </span>
  );
}

const navbarLinkStyleCSS = css`
  & > a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.125rem;
    margin: 0 1.5625rem;
  }
`;
