import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import TangledJennis from './TangledJennis';

import cn from 'classnames';
import TangledMarquee from '@/components/life/tangled/TangledMarquee';
import { NileCDNLoader } from '@utils/image/loader';

interface NftsTitleType {
  title: string;
  titleColor: string;
  desc: string;
  subDesc: string;
}

const NftsTitle = ({ title, titleColor, desc, subDesc }: NftsTitleType) => {
  return (
    <dl className={cn('tangled-nfts-title')}>
      <dt className={cn(titleColor)}>{title}</dt>
      <dd>
        <strong>{desc}</strong>
        <span>{subDesc}</span>
      </dd>
    </dl>
  );
};

const TangledNfts = () => {
  const { t } = useTranslation('life');

  return (
    <div className={cn('life-tangled-inner nfts')}>
      <div className={cn('tangled-timepiece')}>
        <dl>
          <dt>
            <Image src="/images/img_tangled_timepieces.png" alt="Tangled Timepiece" layout="fill" loader={NileCDNLoader} />
          </dt>
          <dd>{t('tangled.nft.desc')}</dd>
        </dl>
      </div>

      <div className={cn('tangled-watch')}>
        <NftsTitle
          title={t('tangled.nft.luxury.title')}
          titleColor="type1"
          desc={t('tangled.nft.luxury.text1')}
          subDesc={t('tangled.nft.luxury.text2')}
        />
        <TangledMarquee itemLength={11} type="luxury" />
      </div>
      <div className={cn('tangled-watch')}>
        <NftsTitle
          title={t('tangled.nft.highEnd.title')}
          titleColor="type2"
          desc={t('tangled.nft.highEnd.text1')}
          subDesc={t('tangled.nft.highEnd.text2')}
        />
        <TangledMarquee itemLength={11} type="highend" />
      </div>
      <div className={cn('tangled-watch')}>
        <NftsTitle
          title={t('tangled.nft.zenith.title')}
          titleColor="type3"
          desc={t('tangled.nft.zenith.text1')}
          subDesc={t('tangled.nft.zenith.text2')}
        />
        <TangledJennis />
      </div>
    </div>
  );
};

export default TangledNfts;
