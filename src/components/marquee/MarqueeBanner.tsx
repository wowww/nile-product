import React from 'react';
import cn from 'classnames';
import useWindowResize from '@/hook/useWindowResize';
import { windowResizeAtom } from '@/state/windowAtom';
import { useAtomValue } from 'jotai';

interface marqueePropsType {
  itemList: string[];
  loopTimes: number;
  classNames?: string;
}

const MarqueeBanner: React.FC<marqueePropsType> = ({ itemList, loopTimes, classNames }) => {
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);

  const itemCount = itemList.length;
  const transitionDuration = `${itemCount * 5}s`;
  const bannerListStyle = {
    '--banner-show-el': itemCount,
    animation: `scrolling-banner${offset.width < 1280 ? '-m' : ''} ${transitionDuration} linear infinite`,
  } as React.CSSProperties;

  const originalEl: React.ReactElement[] = [];
  const copyEvent = (times: number) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
      originalEl.push(
        ...itemList.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={item + idx + i} className={cn('banner-item', item.split(' ').join('').toLocaleLowerCase())}>
            {item.toUpperCase()}
          </li>
        ))
      );
    }
    return originalEl;
  };

  return (
    <div className={cn('marquee-banner-wrap', classNames)}>
      <ul className={cn('marquee-banner')} style={bannerListStyle}>
        {copyEvent(loopTimes)}
      </ul>
    </div>
  );
};

export default MarqueeBanner;
