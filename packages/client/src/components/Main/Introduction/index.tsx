import React from 'react';
import { css } from '@emotion/react';
import Icon from '../../../static/icons';

export default function Introduction() {
  return (
    <div css={introductionStyleCSS}>
      <div>
        <div id="introduction__icon">
          <Icon name="BrandIconLarge" />
        </div>
        <div id="introduction__text">
          <span>간편하게 작성하세요</span>
          <span>간편하게 작성하세요</span>
          <span>간편하게 작성하세요</span>
        </div>
      </div>
    </div>
  );
}

const introductionStyleCSS = css`
  top: 0;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  & > div {
    display: flex;
    width: 1000px;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 13.75rem;
    & > #introduction__text {
      display: flex;
      flex-direction: column;
      & > span {
        color: white;
        font-size: 3.125rem;
        font-weight: bold;
        &:nth-of-type(1) {
          color: #ff5a5a;
        }
        &:nth-of-type(2) {
          color: #ff8f8f;
        }
      }
    }
  }
`;
