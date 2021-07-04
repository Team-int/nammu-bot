import { atom, useRecoilState } from 'recoil';

export type Loading = boolean;

export const loadingAtom = atom<Loading>({
  key: 'loading',
  default: false,
});

export default function useLoadingAtomState() {
  return useRecoilState(loadingAtom);
}
