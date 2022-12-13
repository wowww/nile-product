import React from 'react';
import cn from 'classnames';
import DaoLayout from '@/components/dao/DaoLayout';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DaoIndividualHomeTimeline from '@/components/dao/individualHome/DaoIndividualHomeTimeline';
import { useAtom } from 'jotai';
import { daoThemeAtom } from '@/state/daoAtom';

const DaoHome = () => {
  // 개별 다오 컬러 커스텀을 위한 전역 변수 : default 'wonder' 원더다오
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  return (
    <>
      <Helmet>
        <title>DAO &gt; NILE</title>
        <body className={cn(`${activeDao.value}-wrap`, 'dao-wrap')} />
      </Helmet>
      <DaoLayout activate="menu-home">
        <DaoIndividualHomeTimeline />
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

export default DaoHome;
