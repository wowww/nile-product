import cn from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { windowResizeAtom } from '@/state/windowAtom';
import OutlineButton from '@/components/button/OutlineButton';
import { useRouter } from 'next/router';
import { Collapse } from 'antd';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';
import { useAtomValue } from 'jotai';

const LifeNileOverView = () => {
  const router = useRouter();
  const [size, setSize] = useState('lg');
  const offset = useAtomValue(windowResizeAtom);
  const { Panel } = Collapse;
  const { t } = useTranslation(['life', 'common']);

  useEffect(() => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [offset.width]);

  return (
    <div className={cn('life-overview-wrap')}>
      <div className={cn('life-overview-web3')}>
        <h3 className={cn('web3-title')}>
          <div className="icon-area">
            <Image src="/assets/images/img/ico_life_web3_key.png" alt="" layout="fill" objectFit="contain" loader={NileCDNLoader} />
          </div>
          {t('nile.overview.key.title')}
        </h3>
        <strong className={cn('web3-sub-title')}>{t('nile.overview.key.subtitle')}</strong>
        <p className={cn('life-overview-desc')}>{t('nile.overview.key.desc')}</p>
      </div>
      <div className={cn('life-overview-content')}>
        <div className={cn('life-overview-creators')}>
          <div className={cn('creators-text-area')}>
            <strong className="creators-sub-title">{t('nile.overview.cont1.subtitle')}</strong>
            <h3 className={cn('creators-title')}>{t('nile.overview.cont1.title')}</h3>
            <p className={cn('life-overview-desc')}>{t('nile.overview.cont1.desc')}</p>
          </div>
          <div className={cn('creators-img-area')}>
            <Image src={`/images/img_life_overview_creator.svg`} width={418} height={252} loader={NileCDNLoader} />
          </div>
        </div>
        <div className={cn('life-overview-community')}>
          <div className={cn('community-img-area')}>
            <Image src={`/images/img_life_overview_community.svg`} width={444} height={324} loader={NileCDNLoader} />
          </div>
          <div className={cn('community-text-area')}>
            <strong className="community-sub-title">{t('nile.overview.cont2.subtitle')}</strong>
            <h3 className={cn('community-title')}>{t('nile.overview.cont2.title')} </h3>
            <p className={cn('life-overview-desc')}>{t('nile.overview.cont2.desc')}</p>
          </div>
        </div>
      </div>
      <div className={cn('life-overview-space')}>
        <video autoPlay loop muted playsInline>
          <source src="/video/life_bg.mp4" type="video/mp4" />
        </video>
        <div className={cn('overview-space-text')}>
          <strong className={cn('overview-space-desc')}>{t('nile.overview.space.desc')}</strong>
          <OutlineButton buttonText={t('nile.overview.space.btn')} color="white" size="md" onClick={() => router.push('/nile/story')} />
        </div>
        <Image src="/assets/images/img/bg_life_who_next.png" alt="" layout="fill" objectFit="cover" loader={NileCDNLoader} />
      </div>
      {size === 'sm' ? (
        <div className={cn('life-overview-faq')}>
          <div className={cn('overview-faq-wrap')}>
            <h3 className={cn('overview-faq-title')}>{t('nile.overview.FAQ.title')}</h3>
            <Collapse expandIconPosition="end">
              <Panel header={t('nile.overview.FAQ.q1.title')} key="1">
                <p>{t('nile.overview.FAQ.q1.desc')}</p>
              </Panel>
              <Panel header={t('nile.overview.FAQ.q2.title')} key="2">
                <p>{t('nile.overview.FAQ.q2.desc')}</p>
              </Panel>
              <Panel header={t('nile.overview.FAQ.q3.title')} key="3">
                <p>{t('nile.overview.FAQ.q3.desc')}</p>
              </Panel>
              <Panel header={t('nile.overview.FAQ.q4.title')} key="4">
                <p>{t('nile.overview.FAQ.q4.desc')}</p>
              </Panel>
            </Collapse>
          </div>
        </div>
      ) : (
        <div className={cn('life-overview-faq')}>
          <div className={cn('overview-faq-wrap')}>
            <h3 className={cn('overview-faq-title')}>{t('nile.overview.FAQ.title')}</h3>
            <ul className={cn('overview-faq-content')}>
              <li className={cn('overview-faq-item')}>
                <strong className={cn('faq-content-title')}>{t('nile.overview.FAQ.q1.title')}</strong>
                <p className={cn('faq-content-desc')}>{t('nile.overview.FAQ.q1.desc')}</p>
              </li>
              <li className={cn('overview-faq-item')}>
                <strong className={cn('faq-content-title')}>{t('nile.overview.FAQ.q2.title')}</strong>
                <p className={cn('faq-content-desc')}>{t('nile.overview.FAQ.q2.desc')}</p>
              </li>
              <li className={cn('overview-faq-item')}>
                <strong className={cn('faq-content-title')}>{t('nile.overview.FAQ.q3.title')}</strong>
                <p className={cn('faq-content-desc')}>{t('nile.overview.FAQ.q3.desc')}</p>
              </li>
              <li className={cn('overview-faq-item')}>
                <strong className={cn('faq-content-title')}>{t('nile.overview.FAQ.q4.title')}</strong>
                <p className={cn('faq-content-desc')}>{t('nile.overview.FAQ.q4.desc')}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default LifeNileOverView;
