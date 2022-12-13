import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dynamic from 'next/dynamic';
import { TinyChartData } from '@/components/chart/tokensChartDummyData';
import { windowResizeAtom } from '@/state/windowAtom';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// components
import { IconLogo } from '../logo/IconLogo';
/* 22.11.08 수정: outline 버튼 추가 */
import OutlineButton from '@components/button/OutlineButton';
import { useAtomValue } from 'jotai';

const TinyChart = dynamic(() => import('@/components/chart/TinyChart'), { ssr: false });
interface TokenDataType {
  key: number;
  name: string;
  shortenName: string;
  price: number;
  price24h: number;
  price7d?: number;
  volume7d: number;
  marketCap: number | string;
  /* 22.11.08 수정: swap 버튼 추가에 따른 props type 추가 */
  swapLink: string;
  isSwap: boolean;
}

const TokensTable = () => {
  const { t } = useTranslation('tokens');
  const tinyChartInit = useAtomValue(TinyChartData);
  const [size, setSize] = useState('lg');
  const offset = useAtomValue(windowResizeAtom);
  const router = useRouter();
  const [isCurrent, setCurrent] = useState(0);
  const [activatePagination, setPaginationActivate] = useState(1);
  const tokensData: TokenDataType[] = [
    {
      key: 1,
      name: 'Tangled Token',
      shortenName: 'TIPO',
      price: 237.53,
      price24h: 213.24,
      volume7d: 125.37,
      marketCap: '$160.89M',
      /* 22.11.08 수정: swap 버튼 추가에 따른 값 추가 */
      swapLink: '/',
      isSwap: false,
    },
    {
      key: 2,
      name: 'SNKRZ',
      shortenName: 'SKZ',
      price: 237.53,
      price24h: 213.24,
      volume7d: 125.37,
      marketCap: '$160.89M',
      /* 22.11.08 수정: swap 버튼 추가에 따른 값 추가 */
      swapLink: '/',
      isSwap: false,
    },
  ];
  const tokensSortList = [
    { index: 0, name: t('tokensTableTab.all') },
    { index: 1, name: t('tokensTableTab.favorite') },
  ];

  const onChangePaging = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };

  useEffect(() => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [offset.width]);

  const tokensColumns: ColumnsType<TokenDataType> = [
    {
      title: <span className={cn('index')}>#</span>,
      dataIndex: 'key',
      width: size === 'lg' ? 60 : 40,
      render: (text) => <span className={cn('index')}>{text}</span>,
      align: 'center',
      className: 'index-column',
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가, fixed 값 추가 */
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname: '/tokens/detail',
              query: { token: record.shortenName },
            });
          },
        };
      },
      fixed: 'left',
    },
    {
      title: <span>{t('tokensTableHeader.name')}</span>,
      dataIndex: ['name', 'shortenName'],
      width: size === 'lg' ? 300 : size === 'md' ? 200 : 180,
      align: 'left',
      render: (_: any, { name, shortenName }) => {
        return (
          <div className={cn('token-table-list-item')}>
            <IconLogo type={shortenName.toLowerCase()} size={20}></IconLogo>
            <div className={cn('coin-name')}>
              <span>
                {name} ({shortenName})
              </span>
            </div>
          </div>
        );
      },
      className: 'name-column',
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가, fixed 값 추가 */
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname: '/tokens/detail',
              query: { token: record.shortenName },
            });
          },
        };
      },
      fixed: 'left',
    },
    {
      title: <div>{t('tokensTableHeader.price')}</div>,
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      width: size === 'lg' ? 140 : 106,
      align: 'right',
      render: (text): string => {
        return `$${text}`;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname: '/tokens/detail',
              query: { token: record.shortenName },
            });
          },
        };
      },
      className: 'normal-column',
    },

    {
      title: <div>{t('tokensTableHeader.price24h')}</div>,
      dataIndex: 'price24h',
      // sorter: (a, b) => a.price24h - b.price24h,
      // sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      width: size === 'lg' ? 140 : 138,
      align: 'right',
      render: (rate): JSX.Element => {
        return (
          <span className={rate > 0 ? 'increase' : rate < 0 ? 'decrease' : 'zero'}>
            {rate > 0 ? '+' : '-'} {Math.abs(rate)}
          </span>
        );
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname: '/tokens/detail',
              query: { token: record.shortenName },
            });
          },
        };
      },
      className: 'normal-column',
    },
    {
      title: <div className="no-sort">{t('tokensTableHeader.price7d')}</div>,
      dataIndex: 'price7d',
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      width: size === 'lg' ? 140 : size === 'md' ? 120 : 115,
      align: 'right',
      render: (text): JSX.Element => {
        return (
          <div className="table-chart">
            <TinyChart dataItems={tinyChartInit} height={40} />
          </div>
        );
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname: '/tokens/detail',
              query: { token: record.shortenName },
            });
          },
        };
      },
      className: 'normal-column',
    },
    {
      title: <div>{t('tokensTableHeader.volume7d')}</div>,
      dataIndex: 'volume7d',
      sorter: (a, b) => a.volume7d - b.volume7d,
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      defaultSortOrder: 'ascend',
      width: size === 'lg' ? 140 : size === 'md' ? 120 : 112,
      align: 'right',
      render: (text): string => {
        return `$${text}M`;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname: '/tokens/detail',
              query: { token: record.shortenName },
            });
          },
        };
      },
      className: 'normal-column',
    },
    {
      title: <div className="no-sort">{t('tokensTableHeader.marketCap')}</div>,
      dataIndex: 'marketCap',
      // sorter: (a, b) => a.TVL - b.TVL,
      sortDirections: ['ascend', 'descend', 'ascend'],
      showSorterTooltip: false,
      width: size === 'lg' ? 140 : 106,
      align: 'right',
      render: (text): string => {
        return `${text}`;
      },
      /* 22.11.08 수정: onRow 이벤트 삭제 후 개별 cell 클릭 이벤트 추가 */
      onCell: (record, rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname: '/tokens/detail',
              query: { token: record.shortenName },
            });
          },
        };
      },
      className: 'normal-column',
    },
    /* 22.11.08 수정: 신규 컬럼 추가 */
    {
      title: <div className={cn('a11y')}>swap button</div>,
      dataIndex: 'swap',
      width: size === 'lg' ? 140 : size === 'md' ? 100 : 92,
      align: 'center',
      render: (_: any, { swapLink, isSwap }) => {
        return <OutlineButton buttonText="Swap" color="black" size="sm" href={swapLink} target="_blank" disabled={!isSwap} />;
      },
      className: 'swap-column',
    },
  ];
  return (
    <div className={cn('tokens-table-wrap')}>
      <h2 className={cn('tokens-title')}>Tokens</h2>
      {/* TODO: 11월 11일 오픈 기준 탭 버튼 영역 삭제 */}
      {/* <div className="sort-area">
        {tokensSortList.map((item, index) => (
          <button type="button" onClick={() => setCurrent(index)}>
            <Chip size="lg" bg={item.index === isCurrent}>
              {item.name}
            </Chip>
          </button>
        ))}
      </div> */}
      <Table
        className={cn('table-type-md', 'tokens-table')}
        /* 22.11.08 수정: onRow click 이벤트 삭제 */
        columns={tokensColumns}
        dataSource={tokensData}
        pagination={false}
        /* 22.10.28 수정: scroll 속성 수정 */
        /* 22.11.08 수정: scroll 속성 값 수정 */
        scroll={{ x: offset.width < 768 ? 889 : 930 }}
      />

      {/* TODO: 11일 오픈 시점에 보이지 않도록 주석 처리 */}
      {/* <PaginationCustom defaultCurrent={1} defaultPageSize={10} total={140} onChange={onChangePaging} activate={activatePagination} /> */}
    </div>
  );
};

export default TokensTable;
