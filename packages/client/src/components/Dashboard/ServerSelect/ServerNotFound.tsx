import React from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';

export default function ServerNotFound() {
  return (
    <div css={ServerNotFoundStyleCSS}>
      <div id="content">
        <Image
          src="/undraw_server_not_found.png"
          alt="server_not_found from undraw_image"
          width={588}
          height={308}
        />
        <h1>서버를 찾을 수 없어요</h1>
        <button>초대하기</button>
      </div>
      <div id="tip">
        서버를 초대했는데도 안 보이는 경우 <span>여기</span>를 확인하세요
      </div>
    </div>
  );
}

const ServerNotFoundStyleCSS = css`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  img {
    user-select: none;
  }
  & > div[id='content'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      color: #949494;
      font-size: 2.25rem;
      font-weight: bold;
      margin: 42px 0;
    }
    button {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      background: #0ca678;
      border: none;
      border-radius: 10px;
      padding: 12px 23px;
      cursor: pointer;
    }
  }
  & > div[id='tip'] {
    color: #a6a6a6;
    position: absolute;
    bottom: 32px;
    & > span {
      color: #50a0b9;
      cursor: pointer;
    }
  }
`;
