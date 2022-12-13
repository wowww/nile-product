import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { throttle } from 'lodash';
import { Avatar, Drawer, message, Popover } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import IconButton from '@/components/button/IconButton';
import SearchModal from '@/components/modal/search';
import HeaderNotification from '@/components/header/HeaderNotification';
import HeaderAccount from '@/components/header/HeaderAccount';
import NetworkModal from '@/components/modal/NetworkModal';
import { useWalletFormatter } from '@utils/formatter/wallet';
import NetworkSettingModal from '../modal/NetworkSettingModal';
import HeaderMyMiniPage from './HeaderMyMiniPage';
import { ReactSVG } from 'react-svg';
import { useAtom, useAtomValue } from 'jotai';
import { nileWalletAtom, nileWalletInfoChangeAtom, nileWalletMetaAtom, nileWalletPersistenceAtom, provider } from '@/state/nileWalletAtom';
import { addressListAtom, contractsAtom, updateBalanceAtom } from '@/state/web3Atom';
import { useUpdateAtom } from 'jotai/utils';
import { NileApiService } from '@/services/nile/api';
import { web3Init } from '@/web3/contracts';
import { windowResizeAtom } from '@/state/windowAtom';
import { userProfileAtom } from '@/state/accountAtom';
import { myPageTabAtom } from '@/state/tabAtom';
import { headerVisibleAccountAtom, headerVisibleLangAtom, headerVisibleMyPageAtom, headerVisibleNotificationAtom } from '@/state/layoutAtom';
import {NileNftToken} from "@/models/nile/marketplace/NileNft";
import NileUserAccount from "@/models/nile/user/NileUserAccount";

const menuList = [
  /* 22.11.09 수정: TODO : disabled 추가 */
  {
    title: 'DAO',
    url: '/dao',
    disabled: false,
  },
  {
    title: 'Life',
    url: '/life',
    disabled: false,
  },
  {
    title: 'Marketplace',
    url: '/marketplace',
    disabled: false,
  },
  {
    title: 'Community',
    url: '/community',
    disabled: false,
  },
  {
    title: 'Tokens',
    url: '/',
    disabled: true,
  },
];

export const Header: React.FC<{
  disabled?: boolean,
  item?: NileNftToken,
}> = ({ disabled, item }) => {
  const { t } = useTranslation('common');

  const [nileWallet, setNileWallet] = useAtom(nileWalletAtom);
  const [nileWalletPersistence, setNileWalletPersistence] = useAtom(nileWalletPersistenceAtom);
  const [nileWalletMeta, setNileWalletMeta] = useAtom(nileWalletMetaAtom);
  const [_, setNileWalletInfoChange] = useAtom(nileWalletInfoChangeAtom);
  const balanceUpdate = useUpdateAtom(updateBalanceAtom);

  const api = NileApiService();

  const router = useRouter();
  const { shorten } = useWalletFormatter();
  const offset = useAtomValue(windowResizeAtom);
  const documentRef = useRef<Document>();
  const { asPath, locale, pathname } = useRouter();

  const userProfile = useAtomValue(userProfileAtom);

  const [isConnect, setConnect] = useState(false);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

  const setContractAtom = useUpdateAtom(contractsAtom);
  const setAddressList = useUpdateAtom(addressListAtom);

  useEffect(() => {
    web3Init().then((data) => {
      const { contracts, addresses } = data;
      setContractAtom(contracts);
      setAddressList(addresses);
      // setEtcContracts(etc);
      // setContractsRecoilAtom(contracts);
      // setAddressListRecoilAtom(addresses);
    });
  }, []);

  useEffect(() => {
    setConnect((nileWallet ?? '').length > 0);
  }, [nileWallet]);

  useEffect(() => {
    if (nileWalletMeta) {
      provider.closeModal();
    }
  }, [nileWalletMeta, provider]);

  // notice activate 제어용
  const [isNewNotice, setIsNewNotice] = useState(false);

  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [isHeaderTop, setIsHeaderTop] = useState(true);

  const [visibleMyPage, setVisibleMyPage] = useAtom(headerVisibleMyPageAtom);
  const [visibleNotification, setVisibleNotification] = useAtom(headerVisibleNotificationAtom);
  const [visibleLang, setVisibleLang] = useAtom(headerVisibleLangAtom);
  const [visibleAccount, setVisibleAccount] = useAtom(headerVisibleAccountAtom);
  const [currentMyTab, setCurrentMyTab] = useAtom(myPageTabAtom);

  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isConnectModal, setIsConnectModal] = useState<boolean>(false);
  const [isModalNetwork, setModalNetwork] = useState(false);

  // 모바일 메뉴용
  const [moNotificationOpen, setMoNotificationOpen] = useState(false);
  const [moMenuOpen, setMoMenuOpen] = useState(false);
  const [isModalNetworkSetting, setModalNetworkSetting] = useState(false);

  const loginToApiServer = (address: string, nonce?: number) => {
    const message = `Welcome to NILE\n\nWallet address:\n${address.toLowerCase()}\n\nNonce:\n${nonce?.toString().padStart(10, '0')}`;
    // setWallet((prev) => ({ ...prev, address, provider: 'walletconnect' }));
    // updateBalance();
    // api.user
    //   .login(address, signature)
    //   .then(({ data }) => {
    //     setAuthToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    //     setUserProfile(data.account);
    //     setWallet({ address, provider: 'walletconnect' });
    //   })
    //   .catch(({ response }) => console.log(response));

    // signing(address, message)
    //   .then((signature?: string) => {
    //     console.log('on signing', signature);
    //     if (signature) {
    //       api.user
    //         .login(address, signature)
    //         .then(({ data }) => {
    //           setAuthToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    //           setUserProfile(data.account);
    //           setWallet({ address, provider: 'walletconnect' });
    //         })
    //         .catch(({ response }) => console.log(response));
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.log('user deny sign', error);
    //   });
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
    console.log("get ", getProfile(nileWallet));
  }, []);

  const handleClickToProfile = () => {
    if (isConnect) {
      router.push('/mypage').then(() => {
        setMoMenuOpen(false);
      });
    } else {
      // walletContext?.login().then(() => {
      //   closeMobileMenu();
      // });
    }
  };

  const handleMyPageVisibleChange = (newVisible: boolean) => {
    setVisibleMyPage(newVisible);
  };

  const handleNotificationVisibleChange = (newVisible: boolean) => {
    setVisibleNotification(newVisible);
  };

  const handleLangVisibleChange = (newVisible: boolean) => {
    setVisibleLang(newVisible);
  };

  const handleAccountVisibleChange = (newVisible: boolean) => {
    setVisibleAccount(newVisible);
  };

  const openAccountModal = () => {
    setVisibleAccount(true);
  };

  const openMobileMenu = () => {
    setMoMenuOpen(true);
    setVisibleAccount(false);
  };

  const closeMobileMenu = () => {
    setMoMenuOpen(false);
    setMoNotificationOpen(false);
  };

  const closeNotification = () => {
    setVisibleNotification(false);
  };

  const closeMyMiniPage = () => {
    setVisibleMyPage(false);
    setCurrentMyTab('dao');
  };

  const closeAllHeaderModal = () => {
    setVisibleMyPage(false);
    setVisibleNotification(false);
    setVisibleLang(false);
    setVisibleAccount(false);
  };

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const { pageYOffset } = window;
        const deltaY = pageYOffset - pageY;
        const hide = pageYOffset >= 60 && deltaY >= 0;
        setHide(hide);
        setPageY(pageYOffset);
        setIsHeaderTop(pageYOffset <= 60);
      }, 500),
    [pageY]
  );

  const resizeMobileGnb = () => {
    if (offset.width > 1279) {
      setMoMenuOpen(false);
      setMoNotificationOpen(false);
    }
  };

  const resizeVh = () => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  // 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가
  const changeConnectFirst = () => {
    setModalNetworkSetting(true);
  };

  // const deviceCheckEvt = () => {
  //   if (isAndroid) {
  //     return 'android';
  //   } else if (isIOS) {
  //     return 'ios';
  //   } else if (isWindows) {
  //     return 'window';
  //   } else if (isMacOs) {
  //     return 'mac';
  //   }
  // };
  //
  // // device check
  // useEffect(() => {
  //   const html = document.querySelector('html');
  //   html?.setAttribute('data-device', deviceCheckEvt() ?? '');
  //   html?.setAttribute('data-browser', browserName);
  // }, []);

  // header scroll event
  useEffect(() => {
    documentRef.current = document;
    const documentCurrent = documentRef.current;

    documentCurrent.addEventListener('scroll', throttleHandler);
    return () => {
      documentCurrent.removeEventListener('scroll', throttleHandler);
    };
    /* 22.11.09 수정: 디펜던시 어레이 값 추가 */
  }, [throttleHandler, documentRef.current]);

  // width에 따른 함수 실행
  useEffect(() => {
    resizeMobileGnb();
  }, [offset.width]);

  // 커스텀 vh 함수 실행
  useEffect(() => {
    resizeVh();
    window.addEventListener('resize', resizeVh);

    return () => {
      window.removeEventListener('resize', resizeVh);
    };
  }, []);

  useEffect(() => {
    if (hide) {
      closeAllHeaderModal();
    }
  }, [hide]);

  useEffect(() => {
    provider.disconnectCallback = (code, reason) => {
      setNileWallet('');
      setNileWalletPersistence(null);
      setNileWalletMeta(null);
    };
    provider.accountsChangedCallback = (accounts: string[]) => {
      if (accounts.length > 0) {
        connect();
      }
    };
  }, [nileWallet]);

  const connect = () => {
    if (provider.currentAddress) {
      // if (!checkTermAgree(provider.currentAddress)) {
      //   addTermAgree(provider.currentAddress);
      // }
    }

    if (!nileWallet) {
      const walletName = provider.getProviderMeta()?.name;
      // showToast(
      //   t('toast.wallet.connected.title'),
      //   t('toast.wallet.connected.desc', {
      //     name: walletName,
      //     address: ellipsisAddress(provider.currentAddress || ''),
      //   }),
      //   _handleWalletBtn,
      // );
    } else if (nileWallet !== provider.currentAddress) {
      // showToast(
      //   t('toast.wallet.connected.title'),
      //   t('toast.wallet.connected.desc', {
      //     name: provider.getProviderMeta()?.name,
      //     address: ellipsisAddress(provider.currentAddress || ''),
      //   }),
      //   _handleWalletBtn,
      // );
      // showToast("계정 변경", `${provider.currentAddress} 으로 변경되었습니다.`);
    }

    setNileWallet(provider.currentAddress || '');
    setNileWalletPersistence(provider.currentAddress || '');
    setNileWalletMeta(provider.getProviderMeta());
    setNileWalletInfoChange((a) => !a);

    getProfile(provider.currentAddress || '').then(() => {
      balanceUpdate();
    });

    //setIsDisAgree(false);
  };

  useEffect(() => {
    if (nileWalletPersistence && !nileWallet) {
      provider.reconnect();
    }
  }, [nileWalletPersistence]);

  useEffect(() => {
    provider.t = t;
    provider.locale = locale;
    // window.addEventListener('scroll', windowScroll);
    return () => {
      // window.removeEventListener('scroll', windowScroll);
    };
  }, [t]);

  // const windowScroll = () => {
  //   const scrollTop = window.scrollY;
  //
  //   scrollTop >= 10 ? setScroll(true) : setScroll(false);
  // };

  const _handleConnectBtn = (): void => {
    console.log('_handleConnectBtn');
    // setIsConnectModal(!isConnectModal);
    provider.connect().then(() => {
      provider.closeModal();
    });
    // setIsDropdown(false);
    // setIsAlertPopup(false);
  };

  return (
    <header className={cn('header', hide ? 'hide' : 'active', isHeaderTop && 'header-top')}>
      <h1>
        <Link href={{ pathname: '/' }} passHref>
          <a className={cn('header-logo')}>
            {offset.width < 768 ? (
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_logo_symbol.svg" />
            ) : (
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_logo.svg" />
            )}
            <span className={cn('a11y')}>Nile</span>
          </a>
        </Link>
      </h1>
      <nav className={cn('header-navigation')}>
        <ul>
          {menuList.map((menu) => {
            return (
              <li key={menu.title}>
                <Link href={{ pathname: menu.url }} passHref>
                  <a className={cn(pathname.includes(menu.title.toLocaleLowerCase()) && 'active', { disabled: menu.disabled })}>
                    {/* 22.11.09 수정: TODO : 11일 오픈 unfolding soon 추가 */}

                    <span>{menu.title}</span>
                    {menu.disabled && <em>Unfolding Soon</em>}
                    <span className={cn('hidden-text')} aria-hidden="true">
                      {menu.title}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={cn('header-utils')}>
        {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
        {/* <div className={cn('search-wrap')}>
          <Button
            className={cn('btn btn-icon btn-40 btn-circle btn-header')}
            onClick={() => {
              setIsSearchModal(true);
            }}
          >
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg' />
            <span className={cn('a11y')}>{t('openSearchWindow')}</span>
          </Button>
        </div> */}
        {/* <div className={cn('notice-wrap')}>
          <Popover
            destroyTooltipOnHide={true}
            overlayClassName="notification header-inner-popup"
            placement="bottom"
            content={<HeaderNotification clickEvent={closeNotification} />}
            trigger="click"
            open={notificationVisible}
            onOpenChange={handleNotificationVisibleChange}
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Button className={cn('btn btn-icon btn-40 btn-circle btn-header')}>
              {isNewNotice ? <IconNoticeActive /> : <IconNotice />}
              <span className={cn('a11y')}>{t('openNotification')}</span>
            </Button>
          </Popover>
        </div> */}
        {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
        {isConnect && (
          <div className={cn('user-info-wrap')}>
            <Popover
              destroyTooltipOnHide={true}
              overlayClassName="my-mini-page header-inner-popup"
              placement="bottom"
              content={<HeaderMyMiniPage clickEvent={closeMyMiniPage} />}
              trigger="click"
              open={visibleMyPage}
              onOpenChange={handleMyPageVisibleChange}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
            >
              <button type="button" className={cn('btn-user-open')}>
                {/* 사용자 이미지 추가 : backgroundImage url 속성에 해당 이미지 경로 넣어주어야 합니다. */}
                {/* 아바타 기본 클래스 : type1, type2, type3, type4, type5 (type* 클래스 추가 하지 않으면 기본 회색 이미지) */}
                <Avatar
                  className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
                  size={32}
                  style={{ backgroundImage: userProfile.img && `url(${userProfile.img})` }}
                >
                  <span className={cn('a11y')}>{t('openProfile')}</span>
                </Avatar>
              </button>
            </Popover>
          </div>
        )}
        <div className={cn('user-wallet')}>
          {nileWalletMeta ? (
            <>
              <button type="button" className={cn('btn-wallet-id')} onClick={() => setVisibleAccount(true)}>
                {shorten(nileWallet)}
              </button>
              <HeaderAccount isOpen={visibleAccount} setIsOpen={setVisibleAccount} setOpenChange={handleAccountVisibleChange} />
            </>
          ) : (
            <button disabled={disabled} type="button" className={cn('btn-wallet-join')} onClick={() => _handleConnectBtn()}>
              <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_wallet.svg" />
              Connect
            </button>
          )}
        </div>
        <div className={cn('lang-wrap-pc')}>
          {/* 22.11.03 수정: 언어 선택 토글 버튼으로 변경 (향후 언어 3개 이상일 시 기존 드롭다운으로 롤백) */}
          {locale === 'en' ? (
            <Link href={asPath} locale="ko">
              <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_en.svg" />
              </a>
            </Link>
          ) : (
            <Link href={asPath} locale="en">
              <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_ko.svg" />
              </a>
            </Link>
          )}
          {/* <Popover
            destroyTooltipOnHide={true}
            overlayClassName="lang-list-wrap header-inner-popup"
            content={
              <ul className={cn('lang-list')}>
                <li>
                  <Link href={asPath} locale="en">
                    <a href={asPath} className={cn(locale === 'en' && 'active', 'link')}>
                      English
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={asPath} locale="ko">
                    <a href={asPath} className={cn(locale === 'ko' && 'active')}>
                      Korean
                    </a>
                  </Link>
                </li>
              </ul>
            }
            trigger="click"
            open={langVisible}
            onOpenChange={handleLangVisibleChange}
            placement="bottomRight"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <div className={cn('btn-open-lang', langVisible && 'active')}>
              <Button className={cn('btn btn-icon btn-40 btn-circle btn-header')}>
                <IconLang />
                <span className={cn('a11y')}>{t('selectLang')}</span>
              </Button>
            </div>
          </Popover> */}
        </div>
        <div className={cn('mobile-menu')}>
          <button disabled={disabled} type="button" className={cn('btn-menu-open')} onClick={openMobileMenu}>
            <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_menu.svg" />
            <span className={cn('a11y')}>{t('openAllMenu')}</span>
          </button>
          <Drawer
            title={
              <div className={cn('mobile-menu-utils')}>
                {moNotificationOpen ? (
                  <button type="button" className={cn('btn-back')} onClick={() => setMoNotificationOpen(false)}>
                    <span className={cn('a11y')}>{t('returnToFullMenu')}</span>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_right.svg" />
                  </button>
                ) : (
                  <>
                    {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
                    {/* <div className={cn('notice-wrap')}>
                      {isNewNotice ? (
                        <IconButton
                          buttonText="알림 열기"
                          size="40"
                          iconValue="noticeActive"
                          circle
                          classnames="btn-header"
                          onClick={() => setMoNotificationOpen(true)}
                        />
                      ) : (
                        <IconButton
                          buttonText="알림 열기"
                          size="40"
                          iconValue="notice"
                          circle
                          classnames="btn-header"
                          onClick={() => setMoNotificationOpen(true)}
                        />
                      )}
                    </div> */}
                    {/* 22.11.03 수정: 언어 선택 토글 버튼으로 변경 (향후 언어 3개 이상일 시 기존 드롭다운으로 롤백) */}
                    {locale === 'en' ? (
                      <Link href={asPath} locale="ko">
                        <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_en.svg" />
                        </a>
                      </Link>
                    ) : (
                      <Link href={asPath} locale="en">
                        <a href={asPath} className={cn('lang-btn', 'btn btn-icon btn-40 btn-circle btn-header')}>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_lang_ko.svg" />
                        </a>
                      </Link>
                    )}
                    {/* <Popover
                      overlayClassName="lang-list-wrap"
                      content={
                        <ul className={cn('lang-list')}>
                          <li>
                            <Link href={asPath} locale="en">
                              <a href={asPath} className={cn(locale === 'en' && 'active', 'link')}>
                                English
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href={asPath} locale="ko">
                              <a href={asPath} className={cn(locale === 'ko' && 'active')}>
                                Korean
                              </a>
                            </Link>
                          </li>
                        </ul>
                      }
                      trigger="click"
                      // open={langVisible}
                      // onOpenChange={handleLangVisibleChange}
                      placement="bottomLeft"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <div className={cn('btn-open-lang', langVisible && 'active')} style={{ display: 'inline-flex' }}>
                        <IconButton buttonText="언어 변경" size="40" iconValue="lang" circle classnames="btn-header" />
                      </div>
                    </Popover> */}
                  </>
                )}
              </div>
            }
            placement="right"
            closable={false}
            onClose={closeMobileMenu}
            open={moMenuOpen}
            extra={<IconButton iconValue="close" onClick={closeMobileMenu} buttonText="Close" size="32" />}
            className="mobile-menu-wrap"
          >
            <div className={cn('mobile-menu-top')}>
              {/* TODO: 2022.11.08 수정 : 11일 오픈 시 기능 히든 */}
              {/* <div className={cn('mypage-banner')}>
                <div className={cn('info-wrap')}>
                  <Avatar className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}  size={48} />
                  <div>
                    <strong className={cn('user-nickname')}>Scarlet Jang</strong>
                    <div className={cn('user-id-wrap')}>
                      <span className={cn('user-id')}>{ID}</span>
                      <CopyToClipboard text={ID}>
                        <button className={cn('btn-copy-id')} onClick={() => message.info({ content: '지갑 주소가 복사되었습니다.', key: 'toast' })}>
                          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg' />
                          <span className={cn('a11y')}>{t('copyWallet')}</span>
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <Link href="/mypage" passHref>
                  <a className={cn('btn-move-page')} onClick={closeMobileMenu}>
                    <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
                    <span className={cn('a11y')}>{t('goToMyPage')}</span>
                  </a>
                </Link>
              </div> */}
              {/* 22.11.09 수정: TODO : 11일 오픈 관련 코드 추가 */}
              {isConnect ? (
                <div className={cn('mypage-banner wallet-banner')}>
                  <div className={cn('info-wrap connect')}>
                    <Avatar
                      className={cn(`user-image`, userProfile.themeIndex && `type${userProfile.themeIndex}`)}
                      size={40}
                      style={{ backgroundImage: userProfile.img && `url(${userProfile.img})` }}
                    />
                    <div className="info-wrap">
                      <span className="user-nickname">{shorten(nileWallet)}</span>
                      <CopyToClipboard text={nileWallet ?? ''}>
                        <button className={cn('btn-copy-id')} onClick={() => message.info({ content: t('copyWalletAnnounce'), key: 'toast' })}>
                          <strong> {shorten(nileWallet)}</strong>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                          <span className={cn('a11y')}>{t('copyWallet')}</span>
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <button className={cn('btn-move-page')} onClick={handleClickToProfile}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                    <span className={cn('a11y')}>{t('goToMyPage')}</span>
                  </button>
                </div>
              ) : (
                <div className={cn('mypage-banner wallet-banner')} onClick={_handleConnectBtn}>
                  <div className={cn('info-wrap')}>
                    <strong>NFT Is Life Evolution</strong>
                    <span>{t('wallet.guideText')}</span>
                  </div>
                  <button className={cn('btn-move-page')} onClick={handleClickToProfile}>
                    <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                  </button>
                </div>
              )}
              <ul className={cn('mobile-menu')}>
                {menuList.map((menu) => {
                  return (
                    <li key={menu.title}>
                      <Link href={{ pathname: menu.url }} passHref>
                        <a onClick={() => !disabled && closeMobileMenu()} className={cn({ disabled: disabled || menu.disabled })}>
                          {/* 22.11.09 수정: TODO : 11일 오픈 unfolding soon 추가 */}
                          <span>
                            {menu.title}
                            {menu.disabled && <em>Unfolding Soon</em>}
                          </span>
                          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* 22.11.09 수정: TODO : 11일 오픈 숨김 처리 */}
            {/* <div className={cn('mobile-menu-bottom')}>2022-02-02 17:00 Connected wallet</div> */}
            <div className={cn('notification', moNotificationOpen && 'active')}>
              <HeaderNotification clickEvent={closeMobileMenu} />
            </div>
          </Drawer>
        </div>
      </div>
      <SearchModal isOpen={isSearchModal} setIsOpen={setIsSearchModal} />
      {/* <ConnectModal isModalVisible={isConnectModal} setIsModalVisible={setIsConnectModal} */}
      {/*               changeConnectFirst={changeConnectFirst} /> */}
      {/* 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가 */}
      <NetworkSettingModal isOpen={isModalNetworkSetting} setIsOpen={setModalNetworkSetting} />
      {/* TODO: 네트워크 변경 팝업. 필요시 노출 */}
      <NetworkModal isOpen={isModalNetwork} setIsOpen={setModalNetwork} />
    </header>
  );
};
