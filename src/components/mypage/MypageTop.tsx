import { useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useWindowResize from '@/hook/useWindowResize';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Avatar, message, Popover } from 'antd';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { NileApiService } from '@/services/nile/api';
import { ReactSVG } from 'react-svg';
import NileNft from '@/models/nile/marketplace/NileNft';
import { fromWei, toBN } from 'web3-utils';
import axios from 'axios';
import { UserPriceInformation } from '@/models/nile/user';
import { useAtom, useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { windowResizeAtom } from '@/state/windowAtom';
import { userProfileAtom } from '@/state/accountAtom';
import NileUserAccount from '@/models/nile/user/NileUserAccount';

const MypageTop = () => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);
  const nileWallet = useAtomValue(nileWalletAtom);

  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);

  const [checkMobileWidth, setCheckMobileWidth] = useState(false);
  const [ownNftList, setOwnNftList] = useState<NileNft[]>([]);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

  const api = NileApiService();
  const userProfile = useAtomValue(userProfileAtom);
  const { shorten } = useWalletFormatter();

  const [wemixPrice, setWemixPrice] = useState<number>(0);
  const [usdPrice, setUsdPrice] = useState<number>(0);
  const [tokenPriceInfo, setTokenPriceInfo] = useState<UserPriceInformation | undefined>();

  const resizeMobileMode = () => {
    if (offset.width < 768) {
      setCheckMobileWidth(true);
    } else {
      setCheckMobileWidth(false);
    }
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
    [api]
  );

  useEffect(() => {
    getProfile(nileWallet);
  }, []);

  const totalTokenAmount = useCallback(() => {
    if (!tokenPriceInfo) {
      return 0;
    }

    const bnWemixTotal = toBN(tokenPriceInfo.totalWemixPrice);
    const bnUsdTotal = toBN(tokenPriceInfo.totalUsdPrice);

    let wemixUSD = 0;

    if (0 < usdPrice) {
      wemixUSD = wemixPrice / usdPrice;
    }

    console.log(bnWemixTotal.toString(), bnUsdTotal.toString());

    const etherValue = fromWei(bnUsdTotal.add(bnWemixTotal.muln(wemixUSD)), 'ether');
    console.log('totalTokenAmount', etherValue);
    return Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(Number(etherValue));
  }, [wemixPrice, usdPrice, tokenPriceInfo]);

  // width에 따른 함수 실행
  useEffect(() => {
    resizeMobileMode();
  }, [offset.width]);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  useEffect(() => {
    api.mypage.nft
      .getList(nileWallet ?? '')
      .then(({ data }) => setOwnNftList(data.results))
      .catch((err) => {
        return null;
      });

    api.mypage.nft
      .getPrice(nileWallet ?? '')
      .then(({ data }) => setTokenPriceInfo(data.result))
      .catch((e) => console.log(e));

    axios
      .get('https://api.upbit.com/v1/ticker?markets=KRW-WEMIX')
      .then(({ data, status }) => {
        if (status === 200) {
          setWemixPrice(data[0].trade_price || 0);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD')
      .then(({ data, status }) => {
        if (status === 200) {
          setUsdPrice(data[0].basePrice);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={cn('mypage-top-section')}>
      <div className={cn('mypage-profile')}>
        <div className={cn('inner')}>
          <Avatar
            className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
            style={{ backgroundImage: userProfile.img && `url(${userProfile.img})` }}
            size={100}
          >
            <span className={cn('a11y')}>{t('a11y.settingProfile')}</span>
          </Avatar>
          <div className={cn('profile-info')}>
            <h2>
              {userProfile?.nickname ?? shorten(nileWallet)}
              {/* <Link href="/mypage/profile">
                <a>
                  <IconSetting />
                  <span className={cn('a11y')}>{t('a11y.gotoSetting')}</span>
                </a>
              </Link> */}
            </h2>
            <CopyToClipboard text={nileWallet ?? ''}>
              {/* 22.11.09 수정: 토스트 팝업 중복 생성 방지 코드로 수정 */}
              <button className={cn('copy-wrap')} onClick={() => message.info({ content: t('toast.walletCopy'), key: 'toast' })}>
                {checkMobileWidth ? shorten(nileWallet) : nileWallet}
                <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_copy.svg" />
                <span className={cn('a11y')}>{t('a11y.copyWallerAdd')}</span>
              </button>
            </CopyToClipboard>
            <p className={cn('introduce-wrap')}>{userProfile?.description}</p>
          </div>
          {/* <ul className={cn('sns-list')}> */}
          {/*{snsList.map((item, index: number) => (*/}
          {/*  <li key={`sns-list-${index}`}>*/}
          {/*    <a href={item.link} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })} className={item.name}>*/}
          {/*      {item.icon}*/}
          {/*      <span className={cn('a11y')}>{item.name}</span>*/}
          {/*    </a>*/}
          {/*  </li>*/}
          {/*))}*/}
          {/*<li>*/}
          {/*  <a href={userInfo?.snsLinks?.at(0)?.link} target="_blank" rel="noopener noreferrer" title={t('blank', { ns: 'common' })} className="link">*/}
          {/*    <IconCopyLink />*/}
          {/*    <span className={cn('a11y')}>link</span>*/}
          {/*  </a>*/}
          {/*</li>*/}
          {/* </ul> */}
        </div>
      </div>
      <div className={cn('mypage-asset')}>
        <div className={cn('asset-total')}>
          <dl>
            <dt>
              Total Asset
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{t('tooltip.totalAsset')}</div>}
                trigger="click"
              >
                <button type="button">
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
            </dt>
            <dd>${totalTokenAmount()}</dd>
          </dl>
        </div>
        <span className={cn('asset-line')}></span>
        <div className={cn('asset-unit')}>
          <dl>
            <dt>
              {/* 22.11.16 수정: 11/17 오픈 컨텐츠 */}
              Total Balance of DAO
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{t('tooltip.includedDAO')}</div>}
                trigger="click"
              >
                <button type="button">
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
            </dt>
            <dd>
              <div>$0</div>
              <div>
                0 <span>DAO</span>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>
              My NFT Price
              <Popover
                overlayClassName="tooltip"
                placement="top"
                content={<div className={cn('tooltip-contents')}>{t('tooltip.nftPrice')}</div>}
                trigger="click"
              >
                <button type="button">
                  <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                </button>
              </Popover>
            </dt>
            <dd>
              <div>${tokenPriceInfo ? totalTokenAmount() : 0}</div>
              <div>
                {tokenPriceInfo?.totalCount ?? 0} <span>NFT</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MypageTop;
