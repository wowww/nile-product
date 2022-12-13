import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Menu, MenuProps } from 'antd';
import { useTranslation } from 'next-i18next';

// components
import { IconLogo } from '@components/logo/IconLogo';
import BgButton from '@/components/button/BgButton';
import { ReactSVG } from 'react-svg';

const DetailHeader = () => {
  const { t } = useTranslation(['tokens', 'common']);
  const [isStar, setIsStar] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const moreBtnRef = useRef(null);

  return (
    <div className={cn('detail-header')}>
      <div className={cn('basic-info')}>
        <IconLogo type="wemix" size={40} />
        WEMIX(WEMIX)
        <button onClick={() => setIsStar(!isStar)} className={cn(!isStar ? 'unselected' : null)}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_start.svg' width={24} height={24} />
        </button>
      </div>
      <div className={cn('btn-area')}>
        <a href="https://coinmarketcap.com/currencies/wemix/" target={'_blank'} rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
          {t('DetailHeader.link.coinmarket')}
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />
        </a>
        <a href="#" target={'_blank'} rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
          {t('DetailHeader.link.explorer')}
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />
        </a>
        <BgButton buttonText={t('DetailHeader.link.swap')} color="black" size="sm" iconType align iconValue="link" href="#" target={'_blank'} />
      </div>
      <div className={cn('mobile-btn-wrap')}>
        <button onClick={() => setIsStar(!isStar)} className={cn('star', !isStar ? 'unselected' : null)}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_start.svg' width={24} height={24} />
        </button>
        <button className={cn('more-btn')} ref={moreBtnRef}>
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_more.svg' onClick={() => setIsMenu(!isMenu)} />
        </button>
        {isMenu && <MobileMenu setIsMenu={setIsMenu} btn={moreBtnRef} />}
      </div>
    </div>
  );
};

const MobileMenu = ({ setIsMenu, btn }: { setIsMenu: (isMenu: boolean) => void; btn: any }) => {
  const { t } = useTranslation(['tokens', 'common']);
  const menuItem: MenuProps['items'] = [
    {
      label: (
        <a href="https://coinmarketcap.com/currencies/wemix/" target={'_blank'} rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
          {t('DetailHeader.link.swap')}
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />
        </a>
      ),
      key: 'Swap',
    },
    {
      label: (
        <a href="/" target={'_blank'} rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
          {t('DetailHeader.link.coinmarket')}
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />
        </a>
      ),
      key: 'Coinmarket Cap',
    },
    {
      label: (
        <a href="/" target={'_blank'} rel="noopener noreferrer" title={t('blank', { ns: 'common' })}>
          {t('DetailHeader.link.explorer')}
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_link.svg' width={16} height={16} />
        </a>
      ),
      key: 'Explorer',
    },
  ];

  const MenuRef = useRef<any>(null);

  function checkClick(e: MouseEvent) {
    if (!MenuRef.current?.contains(e.target) && !btn?.current?.contains(e.target)) {
      setIsMenu(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', checkClick, true);
    return () => window.removeEventListener('click', checkClick, true);
  }, []);

  return (
    <div ref={MenuRef}>
      <Menu style={{ width: 156 }} items={menuItem} mode="vertical" className={'mobile-dropdown'} onClick={() => setIsMenu(false)} />
    </div>
  );
};

export default DetailHeader;
