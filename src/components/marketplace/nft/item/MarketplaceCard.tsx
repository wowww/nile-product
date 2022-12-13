import cn from 'classnames';
import { MarketplaceListItem } from '@components/marketplace/nft/item/MarketplaceListItem';
import { MarketplaceCardItem } from '@components/marketplace/nft/item/MarketplaceCardItem';
import { MarketplaceListHoverItem } from '@components/marketplace/nft/item/MarketplaceListHoverItem';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';

export type Nft = {
  id: number;
  type: string;
  videoUrl?: string;
  imageUrl?: string;
  title: string;
  collection: {
    id: number;
    title: string;
    status: string;
    creator: {
      id: number;
      name: string;
      wallet: string;
    };
  };
  owner: {
    id: number;
    name: string;
    wallet: string;
  };
  status: string;
  price: string;
  unitFormat: string;
  favorite: boolean;
  startDate: string;
  creator: {
    id: number;
    name: string;
    wallet: string;
  };
  participants: number;
};

interface cardDataType {
  cardData?: NileNftToken[];
  viewType?: string; // list | card | list-hover
  avatarSize?: number;
  likeHidden?: boolean;
}

const MarketplaceCard = ({ cardData, viewType = 'card', avatarSize = 24, likeHidden = true }: cardDataType) => {

  return (
    <ul className={cn('marketplace-card-list', `view-${viewType}`)}>
      {cardData?.map((item, index) => (
        <li
          key={item.id}
          className={cn(viewType === 'card' ? 'marketplace-card-view' : 'marketplace-list-view', viewType === 'list-hover' && 'list-hover')}
        >
          {
            {
              list: <MarketplaceListItem item={item} />,
              card: <MarketplaceCardItem item={item} avatarSize={avatarSize} />,
              'list-hover': <MarketplaceListHoverItem item={item} avatarSize={avatarSize}/>,
            }[viewType]
          }
        </li>
      ))}
    </ul>
  );
};

export default MarketplaceCard;
