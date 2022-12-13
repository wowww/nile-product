import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { NileCDNLoader } from '@utils/image/loader';
import { NileNftToken } from '@/models/nile/marketplace/NileNft';

interface ItemsItemProps {
  title: string;
  link: string;
  img: string;
  count: number;
  isLike?: boolean;
}

interface Props {
  items?: NileNftToken[];
}

const FavoriteCards = ({ items }: Props) => {
  return (
    <ul className={cn('recommend-list')}>
      {items?.map((item: NileNftToken) => (
        <li key={item?.id}>
          <Link href={`/marketplace/${item?.collection?.slug}/${item?.tokenId}`}>
            <div className={cn('recommend-item')}>
              <div className={cn('img-wrap')}>
                <Image src={item?.image ?? ""} alt="" layout="fill" loader={NileCDNLoader} />
              </div>
              <div className={cn('text-wrap')}>
                <strong>{item?.name}</strong>
              </div>
            </div>
          </Link>
          {/* 22.10.11 수정: LikeButton 수정 */}
          {/*<LikeButton count={item.likeCount} />*/}
        </li>
      ))}
    </ul>
  );
};

export default FavoriteCards;
