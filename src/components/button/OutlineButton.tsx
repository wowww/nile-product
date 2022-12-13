/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Popover } from 'antd';
import { v4 as uid } from 'uuid';
import { useTranslation } from 'next-i18next';
// 22.11.09 수정 start: 라우트 연결 추가로 import
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

interface buttonPropsType {
  onClick?: () => void;
  buttonText: string;
  block?: boolean;
  color: string;
  size: string;
  disabled?: boolean;
  iconType?: boolean; // iconType 일 경우 true
  iconValue?: string; // icon name
  align?: boolean; // space-between 일 경우 true
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined; // link 타입일 경우 link 타입 추가
  href?: string; // link 타입일 경우에만 추가
  target?: string; // link 타입이고 새창열림일 경우 추가
  hasTooltip?: boolean; // 툴팁 여부
  tooltipPlace?: any; // 툴팁 방향 컨트롤 필요 시
}

const OutlineButton: React.FC<buttonPropsType> = ({
  onClick,
  buttonText,
  block,
  color,
  size,
  iconType,
  iconValue,
  align,
  disabled,
  type,
  href,
  target,
  hasTooltip,
  tooltipPlace = 'bottom',
}) => {
  const { t } = useTranslation(['common']);
  // 22.11.09 수정: 라우트 연결 추가
  const { locale } = useRouter();
  const key = uid();
  const offset = useAtomValue(windowResizeAtom);
  const [isOpenTooltip, setOpenToolTip] = useState(false);
  const viewIcon = () => {
    switch (iconValue) {
      case 'info': // info icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />;
      case 'papyrus': // Papyrus icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_papyrus.svg' />;
      case 'reset': // reset icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_reset.svg' />;
      case 'filter': // filter icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_filter.svg' />;
      case 'alarm': // alarm icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_alarm.svg' />;
      case 'link': // link icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />;
      case 'twitterColor': // twitter color icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_twitter_color.svg' />;
      case 'instaColor': // twitter color icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_insta_color.svg' />;
      case 'line-arrow': // line-arrow color icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />;
      case 'album': // album icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_album.svg' />;
      default:
        return false;
    }
  };

  const typeIcon = () => {
    if (!iconType) {
      return buttonText;
    }
    if (!align) {
      return (
        <span className={cn('btn-inner')}>
          {viewIcon()}
          <span>{buttonText}</span>
        </span>
      );
    }
    return (
      <span className={cn('btn-inner space-between')}>
        <span>{buttonText}</span>
        {viewIcon()}
      </span>
    );
  };

  const handleOpenTooltip = (newOpen: boolean) => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setOpenToolTip(true);
    } else if (offset.width < 768) {
      setOpenToolTip(true);
    } else {
      if (event?.currentTarget === document) {
        setOpenToolTip(true);
        return;
      }
      setOpenToolTip(newOpen);
    }
  };

  // resize 시
  useEffect(() => {
    if (offset.width === 0) {
      return;
    }
    if (offset.width >= 768 && offset.width <= 1279) {
      setOpenToolTip(true);
    } else if (offset.width < 768) {
      setOpenToolTip(true);
    } else {
      setOpenToolTip(false);
    }
  }, [offset.width]);

  // 22.11.09 수정: 라우트 연결 추가
  const localeValue = locale === 'ko' ? `/${locale}` : '';

  return (
    // 22.11.09 수정 start: 라우트 연결 추가
    <>
      {hasTooltip ? (
        <Popover
          overlayClassName="tooltip"
          placement={tooltipPlace}
          content={<div className={cn('tooltip-contents')}>Unfolding Soon</div>}
          trigger="click"
          open={isOpenTooltip}
          onOpenChange={handleOpenTooltip}
        >
          {href ? (
            <Link href={target === '_blank' ? href : { pathname: localeValue + href }} key={key} passHref={target === '_blank'}>
              <a
                onClick={onClick}
                className={cn(`ant-btn btn btn-outline outline-${color} btn-${size} `)}
                target={target}
                title={target === '_blank' ? t('blank') : undefined}
              >
                <span>{typeIcon()}</span>
              </a>
            </Link>
          ) : (
            <Button
              onClick={onClick}
              block={block}
              className={cn(`btn btn-outline outline-${color} btn-${size} `)}
              disabled={disabled}
              type={type}
              key={key}
              title={target === '_blank' ? t('blank') : undefined}
            >
              {typeIcon()}
            </Button>
          )}
        </Popover>
      ) : href ? (
        <Link href={target === '_blank' ? href : { pathname: localeValue + href }} key={key} passHref={target === '_blank'}>
          <a
            onClick={onClick}
            className={cn(`ant-btn btn btn-outline outline-${color} btn-${size} `, type)}
            target={target}
            title={target === '_blank' ? t('blank') : undefined}
          >
            <span>{typeIcon()}</span>
          </a>
        </Link>
      ) : (
        <Button
          onClick={onClick}
          block={block}
          className={cn(`btn btn-outline outline-${color} btn-${size} `)}
          disabled={disabled}
          type={type}
          key={key}
          title={target === '_blank' ? t('blank') : undefined}
        >
          {typeIcon()}
        </Button>
      )}
    </>
    // 22.11.09 수정 end: 라우트 연결 추가
  );
};
export default OutlineButton;
