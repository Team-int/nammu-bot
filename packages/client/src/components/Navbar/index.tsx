import React from 'react';
import { css } from '@emotion/react';
import Icon from '../../static/icons';
import NavbarLink from './NavbarLink';
import DashboardButton from './DashboardButton';

export default function Navbar() {
  return (
    <div css={navbarStyleCSS}>
      <div>
        <div id="navbar__icons">
          <Icon name="BrandIcon" />
        </div>
        <div id="navbar__contents">
          <NavbarLink content="About" to="/about"></NavbarLink>
          <NavbarLink content="Commands" to="/commands"></NavbarLink>
          <NavbarLink content="Invite" to="/invite"></NavbarLink>
          <DashboardButton />
        </div>
      </div>
    </div>
  );
}

const navbarStyleCSS = css`
  position: -webkit-sticky;
  position: sticky;
  max-width: 1440px;
  background: #121212;
  top: 0px;
  margin: 0 auto;
  z-index: 2;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.8125rem 3.375rem;
    & > #navbar__contents {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
