import cn from 'classnames';
import DaoLayout from '@/components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StationProtocol from '@/components/dao/station/DaoStationProtocol';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const DaoStationProtocol = () => {
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  return (
    <>
      <Helmet>
        <title>Station &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-station">
        <StationProtocol />
      </DaoLayout>
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

export default DaoStationProtocol;
