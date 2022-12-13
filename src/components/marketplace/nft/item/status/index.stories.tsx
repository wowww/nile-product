import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MarketNftItemStatus, MarketNftItemStatusType } from './index';

export default {
  title: 'Market/NFT/Item/Status',
  component: MarketNftItemStatus,
} as ComponentMeta<typeof MarketNftItemStatus>;

const Template: ComponentStory<typeof MarketNftItemStatus> = (args) => <MarketNftItemStatus {...args} />;

export const Upcoming = Template.bind({});

Upcoming.args = {
  status: MarketNftItemStatusType.UPCOMING,
};

export const AuctionLiveBeforeBid = Template.bind({});

AuctionLiveBeforeBid.args = {
  status: MarketNftItemStatusType.AUCTION_LIVE_BEFORE_BID,
};

export const AuctionLiveAfterBid = Template.bind({});

AuctionLiveAfterBid.args = {
  status: MarketNftItemStatusType.AUCTION_LIVE_AFTER_BID,
  remain: 300,
};

export const AuctionClosed = Template.bind({});

AuctionClosed.args = {
  status: MarketNftItemStatusType.AUCTION_CLOSED,
};

export const Listing = Template.bind({});

Listing.args = {
  status: MarketNftItemStatusType.LISTING,
};

export const OfferBefore = Template.bind({});

OfferBefore.args = {
  status: MarketNftItemStatusType.OFFER_BEFORE,
};

export const OfferOngoing = Template.bind({});

OfferOngoing.args = {
  status: MarketNftItemStatusType.OFFER_ONGOING,
};

export const NotForSale = Template.bind({});

NotForSale.args = {
  status: MarketNftItemStatusType.NOT_FOR_SALE,
};

