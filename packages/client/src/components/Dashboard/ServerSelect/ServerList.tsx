import React from 'react';
import { css } from '@emotion/react';
import ServerTagIcon from './ServerTagIcon';
import useSelectedServerAtomState from '../../../atom/SelectedServer';

export default function ServerList() {
  const [selectedServer] = useSelectedServerAtomState();
  const servers = React.useMemo(() => selectedServer.servers, []);

  return (
    <div css={ServerListStyleCSS}>
      <div>
        {servers.map((v, i) => (
          <ServerTagIcon tag={v.name} key={i} />
        ))}
      </div>
    </div>
  );
}

const ServerListStyleCSS = css`
  width: 600px;
  background: #1a1a1a;
  border-radius: 0 0 10px 10px;
  cursor: initial;
  position: absolute;
  & > div {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-x: scroll;
    padding: 1rem 30px;
    & div:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;
