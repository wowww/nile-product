import { useRef } from 'react';
import cn from 'classnames';
import Image from 'next/image';
/* 22.11.09 수정: Chip -> Tag로 교체 */
import Tag from '@/components/tag/Tag';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';

interface Props {
  image?: string;
  videoUrl?: string;
  tags?: string[];
  title?: string;
  content?: string;
  link?: string;
  date?: string;
  work?: string;
  info?: string;
  columnist?: string;
  creator?: string;
}

const NileStoryCard = ({ image, videoUrl, tags, title, content, link, date, work, info, columnist, creator }: Props) => {
  const vidRef: any = useRef(null);
  const { t } = useTranslation('nile');

  return (
    <Link href={link ?? ''}>
      <a className={cn('story-card')}>
        <div className={cn('thumbnail')}>
          {image ? (
            <Image src={image} layout="fill" objectFit="contain" loader={NileCDNLoader} />
          ) : (
            <span className={cn('video-wrap')}>
              <video autoPlay loop muted playsInline disablePictureInPicture ref={vidRef}>
                <source src={videoUrl} type="video/mp4" />
              </video>
            </span>
          )}
        </div>
        <div className={cn('text-area')}>
          <div>
            {tags?.map((item, idx) => (
              <Tag size="s" key={`${item}-${idx}`}>
                {t(item)}
              </Tag>
            ))}
          </div>
          {title && <h3 className={cn('card-title')}>{t(title)}</h3>}
          {content && <p className={cn('content')}>{t(content)}</p>}
          <div className={cn('bottom-info')}>
            <div className={cn('writer-wrap')}>
              {columnist && (
                <span className={cn('person')}>
                  <span className={cn('category')}>Columnist</span>
                  <span className={cn('name')}>{columnist}</span>
                </span>
              )}
              <span className={cn('person')}>
                <span className={cn('category')}>Creator</span>
                <span className={cn('name')}>{creator}</span>
              </span>
            </div>
            <span className={cn('date')}>{date}</span>
          </div>
          {work ||
            (info && (
              <div className={cn('work-wrap')}>
                {work && <div className={cn('work')}>{t(work)}</div>}
                {info && <div className={cn('info')}>{t(info)}</div>}
              </div>
            ))}
        </div>
      </a>
    </Link>
  );
};

export default NileStoryCard;
