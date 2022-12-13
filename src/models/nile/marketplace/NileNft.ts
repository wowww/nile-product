import { Address } from '@/models/nile/contract/NileContract';
import NileCollection from '@/models/nile/marketplace/NileCollection';
import NileUserAccount from '@/models/nile/user/NileUserAccount';
import dayjs from 'dayjs';
import { MarketNftItemStatusType } from '@/services/nile/api';

type NileNft = {
  token: NileNftToken;
  orderList: NileNftOrder[];
  metadata: NileNftMetadata
}

export const getNileNftStatus: (token: NileNftToken, user?: Address) => MarketNftItemStatusType = (token, user) => {
  const now = dayjs();
  const order = token?.orderList?.at(0);
  const orderStartTime = dayjs.utc(token?.orderStartAt);
  const orderEndTime = dayjs.utc(token?.orderEndAt);

  if (!order) {
    return MarketNftItemStatusType.NONE;
  }

  if (token.orderStatus === NileOrderStatusType.CLOSE) {
    return MarketNftItemStatusType.CLOSED;
  }

  if (token.orderStatus === NileOrderStatusType.COMPLETE) {
    return MarketNftItemStatusType.COMPLETE;
  }

  if (now.isAfter(orderStartTime)) {
    if (token?.orderEndAt && now.isAfter(orderEndTime)) {
      return MarketNftItemStatusType.COMPLETE;
    }
    if (order.type === NileOrderType.AUCTION) {
      if (order.biddingList?.length) {
        return MarketNftItemStatusType.AUCTION_LIVE_ONGOING;
      }
      return MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID;
    }
    if (order.type === NileOrderType.FIXED_PRICE) {
      return MarketNftItemStatusType.OPEN;
    }
    return MarketNftItemStatusType.NONE;
  }
  return MarketNftItemStatusType.NONE;
};

export const getNileOrderStatus: (order: NileNftOrder, user?: Address) => MarketNftItemStatusType = (order, user) => {
  const now = dayjs();
  const orderStartTime = dayjs.utc(order.startAt);
  const orderEndTime = dayjs.utc(order.endAt);

  if (order.orderStatus === NileOrderStatusType.COMPLETE) {
    return MarketNftItemStatusType.COMPLETE;
  }

  if (order.orderStatus === NileOrderStatusType.CLOSE) {
    return MarketNftItemStatusType.CLOSED;
  }

  if (order.type === NileOrderType.AUCTION) {

    if (orderStartTime.isAfter(now)) {
      if (order.biddingList?.length) {
        return MarketNftItemStatusType.AUCTION_LIVE_ONGOING;
      }
      return MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID;
    }
    return MarketNftItemStatusType.NONE;
  }

  if (order.type === NileOrderType.FIXED_PRICE) {
    if (orderStartTime.isAfter(now)) {
      return MarketNftItemStatusType.OPEN;
    }
  }

  if (order.type === NileOrderType.OPEN_PRICE) {
    if (order.orderStatus === NileOrderStatusType.OPEN) {

      return MarketNftItemStatusType.OPEN_OFFER_ONGOING;
    }
  }

  return MarketNftItemStatusType.NONE;
};


export type NileNftToken = {
  id?: string; // 토큰 ID(DB 관리용 UUID)
  createdAt?: string; // 토큰 생성 일자
  updatedAt?: string; // 토큰 변경 일자
  mintedAt?: string; // 토큰 민팅 일자
  collectionId?: string; // 컬렉션 ID(DB 관리용)
  collectionAddress?: string; // 컬렉션 주소(컨트랙트 주소)
  name?: string; // 토큰 이름, 민팅시 설정
  description?: string; // 토큰 설명, 메타데이터에 존재
  image?: string;
  imageUrl?: string; // 작품이 사진 형태일 때의 URL
  videoUrl?: string; // 작품이 영상 형태일 때의 URL
  tokenId?: string; // 토큰 ID(민팅시 발급되는 ID)
  uri?: string; // 메타데이터 URI
  unitFormat?: string;
  status?: string | NileNftTokenStatusType; // 상태
  price?: string;
  viewCount?: number;
  likeCount?: number;
  contractAddress?: string;
  collection?: NileCollection;
  ownerAddress?: string; // 소유자 주소
  owner?: NileUserAccount; // 소유자 정보, 소유자 주소로 조회해야 함
  ownerName?: string;
  orderType?: string;
  orderStatus?: string | NileOrderStatusType;
  orderStartAt?: string;
  orderEndAt?: string;
  orderList?: NileNftOrder[]
};

export type NileNftOrder = {
  id?: string; // UUID
  tokenId: number; // NFT 토큰 ID, 컨트랙트의 토큰 ID와 일치
  orderId?: number; // 주문 ID, 결제와 정산에서 사용
  round?: number;
  type?: NileOrderType;
  orderIndex?: number;
  orderStatus?: string;
  orderAmount?: number; // 주문 수량: 단건 거래: 1, 다중 거래: n
  totalSoldAmount?: number;
  seller?: Address;
  collectionAddress?: Address;
  payment?: Address;
  price?: string;
  timestamp?: string;
  startAt?: string; // 주문 시작 시간, UTC
  endAt?: string; // 주문 종료 시간, UTC
  createdAt?: string;
  updatedAt?: string;
  biddingList?: NileBidding[];
}

export enum NileNftOrderRound {
  FIRST = 0, // 1차 판매
  SECOND = 1, // 2차 판매
}

export type NileBidding = {
  id?: string // UUID
  createdAt?: string;
  updatedAt?: string;
  tokenOrderId: string;
  orderIndex: number;
  address?: Address;
  status: string;
  received: boolean;
  receivedAt?: string;
  nickname?: string;
  price: string;
  timestamp: string;
}

// 토큰 상태
export enum NileNftTokenStatusType {
  NOT_FOR_SALE = 'NOT_FOR_SALE',
  NONE = 'NONE',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

// 주문 종류(판매/구매 방식)
export enum NileOrderType {
  NONE = 'NONE',
  AUCTION = 'AUCTION',
  FIXED_PRICE = 'FIXED_PRICE',
  OPEN_PRICE = 'OPEN',
}

// 주문 상태
export enum NileOrderStatusType {
  NONE = 'NONE', // 판매 대기
  TO_BE_OPENED = 'TO_BE_OPENED',
  OPEN = 'OPEN', // 판매중
  CLOSE = 'CLOSE', // 판매 종료
  COMPLETE = 'COMPLETE', // 판매 완료
}

// 응찰(비딩) 상태
export enum NileBiddingStatusType {
  OPEN = 'OPEN', // 최상위 입찰
  FAILURE = 'FAILURE', // 상위 응찰 존재 / 환불 필요
  CLOSE = 'CLOSE', // 환불 완료
}

export type NileNftMetadata = {
  id: number;
  name: {
    language: string;
    value: string;
  }[];
  description: {
    language: string;
    value: string;
  }[];
  image: string;
  externalLink: string;
  backgroundColor: string;
  attributes: {
    type: string;
    value: any[];
  }[];
}

export default NileNft;
