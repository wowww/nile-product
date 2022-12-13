import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SnkrzTop from '@/components/life/snkrz/SnkrzTop';
import SnkrzBottom from '@/components/life/snkrz/SnkrzBottom';

const Snkrz = () => {
  return (
    <>
      <Helmet>
        <title>Snkrz &gt; Life &gt; NILE</title>
      </Helmet>
      <div className={cn('life-snkrz')}>
        <SnkrzTop />
        <SnkrzBottom />
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'life'])),
    },
  };
};

export default Snkrz;
