import cn from 'classnames';

import FavoriteCards from '@/components/cards/FavoriteCards';

const MarketplaceDetailRecommend = ({ recommends }: { recommends?: any }) => {

  return (
    <div className={cn('marketplace-recommend')}>
      <strong>What other users are watching right now</strong>
      <FavoriteCards items={recommends?.items} />
    </div>
  );
};

export default MarketplaceDetailRecommend;
