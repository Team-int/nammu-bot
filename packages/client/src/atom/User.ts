import { atom, useRecoilState } from 'recoil';

export interface User {
  logged_in: boolean;
  data?: {
    username: string;
    discriminator: string;
    avatar: string;
    email: string;
  };
}

export const userAtom = atom<User>({
  key: 'users',
  default: {
    logged_in: false,
  },
});

export default function useUserAtomState() {
  return useRecoilState(userAtom);
}
