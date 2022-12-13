/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import * as Scroll from 'react-scroll';
import { Popover, Table, Tabs } from 'antd';
import IconButton from '@/components/button/IconButton';
import OutlineButton from '@/components/button/OutlineButton';
import BgButton from '@/components/button/BgButton';
import IconInfo from '@images/icon/ico_info.svg';
import Tag from '@/components/tag/Tag';
import { daoStationTableColumns, daoStationTableColumnsData } from '@/components/table/tableDummyData';
import DaoStationModal from '@/components/modal/daostation';
import DaoStationCompleteModal from '@/components/modal/DaoStationCompleteModal';
import DaoStationAddModal from '@/components/modal/DaoStationAddModal';
import DaoStakeModal from '@/components/modal/DaoStakeModal';
import DaoStakeResultModal from '@/components/modal/DaoStakeResultModal';
import ModalLayout from '@/components/modal/ModalLayout';
import { DaoBox, DaoBoxLayout } from '@/components/dao/DaoBoxLayout';
import DaoIndividualHomeDiscuss, {
  DaoIndividualHomeDiscussData,
} from '@/components/dao/individualHome/DaoIndividualHomeDiscuss';
import DaoIndividualHomeTwitter, {
  DaoIndividualHomeTwitterData,
} from '@/components/dao/individualHome/DaoIndividualHomeTwitter';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

// const DaoUserInfoCard = dynamic(() => import('@/components/dao/DaoUserInfoCard'), {
//   ssr: false,
// });

const wonderDaoColorSets = [
  { colorVariable: '$daoWonder[1]', colorValue: '#5e5ff5' },
  { colorVariable: '$daoWonder[2]', colorValue: '#dadafb' },
  { colorVariable: '$daoWonder[3]', colorValue: '#f3f3fc' },
  { colorVariable: '$daoWonder[4]', colorValue: '#1a1a1a' },
];

const discussData: DaoIndividualHomeDiscussData = {
  link: '/',
  title: 'How to earn the WEMIX$?',
  author: 'bethemoon',
  authorImg: 'https://picsum.photos/32/32/?image=1',
  desc: 'You can exchange money through a cryptocurrency wallet',
  time: '1minute ago',
  group: [
    { user: '1', userImage: 'https://picsum.photos/32/32/?image=1' },
    { user: '2', userImage: 'https://picsum.photos/32/32/?image=1' },
    { user: '3', userImage: 'https://picsum.photos/32/32/?image=1' },
    { user: '4', userImage: 'https://picsum.photos/32/32/?image=1' },
  ],
};

const twitterData: DaoIndividualHomeTwitterData = {
  link: '/',
  author: 'string',
  authorImg: 'https://picsum.photos/32/32/?image=1',
  desc: '원더다오가 이제 막 열렸습니다. 다들 서두르세요! 닫히기 전에 꼭 가입하기!',
  tags: ['wonderdao', 'wemix'],
};

const Common = () => {
  const router = useRouter();

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      router.replace('/');
    }, [router]);

    return null;
  }


  const [sectionLinks, setSectionLinks] = useState<boolean>();
  const sectionLinkAll = useRef<any>([]);
  const [isModalDaoStation, setModalDaoStation] = useState(false);
  const [isModalDaoStationComplete, setModalDaoStationComplete] = useState(false);
  const [isModalDaoStationAdd, setModalDaoStationAdd] = useState(false);
  const [isModalDaoStationCancel, setModalDaoStationCancel] = useState(false);
  const [isConfirmModal, setConfirmModal] = useState(false);
  const [isCancelConfirmModal, setCancelConfirmModal] = useState(false);
  const [isStakeModal, setStakeModal] = useState(false);
  const [isStakeResultModal, setStakeResultModal] = useState(false);

  const [viewType, setViewType] = useState<string>('list');
  const [toggleView, setToggleView] = useState<boolean>(true);
  const changeViewAction = (value: string) => {
    setViewType(value);
    value === 'list' ? setToggleView(true) : setToggleView(false);
  };

  useEffect(() => {
    const links = document.querySelectorAll('section > h1');
    if (sectionLinks === undefined) {
      links.forEach((link, index) => {
        sectionLinkAll.current[index] = link;
      });
      setSectionLinks(true);
    }
  }, [sectionLinks]);
  return (
    <>
      {/*
        * common 파일 작성 법!
        *
        * section 추가시 title id로 링크(Scroll.Link)도 함께 추가 되게 작업 되어 있음
        * 기본 구조
        * <section className={cn('common-section')}>
            <h1 className={cn('common-title')} id="아이디 추가">
              title 추가
            </h1>
            <div>
              * 공지로 작성할 글이 있을때는 common-notice 이용해서 작성
              * li 목록으로 작성하면 되며 strong은 bold, b는 negative 색상, span은 highlight 색상이 추가 되어 있음
              <ul className={cn('common-notice')}>
                <li>공지 1</li>
                <li>공지 2</li>
              </ul>
              * 여기서부터 공통 컴포넌트 작성 div 생성 후 div 안에 작성
              * button, icon, image 같이 일렬로 나열해서 넣을 경우 common-display-flex 클래스 사용
              * sub title을 사용해야 할 경우 이 단계에 추가
              * <h2 className={cn('common-sub-title')}>sub title</h2>
              <div>
                component 추가
                <div className={cn('common-name')}>component name 추가</div>
              </div>
            </div>
          </section>
      */}
      <Helmet>
        <title>Common &gt; NILE &gt; Dao</title>
        <body className={cn('common-wrap wonder-wrap')} />
      </Helmet>
      <div className={cn('common-content-wrap')}>
        <div className={cn('common-links')}>
          <a href="/common">Common</a>
          <a href="/common/dao">Dao</a>
          <a href="/common/marketplace">Marketplace</a>
          <a href="/common/marketplace2">MarketplaceDetail</a>
          <a href="/common/mypage">Mypage</a>
          <a href="/common/nile">Nile</a>
          <a href="/common/life">Life</a>
        </div>
        <div className={cn('common-links')}>
          {sectionLinks
            ? sectionLinkAll.current?.map((link: HTMLElement, index: number) => {
                return (
                  <Scroll.Link to={link.id} offset={-57} key={`link-${index}`}>
                    {link.textContent}
                  </Scroll.Link>
                );
              })
            : ''}
        </div>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Color">
            Color
          </h1>
          <div>
            <div className={cn('common-name')}>wonder Dao color</div>
            <div className={cn('color-set-view')}>
              {wonderDaoColorSets.map((colorSet, index) => {
                return (
                  <div key={`color-set-${index}`}>
                    <div className={cn('color-set')} style={{ backgroundColor: colorSet.colorValue }}>
                      <p>
                        <span>{colorSet.colorVariable}</span>
                        <span>{colorSet.colorValue}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Color">
            Tab
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <div className={cn('common-name')}>다오 사이즈</div>
              <Tabs defaultActiveKey="4" className={cn('tab-type', 'tab-dao')}>
                <Tabs.TabPane tab="Tab 1" key="4-1">
                  Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="4-2">
                  Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="4-3">
                  Content of Tab Pane 3
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Color">
            Tooltip
          </h1>

          <div>
            <div className={cn('common-display-flex', 'wonder-wrap')}>
              <div>
                <div className={cn('common-name')}>top center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward </span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="top"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>bottom center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="bottom"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>Right center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="right"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
              <div>
                <div className={cn('common-name')}>left center</div>
                <div>
                  <div className={cn('tooltip-wrap')}>
                    <span style={{ fontSize: '12px' }}>Expected Reward</span>
                    <Popover
                      overlayClassName="tooltip"
                      placement="left"
                      content={
                        <div className={cn('tooltip-contents')}>
                          <strong>Expected Reward</strong> is the extimated revenue for a year from operating the DAO with funds, assuming that 100%
                          of the recruitment (150,000 WEMIX) is achieved.
                        </div>
                      }
                      trigger="click"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    >
                      <button type="button">
                        <IconInfo />
                      </button>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Smart Contract">
            Smart Contract
          </h1>
          <div>
            <div className={cn('common-display-flex wonder-wrap')} style={{ background: '#F3F3FC' }}>
              <div className={cn('smart-contract-wrap')}>
                <div className={cn('smart-contract-inner')}>
                  <div className={cn('smart-contract-section')}>
                    <h4>Ratio of distribution in Treasury</h4>
                    <ol className={cn('smart-contract-flowchart')}>
                      <li className={cn('line')}>
                        <strong>Trust</strong>
                        <span>(WEMIX)</span>
                      </li>
                      <li className={cn('bg-white')}>
                        <strong>Send to Treasury</strong>
                        <span>(WEMIX)</span>
                      </li>
                      <li className={cn('smart-contract-inner-flowchart-wrap')}>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-dao-color1')}>
                            <div>Treasury</div>
                            <strong>90%</strong>
                          </li>
                          <li className={cn('bg-white')}>
                            <strong>Send to Trust</strong>
                            <span>(WEMIX)</span>
                          </li>
                        </ol>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-dao-color2')}>
                            <div className={cn('a11y')}>Treasury</div>
                            <strong>10%</strong>
                          </li>
                          <li className={cn('bg-white')}>
                            <strong>Reserve in Treasury</strong>
                            <span>(WEMIX)</span>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                  <div className={cn('smart-contract-section')}>
                    <h4>Ratio of distribution in Furnace</h4>
                    <ol className={cn('smart-contract-flowchart')}>
                      <li className={cn('line')}>
                        <strong>Trust</strong>
                        <span>(WEMIX)</span>
                      </li>
                      <li className={cn('bg-white')}>
                        <strong>Send to Furnace</strong>
                        <span>(DAO Token*)</span>
                      </li>
                      <li className={cn('smart-contract-inner-flowchart-wrap')}>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-dao-color1')}>
                            <div>Furnace</div>
                            <strong>40%</strong>
                          </li>
                          <li className={cn('bg-white')}>
                            <strong>Send to Staking Pool</strong>
                            <span>(DAO Token)</span>
                          </li>
                        </ol>
                        <ol className={cn('smart-contract-inner-flowchart')}>
                          <li className={cn('bg-negative')}>
                            <div className={cn('a11y')}>Furnace</div>
                            <strong>60%</strong>
                          </li>
                          <li className={cn('line-dot')}>
                            <strong>Burning DT</strong>
                            <span>(DAO Token)</span>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="RemainingPeriod">
            Remaining period
          </h1>
          <div>
            <div className={cn('common-display-flex wonder-wrap')}>
              <div className={cn('remaining-period-dday')}>
                <div>
                  <strong>01</strong>
                  <span>DAYS</span>
                </div>
                <div>
                  <strong>21</strong>
                  <span>HOURS</span>
                </div>
                <div>
                  <strong>32</strong>
                  <span>MINUTES</span>
                </div>
                <div>
                  <strong>48</strong>
                  <span>SECONDS</span>
                </div>
              </div>
              <div className={cn('remaining-period-date')}>
                <span>
                  <Tag size="xs" color="positive">
                    OPEN
                  </Tag>
                  2022.09.01 11:00 AM
                </span>
                <span>
                  <Tag size="xs" color="negative">
                    CLOSE
                  </Tag>
                  2022.09.07 11:00 AM
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="StationMembers">
            Station Members tap table card view
          </h1>
          <div>
            <div className={cn('common-display-flex wonder-wrap')}>{/* <DaoUserInfoCard userInfo={daoStationTableColumnsData[0]} /> */}</div>
            <div className={cn('common-name')}>Station Members tap table card view, table view 예시</div>
            <div className={cn('common-display-flex wonder-wrap')}>
              <div className={cn('table-view-wrap')}>
                <div className={cn('view-switch-button-wrap')}>
                  <span className={cn('update')}>Updated : 2022-07-01</span>
                  <IconButton
                    buttonText="리스트 보기"
                    size="24"
                    iconValue="list"
                    onClick={() => changeViewAction('list')}
                    activate={toggleView}
                    classnames={cn('view-switch')}
                  />
                  <IconButton
                    buttonText="카드 보기"
                    size="24"
                    iconValue="card"
                    onClick={() => changeViewAction('card')}
                    activate={!toggleView ? true : false}
                    classnames={cn('view-switch')}
                  />
                </div>
                <div className={cn('view-type', `${viewType}-view`)}>
                  {viewType === 'list' ? (
                    <Table
                      className={cn('table-type-lg')}
                      columns={daoStationTableColumns}
                      dataSource={daoStationTableColumnsData}
                      pagination={false}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Modal">
            Modal
          </h1>
          <div>
            <div>
              <div className={cn('common-name')}>DAO 스테이션 참여 프로세스</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO 스테이션 참여 프로세스 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalDaoStation(true);
                  }}
                />
                <DaoStationModal
                  isOpen={isModalDaoStation}
                  setIsOpen={setModalDaoStation}
                  type="wonder"
                  title="WONDER DAO"
                  desc="WONDER DAO는 WEMIX3.0의 안정된 운영과 혁신에 기여하는 Node Council Partner로서 권한과 책임을 지닙니다."
                />

                <OutlineButton
                  buttonText="DAO 스테이션 참여 프로세스 완료 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalDaoStationComplete(true);
                  }}
                />
                <DaoStationCompleteModal
                  isOpen={isModalDaoStationComplete}
                  setIsOpen={setModalDaoStationComplete}
                  type="wonder"
                  title="WONDER DAO"
                  desc="WONDER DAO는 WEMIX3.0의 안정된 운영과 혁신에 기여하는 Node Council Partner로서 권한과 책임을 지닙니다."
                />
              </div>
              <div className={cn('common-name')}>DAO 스테이션 추가 참여 프로세스</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO 스테이션 추가 참여 프로세스 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalDaoStationAdd(true);
                  }}
                />
                <DaoStationAddModal
                  isOpen={isModalDaoStationAdd}
                  setIsOpen={setModalDaoStationAdd}
                  type="wonder"
                  title="WONDER DAO"
                  desc="WONDER DAO는 WEMIX3.0의 안정된 운영과 혁신에 기여하는 Node Council Partner로서 권한과 책임을 지닙니다."
                />

                <OutlineButton
                  buttonText="DAO 스테이션 추가 참여 완료 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setConfirmModal(true);
                  }}
                />

                <ModalLayout
                  isOpen={isConfirmModal}
                  setIsOpen={setConfirmModal}
                  size="sm"
                  title="추가 참여 완료"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText="확인"
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setConfirmModal(false);
                      }}
                    />,
                  ]}
                >
                  참여 금액이 추가되었습니다. 추가 금액은 참여 금액에 합산되어 표시됩니다.
                </ModalLayout>
              </div>
              <div className={cn('common-name')}>DAO 스테이션 취소 프로세스</div>
              <div className={cn('common-display-flex')}>
                <OutlineButton
                  buttonText="DAO 스테이션 참여 금액 환불 모달"
                  color="black"
                  size="md"
                  onClick={() => {
                    setModalDaoStationCancel(true);
                  }}
                />
                <ModalLayout
                  isOpen={isModalDaoStationCancel}
                  setIsOpen={setModalDaoStationCancel}
                  size="sm"
                  title="참여 금액 환불"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <OutlineButton
                      buttonText="닫기"
                      color="black"
                      size="md"
                      onClick={() => {
                        setModalDaoStationCancel(false);
                      }}
                      key="cancel"
                    />,
                    <BgButton
                      buttonText="환불하기"
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setModalDaoStationCancel(false);
                      }}
                    />,
                  ]}
                >
                  <p>
                    참여 금액을 환불하시겠습니까?
                    <br />
                    참여를 취소하면 참여금액이 환불되며, 환불 진행 시 가스비가 발생됩니다.
                  </p>
                  <p className={cn('gas-fee-info')}>
                    <span>예상 가스비 = 0.9 WEMIX</span>
                    <span className={cn('info')}>
                      지갑에서 자금 전송을 위한 가스비가 결제됩니다. 네트워크 트래픽 상황에 따라서 예상 가스비는 달라질 수 있습니다.
                    </span>
                  </p>
                </ModalLayout>

                <OutlineButton
                  buttonText="DAO 스테이션 참여 금액 환불 완료"
                  color="black"
                  size="md"
                  onClick={() => {
                    setCancelConfirmModal(true);
                  }}
                />
                <ModalLayout
                  isOpen={isCancelConfirmModal}
                  setIsOpen={setCancelConfirmModal}
                  size="sm"
                  title="참여 금액 환불 완료"
                  footer={true}
                  destroyOnClose={true}
                  footerContent={[
                    <BgButton
                      buttonText="확인"
                      color="black"
                      size="md"
                      key="Save"
                      onClick={() => {
                        setCancelConfirmModal(false);
                      }}
                    />,
                  ]}
                >
                  참여 금액 환불이 완료되었습니다. 환불 금액은 지갑에서 확인하실 수 있습니다.
                </ModalLayout>
              </div>
              <div>
                <div className={cn('common-name')}>DAO Stake/Unstake 모달</div>
                <div className={cn('common-display-flex')}>
                  <OutlineButton
                    buttonText="DAO Stake/Unstake 모달"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeModal(true);
                    }}
                  />
                  <DaoStakeModal isModal={isStakeModal} setIsModal={setStakeModal} />
                  <OutlineButton
                    buttonText="DAO Stake/Unstake 결과(성공) 모달"
                    color="black"
                    size="md"
                    onClick={() => {
                      setStakeResultModal(true);
                    }}
                  />
                  <DaoStakeResultModal isModal={isStakeResultModal} setIsModal={setStakeResultModal} kind="stake" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="BoxLayout">
            Box Layout
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBoxLayout half type</div>
                <DaoBoxLayout type="half">
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBoxLayout ratio type</div>
                <DaoBoxLayout type="ratio">
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBoxLayout full type</div>
                <DaoBoxLayout>
                  <DaoBox>
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
              <div style={{ background: '#F3F3FC', padding: '20px' }}>
                <div className={cn('common-name')}>DaoBox full type</div>
                <DaoBoxLayout>
                  <DaoBox type="full">
                    <h2>title</h2>
                    <div>content</div>
                  </DaoBox>
                </DaoBoxLayout>
              </div>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Discuss">
            Discuss
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <DaoBoxLayout>
                <DaoBox>
                  <DaoIndividualHomeDiscuss key={'discuss'} data={discussData} />
                </DaoBox>
              </DaoBoxLayout>
            </div>
          </div>
        </section>
        <section className={cn('common-section')}>
          <h1 className={cn('common-title')} id="Twitter">
            Twitter
          </h1>

          <div>
            <div className={cn('common-flex-column wonder-wrap')} style={{ background: '#fff' }}>
              <DaoIndividualHomeTwitter data={twitterData} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['dao', 'daoHome', 'common'])),
    },
  };
};

export default Common;
