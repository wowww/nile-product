import cn from 'classnames';
import { Avatar } from 'antd';
import OutlineButton from '@/components/button/OutlineButton';
import { useTranslation } from 'next-i18next';
import { useNumberFormatter } from '@utils/formatter/number';

interface priceInfoTypes {
  type: 'text' | 'avatar';
  detailType?: 'price' | 'sale' | 'user';
  title: any;
  timeText?: boolean;
  value?: any;
  unit?: string;
  avatarBackground?: string;
  avatarClass?: string;
  userName?: string;
  hasHistory?: boolean;
  hasHistoryType?: string;
  setBidHistoryModal?: (value: boolean) => void;
  setBidHistoryModalType?: (type: string) => void;
}

const MarketplaceDetailPriceInfo = ({
  type,
  detailType,
  title,
  value,
  timeText,
  unit,
  avatarBackground,
  avatarClass,
  userName,
  hasHistory,
  hasHistoryType = 'bid',
  setBidHistoryModal,
  setBidHistoryModalType,
}: priceInfoTypes) => {
  const { t } = useTranslation(['marketplace', 'common']);

  const openHistoryModal = (type: string) => {
    /* 22.11.16 수정: 상속받은 prop으로 함수 교체 */
    setBidHistoryModal?.(true);
    setBidHistoryModalType?.(type);
  };

  const { shorthanded } = useNumberFormatter();

  return (
    <dl className={cn(type === 'avatar' && 'avatar-type')}>
      <dt className={cn('info-title')}>
        <span>{title}</span>
        {hasHistory && (
          <div className={cn('bidding-block')}>
            <OutlineButton
              buttonText={hasHistoryType === 'bid' ? t('bidHistoryPopup.title', { ns: 'common' }) : t('offerHistoryPopup.title', { ns: 'common' })}
              color="black"
              size="xs"
              onClick={() => {
                openHistoryModal(hasHistoryType === 'bid' ? 'buy' : 'offer');
              }}
            />
          </div>
        )}
      </dt>

      <dd>
        {type === 'text' && (
          <>
            <strong className={cn('info-text', detailType === 'sale' && 'counting-time')}>{timeText ? value: shorthanded(value)}</strong>
            {detailType === 'price' && <span className={cn('unit')}>{unit}</span>}
          </>
        )}
        {type === 'avatar' && (
          <>
            <button type="button" className={cn('btn-user-open')}>
              <Avatar
                className={cn('user-image', avatarClass !== '' ? avatarClass : '')}
                size={28}
                style={{ backgroundImage: `${avatarBackground !== '' && avatarBackground}` }}
              >
                <span className={cn('a11y')}>프로필 열기</span>
              </Avatar>
            </button>
            {detailType === 'user' && <span className={cn('user-name')}>{userName}</span>}
            {detailType === 'price' && (
              <>
                <strong className={cn('info-text')}>{timeText ? value : shorthanded(value)}</strong>
                <span className={cn('unit')}>{unit}</span>
              </>
            )}
          </>
        )}
      </dd>
    </dl>
  );
};

export default MarketplaceDetailPriceInfo;
