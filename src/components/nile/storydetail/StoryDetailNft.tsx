import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { message } from 'antd';

import cn from 'classnames';
import Tag from '@/components/tag/Tag';
import OutlineButton from '@/components/button/OutlineButton';
import { NileCDNLoader } from '@utils/image/loader';

interface StoryDetailNftType {
  data: StoryDetailNftData;
}

interface StoryDetailNftData {
  imgUrl: string;
  state: string;
  title: string;
  buttons: StoryDetailNftDataButton[];
  auction: {
    startBid: string;
    startIn: string;
  };
}

interface StoryDetailNftDataButton {
  name: string;
  link: string;
  type: 'primary' | 'default' | any;
  toastText?: string;
  /* 22.11.09 수정: disabled type 추가 */
  disabled: boolean;
}
const StoryDetailNft = ({ data }: StoryDetailNftType) => {
  const { t } = useTranslation(['nile', 'common']);
  const stateTag = (state: string) => {
    switch (state) {
      case 'upcoming':
        return (
          <Tag size="md-m" color="black">
            {/* 22.11.22 수정: 영문 유지로 다국어 삭제 */}
            Upcoming
          </Tag>
        );
    }
  };

  return (
    <div className={cn('story-detail-nft')}>
      <div className={cn('info')}>
        <div className={cn('info-image')}>
          <Image src={data.imgUrl} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
        </div>
        <div className={cn('info-content')}>
          {stateTag(data.state)}
          <strong className={cn('info-title')}>{data.title}</strong>
          <div className={cn('info-button')}>
            {data.buttons.map((btn, index) => (
              <OutlineButton
                type={btn.type}
                key={`btn-${index}`}
                /* 22.11.09 수정: link href 수정 */
                href={btn.disabled ? undefined : btn.link}
                buttonText={btn.name}
                color="black"
                size="sm"
                onClick={() =>
                  btn.disabled && message.info({ content: btn.toastText, key: 'toast' })
                } /* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */
              />
            ))}
          </div>
        </div>
      </div>
      <div className={cn('extra-info')}>
        <dl>
          <dt>{t('startingBid', { ns: 'common' })}</dt>
          <dd>
            {/* 22.11.10 수정: WEMIX -> WEMIX$로 변경 */}
            {data.auction.startBid} <span className={cn('unit')}>WEMIX$</span>
          </dd>
        </dl>
        <dl>
          {/* 22.11.11 수정 start: 텍스트 수정 */}
          <dt>Opens on</dt>
          <dd>{data.auction.startIn}</dd>
        </dl>
      </div>
    </div>
  );
};

export default StoryDetailNft;
