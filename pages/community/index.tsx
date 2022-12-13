import {useEffect, useState} from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CommunityHero from '@/components/community/CommunityHero';
import CommunityCard from '@/components/community/CommunityCard';
/* 22.11.08 수정: 로티 추가 */
import CommunityHeroPattern from '@/components/community/CommunityHeroPattern';
import PaginationCustom from '@/components/button/PaginationCustom';

/* 22.11.02 수정: 다국어 추가 */
import { useTranslation } from 'next-i18next';
import { StaticImageData } from 'next/image';

type Member = {
  avatar: string;
  name: string;
};

export interface CommunityCardData {
  join: boolean;
  type: {
    name: string;
    status?: boolean;
  };
  thumbnail: string | StaticImageData;
  tags: Array<string>;
  title: string;
  description: string;
  members: Member[];
  latest: {
    value: number;
    format: string;
  };
  marketCap: number;
  token?: string;
}

const cardDatas: CommunityCardData[] = [
  {
    join: false,
    type: {
      name: 'nft',
    },
    thumbnail: "/assets/images/img/img_community_thumbnail_stroy.png",
    /* 22.11.11 수정: 태그값 수정 */
    tags: ['Art', 'NFT', 'Collectibles'],
    title: 'Sights of NILE(SON)',
    description: 'Sights of NILE(SON)',
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 3,
      format: 'months ago',
    },
    marketCap: 1923000,
  },
  {
    join: false,
    type: {
      name: 'nft',
    },
    thumbnail: "/assets/images/img/img_community_thumbnail_nft.png",
    tags: ['NFT', 'Pixel Art'],
    title: 'London Underground Station(LUS) 264 Genesis',
    description: 'London Underground Station(LUS) 264 Genesis',
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 1,
      format: 'hours ago',
    },
    marketCap: 1923000,
  },
  {
    join: false,
    type: {
      name: 'nft',
    },
    thumbnail: "/assets/images/img/img_community_thumbnail_tangled.png",
    tags: ['Life', 'NFT', 'Talk to Earn'],
    title: 'Tangled Timepieces',
    description: `Tangled Timepieces`,
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 2,
      format: 'weeks ago',
    },
    marketCap: 1923000,
  },
  {
    join: true,
    type: {
      name: 'dao',
      status: true,
    },
    thumbnail: "/assets/images/img/img_community_thumbnail_dao.png",
    tags: ['DAO', 'Protocol DAO'],
    title: 'WONDER DAO Members',
    /* 22.11.10 수정: 데이터 수정 */
    description: 'WONDER',
    members: [
      { avatar: '/temp/@temp_community_members.png', name: 'hello' },
      { avatar: '/temp/@temp_community_members.png', name: 'world' },
      { avatar: '/temp/@temp_community_members.png', name: 'pxd' },
      { avatar: '/temp/@temp_community_members.png', name: 'wemix' },
    ],
    latest: {
      value: 59,
      format: 'minutes ago',
    },
    marketCap: 1923000,
  },
];

const Community = () => {
  const { t } = useTranslation('community');

  const [activatePagination, setPaginationActivate] = useState(1);
  const login = false;

  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  return (
    <>
      <Helmet>
        <title>Community &gt; NILE</title>
      </Helmet>
      <div className={cn('community-wrap')}>
        <div className={cn('community-banner')}>
          {/* START: 22.11.08 로티 배경 추가 */}
          <div className={cn('hero-lottie-area')}>
            <div className="gradient1"></div>
            <div className="gradient2"></div>
            <CommunityHeroPattern />
            <div className="round-gradient"></div>
          </div>
          {/* END: 22.11.08 로티 배경 추가 */}
          <CommunityHero />
        </div>
        <div className={cn('community-lists-wrap')}>
          <div className={cn('community-lists')}>
            <div>
              {/* 22.11.11 수정: 문구 수정 */}
              <h2>Explore Communities on Papyrus</h2>
              <ul className={cn('lists')}>
                {cardDatas.map((cd, index) => (
                  <li key={'community-card-' + index}>
                    <CommunityCard login={false} data={cd} />
                  </li>
                ))}
              </ul>
            </div>

            {/* START: 22.11.03 11/11 오픈 제외 콘텐츠 */}
            {/* <div>
              <h2>My Papyrus</h2>
              <ul className={cn('lists')}>
                {cardDatas
                  .filter((cd) => cd.join === true)
                  .map((cd, index) => (
                    <li key={'community-card-' + index}>
                      <CommunityCard login={true} data={cd} />
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h2>Various Communities in Papyrus</h2>
              <ul className={cn('lists')}>
                {cardDatas
                  .filter((cd) => cd.join === false)
                  .map((cd, index) => (
                    <li key={'community-card-' + index}>
                      <CommunityCard login={true} data={cd} />
                    </li>
                  ))}
              </ul>
            </div> */}

            {/* {!login && (
              <div>
                <h2>Explore Communities on Papyrus</h2>
                <ul className={cn('lists')}>
                  {cardDatas.map((cd, index) => (
                    <li key={'community-card-' + index}>
                      <CommunityCard login={login} data={cd} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {login && (
              <>
                <div>
                  <h2>My Papyrus</h2>
                  <ul className={cn('lists')}>
                    {cardDatas
                      .filter((cd) => cd.join === true)
                      .map((cd, index) => (
                        <li key={'community-card-' + index}>
                          <CommunityCard login={login} data={cd} />
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h2>Various Communities in Papyrus</h2>
                  <ul className={cn('lists')}>
                    {cardDatas
                      .filter((cd) => cd.join === false)
                      .map((cd, index) => (
                        <li key={'community-card-' + index}>
                          <CommunityCard login={login} data={cd} />
                        </li>
                      ))}
                  </ul>
                </div>
              </>
            )} */}
            {/* <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} /> */}
            {/* END: 22.11.03 11/11 오픈 제외 콘텐츠 */}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['community', 'common'])),
    },
  };
};

export default Community;
