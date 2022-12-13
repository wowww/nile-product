import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { NewsFeedData } from '../../../pages';

interface Props {
  newsData: NewsFeedData[];
}

const NileNews = ({ newsData }: Props): JSX.Element => {
  const { t } = useTranslation(['nile']);
  const { i18n } = useTranslation('ko');

  return (
    <div className={cn('nile-news-area')}>
      <div className={cn('nile-news-wrap')}>
        {newsData.map((item: NewsFeedData, index: number) => {
          return (
            <div className={cn('nile-news-item')} key={index}>
              <a href={item?.link ?? ""} className={cn('news-item-link')} target="_blank" rel="noopener noreferrer">
                <div className={cn('nile-news-banner')}>
                  {item?.image && <Image src={item.image} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />}
                </div>
                <div className={cn('nile-news-info')}>
                  {i18n.language === 'ko' ? (
                    <>
                      <strong className={cn('news-info-title')}>{item?.ko?.title}</strong>
                      <p className={cn('news-info-cont')}>{item?.ko?.cont}</p>
                    </>
                  ) : (
                    <>
                      <strong className={cn('news-info-title')}>{item?.en?.title}</strong>
                      <p className={cn('news-info-cont')}>{item?.en?.cont}</p>
                    </>
                  )}
                  <span className={cn('news-info-date')}>{item?.date}</span>
                </div>
              </a>
            </div>
          );
        })}
        {(newsData && newsData.length < 2) && (
          <div className={cn('nile-news-item')}>
            <a href="" className={cn('news-item-link')} target="_blank" rel="noopener noreferrer">
              <div className={cn('nile-news-banner')}></div>
              <div className={cn('nile-news-info')}>
                <strong className={cn('news-info-title')}>{t('home.lastestNews.additionItem.title')}</strong>
                <p className={cn('news-info-cont')}>{t('home.lastestNews.additionItem.desc')}</p>
                <span className={cn('news-info-date')}></span>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NileNews;
