import { useState } from 'react';
import Image from 'next/image';

import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import IconScroll from '@images/icon/ico_arrow_scroll.svg';
import OutlineButton from '@/components/button/OutlineButton';
/* 22.11.24 수정: Unfolding Soon 추가 */
import Tag from '@/components/tag/Tag';

const TangledTop = () => {
  /* 22.10.26 수정: currentState 추가 */
  const [currentState, setCurrentState] = useState<string>('buy-now');
  const { t } = useTranslation(['life', 'common']);

  const changeButtonText = (state: string) => {
    switch (state) {
      case 'up-coming':
        return t('viewArtwork', { ns: 'common' });
      case 'buy-now':
        return t('buyNft', { ns: 'common' });
      default:
        return '';
    }
  };

  return (
    <div className={cn('life-tangled-top-section')}>
      <div className={cn('tangled-inner')}>
        {/* 22.11.24 수정: Unfolding Soon 추가 */}
        <Tag size="md-m" color="tag-black">
          Unfolding Soon!
        </Tag>
        <h2>
          <span>
            <Image src="/images/img_tangled_logo.png" alt={t('tangled.main.text')} layout="fill" quality="100" loading="eager" />
          </span>
          <strong>
            BE YOURSELF
            <br />
            BAG TIME
            <br />
            GET RICH
          </strong>
        </h2>
        <span className={cn('text-scroll')}>
          <IconScroll />
          scroll
        </span>
        <div className={cn('btn-wrap')}>
          <OutlineButton href="https://tangled.im/" target="_blank" color="white" size="lg" buttonText={t('downloadApp', { ns: 'common' })} />
          {/* 22.10.26 수정: 경매 상태에 따른 buttonText 수정 */}
          {/* 22.11.02 수정: 오픈 컨텐츠에는 버튼 임의 삭제 */}
          {/* 22.11.18 수정: 22일 오픈 버튼 수정 */}
          {/* 22.11.18 수정 : 기획 수정으로 버튼 삭제 */}
          {/* <BgButton href="https://" target="_blank" color="white" size="lg" buttonText={t('goToNFTs', { ns: 'common' })} /> */}
        </div>
      </div>
    </div>
  );
};

export default TangledTop;