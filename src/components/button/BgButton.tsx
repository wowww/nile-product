/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';
import { Button, Popover } from 'antd';
import { v4 as uid } from 'uuid';
import { useTranslation } from 'next-i18next';
/* 22.11.16 수정: resize 제거 */
// 22.11.09 수정 start: 라우트 연결 추가로 import
import Link from 'next/link';
import { useRouter } from 'next/router';
// 22.11.09 수정 end: 라우트 연결 추가로 import
import { ReactSVG } from 'react-svg';

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
  htmlType?: "button" | "submit" | "reset" | undefined;
}

const BgButton: React.FC<buttonPropsType> = ({
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
  tooltipPlace,
  htmlType,
}) => {
  const { t } = useTranslation(['common']);
  const key = uid();
  const colorType = `bg-${color}`;
  const sizeType = `btn-${size}`;
  /* 22.11.16 수정: resize 제거 */
  // const offset = useAtomValue(windowResizeAtom);
  // 22.11.09 수정: 라우트 연결 추가
  const { locale } = useRouter();

  const viewIcon = () => {
    switch (iconValue) {
      case 'info': // info icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />;
      case 'papyrus': // Papyrus icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_papyrus.svg' />;
      case 'alarm': // alarm icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_alarm.svg' />;
      case 'link':
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />;
      case 'ios': // ios icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_os_ios.svg' />;
      case 'android': // android icon
        return <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_os_android.svg' />;
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
          open={true}
        >
          {href ? (
            <Link href={target === '_blank' ? href : { pathname: localeValue + href }} key={key} passHref={target === '_blank'}>
              <a
                onClick={onClick}
                key={key}
                className={cn(`ant-btn btn btn-bg ${colorType} ${sizeType}`, type)}
                title={target === '_blank' ? t('blank') : undefined}
                target={target}
              >
                <span>{typeIcon()}</span>
              </a>
            </Link>
          ) : (
            <Button
              onClick={onClick}
              block={block}
              className={cn(`btn btn-bg ${colorType} ${sizeType}`)}
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
            key={key}
            className={cn(`ant-btn btn btn-bg ${colorType} ${sizeType}`, type)}
            title={target === '_blank' ? t('blank') : undefined}
            target={target}
          >
            <span>{typeIcon()}</span>
          </a>
        </Link>
      ) : (
        <Button
          onClick={onClick}
          block={block}
          className={cn(`btn btn-bg ${colorType} ${sizeType}`)}
          disabled={disabled}
          type={type}
          target={target}
          key={key}
          title={target === '_blank' ? t('blank') : undefined}
          htmlType={htmlType}
        >
          {typeIcon()}
        </Button>
      )}
    </>
    // 22.11.09 수정 end: 라우트 연결 추가
  );
};
export default BgButton;
