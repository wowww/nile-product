import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import DaoLnb from '@/components/dao/DaoLnb';
import DoaHeader from '@/components/dao/DaoHeader';
import { throttle } from 'lodash';
import { useAtom } from 'jotai';
import { daoHeaderAtom } from '@/state/daoAtom';

interface DaoLayoutPropsType {
  children: ReactNode;
  activate: string;
}

const DaoLayout: React.FC<DaoLayoutPropsType> = ({ children, activate }) => {
  const [activeDaoHeader, setActiveDaoHeader] = useAtom(daoHeaderAtom);
  const daoContainerRef = useRef(null);
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [nonTransition, setNonTransition] = useState(true);
  const documentRef = useRef<Document>();

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const { pageYOffset } = window;
        const deltaY = pageYOffset - pageY;
        const hide = pageYOffset !== 0 && deltaY >= 0;
        const daoContainer = daoContainerRef.current as HTMLElement | null;
        setHide(hide);
        setPageY(pageYOffset);
        setActiveDaoHeader(daoContainer!.offsetTop <= window.scrollY);
        setNonTransition(window.scrollY <= daoContainer!.offsetTop + 20);
      }, 500),
    [pageY, setActiveDaoHeader]
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  return (
    <div className={cn('dao-page-wrap')}>
      <DoaHeader classnames={cn(activeDaoHeader && 'dao-header-active', hide ? 'hide' : 'active', nonTransition && 'non-transition')} />
      <div className={cn('dao-page')} ref={daoContainerRef}>
        <div className={cn('dao-container')}>
          <DaoLnb activate={activate} classnames={cn(activeDaoHeader && 'lnb-active', hide ? 'hide' : 'active')} />
          <div className={cn('dao-content-wrap')}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DaoLayout;
