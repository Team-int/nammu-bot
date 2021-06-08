import React from 'react';
import { css } from '@emotion/react';
import Icon from '../../../static/icons';

export default function About() {
  return (
    <div css={aboutStyleCSS}>
      <div>
        <div id="about__content">
          <span>ABOUT</span>
          <h1>
            쉽게
            <br />
            작성하세요
          </h1>
          <p>
            더 이상의 디스코드 임베드를 어렵게 작성하지 않아도 됩니다
            <br />
            이제 쉽고 편하게 보내세요
          </p>
          <button>초대하기</button>
        </div>
        <div id="about__embed">
          <Icon name="EmbedPreview" />
        </div>
      </div>
    </div>
  );
}

const aboutStyleCSS = css`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1440px;
    justify-content: center;
    margin-left: 8.875rem;
    & > #about__content {
      display: flex;
      flex-direction: column;
      span {
        background: linear-gradient(
          90deg,
          #5086d7 0.12%,
          #b677dd 7.5%,
          #db61c0 10.95%,
          #ff5290 13.87%,
          #ff4980 15.78%
        );
        font-weight: bold;
        font-size: 1.25rem;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      h1 {
        color: white;
        font-weight: bold;
        font-size: 4.5rem;
        margin: 1rem 0 0 0;
        padding: 0;
      }
      p {
        font-size: 1.125rem;
        font-weight: bold;
        line-height: 22px;
        color: white;
        margin: 3rem 0;
      }
      button {
        width: 144px;
        color: black;
        font-weight: bold;
        font-size: 1.25rem;
        padding: 12px 35px;
        border-radius: 50px;
        border: none;
        outline: none;
      }
    }
    & > svg {
      transform: rotate(8.5deg);
    }
    & > #about__embed {
      margin: 0;
    }
  }
`;
