import React, { useState } from 'react';
import cn from 'classnames';
import { Input, Popover, Select } from 'antd';
import BgButton from '@/components/button/BgButton';
import RefreshCountdownButton from '@/components/button/RefreshCountdownButton';
import OutlineButton from '@/components/button/OutlineButton';
import ConnectModal from '../modal/ConnectModal';
// 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가
import NetworkSettingModal from '../modal/NetworkSettingModal';
import { Trans, useTranslation } from 'next-i18next';
import { ReactSVG } from 'react-svg';
/* 22.11.21 수정: uid 추가 */
import { v4 as uid } from 'uuid';

const { Option } = Select;

interface buttonPropsType {
  onClick?: void;
  mode: string;
  buttonText: string;
  block?: boolean;
  color: string;
  size: string;
  disabled?: boolean;
  iconType?: boolean; // iconType 일 경우 true
  iconValue?: string; // icon name
  align?: boolean; // space-between 일 경우 true
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined; // link 타입일 경우 link 타입 추가
  href?: string; // link 타입일 경우에만 추가
  target?: string; // link 타입이고 새창열림일 경우 추가
  share?: boolean;
  wallet?: boolean;
}

interface stateType {
  btn?: buttonPropsType[];
  oneTitle?: string;
  twoTitle?: string;
}

const MarketPlaceListing = ({ btn, oneTitle, twoTitle }: stateType) => {
  const { t } = useTranslation(['marketplace', 'common']);
  const evtRefresh = () => {
  };

  const [isConnectModal, setIsConnectModal] = useState<boolean>(false);
  const [isModalNetworkSetting, setModalNetworkSetting] = useState(false);

  /* 22.11.21 수정: uid 추가 */
  const Id = uid();

  // 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가
  const changeConnectFirst = () => {
    setModalNetworkSetting(true);
  };

  return (
    <div className={cn('listing-area')}>
      <strong className={cn('listing-title')}>Set a fixed price</strong>
      <div className={cn('listing-form-wrap')}>
        <Select
          size="large"
          defaultValue="WEMIX$"
          /* 22.11.21 수정: 셀렉트 키값 추가 */
          key={Id}
          suffixIcon={<ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg" />}
          popupClassName="select-size-lg-dropdown"
          getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          /* 22.11.21 수정: disabled 속성 추가 */
          disabled // 현재는 WEMIX$만 지원
        >
          <Option value="WEMIX$">WEMIX$</Option>
          <Option value="WEMIX">WEMIX</Option>
        </Select>
        <Input size="large" placeholder="응찰 금액을 입력하세요." />
      </div>
      {/* 22.11.21 수정: 타 가상화폐 지원시 삭제될 문구 추가 */}
      <div className={cn('listing-form-desc')}>{t('makeOfferPopup.notice', { ns: 'common' })}</div>

      <div className={cn('listing-list-wrap')}>
        <div className={cn('list-item-area')}>
          <p className={cn('list-item-title')}>{oneTitle}</p>
          <dl className={cn('list-content')}>
            <div className={cn('list-cont')}>
              <dt>
                <Trans
                  i18nKey="listing.txt3"
                  ns="marketplace"
                  values={{
                    rate: '2.5',
                  }}
                />
              </dt>
              <dd>- 10 WEMIX$</dd>
              <dt>
                <Trans
                  i18nKey="listing.txt4"
                  ns="marketplace"
                  values={{
                    rate: '10',
                  }}
                />
              </dt>
              <dd>- 10 WEMIX$</dd>
            </div>
            <div className={cn('list-unit')}>
              <dt>{t('listing.txt5')}</dt>
              <dd>
                <em>2,470</em> WEMIX$
                {/* 22.11.21 수정: 환산 금액 주석 */}
                {/* <span className={cn('list-all-unit')}>($3,000)</span> */}
              </dd>
            </div>
          </dl>
        </div>
        <div className={cn('list-item-area')}>
          <p className={cn('list-item-title')}>{twoTitle}</p>
          <dl className={cn('list-content')}>
            <div className={cn('list-cont')}>
              <dt>
                {t('listing.txt6')}
                <div className={cn('tooltip-wrap')}>
                  <Popover
                    overlayClassName="tooltip"
                    placement="top"
                    content={<div className={cn('tooltip-contents')}>Gas Fee는 실시간으로 변동될 수 있습니다.</div>}
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                  >
                    <button type="button">
                      <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg" />
                    </button>
                  </Popover>
                </div>
              </dt>
              <dd>
                - 10 WEMIX$ <RefreshCountdownButton refresh={evtRefresh} />
              </dd>
            </div>
            <div className={cn('list-unit')}>
              <dt>{t('listing.txt7')}</dt>
              <dd>
                <em>2,470</em> WEMIX$
                <span className={cn('list-all-unit')}>($10)</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className={cn('list-btn-area')}>
        {btn?.map((item, index) => {
          if (item.mode === 'OutlineButton') {
            return (
              <OutlineButton buttonText={item.buttonText} color={item.color} size={item.size} href={item.href}
                             key={index} onClick={() => {
              }} />
            );
          } else {
            return <BgButton buttonText={item.buttonText} color={item.color} size={item.size} href={item.href}
                             key={index} onClick={() => {
            }} />;
          }
        })}
      </div>
      <ConnectModal isModalVisible={isConnectModal} setIsModalVisible={setIsConnectModal}
                    changeConnectFirst={changeConnectFirst} />
      {/* 2022.11.17 수정 : 메인넷 네트워크 설정 팝업 추가 */}
      <NetworkSettingModal isOpen={isModalNetworkSetting} setIsOpen={setModalNetworkSetting} />
    </div>
  );
};

export default MarketPlaceListing;
