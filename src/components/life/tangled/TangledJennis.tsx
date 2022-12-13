import { useEffect, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';

const jennisImages = [
  '/assets/images/img/img_tangled_jennis_1.png',
  '/assets/images/img/img_tangled_jennis_2.png',
  '/assets/images/img/img_tangled_jennis_3.png',
  '/assets/images/img/img_tangled_jennis_4.png',
  '/assets/images/img/img_tangled_jennis_5.png',
  '/assets/images/img/img_tangled_jennis_6.png',
  '/assets/images/img/img_tangled_jennis_7.png',
];

const jennis = Array.from(jennisImages, (v, i) => {
  return {
    src: v,
    alt: '제니스 이미지' + (i + 1),
  };
});

const TangledJennis = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const DELAY = 1000;
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === jennis.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, DELAY);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn('tangled-jennis-wrap')}>
      <div className={cn('tangled-jennis')}>
        <div className={cn('jennis-images-wrap')}>
          {jennis.map((jennis, index) => (
            <div key={'jennis-image' + index} className={cn('jennis-images', { 'jennis-active': index === activeIndex })}>
              <Image src={jennis.src} layout="fill" loader={NileCDNLoader} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TangledJennis;
