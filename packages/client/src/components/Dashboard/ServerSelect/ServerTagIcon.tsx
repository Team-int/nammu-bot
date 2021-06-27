import React from 'react';
import useSelectedServerAtomState from '../../../atom/SelectedServer';
import { css } from '@emotion/react';
import { useCallback } from 'react';
import { useMemo } from 'react';

interface ServerTagIconProps {
  tag: string;
}

export default function ServerTagIcon({ tag }: ServerTagIconProps) {
  const [selected, setSelectedServer] = useSelectedServerAtomState();
  const isEqual = useMemo(() => selected.name === tag, [selected]);

  const onClick = useCallback(() => {
    setSelectedServer((prev) => ({ ...prev, name: tag }));
  }, [tag]);

  return (
    <div onClick={onClick} css={ServerTagIconStyleCSS(isEqual)}>
      <p>{tag}</p>
    </div>
  );
}

const ServerTagIconStyleCSS = (equal: boolean) => css`
  padding: 7px 16px;
  border-radius: 10px;
  background: ${equal ? '#0CA678' : '#1e1e1e'};
  cursor: pointer;
  display: flex;
  margin-bottom: 1rem;
  & > p {
    margin: 0;
    font-weight: bold;
    font-size: 1rem;
  }
`;
