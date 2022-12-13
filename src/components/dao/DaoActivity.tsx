import cn from 'classnames';
import { Avatar, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { windowResizeAtom } from '@/state/windowAtom';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'next-i18next';
import { useAtomValue } from 'jotai';

export const DaoActivity = () => {
  const [size, setSize] = useState('lg');

  const { t } = useTranslation('dao');

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openFilter2, setOpenFilter2] = useState<boolean>(false);
  const [openFilter3, setOpenFilter3] = useState<boolean>(false);
  const [openFilter4, setOpenFilter4] = useState<boolean>(false);
  const [openFilter5, setOpenFilter5] = useState<boolean>(false);

  const offset = useAtomValue(windowResizeAtom);
  // pagination 사용시 필요한 부분 Start
  const [activatePagination, setPaginationActivate] = useState(1);
  const onChange = (page: number, pageSize: number) => {
    // 현재 active 된 페이지 체크
    setPaginationActivate(page);
  };
  // pagination 사용시 필요한 부분 End

  // DaoTreasury 필터된 데이터
  const [DaoTreasury, SetDaoTreasury] = useState<daoHomeTableDataType[] | any>();
  // 테이블 더보기 숫자 스테이트
  const [ShowNumber, SetShowNumber] = useState(5);

  // 필터 함수
  function filterHandler(keydata: any) {
    let AllBtn = document.querySelectorAll('.filter-custom button');
    let elBtn = keydata.target;
    let keyCol = keydata.target.dataset.col;
    let ActiveCol: (string | number)[] = [];
    let ActiveName: (string | number)[] = [];

    // 클릭한 필터가 선택된 상태라면
    if (elBtn.className === 'active') {
      // 선택을 지운다
      elBtn.classList.remove('active');
    } else {
      // 클릭한 필터가 처음 선택한 필터라면  (선택된 상태 x)
      AllBtn.forEach((el: any) => {
        // 해당 컬럼을 찾는다
        if (el.dataset.col === keyCol) {
          // 해당 컬럼에 모든필터 선택을 푼다
          el.classList.remove('active');
        }
      });
      // 해당값만 필터를 선택
      elBtn.classList.add('active');
    }

    // 선택된 필터를 찾는다
    let ActiveBtn: any = document.querySelectorAll('.filter-custom button.active');

    // 선택된 필터의 컬럼값과 값을 찾고 변수에 담아준다
    for (let i = 0; i < ActiveBtn.length; i++) {
      ActiveCol[i] = ActiveBtn[i].dataset.col;
      ActiveName[i] = ActiveBtn[i].name;
    }

    // 변수에 담은 필터값(컬럼, 값)을 필터 시켜준다
    let newArray = daoTreasury.filter((el: any) => {
      return (
        el[ActiveCol[0]] === ActiveName[0] &&
        el[ActiveCol[1]] === ActiveName[1] &&
        el[ActiveCol[2]] === ActiveName[2] &&
        el[ActiveCol[3]] === ActiveName[3] &&
        el[ActiveCol[4]] === ActiveName[4]
      );
    });

    CloseDropDown();
    SetDaoTreasury(newArray);
  }

  // function moreHandler() {
  //   SetShowNumber(ShowNumber + 5);
  // }

  function ShowMore() {
    if (DaoTreasury?.length > 4 && DaoTreasury?.length > ShowNumber) {
      return (
        <div className={cn('show-more-btn')}>
          <button type="button">
            {t('daoActivityTable.table.showBtn')} <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          </button>
        </div>
      );
    } else {
      return false;
    }
  }

  function CloseDropDown() {
    setOpenFilter(false);
    setOpenFilter2(false);
    setOpenFilter3(false);
    setOpenFilter4(false);
    setOpenFilter5(false);
  }

  useEffect(() => {
    SetDaoTreasury(daoTreasury);
  }, []);
  interface daoHomeTableDataType {
    key?: string;
    date: string;
    status: string;
    amount: number;
    from?: string;
    to?: string;
    type: string;
    operatingName: string;
    img: string;
  }
  const daoTreasury: daoHomeTableDataType[] = [
    {
      key: '1',
      date: '2022-07-01',
      status: 'Inflow',
      amount: 5000000,
      from: 'Station',
      to: 'Treasury',
      type: 'Receiving',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '2',
      date: '2022-07-02',
      status: 'Outflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Trust',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '3',
      date: '2022-07-03',
      status: 'Outflow',
      amount: 50000001,
      from: 'Station',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '4',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '5',
      date: '2022-07-03',
      status: 'Outflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '6',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '7',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '8',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '9',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu2',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '10',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '11',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
    {
      key: '12',
      date: '2022-07-03',
      status: 'Inflow',
      amount: 5000000,
      from: 'Treasury',
      to: 'Treasury',
      type: 'Sending',
      operatingName: 'Polaris Liu',
      img: 'https://picsum.photos/12/12/?image=1',
    },
  ];
  let operatingNameFilter = daoTreasury.map((item) => {
    return item.operatingName;
  });
  let operatingSet = new Set(operatingNameFilter);
  let operatingAry = Array.from(operatingSet);
  const DaoFilterColumns: ColumnsType<daoHomeTableDataType> = [
    {
      title: t('daoActivityTable.table.th1'),
      dataIndex: 'date',
      key: 'date',
      width: size === 'lg' ? '143px' : '85px',
      align: 'center',
      sorter: (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf(),
    },
    {
      title: t('daoActivityTable.table.th2'),
      dataIndex: 'status',
      key: 'status',
      width: size === 'lg' ? '143px' : '85px',
      align: 'right',
      render: (_, { status }) => {
        return (
          <span className={cn('amount-td', status === 'Outflow' ? 'outflow' : '')}>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_amount.svg' />
            {status}
          </span>
        );
      },
      filterIcon: (filtered) => <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_table_filter.svg' />,
      filterDropdownOpen: openFilter,
      onFilterDropdownOpenChange: () => {
        setOpenFilter(!openFilter);
      },
      filterDropdown: () => (
        <div className={cn('filter-custom')}>
          <ul>
            <li>
              <button type="button" name="Inflow" data-col="status" onClick={filterHandler}>
                Inflow
              </button>
            </li>
            <li>
              <button type="button" name="Outflow" data-col="status" onClick={filterHandler}>
                Outflow
              </button>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: t('daoActivityTable.table.th3'),
      dataIndex: 'amount',
      key: 'amount',
      width: size === 'lg' ? '147px' : '147px',
      align: 'right',
      render: (_, { amount }) => {
        let result = amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return <>{result} WEMIX</>;
      },
    },
    {
      title: t('daoActivityTable.table.th4'),
      dataIndex: 'from',
      key: 'from',
      width: size === 'lg' ? '143px' : '85px',
      align: 'center',
      filterIcon: (filtered) => <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_table_filter.svg' />,
      filterDropdownOpen: openFilter2,
      onFilterDropdownOpenChange: () => {
        setOpenFilter2(!openFilter2);
      },
      filterDropdown: () => (
        <div className={cn('filter-custom')}>
          <ul>
            <li>
              <button type="button" name="Station" data-col="from" onClick={filterHandler}>
                Station
              </button>
            </li>
            <li>
              <button type="button" name="Treasury" data-col="from" onClick={filterHandler}>
                Treasury
              </button>
            </li>
            <li>
              <button type="button" name="Trust" data-col="from" onClick={filterHandler}>
                Trust
              </button>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: t('daoActivityTable.table.th5'),
      dataIndex: 'to',
      key: 'to',
      width: size === 'lg' ? '143px' : '85px',
      align: 'center',
      filterIcon: (filtered) => <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_table_filter.svg' />,
      filterDropdownOpen: openFilter3,
      onFilterDropdownOpenChange: () => {
        setOpenFilter3(!openFilter3);
      },
      filterDropdown: () => (
        <div className={cn('filter-custom')}>
          <ul>
            <li>
              <button type="button" name="Treasury" data-col="to" onClick={filterHandler}>
                Treasury
              </button>
            </li>
            <li>
              <button type="button" name="Trust" data-col="to" onClick={filterHandler}>
                Trust
              </button>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: t('daoActivityTable.table.th6'),
      dataIndex: 'type',
      key: 'type',
      width: size === 'lg' ? '143px' : '85px',
      align: 'center',
      filterIcon: (filtered) => <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_table_filter.svg' />,
      filterDropdownOpen: openFilter4,
      onFilterDropdownOpenChange: () => {
        setOpenFilter4(!openFilter4);
      },
      filterDropdown: () => (
        <div className={cn('filter-custom')}>
          <ul>
            <li>
              <button type="button" name="Receiving" data-col="type" onClick={filterHandler}>
                Receiving
              </button>
            </li>
            <li>
              <button type="button" name="Sending" data-col="type" onClick={filterHandler}>
                Sending
              </button>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: t('daoActivityTable.table.th7'),
      dataIndex: 'operatingName',
      key: 'operatingName',
      width: size === 'lg' ? '170px' : '109px',
      align: 'right',
      filterIcon: (filtered) => <ReactSVG src='https://nile.blob.core.windows.net/images/icons/ico_table_filter.svg' />,
      filterDropdownOpen: openFilter5,
      onFilterDropdownOpenChange: () => {
        setOpenFilter5(!openFilter5);
      },
      filterDropdown: () => (
        <div className={cn('filter-custom')}>
          <ul>
            {operatingAry.map((el, index) => {
              return (
                <li key={index}>
                  <button type="button" name={el} data-col="operatingName" onClick={filterHandler}>
                    {new Set(el)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ),
      render: (_, { operatingName, img }) => {
        return (
          <span className={cn('operating-td')}>
            <Avatar className={cn('user-image')} size={20} style={img !== undefined ? { backgroundImage: `url(${img})` } : {}}>
              <span className={cn('a11y')}>프로필 열기</span>
            </Avatar>
            {operatingName}
          </span>
        );
      },
    },
  ];
  useEffect(() => {
    if (offset.width >= 768 && offset.width <= 1279) {
      setSize('md');
    } else if (offset.width < 768) {
      setSize('sm');
    } else {
      setSize('lg');
    }
  }, [offset.width]);
  return (
    <div className="dao-table-wrap">
      <Table
        className={cn('table-type-lg')}
        pagination={false}
        columns={DaoFilterColumns}
        dataSource={DaoTreasury}
        scroll={size === 'sm' ? { x: 680 } : undefined}
      />
      {ShowMore()}
    </div>
  );
};
export default DaoActivity;
