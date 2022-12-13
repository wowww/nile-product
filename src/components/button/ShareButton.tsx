import React from 'react';
import { useRouter } from 'next/router';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import cn from 'classnames';

import { Dropdown, message } from 'antd';
import BgButton from '@/components/button/BgButton';
import { useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';

interface buttonPropsType {
  buttonType?: string;
  placement?: 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'top' | 'bottom' | undefined;
  telegram?: boolean;
  facebook?: boolean;
  customPath?: string;
}

const ShareButton: React.FC<buttonPropsType> = ({ buttonType, placement = 'bottomRight', telegram, facebook, customPath }) => {
  const { asPath, locale } = useRouter();

  const { t } = useTranslation('common');

  // share용 정보
  const shareUrl = `https://www.nile.io${locale === 'ko' ? '/ko' : ""}${customPath ? customPath : asPath}`;
  const shareTitle = 'NFT Is Life Evolution';
  const shareHashs = ['NILE'];
  const shareUsers = 'NILE_WM';

  const buttonView = () => {
    switch (buttonType) {
      case 'bgButton':
        return (
          <div>
            <BgButton buttonText={t('share', { ns: 'common' })} color={'black'} size={'md'} />
          </div>
        );
      default:
        return (
          <button type="button" className={cn('btn-share')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_share.svg" />
            <span className={cn('a11y')}>{t('share', { ns: 'common' })}</span>
          </button>
        );
    }
  };

  return (
    <div className={cn('share-wrap')}>
      <Dropdown
        overlay={
          <ul className={cn('share-list')}>
            {facebook && (
              <li>
                <FacebookShareButton title={shareTitle} url={shareUrl} hashtag={'#NILE'}>
                  Facebook
                </FacebookShareButton>
              </li>
            )}
            <li>
              <TwitterShareButton title={shareTitle} url={shareUrl} hashtags={shareHashs} via={shareUsers}>
                {t('shareBtn.twitter')}
              </TwitterShareButton>
            </li>
            {telegram && (
              <li>
                <TelegramShareButton title={shareTitle} url={shareUrl}>
                  Telegram
                </TelegramShareButton>
              </li>
            )}
            <li>
              <CopyToClipboard text={shareUrl}>
                {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
                <button type="button" onClick={() => message.info({ content: t('completeCopy'), key: 'toast' })}>
                  {t('shareBtn.copy')}
                </button>
              </CopyToClipboard>
            </li>
          </ul>
        }
        trigger={['click']}
        placement={placement}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
      >
        {buttonView()}
      </Dropdown>
    </div>
  );
};

export default ShareButton;
