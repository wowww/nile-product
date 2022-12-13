import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import TextButton from '@/components/button/TextButton';
import { useMemo } from 'react';

interface Props {
  exchangeType?: string;
}

const MarketplaceDetailLink = ({ exchangeType }: Props) => {
  const { t, i18n } = useTranslation(['marketplace', 'common']);

  const nileGuideLink = useMemo(() => {
    if (i18n.language === 'en') {
      return 'https://docs.wemix.com/v/nile-en/guides/marketplace'
    }
    if (i18n.language === 'ko') {
      return 'https://docs.wemix.com/v/nile-ko/undefined-1/marketplace'
    }
    return '#';
  }, [i18n]);

  return (
    <ul className={cn('link-block')}>
      <li>
        <TextButton
          buttonText={exchangeType === 'wemix' ? `${t('detailTop.linkText1-1')}` : `${t('detailTop.linkText1')}`}
          size="sm"
          iconValue="link"
          gapSpacing="sm"
          href="https://wemix.fi/swap"
          target="_blank"
          direction="right"
        />
      </li>
      <li>
        <TextButton
          buttonText={t('detailTop.linkText2')}
          size="sm"
          iconValue="link"
          gapSpacing="sm"
          direction="right"
          target="_blank"
          href={nileGuideLink}
        />
      </li>
    </ul>
  );
};

export default MarketplaceDetailLink;
