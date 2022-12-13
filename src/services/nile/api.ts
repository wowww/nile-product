import axios from 'axios';
import https from 'https';

import homeStories from '@/mocks/home/story.json';
import homeBanners from '@/mocks/home/banners.json';
import homeChoice from '@/mocks/home/choice.json';
import homeNewsfeeds from '@/mocks/home/newsfeeds.json';
import lifeArticles from '@/mocks/life/articles.json';
import lifeCategories from '@/mocks/life/categories.json';
import marketplaceCategories from '@/mocks/marketplace/categories.json';
import marketplacePriceRanks from '@/mocks/marketplace/rank/price.json';
import marketplaceTransactionRanks from '@/mocks/marketplace/rank/transaction.json';
import communityDaoList from '@/mocks/community/dao/list.json';
import myActivities from '@/mocks/mypage/activity.json';
import myHistories from '@/mocks/mypage/history.json';
import myFavorites from '@/mocks/mypage/history.json';

export enum MarketNftItemStatusType {
  NONE = 'NONE',
  AUCTION_LIVE_BEFORE_BID = 'AUCTION_LIVE_BEFORE_BID',
  AUCTION_LIVE_ONGOING = 'AUCTION_LIVE_ONGOING',
  COMPLETE = 'COMPLETE',
  OPEN = 'OPEN',
  OPEN_OFFER_BEFORE_OFFER = 'OPEN_OFFER_BEFORE_OFFER',
  OPEN_OFFER_ONGOING = 'OPEN_OFFER_ONGOING',
  CLOSED = 'CLOSED',
}

type profile = {
  nickname: string;
  description: string;
  url: string;
  themeIndex?: number;
  displayAsset: string;
  img?: string;
};

export const NileApiService = () => {
  const server = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENV_NILE_API || 'https://api.dev.nile.io',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  server.interceptors.request.use((request) => {
    console.log('request', request);
    return request;
  });

  server.interceptors.response.use((response) => {
    console.log('response', response);
    return response;
  });

  const home = {
    story: {
      getList: async () => homeStories,
    },
    newsfeed: {
      getList: async () => homeNewsfeeds,
    },
    choice: {
      getList: async () => homeChoice,
    },
    banner: {
      getList: async () => homeBanners,
    },
  };

  const life = {
    article: {
      getList: async () => lifeArticles,
    },
    category: {
      getList: async () => lifeCategories,
    },
  };

  const marketplace = {
    banner: {
      getList: async () => [],
    },
    collection: {
      getList: async () => server.get('/marketplace/collections'),
      getItem: async (collectionAddressOrSlug: { slug?: string; address?: string }, shuffle?: boolean, size?: number) =>
        server.get('/marketplace/collection', {
          params: {
            ...collectionAddressOrSlug,
            shuffle,
            size,
          },
        }),
      getCategories: async () => server.get('/marketplace/categories', {
        params: {
          page: 1,
          size: 20,
          includeCollection: true,
        },
      }),
      getTokens: async (collectionAddressOrSlug: { slug?: string; address?: string }, page?: number, size?: number) => server.get('/marketplace/collection/tokens', {
        params: {
          ...collectionAddressOrSlug,
          page,
          size,
        },
      }),
      getOrderStat: async (slug: string) => server.get('/marketplace/collection/order-stat', {
        params: {
          slug,
        },
      }),
      getPriceStat: async (slug: string) => server.get('/marketplace/collection/price-stat', {
        params: {
          slug,
        },
      }),

    },
    nft: {
      getList: async (page?: number, size?: number, slug?: string, sort?: string, status?: string[]) => {
        const params = new URLSearchParams();
        if (page) {
          params.append('page', String(page));
        }
        if (size) {
          params.append('size', String(size));
        }
        if (slug) {
          params.append('slug', slug);
        }
        if(sort) {
          params.append('sort', sort);
        }
        if(status) {
          status.forEach((value) => {
            params.append('orderStatus', value);
          })
        }

        return server.get('/marketplace/tokens', { params });
      },
      getItem: async (params: { collectionSlug?: string, collectionAddress?: string, tokenId: number }) =>
        server.get(`/marketplace/token`, { params }),
      getTransactionHistory: async (params: { collectionAddress?: string, tokenId: number | string | undefined }) =>
        server.get(`/marketplace/token/transactions`, { params }),
      getPriceHistory: async (params: { collectionAddress?: string, tokenId: number | string | undefined }) =>
        server.get(`/marketplace/token/prices`, { params }),
    },
    category: {
      getList: async () => marketplaceCategories,
      // server.get('/marketplace/categories', {
      //   params: {
      //     // TODO
      //     page: 1,
      //     size: 10,
      //   }
      // })
    },
    rank: {
      price: {
        getList: async () => marketplacePriceRanks,
      },
      transaction: {
        getList: async () => marketplaceTransactionRanks,
      },
      getList: async () => [],
    },
  };

  const community = {
    dao: {
      getList: async () => communityDaoList,
    },
  };

  const user = {
    login: async (walletAddress: string, signature: string) =>
      server.post('/user/login', {
        walletAddress,
        signature,
      }),
    signup: async (walletAddress: string) => server.post('/user/account', { walletAddress }),
    account: {
      getUserInfo: async (walletAddress: string) => server.get(`/user/account`, {
        params: {
          address: walletAddress,
        },
      }),
      updateUserInfo: async (id: string, userInfo: profile) =>
        server.put(
          `/user/account/${id}`,
          { ...userInfo },
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6WyJST0xFX1NVUEVSX0FETUlOIl0sImVuYWJsZWQiOnRydWUsInN1YiI6IjB4NzFjZTAyMTUwOTcxMGE4NmJjZmVjNTNhZTI4OTEzMDEwY2U2NmE0OSIsImlhdCI6MTY2ODYwNTk2OSwiZXhwIjoxNjY4NjQ5MTY5fQ.Cu9OhzlyCfknv3p7TtC9AZU22-qs7nnrWPQgmzYNlTo',
            },
          },
        ),
      validNickName: async (value: string) =>
        server.get(`/user/account/nickname/valid`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6WyJST0xFX1NVUEVSX0FETUlOIl0sImVuYWJsZWQiOnRydWUsInN1YiI6IjB4NzFjZTAyMTUwOTcxMGE4NmJjZmVjNTNhZTI4OTEzMDEwY2U2NmE0OSIsImlhdCI6MTY2ODYwNTk2OSwiZXhwIjoxNjY4NjQ5MTY5fQ.Cu9OhzlyCfknv3p7TtC9AZU22-qs7nnrWPQgmzYNlTo',
          },
          params: {
            nickname: value,
          },
        }),
    },
  };

  const mypage = {
    activity: { getList: async () => myActivities },
    history: {
      getList: async () => myHistories,
    },
    favorite: {
      getList: async () => myFavorites,
    },
    collection: {
      getList: async (page: number, size: number, walletAddress?: string) =>
        server.get('/marketplace/my/collections', {
          params: {
            page: page,
            size: size,
            walletAddress: walletAddress,
          },
        }),
    },
    nft: {
      getList: async (walletAddress: string, page?: number, size?: number) =>
        server.get('/marketplace/my/tokens', {
          params: {
            page: page,
            size: size,
            walletAddress: walletAddress,
          },
        }),
      getTransactionHistory: async (walletAddress: string) =>
        server.get(`/marketplace/my/transactions`, { params: { walletAddress } }),

      getPrice: async (walletAddress: string) =>
        server.get(`/marketplace/my/tokens/price`, { params: { walletAddress } }),
    },
  };

  return {
    home,
    life,
    marketplace,
    community,
    user,
    mypage,
  };
};
