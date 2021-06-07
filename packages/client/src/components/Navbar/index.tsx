import React from 'react';
import { css } from '@emotion/react';
import Icon from '../../static/icons';
import NavbarLink from './NavbarLink';

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
          <button>대시보드</button>
        </div>
      </div>
    </div>
  );
}

const navbarStyleCSS = css`
  max-width: 1440px;
  margin: 0 auto;
  position: sticky;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.8125rem 3.375rem;
    & > #navbar__contents {
      display: flex;
      flex-direction: row;
      align-items: center;
      button {
        padding: 14px 39px;
        background: white;
        border-radius: 25px;
        font-weight: bold;
        outline: none;
        border: none;
        margin-left: 25px;
      }
    }
  }
`;
