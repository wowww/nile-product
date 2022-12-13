import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import DetailHeader from '@/components/tokens/DetailHeader';
import TokenFluctuationInfo from '@/components/tokens/TokenFluctuationInfo';
import TokenInfo from '@/components/tokens/TokenInfo';
import DetailChartArea from '@/components/tokens/DetailChartArea';

const TokensDetail = () => {
  return (
    <div className={cn('tokens')}>
      <div className={cn('tokens-inner')}>
        <DetailHeader />
        <div className={cn('detail-body')}>
          <TokenFluctuationInfo />
          <div className={cn('body-right')}>
            <DetailChartArea />
            <TokenInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'tokens'])),
    },
  };
};

export default TokensDetail;
