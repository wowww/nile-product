import { ComponentMeta, ComponentStory } from '@storybook/react';
import { nftCardData } from '@/components/marketplace/cardData';
import MarketplaceProfileCard from './MarketplaceProfileCard';

export default {
  title: 'Marketplace/MarketplaceProfileCard',
  component: MarketplaceProfileCard,
  parameters: {
    componentSubtitle: '마켓플레이스 프로필 카드',
  },
} as ComponentMeta<typeof MarketplaceProfileCard>;

const Template: ComponentStory<typeof MarketplaceProfileCard> = (args) => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <MarketplaceProfileCard {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  cardData: nftCardData[0],
};
