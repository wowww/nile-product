import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cn from 'classnames';

import MypageTop from '@/components/mypage/MypageTop';
import MypageBottom from '@/components/mypage/MypageBottom';
import { GetServerSideProps } from 'next';

const MyPage = () => {
  return (
    <>
      <Helmet>
        <title>Mypage &gt; NILE</title>
      </Helmet>
      <div className={cn('mypage-wrap')}>
        <MypageTop />
        <MypageBottom />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['mypage', 'common', 'marketplace']);

  return { props: { ...translations } };
};

export default MyPage;
