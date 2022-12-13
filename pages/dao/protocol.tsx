import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import cn from 'classnames';

import DaoStationProtocol from '@/components/dao/station/DaoStationProtocol';
import DaoStationIngLayout from '@/components/dao/station/DaoStationIngLayout';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const DaoProtocol = () => {
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);

  return (
    <>
      <Helmet>
        <title>Station &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'doa-recruiting')} />
      </Helmet>
      <DaoStationIngLayout>
        <DaoStationProtocol />
      </DaoStationIngLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'dao'])),
    },
  };
};

export default DaoProtocol;
