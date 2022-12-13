import cn from 'classnames';

import OutlineButton from '@components/button/OutlineButton';
import { ReactSVG } from 'react-svg';

interface modalProps {
  state: string;
  title: string;
  desc: string;
  time?: string;
  buttonText: string;
  url: string;
  hasTag?: boolean;
  imgUrl: string;
  type?: string;
  classNames?: string;
  onClick?: () => void;
  isImgFull?: boolean;
  imgDimmed?: boolean;
}

const HomeEventModalContents = ({
  state,
  title,
  desc,
  time,
  buttonText,
  url,
  hasTag,
  imgUrl,
  type,
  classNames,
  onClick,
  isImgFull = false,
  imgDimmed = false,
}: modalProps) => {
  return (
    <div
      className={cn('event-modal-contents', `type-${type}`, classNames, isImgFull && 'img-full', imgDimmed && 'img-dimmed')}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className={cn('contents-wrap')}>
        {hasTag && (
          <div className={cn('tag')}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/img_nile_original.svg" />
          </div>
        )}
        <div className={cn('state')}>{state}</div>
        <h2 className={cn('title')}>{title}</h2>
        <p className={cn('desc')}>{desc}</p>
        {time && <div className={cn('time')}>{time}</div>}
        <div className={cn('button-wrap')}>
          <OutlineButton buttonText={buttonText} size="sm" color={type === 'dark' ? 'white' : 'black'} href={url} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default HomeEventModalContents;
