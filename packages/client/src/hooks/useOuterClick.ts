import { useEffect, RefObject } from 'react';

const useOuterClick = <T = any>(ref: RefObject<T>, handler: Function) => {
  useEffect(() => {
    const listener = (e: globalThis.MouseEvent) => {
      if (!ref.current || (ref.current as any).contains(e.target)) return;

      handler(e);
    };

    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};

export default useOuterClick;
