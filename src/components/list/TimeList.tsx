import cn from 'classnames';
import { useMemo } from 'react';
import moment from 'moment-timezone';
import { useCountdown } from '@/hook/useCountdown';

interface TimeListType {
  target ?: string;
}

const TimeList = ({ target }: TimeListType) => {
  const targetDate = moment.tz(target ?? process.env.NEXT_PUBLIC_ENV_NFT_SALE_START_DATE, 'Asia/Seoul');
  const remainSeconds = useMemo(() => targetDate.diff(moment(), 'seconds'), [targetDate]);
  const { remainTime } = useCountdown({ seconds: remainSeconds });
  const remain = useMemo(() => moment.duration(remainTime, 'seconds'), [remainTime]);

  const convertTime = (olderValue: number) => {
    if (olderValue < 0) {
      return '00';
    }

    let newValue: string | number = olderValue;
    if (olderValue < 10) newValue = `0${olderValue}`;

    return newValue;
  };
  return (
    <ul className={cn('auction-time')}>
      <li>
        <strong>{convertTime(remain.days())}</strong>
        <span>DAYS</span>
      </li>
      <li>
        <strong>{convertTime(remain.hours())}</strong>
        <span>HOURS</span>
      </li>
      <li>
        <strong>{convertTime(remain.minutes())}</strong>
        <span>MINUTES</span>
      </li>
      <li>
        <strong>{convertTime(remain.seconds())}</strong>
        <span>SECONDS</span>
      </li>
    </ul>
  );
};

export default TimeList;
