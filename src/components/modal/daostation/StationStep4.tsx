import { useEffect, useRef } from 'react';
import cn from 'classnames';
import lottieCongratulations from '@/assets/lottie/lottie_congratulations.json';
import lottie from 'lottie-web';

import { IconLogo } from '@/components/logo/IconLogo';
import Tag from '@/components/tag/Tag';

import { ReactSVG } from 'react-svg';

const Step4 = () => {
  const bgLottie = useRef<any>(null);

  useEffect(() => {
    const lottieLoad = lottie.loadAnimation({
      container: bgLottie.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieCongratulations,
    });

    return () => lottieLoad.destroy();
  }, []);
  return (
    <div className={cn('step4-wrap')}>
      <div ref={bgLottie} className={cn('lottie-wrap')}></div>
      <div className={cn('contents-wrap')}>
        <div className={cn('contents-top')}>
          <IconLogo type="wonder" size={62} fullType />
          <strong className={cn('title')}>WONDER DAO 참여를 환영합니다!</strong>
          <div className={cn('date-wrap')}>
            <Tag size="s" color="positive">
              OPEN
            </Tag>
            <span className={cn('date')}>2022-09-01 11:00</span>
          </div>
        </div>
        <div className={cn('contents-bottom')}>
          <strong className={cn('title')}>
            DAO가 개설되면 꼭 아래의 <span>2가지</span>를 확인해주세요!
          </strong>
          <ul>
            <li>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_union.svg' />
              <p className={cn('desc')}>DAO가 개설되면 Papyrus(커뮤니케이션 채널)이 개설될 예정입니다.</p>
              <p className={cn('notice')}>참여했다면 자동으로 Papyrus 채널에 초대됩니다.</p>
            </li>
            <li>
              <ReactSVG src='https://nile.blob.core.windows.net/images/assets/images/icon/ico_wemix_wallet_32.svg' />
              <p className={cn('desc')}>지갑에 참여를 위해 사용했던 WEMIX에 상응하는 DAO Token이 들어왔는지 확인해주세요.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step4;
