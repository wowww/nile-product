import { ComponentMeta, ComponentStory } from '@storybook/react';
import OutlineButton from '../button/OutlineButton';
import ContentTitle from './ContentTitle';
import MarketplaceListing from './MarketPlaceListing';
import MarketplaceProfileCard from './MarketplaceProfileCard';
import cn from 'classnames';
import { nftCardData } from './cardData';
import { ReactNode } from 'react';

export default {
  title: 'Marketplace/MarketplaceListing',
  component: MarketplaceListing,
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
} as ComponentMeta<typeof MarketplaceListing>;

const ProfileCard = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className={cn('marketplace-listing-wrap')}>
      <ContentTitle title={title} />
      <div className={cn('listing-section')}>
        <MarketplaceProfileCard cardData={nftCardData[0]} />
        {children}
      </div>
    </div>
  );
};
const Template: ComponentStory<typeof MarketplaceListing> = (args) => {
  return <MarketplaceListing {...args} />;
};

export const Default: ComponentStory<typeof MarketplaceListing> = (args) => {
  return (
    <ProfileCard title="List NFT">
      <Template {...args} />
    </ProfileCard>
  );
};
Default.args = {
  oneTitle: '위 가격으로 작품 판매 시 아래 수수료를 제외한 금액을 판매 수익으로 얻을 수 있습니다.',
  twoTitle: 'Listing을 수정하거나 취소할 경우,아래와 같이 Gas Fee를 지불하셔야 합니다.',
  btn: [{ mode: 'BgButton', buttonText: 'List NFT', color: 'black', size: 'md', wallet: true }],
};

export const EditAndCancel: ComponentStory<typeof MarketplaceListing> = (args) => {
  return (
    <ProfileCard title="List NFT">
      <Template {...args} />
    </ProfileCard>
  );
};
EditAndCancel.args = {
  oneTitle: '위 가격으로 작품 판매 시 아래 수수료를 제외한 금액을 판매 수익으로 얻을 수 있습니다.',
  twoTitle: 'Listing을 수정하거나 취소할 경우,아래와 같이 Gas Fee를 지불하셔야 합니다.',
  btn: [
    { mode: 'OutlineButton', buttonText: 'Cancel Listing', color: 'black', size: 'md', href: '' },
    { mode: 'BgButton', buttonText: 'Edit Listing', color: 'black', size: 'md', href: '' },
  ],
};
