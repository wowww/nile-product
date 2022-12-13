import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import IconScroll from '@images/icon/ico_arrow_scroll.svg';

import OutlineButton from '@/components/button/OutlineButton';
/* 22.11.24 수정: Unfolding Soon 추가 */
import Tag from '@/components/tag/Tag';

const SnkrzTop = () => {
  const { t } = useTranslation(['life', 'common']);

  return (
    <div className={cn('life-snkrz-top-section')}>
      <div className={cn('snkrz-inner')}>
        {/* 22.11.24 수정: Unfolding Soon 추가 */}
        <Tag size="md-m" color="tag-black">
          Unfolding Soon!
        </Tag>
        <h2>SNKRZ</h2>
        <p>{t('snkrz.main.title')}</p>
        <div className={cn('btn-wrap')}>
          <OutlineButton href="https://www.thesnkrz.com/" target="_blank" color="white" size="lg" buttonText={t('downloadApp', { ns: 'common' })} />
        </div>
        <span className={cn('text-scroll')}>
          <IconScroll />
          scroll
        </span>
      </div>
    </div>
  );
};

export default SnkrzTop;