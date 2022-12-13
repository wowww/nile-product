import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import TotalCapValue from '@/components/tokens/TotalCapValue';
import WemixMarketPrice from '@/components/tokens/WemixMarketPrice';
import TokensTable from '@/components/tokens/TokensTable';
import ExchangeList from '@/components/tokens/ExchangeList';

const Tokens = () => {
  return (
    <div className={cn('tokens')}>
      <TotalCapValue />
      <WemixMarketPrice />
      <TokensTable />
      <ExchangeList />
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

export default Tokens;
