import { atom, useRecoilState } from 'recoil';

export interface Dashboard {
  server?: {
    id: string;
    display_name: string;
  };
  saved: boolean;
  loading: boolean;
}

export const dashboardAtom = atom<Dashboard>({
  key: 'dashboard',
  default: {
    saved: false,
    loading: false,
  },
});

export default function useDashboardAtomState() {
  return useRecoilState(dashboardAtom);
}
