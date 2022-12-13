import cn from 'classnames';
import { Radio, RadioChangeEvent } from 'antd';
import Chip from '@components/tag/Chip';

interface btnListProps {
  value: string;
  name: string;
  /* 22.10.12 수정: props 추가 */
  count?: number;
}

interface Props {
  btnList: Array<btnListProps>;
  nowTab: string;
  /* 22.10.12 수정 start: props 추가 및 수정 */
  setNowTab: (defaultVal: string) => void;
  chipSize?: string;
  strong?: boolean;
  /* 22.10.12 수정 end: props 추가 및 수정 */
}

/* 22.10.12 수정: props 추가 */
const RadioTab: React.FC<Props> = ({ btnList, nowTab, setNowTab, chipSize = 'lg', strong }) => {
  /* 22.10.12 수정: 함수명 변경 */
  const _handleTabChange = (e: RadioChangeEvent) => {
    setNowTab(e.target.value);
  };
  return (
    /* 22.10.12 수정: onChange 함수명 변경 */
    <Radio.Group onChange={_handleTabChange} value={nowTab} className={cn('radio-chip')}>
      {btnList.map((el, idx) => (
        <Radio.Button value={el.value} key={`${el.name}-${idx}`}>
          {/* 22.10.12 수정 start: props 변경 및 children 추가 */}
          <Chip size={chipSize} bg={nowTab === el.value}>
            {strong ? <strong>{el.name}</strong> : <>{el.name}</>}
            {el.count && <span className={cn('count')}>{el.count}</span>}
          </Chip>
          {/* 22.10.12 수정 end: props 변경 및 children 추가 */}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default RadioTab;
