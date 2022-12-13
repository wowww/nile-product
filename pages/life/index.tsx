import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import LifeHeroBanner from '@/components/life/LifeHeroBanner';
import LifeBannerTypeContent from '@/components/life/LifeBannerTypeContent';
import LifeApply from '@/components/life/LifeApply';
import ContentTitle from '@/components/marketplace/ContentTitle';
import { ContentPropsType } from '@/components/life/LifeBannerTypeContent';
import LifeWhoNext from '@/components/life/LifeWhoNext';

const Life = () => {
  // 22.11.02 수정: useTranslation 추가
  /* 22.11.22 수정: common 추가 */
  const { t } = useTranslation(['life', 'common']);

  // 22.11.02 수정 start: 다국어 적용
  const bannerInnerContents: ContentPropsType[] = [
    /* 22.11.10 수정: 배너 순서 변경 */
    /* 22.11.11 수정: 배너 순서 변경 */
    /* 22.11.17 수정: 배너 순서 변경 */
    {
      tagText: 'Pixel Art',
      title: 'London Underground Station(LUS)\n264 Genesis',
      desc: t('home.nft.item.0.desc'),
      buttonLink: '/life/lus',
      metadata: [
        {
          name: t('home.nft.item.0.text1'),
          amount: '$2,490,371',
        },
        {
          name: t('home.nft.item.0.text2'),
          amount: '2,490,371',
        },
        {
          name: t('home.nft.item.0.text3'),
          amount: '$12,000',
        },
      ],
      classNames: 'lus',
      buttonText: t('discoverBtn', { ns: 'common' }),
    },
    {
      tagText: 'Collectibles',
      tagColor: 'gray',
      title: 'Sights of NILE(SON)',
      desc: t('home.nft.item.2.desc'),
      buttonLink: '/life/son',
      metadata: [
        {
          name: t('home.nft.item.2.text1'),
          amount: '$315,928',
        },
        {
          name: t('home.nft.item.2.text2'),
          amount: '123.40',
        },
        {
          name: t('home.nft.item.2.text3'),
          amount: '$12,000',
        },
      ],
      classNames: 'story',
      buttonText: t('discoverBtn', { ns: 'common' }),
    },

    {
      tagText: 'Talk to Earn',
      tagColor: 'gray',
      title: 'Tangled Timepieces',
      desc: t('home.nft.item.1.desc'),
      buttonLink: '/life/tangled',
      metadata: [
        {
          name: t('home.nft.item.1.text1'),
          amount: '$315,928',
        },
        {
          name: t('home.nft.item.1.text2'),
          amount: '$1.30',
        },
        {
          name: t('home.nft.item.1.text3'),
          amount: '30,315,928',
        },
      ],
      classNames: 'tangled',
      buttonText: t('discoverBtn', { ns: 'common' }),
    },
    {
      tagText: 'Move to Earn',
      tagColor: 'gray',
      title: 'SNKRZ',
      desc: t('home.nft.item.3.desc'),
      // 22.11.09 수정: 데이터 추가(unfoldingSoon)
      unfoldingSoon: t('home.nft.item.3.unfoldingSoon'),
      buttonLink: '/life/snkrz',
      // 22.11.09 수정: 데이터 추가(buttonDisabled)
      metadata: [
        {
          name: t('home.nft.item.3.text1'),
          amount: '$315,928',
        },
        {
          name: t('home.nft.item.3.text2'),
          amount: '123.40',
        },
        {
          name: t('home.nft.item.3.text3'),
          amount: '$12,000',
        },
        {
          name: t('home.nft.item.3.text4'),
          amount: '415,928',
        },
      ],
      classNames: 'snkrz',
      buttonText: t('discoverBtn', { ns: 'common' }),
    },
  ];
  // 22.11.02 수정 end: 다국어 적용

  return (
    <>
      <Helmet>
        <title>Life &gt; NILE</title>
      </Helmet>
      <div className={cn('life-wrap')}>
        <LifeHeroBanner />
        <div className={cn('life-inner')}>
          <ContentTitle title="Life NFT Projects" serif />
          {bannerInnerContents.map((item, index) => {
            return (
              <LifeBannerTypeContent
                key={index}
                tagText={item.tagText}
                title={item.title}
                desc={item.desc}
                // 22.11.09 수정: 데이터 추가(unfoldingSoon, buttonDisabled)
                unfoldingSoon={item.unfoldingSoon}
                buttonDisabled={item.buttonDisabled}
                buttonLink={item.buttonLink}
                metadata={item.metadata}
                classNames={item.classNames}
                tagColor={item.tagColor}
                /* 22.11.22 수정: 속성 추가 */
                buttonText={item.buttonText}
              />
            );
          })}
          <LifeWhoNext desc={t('home.nft.text')} />
        </div>
        <LifeApply />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'life'])),
    },
  };
};

export default Life;
