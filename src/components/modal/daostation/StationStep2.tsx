import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Form, Popover } from 'antd';

import OutlineButton from '@/components/button/OutlineButton';
import { IconLogo } from '@/components/logo/IconLogo';
import Formula from './Formula';

import { ReactSVG } from 'react-svg';

const Step2 = () => {
  const [isInputAmount, setInputAmount] = useState(false);
  const [tooltipArrowPos, setTooltipArrowPos] = useState<number>(0);
  const [isError, setError] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const tooltipWrap = useRef<null | HTMLDataElement>(null);

  const tooltipArrowStyle = {
    '--tooltip-wrapper-width': `${tooltipArrowPos - 6}px`,
  } as React.CSSProperties;

  useEffect(() => {
    if (tooltipWrap.current !== null) {
      setTooltipArrowPos(tooltipWrap.current?.offsetWidth);
    }
  }, [tooltipWrap.current]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={cn('step2-wrap')}>
      <Form name="nest-messages" layout="vertical" onFinish={onFinish} size="large">
        <div className={cn('station-form-item ant-form-item')}>
          <strong className={cn('label')}>참여를 위해 WEMIX를 입력해주세요!</strong>
          <div className={cn('input-block', isError && 'error', isDisabled && 'disabled')}>
            <span className={cn('unit')}>WEMIX</span>
            <div className={cn('input-wrap')}>
              <input type="number" placeholder="최소 10 WEMIX 이상 입력해야 합니다." disabled={isDisabled} />
              <OutlineButton buttonText="Max" size="sm" color="black" disabled={isDisabled} />
            </div>
          </div>
          {isError && (
            <p className={cn('error-message')}>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />
              <span>보유한 WEMIX보다 초과된 금액입니다.</span>
              {/* <span>10 WEMIX 이상 입력해주세요</span> */}
            </p>
          )}

          <dl className={cn('predicted-block')}>
            <dt ref={tooltipWrap} style={tooltipArrowStyle}>
              <IconLogo type="wonder" size={20} />
              <span className={cn('title')}>예상 획득 Wonder</span>
              <Popover
                overlayClassName="tooltip"
                placement="bottom"
                content={
                  <div className={cn('tooltip-contents')}>
                    <div>
                      예상 획득 Wonder는 조회 시점의 데이터를 기반으로 계산된 예상 수치입니다. 정확한 Wonder 획득 수량은 모집 종료 시 Station에서
                      확인하실 수 있습니다.
                    </div>
                    <div>
                      <Formula />
                    </div>
                    <div>
                      <strong>예상 획득 Wonder 계산 시 모집 총액 선정방식</strong>
                      <ul className={cn('list-type-dot')}>
                        <li>
                          최소 모집 목표 금액 달성 전 : 모집 총액을 <strong>최소 모집 목표 금액</strong> 기준으로 계산
                        </li>
                        <li>
                          최소 모집 목표 금액 달성 후 : 모집 총액을 <strong>현재 모집 금액</strong> 기준으로 계산
                        </li>
                      </ul>
                    </div>
                  </div>
                }
                trigger="click"
                getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                transitionName=""
              >
                <button type="button">
                  <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_info.svg' />
                </button>
              </Popover>
            </dt>
            <dd>
              {isInputAmount ? (
                <span className={cn('amount')}>821.1853 WDR</span>
              ) : (
                <span className={cn('guide-text')}>WEMIX 입력 시 획득할 Wonder가 계산됩니다.</span>
              )}
            </dd>
          </dl>
        </div>
      </Form>
      <div className={cn('high-rank-block')}>
        <p className={cn('title')}>
          해당 WEMIX로 참여하시면
          <strong>
            모집 참여자 212명 중 현재 <span>상위 ? %</span>입니다.
          </strong>
        </p>
        <ul className={cn('list-type-dot')}>
          <li>
            <dl>
              <dt>최고 참여 금액</dt>
              <dd>
                9,000,000.0000
                <span className={cn('unit')}>WEMIX</span>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>평균 참여 금액</dt>
              <dd>
                1,000,000.0000
                <span className={cn('unit')}>WEMIX</span>
              </dd>
            </dl>
          </li>
        </ul>
        <div className={cn('station-img-wrap')}>
          <ReactSVG src="https://nile.blob.core.windows.net/images/assets/images/img/daoNeith/img_station.svg" />
        </div>
      </div>
      <p className={cn('high-rank-info')}>더 많은 Wonder를 획득할수록, 의사결정을 위한 투표에 더 많은 영향력을 가질 수 있습니다.</p>
    </div>
  );
};

export default Step2;
