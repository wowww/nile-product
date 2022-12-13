import { useCallback, useEffect } from 'react';
import useWindowScroll from '@/hook/useWindowScroll';
import { windowScrollAtom, windowScrollLockAtom } from '@/state/windowAtom';
import { useAtom } from 'jotai';

const useScrollLock = (isOpen: boolean) => {
  const scroll = useWindowScroll();
  const [saveScroll, setSaveScroll] = useAtom(windowScrollAtom);
  const [isScrollLock, setScrollLockState] = useAtom(windowScrollLockAtom);
  const lockEvent = useCallback(() => {
    const body = document.querySelector('body');
    if (isOpen) {
      if (!isScrollLock.state) {
        setSaveScroll(scroll);
        setScrollLockState({
          state: true,
          modalActiveCount: 1,
        });
        body?.classList.add('lock');
        document.documentElement.style.setProperty('--scroll', `-${scroll}px`);
      } else {
        // 팝업 위에 팝업이 열릴 경우 스크롤 값 갱신 및 스크롤 락 풀리는 현상 방지 코드
        setScrollLockState({
          state: isScrollLock.state,
          modalActiveCount: isScrollLock.modalActiveCount + 1,
        });
      }
    } else {
      if (isScrollLock.modalActiveCount > 1) {
        setScrollLockState({
          state: isScrollLock.state,
          modalActiveCount: isScrollLock.modalActiveCount - 1,
        });
      } else if (isScrollLock.modalActiveCount === 1) {
        body?.classList.remove('lock');
        window.scrollTo(0, saveScroll);
        setScrollLockState({
          state: false,
          modalActiveCount: 0,
        });
      }
    }
  }, []);
  useEffect(() => {
    lockEvent();
  }, [isOpen]);
};

export default useScrollLock;
