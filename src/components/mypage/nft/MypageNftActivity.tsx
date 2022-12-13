import { useState } from 'react';

import cn from 'classnames';
// 22.11.02 수정: useTranslation 추가
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import PaginationCustom from '@/components/button/PaginationCustom';
import Empty from '@/components/empty/Empty';
import MypageFilter from '@/components/mypage/MypageFilter';

import Link from 'next/link';
import { collectionTableDataType } from '@/components/table/tableDummyData';
import Image from 'next/image';
import Tag from '@/components/tag/Tag';
import { Input, Popover, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReactSVG } from 'react-svg';
/* 22.11.21 수정: uid 추가 */
import { v4 as uid } from 'uuid';
import { NileCDNLoader } from '@utils/image/loader';

const { Option } = Select;

const MypageNftActivity = () => {
  // 22.11.02 수정: useTranslation 추가
  const { t } = useTranslation(['mypage', 'common', 'marketplace']);
  const { locale } = useRouter();
  const [activatePagination, setPaginationActivate] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  /* 22.11.21 수정: uid 추가 */
  const Id = uid();

  const onChange = (page: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  const offersType = (type: string) => {
    if (type === 'Canceled' || type === 'Expired') return true;
  };

  const collectionTableColumnsData: collectionTableDataType[] = [
    {
      key: '1',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_collection_represent.png',
      nft: 'abcdefghijklnmopqrstuvwxyzabcdefghijkln abcdefghijklnmopqrstuvwxyznmopqrstuv',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Sale',
      price: '1,000,000.000 WEMIX$',
      date: '2022-08-23 14:52',
      detailDate: null,
    },
    {
      key: '2',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: '024 Hounslow West ',
      from: '0x34fd...df67',
      to: null,
      type: 'Listing',
      price: '14,000 WEMIX$',
      date: '3 hours ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '3',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Offer',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '4',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Canceled',
      whichCancel: 'Listing',
      price: '1,000,000.000 WEMIX$',
      date: '30 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '5',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Expired',
      whichCancel: 'Biding',
      price: '14,000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '6',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Transfer',
      price: '1,000,000.000 WEMIX$',
      date: '2022-08-23 14:52',
      detailDate: null,
    },
    {
      key: '7',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_collection_represent.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Sale',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '8',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: '024 Hounslow West ',
      from: '0x34fd...df67',
      to: null,
      type: 'Listing',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '9',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Offer',
      price: '1,000,000.000 WEMIX$',
      date: '1 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
    {
      key: '10',
      nftLink: '/',
      link: '/',
      img: '/temp/@temp_ranking.png',
      nft: 'B01 Baker street',
      from: '0x34fd...df67',
      to: '0x34fd...df67',
      type: 'Canceled',
      whichCancel: 'Biding',
      price: '1,000,000.000 WEMIX$',
      date: '30 minutes ago',
      detailDate: '2022-08-23 14:52',
    },
  ];

  const collectionTableColumns: ColumnsType<collectionTableDataType> = [
    {
      title: t('collectionPage.nftName', { ns: 'marketplace' }),
      key: 'nft',
      align: 'left',
      render: (_, { nftLink, nft, img, type }) => (
        <div className={cn('nft-wrap')}>
          <div className="img-wrap">
            <Image src={img} alt="" layout="fill" quality="100" loading="eager" objectFit="cover" loader={NileCDNLoader} />
          </div>
          {/* 22.11.01 수정: 환불 받기 버튼 추가 */}
          <div className={cn('text-wrap', type === 'Expired' && 'isBtn')}>
            <Link href={nftLink}>
              <a>{nft}</a>
            </Link>
            {type === 'Expired' && <button className={cn('refund-btn')}>환불받기</button>}
          </div>
        </div>
      ),
    },
    {
      title: <span>From &rarr; To</span>,
      key: 'fromto',
      align: 'center',
      render: (_, { from, to }) => (
        <div className={cn('fromto-wrap')}>
          <button type="button" onClick={() => {}}>
            {from}
          </button>
          {to && <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_table_arrow.svg' />}
          <button type="button" onClick={() => {}}>
            {to}
          </button>
        </div>
      ),
    },
    {
      title: t('collectionPage.type', { ns: 'marketplace' }),
      key: 'type',
      align: 'center',
      render: (_, { type, whichCancel }) => (
        <div className={cn('type-wrap', { cancel: offersType(type) })}>
          {offersType(type) ? (
            <>
              <span>{whichCancel}</span>
              <Tag size="s" color="light-gray">
                {type}
              </Tag>
            </>
          ) : (
            <span>{type}</span>
          )}
        </div>
      ),
    },
    {
      title: t('collectionPage.transactionAmount', { ns: 'marketplace' }),
      key: 'price',
      align: 'right',
      className: 'align-right',
      render: (_, { type, price }) => <div className={cn('price-wrap', { cancel: offersType(type) })}>{price}</div>,
    },
    {
      title: t('collectionPage.time', { ns: 'marketplace' }),
      key: 'date',
      align: 'right',
      className: 'align-right',
      render: (_, { link, date, detailDate }) => (
        <Link href={link}>
          <a className={cn('time-wrap')}>
            {detailDate === null ? (
              <>{date}</>
            ) : (
              <div className={cn('tooltip-wrap')}>
                <Popover
                  overlayClassName="tooltip"
                  placement="top"
                  content={<div className={cn('tooltip-contents')}>{detailDate}</div>}
                  trigger="hover"
                  getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                >
                  {date}
                </Popover>
              </div>
            )}
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          </a>
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className={cn('mypage-utils activity')}>
        <div className={cn('filters-wrap')}>
          <MypageFilter />
        </div>
        <div className={cn('utils-wrap')}>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t('collectionPage.searchPlaceholder', { ns: 'marketplace' })}
            prefix={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_search.svg' />}
            allowClear={{ clearIcon: <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_clear.svg' /> }}
          />
          <Select
            size="middle"
            defaultValue="week"
            /* 22.11.21 수정: 셀렉트 키값 추가 */
            key={Id}
            suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Option value="day">{t('1Day', { ns: 'common' })}</Option>
            <Option value="week">{t('1Week', { ns: 'common' })}</Option>
            <Option value="month">{t('1Month', { ns: 'common' })}</Option>
            <Option value="all">{t('all', { ns: 'common' })}</Option>
          </Select>
        </div>
      </div>
      <div className={cn('activity-table')}>
        <span className={cn('total-num')}>12 NFT</span>
        {collectionTableColumnsData.length > 0 ? (
          <>
            <Table
              /* 22.10.28 수정: scroll 속성 추가 */
              scroll={{ x: true }}
              className={cn('table-type-md')}
              columns={collectionTableColumns}
              dataSource={collectionTableColumnsData}
              pagination={false}
            />
            <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChange} activate={activatePagination} />
          </>
        ) : (
          <Empty subText={t('empty.activity')} />
        )}

        {/* 조건문은 수정 필요 */}
        {/* 필터시 조건에 맞는 결과 값이 없는 경우 */}
        {/* {collectionTableColumnsData.length < 1 && searchValue === '' && <Empty subText={t('empty.results')} />} */}

        {/* 검색시 조건에 맞는 결과 값이 없는 경우 */}
        {/* {collectionTableColumnsData.length < 1 && searchValue !== '' && (
          <Empty
            iconType="search"
            text={t('empty.searchDefault')}
            subText={locale === 'ko' ? "'sunny '" + t('empty.search') : t('empty.search') + "'sunny'"}
          />
        )} */}
      </div>
    </>
  );
};

export default MypageNftActivity;
