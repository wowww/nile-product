import React from 'react';
import cn from 'classnames';
import OutlineButton from '../button/OutlineButton';
import BgButton from '../button/BgButton';
// import Tooltip from '../tooltip/Tooltip';
import Image from 'next/image';
import { useRouter } from 'next/router';
/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';
import { NileCDNLoader } from '@utils/image/loader';

const CommunityBanner = () => {
  const { t } = useTranslation('community');
  const router = useRouter();
  const INTRODUCE_HREF = '/community/papyrus';
  const { locale } = useRouter();

  return (
    <div className={cn('banner')}>
      <div className={cn('info')}>
        <section>
          <div>
            <Image className={cn('union-image')} src="/assets/images/img/img_community_union.png" alt="union" layout="responsive" width="100%" height="100%" loader={NileCDNLoader} />
          </div>
          {/* 22.11.11 수정: 문구 수정 */}
          <p>The most seamless token-based communication tool for Web3</p>
          <h2>PAPYRUS</h2>
          <p>{t('banner.text')}</p>
        </section>
        <div>
          <div className={cn('buttons')}>
            <BgButton buttonText={t('banner.download')} color="white" size="lg" hasTooltip={true} tooltipPlace="top" disabled />
            <OutlineButton buttonText={t('banner.introduction')} color="white" size="lg" onClick={() => router.push(INTRODUCE_HREF)} />
          </div>
          {/* START: 22.11.03 11/11 오픈 제외 콘텐츠 */}
          {/* <Link href="/" passHref>
            <a href="/" className={cn('open-browser')}>
              {t('banner.openInBrowser')}
            </a>
          </Link> */}
          {/* END: 22.11.03 11/11 오픈 제외 콘텐츠 */}
        </div>
      </div>
      <div className={cn('info-banner-image')}>
        <div>
          <Image className={cn('messenger-image')} layout='responsive' width='100%' height='78.297%' src={`/assets/images/img/img_community_messenger${locale === 'ko' ? '_ko' : ''}.png`} alt={t('banner.imgAlt')} loader={NileCDNLoader} />
        </div>
      </div>
    </div>
  );
};

export default CommunityBanner;
