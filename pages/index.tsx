import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';
import NileNews from '@/components/nile/NileNews';
import NileStoryCard from '@/components/cards/NileStoryCard';
import ContentTitle from '@/components/marketplace/ContentTitle';
import NilePick from '@/components/nile/NilePick';
import CookiesModal from '@/components/modal/CookiesModal';
import { NileApiService } from '@/services/nile/api';
import { NileVisual } from '@components/home/NileVisual';
import { NileCollectionResult } from '@/models/nile/marketplace/NileCollection';
import dynamic from 'next/dynamic';
import { useAtomValue } from 'jotai';
import { cookieAgreementAtom, eventModalAtom } from '@/state/modalAtom';

export type StoryListData = {
  id?: number;
  image?: string;
  videoUrl?: string;
  tags?: string[];
  title?: string;
  content?: string;
  link?: string;
  date?: string;
  work?: string;
  info?: string;
  columnist?: string;
  creator?: string;
}

export type NewsFeedData = {
  image?: string;
  en?: {
    title?: string;
    cont?: string;
  };
  ko?: {
    title?: string;
    cont?: string;
  };
  date?: string;
  link?: string;
};

export type ChoiceData = {
  tag?: string;
  image?: string;
  pickTitle?: string;
  pickDescription?: string;
  buttonType?: {
    buttonText?: string;
    link?: string;
  }[];
  additionLink?: {
    image?: string;
    productTitle?: string;
    priceTitle?: string;
    priceValue?: string;
    priceUnit?: string;
    statusTag?: string;
  }[];
};

type NileHomeProps = {
  storyList?: StoryListData[];
  newsList?: NewsFeedData[];
  choiceList?: ChoiceData[];
  lusAdditionList?: NileCollectionResult;
};

const HomeEventModal = dynamic(() => import('@components/modal/HomeEventModal'), { ssr: false });

const NileHome = ({ data }: { data: NileHomeProps }) => {
  const api = NileApiService();
  const { t } = useTranslation('nile');

  const cookieAgreement = useAtomValue(cookieAgreementAtom);
  const eventModal = useAtomValue(eventModalAtom);

  const [open, setOpen] = useState<boolean>(false);
  const [eventOpen, setEventOpen] = useState<boolean>(!eventModal);
  const [additionList, setAdditionList] = useState<NileCollectionResult | undefined>();
  const [storyList, setStoryList] = useState<StoryListData[]>();
  const [newsList, setNewsList] = useState<NewsFeedData[]>();
  const [choiceList, setChoiceList] = useState<ChoiceData[]>();

  useEffect(() => {
    api.marketplace.collection
      .getItem(
        {
          slug: 'LUS',
        },
        true,
        2
      )
      .then(({ data }) => setAdditionList(data))
      .catch((error) => {
        console.log(error);
      });
    api.home.story
      .getList()
      .then((data) => {
        setStoryList(data);
      })
      .catch((error) => {
        console.log(error);
      });
    api.home.newsfeed
      .getList()
      .then((data) => {
        setNewsList(data);
      })
      .catch((error) => {
        console.log(error);
      });
    api.home.choice
      .getList()
      .then((data) => {
        setChoiceList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const lusAdditionList = useMemo(() => {
    const collection = additionList?.result.collection;
    if (collection) {
      return {
        ...collection,
        items: collection?.items?.map((item) => ({ ...item, collection })),
      };
    }
  }, [data]);

  const onClosed = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!cookieAgreement) {
      setOpen(true);
    }
  }, [cookieAgreement, setOpen]);

  useEffect(() => {
    if (!eventModal) {
      setEventOpen(true);
    }
  }, [eventModal, setEventOpen]);

  return (
    <>
      <Helmet>
        <title>NILE</title>
        <body />
      </Helmet>
      <div className={cn('nile-main-wrap')}>
        <NileVisual />
        {/* <GrowthBanner /> */}
        <div className={cn('nile-content-wrap')}>
          <div className={cn('nile-content')}>
            <ContentTitle title={t('home.story.title')} serif href="/nile/story" />
            {/* cardStoryData.length === 1 && 'column' */}
            <div className={cn('story-card-wrap', 'column')}>
              {storyList?.map((story) => {
                return (
                  <NileStoryCard
                    videoUrl={story.videoUrl}
                    image={story.image}
                    tags={story.tags}
                    title={story.title}
                    content={story.content}
                    link={story.link}
                    date={story.date}
                    work={story.work}
                    info={story.info}
                    key={`nile-story${story.id}`}
                    creator={story.creator}
                    columnist={story.columnist}
                  />
                );
              })}
            </div>
          </div>
          <div className={cn('nile-content')}>
            <ContentTitle title={t('home.choice.title')} serif />
            <NilePick pickData={choiceList ?? []} lusAdditionList={lusAdditionList} />
          </div>
          <div className={cn('nile-content')}>
            <ContentTitle title={t('home.lastestNews.title')} serif href="https://medium.com/nile-official" newWindow />
            <NileNews newsData={newsList ?? []} />
          </div>
        </div>
      </div>
      <CookiesModal open={open} onClosed={onClosed} keyboard={false} />
      <HomeEventModal isModal={eventOpen} setIsModal={setEventOpen} />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'nile', 'terms'])),
    },
  };
};

export default NileHome;
