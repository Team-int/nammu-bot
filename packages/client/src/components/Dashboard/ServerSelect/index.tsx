import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import Icon from '../../../static/icons';
import ServerList from './ServerList';
import useSelectedServerAtomState from '../../../atom/SelectedServer';
import useOuterClick from '../../../hooks/useOuterClick';
import useGetUserGuilds from '../../../hooks/useGetUserGuilds';
import { useEffect } from 'react';
import useDashboardAtomState from '../../../atom/Dashboard';
import useLoadingAtomState from '../../../atom/Loading';
import { useRouter } from 'next/router';

export default function ServerSelect() {
  const [selected] = useSelectedServerAtomState();
  const [, setDashboard] = useDashboardAtomState();
  const [opened, setOpened] = useState(false);
  const [, setIsLoading] = useLoadingAtomState();
  const router = useRouter();

  const { getUserGuilds } = useGetUserGuilds();

  const serverListEl = useRef<HTMLDivElement>(null);

  const onArrowClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const server = selected.servers.find((v) => v.name === selected.name);

    setDashboard((prev) => ({
      ...prev,
      server: {
        id: server.id,
        display_name: server.name,
      },
    }));

    router.push(`/servers/${server.id}`);
  };

  const onContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpened((prev) => !prev);
  };

  const outerSideClickHandler = () => {
    if (!opened) return;

    setOpened(false);
  };

  const getGuilds = async () => {
    setIsLoading(true);

    await router.push('/loading?redirect=/servers');

    await getUserGuilds();

    setIsLoading(false);
  };

  useEffect(() => {
    if (selected.name) return;
    getGuilds();
  }, []);

  useOuterClick(serverListEl, outerSideClickHandler);

  return (
    <div css={ServerSelectStyleCSS(opened)}>
      <div id="icon">
        <Icon name="BrandIcon" />
      </div>
      <div id="content">
        <h1>서버선택</h1>
        <div id="selector">
          <div onClick={onContentClick}>
            <h1>{selected.name || '로딩중...'}</h1>
          </div>
          <div onClick={onArrowClick}>
            <Icon name="CompleteArrowRight" />
          </div>
        </div>
        <div id="server_list" ref={serverListEl}>
          <div>{opened && <ServerList />}</div>
        </div>
        <div id="message">
          <p>관리할 서버를 선택해주세요</p>
        </div>
      </div>
    </div>
  );
}

const ServerSelectStyleCSS = (opened: boolean) => css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & > div[id='icon'] {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    & > svg {
      padding: 45px 54px;
    }
  }
  & > div[id='content'] {
    color: white;
    display: flex;
    flex-direction: column;
    & > h1 {
      font-size: 3.75rem;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
    & > div[id='selector'] {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: #1a1a1a;
      margin-top: 30px;
      border-radius: ${opened ? '10px 10px 0 0' : '10px'};
      width: 600px;
      & > div:nth-of-type(1) {
        width: 100%;
        & > h1 {
          margin: 0;
          width: 100%;
          padding: 17px 0 17px 30px;
          font-size: 1.875rem;
        }
      }
      & > div:nth-of-type(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 22px;
      }
    }
    & > div[id='server_list'] {
      z-index: 2;
    }
    & > div[id='message'] {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px;
      z-index: 1;
      & > p {
        padding: 0;
        margin: 0;
        color: #909090;
      }
    }
  }
`;
