import { useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { useAtom } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

const useWindowResize = () => {
  const [windowOffset, setOffset] = useAtom(windowResizeAtom);

  const handleResize = useCallback(() => {
    setOffset({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', throttle(handleResize, 200));
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowOffset;
};

export default useWindowResize;
