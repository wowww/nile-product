import React from 'react';
import cn from 'classnames';
import DaoStationIngLayout from '@/components/dao/station/DaoStationIngLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DaoStationIngDashBoard from '@/components/dao/station/DaoStationIngDashBoard';
import DaoStation3Points from '@/components/dao/station/DaoStation3Points';
import DaoStationMission from '@/components/dao/station/DaoStationMission';
import DaoStationIngMembers from '@/components/dao/station/DaoStationIngMembers';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const DaoRecruiting = () => {
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  return (
    <>
      <Helmet>
        <title>Station &gt; DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'doa-recruiting')} />
      </Helmet>
      <DaoStationIngLayout>
        <DaoStationIngDashBoard />
        <DaoStation3Points />
        <DaoStationMission />
        <DaoStationIngMembers />
      </DaoStationIngLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default DaoRecruiting;
