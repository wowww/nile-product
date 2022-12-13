import cn from 'classnames';

import { Avatar } from 'antd';
import Link from 'next/link';
import NileNft from '@/models/nile/marketplace/NileNft';
import { useCallback, useEffect, useState } from 'react';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import { NileApiService } from '@/services/nile/api';
import { useAtomValue } from 'jotai';
import { nileWalletAtom } from '@/state/nileWalletAtom';

interface DaoIndividualHomeDiscussType {
  data: DaoIndividualHomeDiscussData;
  item?: NileNft;
}

export interface DaoIndividualHomeDiscussData {
  link: string;
  title: string;
  author: string;
  authorImg: string;
  desc: string;
  time: string;
  group: {
    user: string;
    userImage: string;
  }[];
}

const DaoIndividualHomeDiscuss = ({ data, item }: DaoIndividualHomeDiscussType) => {
  const api = NileApiService();
  const nileWallet = useAtomValue(nileWalletAtom);
  const [userInfo, setUserInfo] = useState<NileUserAccount>();

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

  return (
    <Link href={data.link}>
      <a className={cn('dao-discuss-wrap')}>
        <div className={cn('discuss-title')}>
          <strong>{data.title}</strong>
        </div>
        <div className={cn('discuss-container')}>
          <div className="discuss-author">
            <Avatar
              size={28}
              className={cn('user-image', userInfo?.themeIndex && `type${userInfo?.themeIndex}`)}
              style={{ backgroundImage: `url(${data.authorImg})` }}
            />
            <span>{data.author}</span>
          </div>
          <p className="discuss-desc">{data.desc}</p>
          <span className="discuss-time">{data.time}</span>
          <div className={cn('avatar-group-wrap avatar-group-sm discuss-group')}>
            <Avatar.Group maxCount={3}>
              {data.group.map((group) => (
                <Avatar className={cn('user-image type3')} size={20} style={{ backgroundImage: `url(${group.userImage})` }} />
              ))}
            </Avatar.Group>
            <span className={cn('avatar-group-more')}>{data.group.length} discuss now</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DaoIndividualHomeDiscuss;
