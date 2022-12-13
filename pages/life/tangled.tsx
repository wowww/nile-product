/* 22.10.27 수정 start: import 추가  */
import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { Helmet } from 'react-helmet-async';

import cn from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TangledTop from '@/components/life/tangled/TangledTop';
import TangledBottom from '@/components/life/tangled/TangledBottom';

import { GetServerSideProps } from 'next';

const Tangled = () => {
  const [showFloating, setShowFloating] = useState(false);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<Document>();

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const { pageYOffset } = window;
        const productInfoOffset = productInfoRef.current?.offsetTop as number;
        const productInfoHeight = productInfoRef.current?.scrollHeight as number;

        if (pageYOffset > productInfoOffset + productInfoHeight) {
          setShowFloating(true);
        } else {
          setShowFloating(false);
        }
      }, 300),
    []
  );

  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
  }, [throttleHandler]);

  return (
    <>
      <Helmet>
        <title>Tangled &gt; Life &gt; NILE</title>
        {/* 22.11.11 수정: 플로팅바 숨김에 의해 body에 has-floating 클래스 임시 삭제 */}
        {/* <body className={cn({ 'has-floating': offset.width >= 1280 })} /> */}
      </Helmet>
      <div className={cn('life-tangled')}>
        <TangledTop />
        <TangledBottom ref={productInfoRef} />
        {/* {offset.width >= 1280 && <LifeFloatingBar time="upcoming" sellType="auction" nftLink="/" classNames={`${showFloating ? 'active' : ''}`} />} */}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['common', 'life']);
  return { props: { ...translations } };
};

export default Tangled;
