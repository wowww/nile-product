import cn from 'classnames';
import { Popover } from 'antd';

import Formula from './Formula';
import { ReactSVG } from 'react-svg';

const Step3 = () => {
  return (
    <div className={cn('step3-wrap')}>
      <strong>참여 전 유의사항을 확인해주세요!</strong>
      <ul className={cn('list-type-dot')}>
        <li>
          참여로 획득하게될 DAO Token의 양은 모집이 마감된 시점의 총 모집금액과 참여금액의 비율로 배분될 예정입니다.
          <div className={cn('info-text')}>
            배분 계산 공식
            <Popover
              overlayClassName="tooltip"
              placement="bottom"
              content={
                <div className={cn('tooltip-contents')}>
                  <Formula />
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
          </div>
        </li>
        <li>
          지갑에서 자금 전송을 위한 가스비가 결제됩니다. 네트워크 트래픽 상황에 따라서 예상 가스비는 달라질 수 있습니다.
          <div className={cn('info-text')}>예상 가스비 = 0.9 WEMIX</div>
        </li>
        <li>참여를 위해 사용된 WEMIX는 DAO 운영을 위해 사용될 예정이며, 모집이 종료된 이후에는 환불이 불가합니다. </li>
      </ul>
    </div>
  );
};

export default Step3;
