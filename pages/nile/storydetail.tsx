import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Tag from '@/components/tag/Tag';
import ShareButton from '@/components/button/ShareButton';
import { useTranslation } from 'next-i18next';
import StoryDetailNft from '@/components/nile/storydetail/StoryDetailNft';
import BgButton from '@/components/button/BgButton';
import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { NileApiService } from '@/services/nile/api';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import { NileCDNLoader } from '@utils/image/loader';

const MarketplaceBid = () => {
  const { t } = useTranslation(['nile', 'common']);
  const api = NileApiService();
  const nileWallet = useAtomValue(nileWalletAtom);

  const profileList = [null, 'type1', 'type2', 'type3', 'type4', 'type5'];
  const [profileIdx, setProfileIdx] = useState<null | string>(null);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

  useEffect(() => {
    setProfileIdx(profileList[Math.floor(Math.random() * 6)]);
  }, []);

  /* 22.11.16 수정: locale 추가 */
  const { locale } = useRouter();
  const nftData = {
    imgUrl: '/temp/@temp_story_detail_post.jpg',
    title: 'SON #1 New World',
    state: '',
    buttons: [
      {
        name: t('viewNft', { ns: 'common' }),
        disabled: false,
        link: '/marketplace/SON/1',
        type: 'primary',
        toastText: t('NFTFirstOpenMessage', { ns: 'common' }) /* 22.11.16 수정: 11/17 오픈 컨텐츠 수정 */,
      },
      {
        name: t('viewCollectionInfo', { ns: 'common' }),
        disabled: false,
        link: '/life/son',
        type: 'default',
        toastText: '',
      },
      // { name: t('viewNft', { ns: 'common' }), disabled: true, link: '/', hasTooltip: true },
      // { name: t('viewCollectionInfo', { ns: 'common' }), disabled: false, link: '/life', hasTooltip: false },
    ],
    auction: {
      startBid: '1,900',
      startIn: '2022-11-28 12:00 PM',
    },
  };

  const loginToApiServer = (address: string, nonce?: number) => {
    const message = `Welcome to NILE\n\nWallet address:\n${address.toLowerCase()}\n\nNonce:\n${nonce?.toString().padStart(10, '0')}`;
  };

  const signup = (account: string) => {
    api.user
      .signup(account)
      .then(({ data }) => loginToApiServer(account, data.nonce))
      .catch(({ response }) => console.log(response));
  };

  const getProfile = useCallback(
    (account: string) => {
      return api.user.account
        .getUserInfo(account)
        .then(({ data }) => {
          if (data.errorCode === 11000) {
            return signup(account);
          } else {
            setUserInfo(data);
            return loginToApiServer(account, data?.nonce);
          }
        })
        .catch(({ response }) => {
          switch (response?.status) {
            case 404:
              return signup(account);
            default:
              break;
          }
        });
    },
    [api],
  );

  useEffect(() => {
    getProfile(nileWallet);
  }, []);
  return (
    <>
      <Helmet>
        <title>StoryDetail &gt; NileStory &gt; NILE </title>
        <body />
      </Helmet>
      <div className={cn('story-detail-wrap')}>
        <div className={cn('story-detail-cont')}>
          <div className={cn('story-detail-title')}>
            <div className={cn('tag-list')}>
              <Tag size="s">{t('home.story.item.2.tag.0')}</Tag>
              <Tag size="s">{t('home.story.item.2.tag.1')}</Tag>
              <Tag size="s">{t('home.story.item.2.tag.2')}</Tag>
              <Tag size="s">{t('home.story.item.2.tag.3')}</Tag>
            </div>
            <h2 className={cn('story-detail-heading')}>{t('home.story.item.2.title')}</h2>
            <div className={cn('story-share-wrap')}>
              <span className={cn('share-date')}>{t('home.story.item.2.date')}</span>
              <ShareButton facebook={true} telegram={true} />
            </div>
          </div>
          <div className={cn('story-detail-post')}>
            <p>{t('home.story.item.2.detail.post.p1')}</p>
            <p>{t('home.story.item.2.detail.post.p2')}</p>
            <h4>{t('home.story.item.2.detail.post.strong1')}</h4>
            <p>{t('home.story.item.2.detail.post.p3')}</p>
            <h4>{t('home.story.item.2.detail.post.strong2')}</h4>
            <p>{t('home.story.item.2.detail.post.p4')}</p>
            <p>{t('home.story.item.2.detail.post.p5')}</p>

            <div className={cn('article-wrap')}>
              <div className={cn('video-wrap')}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controls
                  controlsList="nodownload nofullscreen"
                  className={cn('video-control')}
                >
                  <source src="https://nile.blob.core.windows.net/media/SON/1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className={cn('article-info')}>
                <strong>SON #1 New World</strong>
                <div className={cn('article-creator')}>
                  {/* 22.11.16 수정: 프로필 이미지 수정 */}
                  <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} size={20} />
                  <span className={cn('name-tag-name')}>{t('home.story.item.2.creator')}</span>
                </div>
              </div>
            </div>

            {locale === 'ko' && <h3>{t('home.story.item.2.detail.post.strong3')}</h3>}
            <p>{t('home.story.item.2.detail.post.p6')}</p>
            <h4>{t('home.story.item.2.detail.post.strong4')}</h4>
            <p>{t('home.story.item.2.detail.post.p7')}</p>
            <h4>{t('home.story.item.2.detail.post.strong5')}</h4>
            <p>{t('home.story.item.2.detail.post.p8')}</p>
            <p>{t('home.story.item.2.detail.post.p9')}</p>
            <p>{t('home.story.item.2.detail.post.p10')}</p>
          </div>
          <StoryDetailNft data={nftData} />
          <div className={cn('another-item-wrap')}>
            <ul className={cn('another-list-item')}>
              <li className={cn('after-item')}>
                <a className={cn('another-link-item')} href='/nile/storydetail2'>
                  <span className={cn('another-state-text')}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                    {t('home.story.item.2.detail.afterItem.iconText')}
                  </span>
                  <div className={cn('another-state-img')}>
                    <Image src="/images/img_sights_of_nile_son2.png" alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                  </div>
                  <div className={cn('another-info-area')}>
                    <strong className={cn('another-info-title')}>{t('home.story.item.3.title')}</strong>
                    <p className={cn('another-info-cont')}>{t('home.story.item.3.desc')}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className={cn('list-btn-wrap')}>
            <BgButton
              buttonText={t('listView', { ns: 'common' })}
              color="black"
              size="md"
              key="Save"
              href="/nile/story"
              // onClick={() => {
              //   setConfirmModal(false);
              // }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'nile'])),
    },
  };
};
export default MarketplaceBid;
