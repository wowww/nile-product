import cn from 'classnames';
import Image from 'next/image';
import { Avatar } from 'antd';
import { NileCDNLoader } from '@utils/image/loader';
import { useWalletFormatter } from '@utils/formatter/wallet';
import {useCallback, useEffect, useState} from 'react';
import {MarketNftItemStatusType, NileApiService} from '@/services/nile/api';
import {getNileNftStatus, NileNftToken} from '@/models/nile/marketplace/NileNft';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';
import NileUserAccount from "@/models/nile/user/NileUserAccount";

interface cardDataType {
  cardData: any;
  item?: NileNftToken;
}

const MarketplaceState = ({ cardData, item }: cardDataType) => {
  const { shorten } = useWalletFormatter();
  const [status, setStatus] = useState(MarketNftItemStatusType.NONE);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();
  const nileWallet = useAtomValue(nileWalletAtom);

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
    setStatus(getNileNftStatus(cardData?.token, nileWallet));
  }, [cardData]);

  return (
    <div className={cn('profile-card')}>
      <div className={cn('img-block')}>
        {cardData?.token?.image ? (
          <Image src={cardData?.token?.image ?? ""} alt="" layout="fill" loader={NileCDNLoader} />
        ) : (
          <video autoPlay loop muted playsInline disablePictureInPicture>
            <source src={cardData?.token?.videoUrl ?? ""} type="video/mp4" />
          </video>
        )}
      </div>

      <div className={cn('profile-info-block')}>
        <div className={cn('profile-info-top')}>
          <strong className={cn('product-name')}>{cardData?.token?.name}</strong>
        </div>
        <div className={cn('profile-info-bottom')}>
          <dl>
            <button type="button">
              <dt>Creator</dt>
              <dd className={cn('profile-user-info')}>
                <Avatar size={28} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                <span className={cn('name')}>{cardData?.token?.collection?.ownerName ?? shorten(cardData?.token?.colleciton?.ownerAddress)}</span>
              </dd>
            </button>
            {status === MarketNftItemStatusType.CLOSED && (
              <button type="button">
                <dt>Owner</dt>
                <dd className={cn('profile-user-info')}>
                  <Avatar size={28} className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)} />
                  <span className={cn('name')}>{shorten(cardData?.token?.ownerAddress) ?? ""}</span>
                </dd>
              </button>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceState;
