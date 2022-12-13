import cn from 'classnames';
import { ReactSVG } from 'react-svg';

interface Empty {
  /* 22.11.17 수정: 케이스 추가 */
  iconType?: 'filter' | 'search' | 'account';
  text?: string | React.ReactElement;
  subText?: string | React.ReactElement;
  className?: string;
  button?: React.ReactElement;
}

const Empty = ({ iconType = 'filter', className, text, subText, button }: Empty) => {
  return (
    <div className={cn('empty-wrap', `icon-${iconType}`, className)}>
      <div className={cn('icon-wrap')}>
        {iconType === 'filter' && <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_empty.svg' />}
        {iconType === 'search' && <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg' />}
        {/* 22.11.17 수정: 케이스 추가 */}
        {iconType === 'account' && <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_account_empty.svg' />}
      </div>
      <div className={cn('desc-wrap')}>
        {typeof text === 'string' ? <strong className={cn('text')}>{text}</strong> : text}
        {typeof subText === 'string' ? <p className={cn('sub-text')}>{subText}</p> : subText}
      </div>
      {button && <div className={cn('button-wrap')}>{button}</div>}
    </div>
  );
};

export default Empty;
