import { ComponentMeta, ComponentStory } from '@storybook/react';
import OutlineButton from '../button/OutlineButton';
import ShareButton from '../button/ShareButton';
import ContentTitle from './ContentTitle';
import MarketplaceState from './MarketplaceState';
import MarketplaceProfileCard from './MarketplaceProfileCard';
import cn from 'classnames';
import { nftCardData } from './cardData';
import { ReactNode } from 'react';

export default {
  title: 'Marketplace/MarketplaceState',
  component: MarketplaceState,
  parameters: {
    componentSubtitle: '마켓플레이스 프로필 카드',
    argsTypes: {
      title: {
        description: '타이틀 텍스트 입니다.',
      },
      cont: {
        description: '컨텐츠 텍스트 입니다. ',
      },
      iconValue: {
        description: '제일 상단에 함께 노출되는 아이콘 입니다.',
        options: ['sucess', 'loading'],
      },
    },
  },
} as ComponentMeta<typeof MarketplaceState>;

const Template: ComponentStory<typeof MarketplaceState> = (args) => {
  return <MarketplaceState {...args} />;
};

const ProfileCard = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className={cn('marketplace-bid-wrap')}>
      <ContentTitle title={title} />
      <div className={cn('bid-top-section')}>
        <div className={cn('bid-cont-wrap')}>
          <MarketplaceProfileCard cardData={nftCardData[0]} />
          {children}
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Placed bid successfully',
  cont: 'You can receive a notification after the auction ends.',
  iconValue: 'success',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <ShareButton buttonType="bgButton" />
    </>
  ),
};

export const Icon = Template.bind({});
Icon.args = {
  iconValue: 'loading',
  title: 'Waiting for Confirmation',
  cont: 'Confirm this transaction in your wallet to list your NFT.',
};

export const PlaceForBid: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Place Bid">
      <Template {...args} />
    </ProfileCard>
  );
};
PlaceForBid.args = {
  iconValue: 'success',
  title: 'Placed bid successfully',
  cont: 'You can receive a notification after the auction ends.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <ShareButton buttonType="bgButton" />
    </>
  ),
};

export const Listing: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Listing">
      <Template {...args} />
    </ProfileCard>
  );
};
Listing.args = {
  iconValue: 'success',
  title: 'Your NFT has been listed!',
  cont: 'Your NFT has been successfully listed on our marketplace.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <ShareButton buttonType="bgButton" />
    </>
  ),
};

export const ChangeStatus: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Change Status">
      <Template {...args} />
    </ProfileCard>
  );
};
ChangeStatus.args = {
  iconValue: 'success',
  title: 'Chaged status successfully',
  cont: 'The NFT has been changed to ‘Open for Offers’ status.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <ShareButton buttonType="bgButton" />
    </>
  ),
};

export const EditListing: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Edit Listing">
      <Template {...args} />
    </ProfileCard>
  );
};
EditListing.args = {
  iconValue: 'success',
  title: 'Edit Listing',
  cont: 'Your NFT has been successfully listed on our marketplace.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <ShareButton buttonType="bgButton" />
    </>
  ),
};
export const BuyNow: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Buy Now">
      <Template {...args} />
    </ProfileCard>
  );
};
BuyNow.args = {
  iconValue: 'success',
  title: 'Payment completed successfully',
  cont: 'You’ve got the right to own this NFT forever.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <ShareButton buttonType="bgButton" />
    </>
  ),
};

export const CompleteCheckout: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Complete Checkout">
      <Template {...args} />
    </ProfileCard>
  );
};
CompleteCheckout.args = {
  iconValue: 'success',
  title: 'Finally, you get NFT!',
  cont: 'You get the right to own this NFT forever.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <ShareButton buttonType="bgButton" />
    </>
  ),
};

export const GetRefund: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Get Refund">
      <Template {...args} />
    </ProfileCard>
  );
};
GetRefund.args = {
  iconValue: 'success',
  title: 'You’ve got money back safety!',
  cont: 'Your bid went back to your wallet safely.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <OutlineButton buttonText="Go to Marketplace" color="black" size="md" href="" />
    </>
  ),
};

export const CancelBid: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Cancel Bid">
      <Template {...args} />
    </ProfileCard>
  );
};
CancelBid.args = {
  iconValue: 'success',
  title: 'Your bidding has been canceled!',
  cont: 'Your bid went back to your wallet safely.',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <OutlineButton buttonText="Go to Marketplace" color="black" size="md" href="" />
    </>
  ),
};

export const CancleListing: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Cancel Listing">
      <Template {...args} />
    </ProfileCard>
  );
};
CancleListing.args = {
  iconValue: 'success',
  title: 'Your listing has been canceled!',
  cont: 'Your listing has been canceled!',
  buttons: (
    <>
      <OutlineButton buttonText="View NFT" color="black" size="md" href="" />
      <OutlineButton buttonText="Go to Marketplace" color="black" size="md" href="" />
    </>
  ),
};

export const BeingListed: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Being listed">
      <Template {...args} />
    </ProfileCard>
  );
};
BeingListed.args = {
  iconValue: 'loading',
  title: 'Your NFT is being listed...',
  cont: 'Your NFT has been submitted to our marketplace and will be live as soon as the transation is proceed.',
};

export const WaitingConfirmation: ComponentStory<typeof MarketplaceState> = (args) => {
  return (
    <ProfileCard title="Waiting Confirmation">
      <Template {...args} />
    </ProfileCard>
  );
};
WaitingConfirmation.args = {
  iconValue: 'loading',
  title: 'Waiting for Confirmation',
  cont: 'Confirm this transaction in your wallet to list your NFT.',
};
