import cn from 'classnames';
import Image from 'next/image';
import OutlineButton from '@/components/button/OutlineButton';
import { useRouter } from 'next/router';
/* 22.11.10 수정: 다국어 라이브러리 추가 */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import {NileCDNLoader} from "@utils/image/loader";

/* 22.11.10 수정: 다국어 데이터 호출 추가 */
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export const Nile404 = () => {
  const { t } = useTranslation('common', { keyPrefix: '404' });

  const router = useRouter();
  return (
    <div className={cn('page-not-found-wrap')}>
      <div className={cn('page-not-found')}>
        <div className={cn('image-wrap')}>
          <Image src='/assets/images/img/img_404.png' alt="page not found image" layout="fill" objectFit="contain" loader={NileCDNLoader} />
        </div>
        <section>
          {/* 22.11.10 수정: 다국어 적용 */}
          <h2>{t('title')}</h2>
          <p>{t('desc')}</p>
        </section>
        <OutlineButton buttonText={t('btn')} color="black" size="lg" onClick={() => router.push('/')} />
      </div>
    </div>
  );
};
export default Nile404;
