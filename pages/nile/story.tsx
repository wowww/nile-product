import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import ContentTitle from '@/components/marketplace/ContentTitle';
import NileStoryCard from '@/components/cards/NileStoryCard';
import { GetServerSideProps } from 'next';
import { NileApiService } from '@/services/nile/api';
import { StoryListData } from '../index';

type StoryProps = {
  storyList: StoryListData[];
};

const Story = ({ data }: { data: StoryProps }) => {
  const { t } = useTranslation('nile');
  return (
    <>
      <Helmet>
        <title>Nile's Story &gt; NILE</title>
      </Helmet>
      <div className={cn('nile-story-wrap')}>
        <ContentTitle title={t('home.story.title')} titleSize="md" serif desc={t('home.story.notice')} />
        {/*<div className={cn('article-count')}>*/}
        {/*  {data.storyList.length} {t('home.story.unit')}*/}
        {/*</div>*/}
        {/* ArticleList.length === 1 && 'column' */}
        <div className={cn('story-card-wrap', 'column')}>
          {data.storyList.map((item) => (
            <NileStoryCard
              image={item.image}
              videoUrl={item.videoUrl}
              tags={item.tags}
              title={item.title}
              content={item.content}
              link={item.link}
              date={item.date}
              work={item.work}
              info={item.info}
              key={`${item.title}-${item.id}`}
              columnist={item.columnist}
              creator={item.creator}
            />
          ))}
        </div>
        <div className={cn('coming-soon-announce')}>
          <strong>What’s Next?</strong>
          <span> {t('home.story.next')}</span>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale ?? 'en', ['common', 'nile']);
  const api = NileApiService();
  const storyList = await api.home.story.getList();

  return { props: { ...translations, data: { storyList } } };
};

export default Story;
