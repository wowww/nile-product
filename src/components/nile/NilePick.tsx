import cn from 'classnames';
import Image from 'next/image';
import SquareTag from '@/components/tag/SquareTag';
import TextButton from '@/components/button/TextButton';
import { useTranslation } from 'next-i18next';
import { NileChoiceAdditionList } from '@components/home/NileChoiceAdditionList';
import NileNft from '@/models/nile/marketplace/NileNft';
import { ChoiceData } from '../../../pages';
import { NileCDNLoader } from '@utils/image/loader';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import Link from 'next/link';

interface viewButtonType {
  nft: NileNft;
  buttonText: string;
  link?: string;
}

export interface additionType {
  image: string;
  productTitle: string;
  priceTitle: string;
  priceValue: string;
  priceUnit: string;
  statusTag: string;
  linkUrl?: string;
}

interface NilePickProps {
  pickData?: ChoiceData[];
  lusAdditionList?: NileCollection;
}

const NilePick = ({ pickData, lusAdditionList }: NilePickProps) => {
  const { t } = useTranslation('nile');

  return (
    <div className={cn('pick-card-wrap')}>
      {pickData && (
        <ul className={cn('pick-card-list')}>
          {pickData.map((item: ChoiceData) => (
            <li key={item?.pickTitle} className={cn('card-list', { full: item?.additionLink, box: !item?.additionLink })}>
              {item?.additionLink ? (
                <>
                  <div className={cn('card-top')}>
                    <div className={cn('img-block')}>
                      <div className={cn('tag-wrap')}>{item?.tag && <SquareTag>{t(item.tag)}</SquareTag>}</div>
                      <div className={cn('img-wrap')}>
                        {item?.image && (
                          <Image src={item.image} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                        )}
                      </div>
                    </div>
                    <div className={cn('info-block')}>
                      {item?.pickTitle && <span className={cn('product-name')}>{t(item.pickTitle)}</span>}
                      {item?.pickDescription && <strong className={cn('product-desc')}>{t(item.pickDescription)}</strong>}
                      <div className={cn('link-block')}>
                        {item?.buttonType?.map((buttonItem, bIdx) => {
                          if (buttonItem.link)
                            return (
                              <TextButton
                                key={`button-type${bIdx}`}
                                buttonText={t(buttonItem?.buttonText ?? '')}
                                iconValue="line-arrow"
                                href={buttonItem.link}
                                gapSpacing="lg"
                                size="md"
                              />
                            );
                        })}
                      </div>
                    </div>
                  </div>
                  <NileChoiceAdditionList additionList={lusAdditionList} />
                </>
              ) : (
                <Link href={item?.additionLink ? '' : item?.buttonType?.at(0)?.link ?? ''}>
                  <div className={cn('card-top link')}>
                    <div className={cn('img-block')}>
                      <div className={cn('tag-wrap')}>{item?.tag && <SquareTag>{t(item.tag)}</SquareTag>}</div>
                      <div className={cn('img-wrap')}>
                        {item?.image && (
                          <Image src={item.image} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
                        )}
                      </div>
                    </div>
                    <div className={cn('info-block')}>
                      {item?.pickTitle && <span className={cn('product-name')}>{t(item.pickTitle)}</span>}
                      {item?.pickDescription && <strong className={cn('product-desc')}>{t(item.pickDescription)}</strong>}
                      <div className={cn('link-block')}>
                        {item?.buttonType?.map((buttonItem, bIdx) => {
                          if (buttonItem.link)
                            return (
                              <TextButton
                                key={`button-type${bIdx}`}
                                buttonText={t(buttonItem?.buttonText ?? '')}
                                iconValue="line-arrow"
                                gapSpacing="lg"
                                size="md"
                              />
                            );
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* <div className={cn('control-wrap')}>
        <OutlineButton buttonText={t('viewMore')} color="black" size="md" iconType iconValue="line-arrow" align />
      </div> */}
    </div>
  );
};

export default NilePick;
