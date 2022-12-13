/* eslint-disable react/prop-types */
import { useRef } from 'react';
import cn from 'classnames';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';
import useWindowResize from '@/hook/useWindowResize';
import { windowResizeAtom } from '@/state/windowAtom';
import { ReactSVG } from 'react-svg';
import { useAtomValue } from 'jotai';

interface DaoLnbPropsType {
  activate: string;
  classnames: string;
}

const DaoLnb: React.FC<DaoLnbPropsType> = ({ activate, classnames }) => {
  const resizeEvtInit = useWindowResize();
  const offset = useAtomValue(windowResizeAtom);

  const activeMenu = useRef<string | 'Menu'>();

  const root = '/dao';
  const lnbList = [
    {
      title: 'Home',
      label: <Link href={`${root}/home`}>Home</Link>,
      key: 'menu-home',
    },
    {
      title: 'Station',
      label: <Link href={`${root}/station`}>Station</Link>,
      key: 'menu-station',
    },
    {
      title: 'Treasury',
      label: <Link href={`${root}/treasury`}>Treasury</Link>,
      key: 'menu-treasury',
    },
    {
      title: 'Trust',
      label: <Link href={`${root}/trust`}>Trust</Link>,
      key: 'menu-trust',
    },
    {
      title: 'Furnace',
      label: <Link href={`${root}/furnace`}>Furnace</Link>,
      key: 'menu-furnace',
    },
    {
      title: 'Staking Pool',
      label: <Link href={`${root}/staking-pool`}>Staking Pool</Link>,
      key: 'menu-staking-pool',
    },
    {
      title: 'Governance',
      label: <Link href={`${root}/governance`}>Governance</Link>,
      key: 'menu-governance',
    },
  ];

  const activeMenuFind = () => {
    lnbList.forEach((el) => {
      if (el.key === activate) {
        activeMenu.current! = el.title;
      }
    });
  };

  activeMenuFind();

  const menuComponent = <Menu items={lnbList} defaultSelectedKeys={[activate]} />;

  return (
    <div className={cn('dao-lnb-wrap', classnames)}>
      {offset.width > 767 ? (
        menuComponent
      ) : (
        <Dropdown overlay={menuComponent} trigger={['click']} overlayClassName="mobile-lnb">
          <button type="button">
            <span>{activeMenu.current}</span>
            <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />
          </button>
        </Dropdown>
      )}
      <Link href="/" passHref>
        <a className={cn('btn-papyrus')}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_papyrus.svg' />
          <span className="a11y">Papyrus</span>
        </a>
      </Link>
    </div>
  );
};

export default DaoLnb;
