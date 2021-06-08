import React, { useEffect, useMemo, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import Icon from '../../../static/icons';

export default function Introduction() {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    setHeight(window.innerHeight);

    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div css={introductionStyleCSS}>
      <div id="introduction__content">
        <div id="introduction__icon">
          <Icon name="BrandIconLarge" />
        </div>
        <div id="introduction__text">
          <span>간편하게 작성하세요</span>
          <span>간편하게 작성하세요</span>
          <span>간편하게 작성하세요</span>
        </div>
      </div>
      <div id="introduction__check_down">
        <span>더 알아보기</span>
        <div onClick={() => window.scroll({ top: height, behavior: 'smooth' })}>
          <Icon name="ArrowDown" />
        </div>
      </div>
    </div>
  );
}

const float = keyframes`
  0% {
    transform: translateY(0%)
  }
  50% {
    transform: translateY(7.5%)
  }
  55% {
    transform: translateY(7.5%)
  }
  100% {
    transform: translateY(0%)
  }
`;

const introductionStyleCSS = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 155px);
  width: 100vw;
  & > #introduction__content {
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
    z-index: auto;
  }
  & > #introduction__check_down {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 7px;
    color: white;
    font-weight: bold;
    flex-direction: column;
    span {
      line-height: 0.3;
    }
    & > div {
      cursor: pointer;
      text-align: center;
      animation: ${float} 1s ease infinite;
    }
  }
`;
