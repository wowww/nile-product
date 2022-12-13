import { useState } from 'react';
import { Popover, Select, Tabs } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

import { DaoBox, DaoBoxLayout } from '@/components/dao/DaoBoxLayout';
import DaoActivity from '@/components/dao/DaoActivity';
import { ReactSVG } from 'react-svg';

const AboutComponent = () => {
  const { t } = useTranslation('dao');
  return (
    <DaoBox className="full">
      <div className={cn('trust-about-wrap')}>
        <div className={cn('bg-wrap')} aria-hidden="true">
          <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/img/bg_trust_about.svg' />
        </div>
        <div className={cn('title-wrap')}>
          <p className={cn('desc')}>{t('trust.about.desc')}</p>
          <h4 className={cn('title')}>{t('trust.about.title')}</h4>
        </div>

        <ul className={cn('list-content-wrap')}>
          <li className={cn('list-item')}>
            <span className={cn('icon-wrap')}>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/daotrust/ico_about_introduce.svg' />
            </span>
            <div className={cn('inner-wrap')}>
              <div className={cn('inner-title-wrap')}>
                <strong className={cn('list-title')}>{t('trust.about.item.0.title')}</strong>
                <p className={cn('list-desc')}>{t('trust.about.item.0.desc')}</p>
              </div>
              <ul className={cn('list-dot-wrap')}>
                <li>{t('trust.about.item.0.list.0.desc')}</li>
                <li>
                  <strong className={cn('list-dot-title')}>{t('trust.about.item.0.list.1.title')}</strong>
                  <ul className={cn('list-dot-wrap')}>
                    <li>{t('trust.about.item.0.list.1.list2.0')}</li>
                    <li>{t('trust.about.item.0.list.1.list2.1')}</li>
                  </ul>
                </li>
                <li>
                  <strong className={cn('list-dot-title')}>{t('trust.about.item.0.list.2.title')}</strong>
                  <ul className={cn('list-dot-wrap')}>
                    <li>{t('trust.about.item.0.list.2.list2.0')}</li>
                    <li>{t('trust.about.item.0.list.2.list2.1')}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          <li className={cn('list-item')}>
            <span className={cn('icon-wrap')}>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/daotrust/ico_about_work.svg' />
            </span>
            <div className={cn('inner-wrap')}>
              <div className={cn('inner-title-wrap')}>
                <strong className={cn('list-title')}>{t('trust.about.item.1.title')}</strong>
              </div>
              <ul className={cn('list-dot-wrap')}>
                <li>{t('trust.about.item.1.list.0.desc')}</li>
                <li>{t('trust.about.item.1.list.1.desc')}</li>
                <li>{t('trust.about.item.1.list.2.desc')}</li>
                <li>{t('trust.about.item.1.list.3.desc')}</li>
                <li>{t('trust.about.item.1.list.4.desc')}</li>
                <li>{t('trust.about.item.1.list.5.desc')}</li>
              </ul>
            </div>
          </li>
          <li className={cn('list-item')}>
            <span className={cn('icon-wrap')}>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/daotrust/ico_about_profit.svg' />
            </span>
            <div className={cn('inner-wrap')}>
              <div className={cn('inner-title-wrap')}>
                <strong className={cn('list-title')}>{t('trust.about.item.2.title')}</strong>
              </div>
              <ul className={cn('list-dot-wrap')}>
                <li>{t('trust.about.item.2.list.0.desc')}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </DaoBox>
  );
};

const ActivityComponent = () => {
  const { t } = useTranslation('dao');
  const { Option } = Select;

  return (
    <DaoBox className="full">
      <div className={cn('trust-activity-wrap')}>
        <div className={cn('table-top-wrap')}>
          <Select
            size="middle"
            /* 22.11.21 수정: 디폴브 밸류 다국어처리및 키값 반영 */
            defaultValue="All Business"
            key={t('trust.activity.select.0')}
            suffixIcon={<ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_arrow_16.svg' />}
            popupClassName="select-size-md-dropdown"
            getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
          >
            <Option value={t('trust.activity.select.0')}>{t('trust.activity.select.0')}</Option>
          </Select>
          <div className={cn('table-tooltip-wrap')}>
            <div className={cn('tooltip-wrap')}>
              <span style={{ fontSize: '12px' }}>{t('trust.activity.tooltip.name')}</span>
              <Popover
                overlayClassName="tooltip"
                placement="topRight"
                content={
                  <div className={cn('tooltip-contents')}>
                    <ul className={cn('list-dot-wrap')}>
                      <li className={cn('line')}>
                        <dl className={cn('data-wrap')}>
                          <dt>{t('trust.activity.tooltip.fee')}</dt>
                          <dd>3%</dd>
                        </dl>
                      </li>
                      <li>
                        <dl className={cn('data-wrap')}>
                          <dt>{t('trust.activity.tooltip.treasuryRate')}</dt>
                          <dd>3%</dd>
                        </dl>
                      </li>
                      <li>
                        <dl className={cn('data-wrap')}>
                          <dt>{t('trust.activity.tooltip.furnaceRate')}</dt>
                          <dd>3%</dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                }
                trigger="hover"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
              >
                <button type="button">
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />
                </button>
              </Popover>
            </div>
          </div>
        </div>
        <DaoActivity />
      </div>
    </DaoBox>
  );
};

const DaoTrustTab = () => {
  const [currentTab, setCurrentTab] = useState<string>('about');

  const ContentTabs = [
    {
      label: 'About',
      key: 'about',
      children: <AboutComponent />,
    },
    {
      label: 'Activity',
      key: 'activity',
      children: <ActivityComponent />,
    },
  ];

  return (
    <DaoBoxLayout>
      <div className={cn('dao-trust-tab')}>
        <Tabs
          destroyInactiveTabPane
          activeKey={currentTab}
          className={cn('tab-type', 'tab-md', 'tab-underline')}
          items={ContentTabs}
          onTabClick={(key: string) => {
            setCurrentTab(key);
          }}
        />
      </div>
    </DaoBoxLayout>
  );
};

export default DaoTrustTab;
