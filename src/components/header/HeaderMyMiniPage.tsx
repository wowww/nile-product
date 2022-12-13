import React, {useCallback, useEffect, useRef, useState} from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Avatar, Dropdown, message } from 'antd';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css/navigation';
import { useTranslation } from 'next-i18next';

import TextButton from '@/components/button/TextButton';
/* 22.10.27 수정: 컴포넌트 변경 */
import { IconLogo } from '@/components/logo/IconLogo';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { NileApiService } from '@/services/nile/api';
import { useRouter } from 'next/router';
import { NileCDNLoader } from '@utils/image/loader';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { userProfileAtom } from '@/state/accountAtom';
import { useUpdateAtom } from 'jotai/utils';
import { myPageTabAtom } from '@/state/tabAtom';
import NileNft from "@/models/nile/marketplace/NileNft";
import NileUserAccount from "@/models/nile/user/NileUserAccount";

// my dao 임시 데이터
const daoList = [
  {
    name: 'WONDER DAO',
    link: '/',
    type: 'wonder',
  },
  {
    name: 'g.Wonder',
    link: '/',
    type: 'gwonder',
  },
  {
    name: 'WEMIX.FI DAO',
    link: '/',
    type: 'wemixfi',
  },
  {
    name: 'Kiaf',
    link: '/',
    type: 'kiaf',
  },
];

// my papyrus 임시 데이터
const papyrusList = [
  { name: 'WONDER DAO', imgUrl: '/temp/@temp_sample.jpg' },
  { name: 'LUS', imgUrl: '/temp/@temp_collection_lus.png' },
  { name: 'Tangled', imgUrl: '/temp/@temp_collection_tangled.png' },
  { name: 'Patron Long Patron', imgUrl: '/temp/@temp_collection_represent.png' },
  { name: 'WONDER DAO', imgUrl: '/temp/@temp_dao_2.png' },
];

interface MyMiniProps {
  clickEvent: () => void;
  item?: NileNft;
}

const HeaderMyMiniPage: React.FC<MyMiniProps> = ({ clickEvent, item }) => {
  /* 22.11.16 수정: i18n 추가 */
  const { t, i18n } = useTranslation('common');

  const nileWallet = useAtomValue(nileWalletAtom);
  const { shorten } = useWalletFormatter();
  // my page mini > Dao 제어용
  const [hasDao, setHasDao] = useState(false);
  // my page mini > NFT 제어용
  const [hasNft, setHasNft] = useState(false);
  // my page mini > Papyrus 제어용
  const [hasPapyrus, setHasPapyrus] = useState(false);
  const [daoListVisible, setDaoListVisible] = useState(false);
  const [swiperSetting, setSwiperSetting] = useState<SwiperProps | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [ownedNft, setOwnedNft] = useState();

  const userProfile = useAtomValue(userProfileAtom);
  const setMyPageTab = useUpdateAtom(myPageTabAtom);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

  const api = NileApiService();
  const router = useRouter();

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
    [api]
  );

  useEffect(() => {
    getProfile(nileWallet);
  }, []);

  const handleDaoListVisibleChange = (newVisible: boolean) => {
    setDaoListVisible(newVisible);
  };

  useEffect(() => {
    api.mypage.nft
      .getList(nileWallet ?? "")
      .then(({ data }) => setOwnedNft(data.pageInfo.total))
      .catch((err) => {
        return null;
      });
  }, []);

  SwiperCore.use([Navigation]);

  // swiper 버튼 커스텀 및 셋팅
  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 12,
        navigation: {
          prevEl: prevRef.current, // 이전 버튼
          nextEl: nextRef.current, // 다음 버튼
        },
        slidesPerView: 4,
        onBeforeInit: (swiper: SwiperCore) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }
          swiper.navigation.update();
        },
      });
    }
  }, [swiperSetting]);
  return (
    <>
      <div className={cn('my-mini-top')}>
        <div className={cn('user-info-wrap')}>
          <Avatar
            className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
            size={40}
            style={{ backgroundImage: userProfile.img && `url(${userProfile.img})` }}
          >
            <span className={cn('a11y')}>{t('openProfile')}</span>
          </Avatar>
          <div>
            <strong className={cn('user-nickname')}>{userProfile.nickname ?? shorten(nileWallet)}</strong>
            <div className={cn('user-id-wrap')}>
              <span className={cn('user-id')}>{shorten(nileWallet)}</span>
              <CopyToClipboard text={nileWallet ?? ''}>
                {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
                <button className={cn('btn-copy-id')} onClick={() => message.info({ content: t('copyWalletAnnounce'), key: 'toast' })}>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg' />
                  <span className={cn('a11y')}>{t('copyWallet')}</span>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <Link href="/mypage" passHref>
          <a className={cn('btn-move-page')} onClick={clickEvent}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
            <span className={cn('a11y')}>{t('goToMyPage')}</span>
          </a>
        </Link>
      </div>
      <div className={cn('my-mini-body')}>
        <p className={cn('connect-time')}>
          {/*2022-02-02 17:00 */}
          {t('header.myMiniPage.connectedWallet')}
        </p>
        <div className={cn('my-mini-section')}>
          <strong className={cn('my-mini-title')}>My DAO</strong>
          <div className={cn('my-mini-contents')}>
            {hasDao ? (
              <>
                <dl className={cn('my-own-info')}>
                  <dt>{t('header.myMiniPage.totalBalance')}</dt>
                  <dd>$100.34</dd>
                  <dd>1 DAO</dd>
                </dl>
                <div className={cn('dao-link-wrap', daoList.length > 1 && 'multi-link')}>
                  {daoList.length > 1 ? (
                    <Dropdown
                      overlayClassName="doa-link-list"
                      overlay={
                        <ul>
                          {daoList.map((item) => (
                            <li key={item.name}>
                              <Link href={item.link} passHref>
                                <a className={cn('dao-link')} target="_blank">
                                  <div className={cn('link-contents')}>
                                    {/* 22.10.27 수정: 컴포넌트 변경 */}
                                    <IconLogo size={20} type={item.type} />
                                    <span>{item.name}</span>
                                  </div>
                                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      }
                      trigger={['click']}
                      open={daoListVisible}
                      onOpenChange={handleDaoListVisibleChange}
                      placement="bottom"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button" className={cn('btn-open-dao')}>
                        My DAO
                        <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
                      </button>
                    </Dropdown>
                  ) : (
                    <Link href={daoList[0].link} passHref>
                      <a className={cn('dao-link')} target="_blank">
                        <div className={cn('link-contents')}>
                          <Image src={`/icons/dao_tokens/ico_dao_token_${daoList[0].type}.svg`} width={20} height={20} className={cn('token-img')}  loader={NileCDNLoader} />
                          <span>{daoList[0].name}</span>
                        </div>
                        <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />
                      </a>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <div className={cn('dao-no-contents')}>
                <p>{t('header.myMiniPage.noDao')}</p>
                <TextButton buttonText="Go DAO Home" iconValue="arrow" type="link" href="/dao" size="sm" />
              </div>
            )}
          </div>
        </div>
        <div className={cn('my-mini-section')}>
          <strong className={cn('my-mini-title')}>{t('header.myMiniPage.myNFT')}</strong>
          <div className={cn('my-mini-contents')}>
            {ownedNft ? (
              <>
                {/*<dl className={cn('my-own-info')}>*/}
                {/*  <dt>{t('header.myMiniPage.myNFTPrice')}</dt>*/}
                {/*  <dd>$4,500</dd>*/}
                {/*  <dd>43 NFT</dd>*/}
                {/*</dl>*/}
                <ul className={cn('nft-link-wrap')}>
                  <li>
                    <button type="button" onClick={() => {
                      router.push('/mypage');
                      setMyPageTab('nft');
                    }}>
                      <a className={cn('nft-link')} onClick={clickEvent}>
                        <span className={cn('nft-link-title')}>
                          {t('header.myMiniPage.OwnedNFT')} <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
                        </span>
                        <strong>{ownedNft}</strong>
                      </a>
                    </button>
                  </li>
                  {/*<li>*/}
                  {/*  <Link href="/" passHref>*/}
                  {/*    <a className={cn('nft-link')} onClick={clickEvent}>*/}
                  {/*      <span className={cn('nft-link-title')}>*/}
                  {/*        {t('header.myMiniPage.favorites')} <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />*/}
                  {/*      </span>*/}
                  {/*      <strong>43</strong>*/}
                  {/*    </a>*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                </ul>
              </>
            ) : (
              <div className={cn('dao-no-contents')}>
                <p>{t('header.myMiniPage.noNFT')}</p>
                <TextButton buttonText="Go Marketplace" iconValue="arrow" type="link" href="/marketplace" size="sm" />
              </div>
            )}
          </div>
        </div>
        {hasPapyrus && (
          <div className={cn('my-mini-section')}>
            <strong className={cn('my-mini-title')}>{t('header.myMiniPage.myPapyrus')}</strong>
            <div className={cn('my-mini-contents')}>
              <div className={cn('my-mini-swiper')}>
                <button type="button" ref={prevRef} className={cn('btn-swiper', 'btn-prev')}>
                  <span className={cn('a11y')}>{t('prev')}</span>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
                </button>
                <button type="button" ref={nextRef} className={cn('btn-swiper', 'btn-next')}>
                  <span className={cn('a11y')}>{t('next')}</span>
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
                </button>
                {swiperSetting && (
                  <Swiper {...swiperSetting}>
                    {papyrusList.map((item, index) => (
                      <SwiperSlide className={cn('slide-item')} key={`${item.name} + ${index}`}>
                        <a href="/" target="_blank" rel="noopener noreferrer" title={t('blank')}>
                          <div className={cn('img-block')}>
                            <Image src={item.imgUrl} alt="" layout="fill" loader={NileCDNLoader} objectFit="cover" />
                          </div>
                          <div className={cn('text-block')}>{item.name}</div>
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderMyMiniPage;
