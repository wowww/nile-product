import cn from 'classnames';
import LifeCommunityCard from '@components/life/LifeCommunityCard';
import LifeTheTeam from '@components/life/LifeTheTeam';
import { useTranslation } from 'next-i18next';

const TangledOverview = () => {
  const { t } = useTranslation('life');

  const cardNewsData = [
    {
      image: '/images/img_life_community01.png',
      title: t('tangled.overview.community.title'),
      cont: t('tangled.overview.community.desc'),
    },
    {
      image: '/images/img_life_community02.png',
      title: t('tangled.overview.community2.title'),
      cont: t('tangled.overview.community2.desc'),
    },
    {
      image: '/images/img_life_community03.png',
      title: t('tangled.overview.community3.title'),
      cont: t('tangled.overview.community3.desc'),
    },
  ];

  return (
    <div className={cn('life-tangled-inner overview')}>
      <div className={cn('tangled-community')}>
        <strong>{t('tangled.overview.title')}</strong>
        <LifeCommunityCard data={cardNewsData} />
      </div>
      <div className={cn('tangled-team')}>
        <strong>{t('tangled.overview.theTeam.title')}</strong>
        <LifeTheTeam />
      </div>
    </div>
  );
};

export default TangledOverview;
