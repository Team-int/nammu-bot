import { atom, useRecoilState } from 'recoil';

export interface Server {
  id: string;
  joined: boolean;
  owner_id: string;
  name: string;
}

export interface SelectedServer {
  name?: string;
  servers?: Server[];
  loaded: boolean;
}

export const selectedServerAtom = atom<SelectedServer>({
  key: 'selected_server',
  default: {
    name: '',
    servers: [],
    loaded: false,
  },
});

export default function useSelectedServerAtomState() {
  return useRecoilState(selectedServerAtom);
}
