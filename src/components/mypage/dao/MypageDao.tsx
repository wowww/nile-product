import { ReactElement, useState } from 'react';
import Link from 'next/link';

import cn from 'classnames';
// 22.11.14 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';

import { ReactSVG } from 'react-svg';

// 22.11.14 수정: 데이터 경로 변경('@/components/mypage/mypageData' 미사용)
// import { daoHistoryDataType, daoHistoryData } from '@/components/mypage/mypageData';
import { Select } from 'antd';
import TextButton from '@/components/button/TextButton';
import Empty from '@/components/empty/Empty';
import PaginationCustom from '@/components/button/PaginationCustom';
/* 22.11.21 수정: uid 추가 */
import { v4 as uid } from 'uuid';

const { Option } = Select;
// 22.11.14 수정: 데이터 경로 변경('@/components/mypage/mypageData' 미사용)
export interface daoHistoryDataType {
  title: ReactElement;
  date: string;
  link?: string;
}

// 22.11.14 수정: 변수
const daoHistoryOptionData = ['WONDER', '1 DAO', '2 DAO', '3 DAO'];
const daoHistoryPercentData = ['94', '20', '55'];

const MypageDao = () => {
  // 22.11.14 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common']);

  const [activatePagination, setPaginationActivate] = useState<number>(1);
  const [historyState, setHistoryState] = useState<'success' | 'fail'>('fail');
  /* 22.11.21 수정: uid 추가 */
  const Id = uid();

  const onChange = (page: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };
  // 22.11.14 수정: 데이터 경로 변경('@/components/mypage/mypageData' 미사용)
  const daoHistoryData: daoHistoryDataType[] = [
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[0], percent: daoHistoryPercentData[0] })}</span>,
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[1], percent: daoHistoryPercentData[1] })}</span>,
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[2], percent: daoHistoryPercentData[2] })}</span>,
    //   link: '/',
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[3], percent: daoHistoryPercentData[0] })}</span>,
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[0], percent: daoHistoryPercentData[0] })}</span>,
    //   link: '/',
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[0], percent: daoHistoryPercentData[0] })}</span>,
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[0], percent: daoHistoryPercentData[0] })}</span>,
    //   link: '/',
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[0], percent: daoHistoryPercentData[0] })}</span>,
    //   link: '/',
    //   date: '2022-07-01 13:30',
    // },
    // {
    //   title: <span>{t('daoHistory.recruiting', { name: daoHistoryOptionData[0], percent: daoHistoryPercentData[0] })}</span>,
    //   link: '/',
    //   date: '2022-07-01 13:30',
    // },
  ];

  return (
    <>
      {daoHistoryData.length > 0 && (
        <div className={cn('mypage-select')}>
          <div className={cn('inner')}>
            <Select
              defaultValue={daoHistoryOptionData[0]}
              /* 22.11.21 수정: 셀렉트 키값 추가 */
              key={Id}
              bordered={false}
              getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
              className={cn('select-nile')}
            >
              {daoHistoryOptionData.map((item, index) => {
                return (
                  <Option value={item} key={`option${index + 1}`}>
                    {item} DAO
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      )}
      <div className={cn('mypage-inner dao')}>
        {daoHistoryData.length > 0 ? (
          <div className={cn('mypage-history')}>
            <strong>{t('daoHistory.title')}</strong>
            {historyState === 'fail' && (
              <span className={cn('fail-message')}>
                <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_warning.svg' />
                <span>{t('daoHistory.failMessage')}</span>
              </span>
            )}
            <ul className={cn('history-list')}>
              {daoHistoryData.map((item: daoHistoryDataType, index: number) => {
                const historyContent = () => {
                  return (
                    <>
                      <span className={cn('text')}>{item.title}</span>
                      <span className={cn('date')}>{item.date}</span>
                    </>
                  );
                };
                return (
                  <li key={`history-list-${index}`}>
                    {item.link ? (
                      <Link href={item.link}>
                        <a className={cn('history-wrap')}>{historyContent()}</a>
                      </Link>
                    ) : (
                      <div className={cn('history-wrap')}>{historyContent()}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} />
          </div>
        ) : (
          /* 22.11.16 수정: 11/17 오픈 컨텐츠 */
          <Empty
            subText={t('header.myMiniPage.noDao', { ns: 'common' })}
            button={<TextButton buttonText={t('goToDaoHome', { ns: 'common' })} iconValue="arrow" size="sm" href="/dao" type="link" />}
          />
        )}
      </div>
    </>
  );
};

export default MypageDao;
