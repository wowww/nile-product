import { useCallback, useEffect, useRef, useState } from 'react';
import { Trans } from 'next-i18next';
import lottie from 'lottie-web';
import lottieCongratulations from '@/assets/lottie/lottie_congratulations.json';
import cn from 'classnames';
import { Avatar } from 'antd';
import { useWalletFormatter } from '@utils/formatter/wallet';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';
import NileNft from '@/models/nile/marketplace/NileNft';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;
import { useAtom } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import { NileApiService } from '@/services/nile/api';

interface Props {
  status: 'success' | 'fail' | 'no-bid';
  image?: string;
  name: string;
  price: string;
  time: string;
  item?: NileNft;
}

const MarketplaceDetailBidResult = ({ status = 'success', image, name, price, time, item }: Props) => {
  const bgLottie = useRef<any>(null);
  const { shorten } = useWalletFormatter();
  const [isMobile, setIsMobile] = useState(false);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();
  const [nileWallet, setNileWallet] = useAtom(nileWalletAtom);
  const offset = useAtomValue(windowResizeAtom);
  const api = NileApiService();

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

  useEffect(() => {
    if (offset.width < 350) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [offset.width]);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: bgLottie.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieCongratulations,
    });

    return () => lottieLoad.destroy();
  }, [status]);

  return (
    <div className={cn('marketplace-bid-result', status)}>
      <Avatar
        size={40}
        className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
        style={{ backgroundImage: image && image }}
      />
      <p>
        <Trans
          i18nKey="detailTop.resultMsg"
          ns="marketplace"
          values={{
            name: `${isMobile ? shorten(name) : name}`,
            price: `${new Intl.NumberFormat('ko-KR').format(Number(price))} WEMIX$`,
            mark: '!',
          }}
        >
          <strong></strong>
        </Trans>
      </p>
      <span className={cn('time')}>{time}</span>
      {status !== 'fail' && <div className={cn('lottie-area')} ref={bgLottie}></div>}
    </div>
  );
};

export default MarketplaceDetailBidResult;
