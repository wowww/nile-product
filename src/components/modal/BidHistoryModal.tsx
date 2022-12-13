/**
 * @param isOpen boolean : 모달 show, hide 상태
 * @param setIsOpen isModal 값 제어
 * @param modalEvent 모달 내 버튼 이벤트
 * @param type 'sell' | 'buy'
 */

import cn from 'classnames';
import ModalLayout from '@/components/modal/ModalLayout';
import BgButton from '@/components/button/BgButton';
import { Avatar, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { bidHistoryTableDataType } from '@/components/table/tableDummyData';
/* 22.10.28 수정: import 추가 */
/* 22.11.03 수정: useTranslation 추가 */
import { useTranslation } from 'next-i18next';
import Tag from '@/components/tag/Tag';
import { NileBidding } from '@/models/nile/marketplace/NileNft';
import { useWalletFormatter } from '@utils/formatter/wallet';
import Web3 from 'web3';
import dayjs from 'dayjs';
import { useUnitFormatter } from '@utils/formatter/unit';
import { useAtomValue } from 'jotai';
import { windowResizeAtom } from '@/state/windowAtom';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalEvent?: () => void;
  type: string;
  biddingHistory?: NileBidding[];
  payment?: string;
}

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: bidHistoryTableDataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: bidHistoryTableDataType) => ({
    disabled: record.members.canceled || record.members.expired, // Column configuration not to be checked
    name: record.members.userId,
  }),
};
const BidHistoryModal = ({ isOpen, setIsOpen, modalEvent, type, biddingHistory, payment }: ModalProps) => {
  const USER_ID = '0x3650...601F8';
  /* 22.10.28 수정: 변수 추가 */
  const offset = useAtomValue(windowResizeAtom);

  /* 22.11.03 수정: useTranslation 추가 */
  const { t } = useTranslation('common');

  const { shorten } = useWalletFormatter();

  const { getPaymentUnit } = useUnitFormatter();

  const bidHistoryTableColumnsDataBuy: bidHistoryTableDataType[] =
    biddingHistory?.map((bidding) => ({
      key: String(bidding.id),
      members: {
        userId: shorten(bidding.address) ?? '',
        imageUrl: 'https://picsum.photos/32/32/?image=1',
        lastActivityTime: '',
        canceled: false,
        expired: false,
      },
      bids: {
        amount: Web3.utils.fromWei(String(bidding.price), 'ether'),
        unit: getPaymentUnit(payment),
      },
      date: dayjs.utc(bidding.createdAt).local().format('YYYY-MM-DD HH:mm:ss'),
    })) ?? [];

  // const bidHistoryTableColumnsDataBuy: bidHistoryTableDataType[] = [
  //   {
  //     key: '1',
  //     members: {
  //       userId: '0x3650...601F8',
  //       imgUrl: 'https://picsum.photos/32/32/?image=1',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: false,
  //       expired: false,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  //   {
  //     key: '2',
  //     members: {
  //       userId: '0x3650...601F9',
  //       userDefaultType: 'type2',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: true,
  //       expired: false,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  //   {
  //     key: '3',
  //     members: {
  //       userId: '0x3650...601F9',
  //       userDefaultType: 'type3',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: false,
  //       expired: true,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  //   {
  //     key: '4',
  //     members: {
  //       userId: '0x3650...601F9',
  //       userDefaultType: 'type4',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: false,
  //       expired: false,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  //   {
  //     key: '5',
  //     members: {
  //       userId: '0x3650...601F9',
  //       userDefaultType: 'type5',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: false,
  //       expired: false,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  //   {
  //     key: '6',
  //     members: {
  //       userId: '0x3650...601F9',
  //       userDefaultType: 'type5',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: false,
  //       expired: false,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  //   {
  //     key: '7',
  //     members: {
  //       userId: '0x3650...601F9',
  //       userDefaultType: 'type5',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: false,
  //       expired: false,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  //   {
  //     key: '8',
  //     members: {
  //       userId: '0x3650...601F9',
  //       userDefaultType: 'type5',
  //       lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
  //       canceled: false,
  //       expired: false,
  //     },
  //     bids: {
  //       amount: '1,000,000.00',
  //       unit: 'WEMIX$',
  //     },
  //     date: '2022-09-10 13:00:00',
  //   },
  // ];

  const bidHistoryTableColumnsBuy: ColumnsType<bidHistoryTableDataType> = [
    {
      title: t('bidHistoryPopup.th1', { ns: 'common' }),
      dataIndex: 'user',
      key: 'bidHistoryUser',
      align: 'left',
      render: (_, { members }) => (
        <button type="button" className={cn('btn-user-open inner-name')} onClick={() => !members.canceled && avatarClick(members?.userId ?? '')}>
          <Avatar
            className={cn('user-image', members?.userDefaultType)}
            size={32}
            style={members?.imgUrl !== undefined ? { backgroundImage: `url(${members?.imgUrl})` } : {}}
          >
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span>
            <span className={cn('user-id')}>{members?.userId}</span>
            <span className={cn('activity-time')}>{members?.lastActivityTime}</span>
          </span>
        </button>
      ),
      // width: 192,
      className: 'user-cell',
    },
    {
      title: t('bidHistoryPopup.th2', { ns: 'common' }),
      dataIndex: 'bids',
      key: 'bidHistoryBids',
      align: 'right',
      render: (_, { bids, members }) => (
        <>
          <span className={cn('bid-amount')}>
            {bids.amount} {bids.unit}
          </span>
          {members.canceled && (
            <Tag size="s" color="light-gray">
              {t('bidHistoryPopup.canceled')}
            </Tag>
          )}
          {members.expired && (
            <Tag size="s" color="light-gray">
              {t('bidHistoryPopup.expired')}
            </Tag>
          )}
        </>
      ),
      width: 160,
      className: 'bids-cell',
    },
    {
      title: t('bidHistoryPopup.th3', { ns: 'common' }),
      dataIndex: 'date',
      key: 'bidHistoryDate',
      align: 'center',
      width: 140,
      className: 'bid-date',
    },
  ];

  const bidHistoryTableColumnsSell: ColumnsType<bidHistoryTableDataType> = [
    {
      title: t('offerHistoryPopup.th1', { ns: 'common' }),
      dataIndex: 'user',
      key: 'bidHistoryUser',
      align: 'left',
      render: (_, { members }) => (
        <button
          type="button"
          className={cn('btn-user-open inner-name')}
          onClick={() => !members.canceled && !members.expired && avatarClick(members?.userId ?? '')}
        >
          <Avatar
            className={cn('user-image', members?.userDefaultType)}
            size={32}
            style={members?.imgUrl !== undefined ? { backgroundImage: `url(${members?.imgUrl})` } : {}}
          >
            <span className={cn('a11y')}>프로필 열기</span>
          </Avatar>
          <span>
            <span className={cn('user-id')}>{members?.userId}</span>
            <span className={cn('activity-time')}>{members?.lastActivityTime}</span>
          </span>
        </button>
      ),
      // width: 192,
      className: 'user-cell',
    },
    {
      title: t('offerHistoryPopup.th2', { ns: 'common' }),
      dataIndex: 'bids',
      key: 'bidHistoryBids',
      align: 'right',
      render: (_, { bids, members }) => (
        <>
          <span className={cn('bid-amount')}>
            {bids.amount} {bids.unit}
          </span>
          {members.canceled && (
            <Tag size="s" color="light-gray">
              {t('bidHistoryPopup.canceled')}
            </Tag>
          )}
          {members.expired && (
            <Tag size="s" color="light-gray">
              {t('bidHistoryPopup.expired')}
            </Tag>
          )}
        </>
      ),
      width: 160,
      className: 'bids-cell',
    },
    {
      title: t('offerHistoryPopup.th3', { ns: 'common' }),
      dataIndex: 'date',
      key: 'bidHistoryDate',
      align: 'center',
      width: 140,
      className: 'bid-date',
    },
  ];
  const bidHistoryTableColumnsDataSell: bidHistoryTableDataType[] = [
    {
      key: '1',
      members: {
        userId: '0x3650...601F8',
        imgUrl: 'https://picsum.photos/32/32/?image=1',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: false,
        expired: false,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
    {
      key: '2',
      members: {
        userId: '0x3650...601F9',
        userDefaultType: 'type2',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: true,
        expired: false,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
    {
      key: '3',
      members: {
        userId: '0x3650...601F9',
        userDefaultType: 'type3',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: false,
        expired: true,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
    {
      key: '4',
      members: {
        userId: '0x3650...601F9',
        userDefaultType: 'type4',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: false,
        expired: false,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
    {
      key: '5',
      members: {
        userId: '0x3650...601F9',
        userDefaultType: 'type5',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: false,
        expired: false,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
    {
      key: '6',
      members: {
        userId: '0x3650...601F9',
        userDefaultType: 'type5',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: false,
        expired: false,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
    {
      key: '7',
      members: {
        userId: '0x3650...601F9',
        userDefaultType: 'type5',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: false,
        expired: false,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
    {
      key: '8',
      members: {
        userId: '0x3650...601F9',
        userDefaultType: 'type5',
        lastActivityTime: `10${t('secAgo', { ns: 'common' })}`,
        canceled: false,
        expired: false,
      },
      bids: {
        amount: '1,000,000.00',
        unit: 'WEMIX$',
      },
      date: '2022-09-10 13:00:00',
    },
  ];

  const changeTitle = () => {
    switch (type) {
      case 'sell':
        return t('offerHistoryPopup.title');
      case 'buy':
        return t('bidHistoryPopup.title');
    }
  };

  const avatarClick = (userId: string) => {
    console.log(userId);
  };

  return (
    <ModalLayout
      wrapClassName="bid-history-modal-wrap"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={type === 'buy' ? 'md' : 'md-t'}
      title={changeTitle()}
      subTitle={t('offerHistoryPopup.desc')}
      footer={type === 'sell'}
      footerContent={
        type === 'sell' ? [<BgButton key="history" buttonText={t('offerHistoryPopup.btn')} color="black" size="md" onClick={modalEvent} />] : []
      }
      destroyOnClose={true}
    >
      <div className={cn('bid-history-modal')}>
        {type === 'buy' ? (
          <Table
            className={cn('table-type-md')}
            columns={bidHistoryTableColumnsBuy}
            dataSource={bidHistoryTableColumnsDataBuy}
            pagination={false}
            rowClassName={(record, index) => {
              if (record.members.canceled) {
                return 'canceled-bid';
              }
              if (record.members.expired) {
                return 'expired-bid';
              }
              if (record.members.userId === USER_ID) {
                return 'own-bid';
              }
              return '';
            }}
            /* 22.10.28 수정: scroll props 추가 */
            scroll={{ x: offset.width < 768 ? 492 : undefined }}
          />
        ) : (
          <Table
            rowSelection={{ type: 'radio', defaultSelectedRowKeys: ['1'], ...rowSelection }}
            className={cn('table-type-md bid-sell-table')}
            columns={bidHistoryTableColumnsSell}
            dataSource={bidHistoryTableColumnsDataSell}
            pagination={false}
            rowClassName={(record, index) => {
              if (record.members.canceled) {
                return 'canceled-bid';
              }
              if (record.members.expired) {
                return 'expired-bid';
              }
              return '';
            }}
            /* 22.10.28 수정: scroll props 추가 */
            scroll={{ x: offset.width < 768 ? 492 : undefined }}
          />
        )}
      </div>
    </ModalLayout>
  );
};

export default BidHistoryModal;
