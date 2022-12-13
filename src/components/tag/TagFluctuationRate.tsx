import { Tag } from 'antd';
import cn from 'classnames';

type Props = {
  large?: boolean;
  figure: number;
};

const TagFluctuationRate = ({ large, figure }: Props) => {
  const state = figure > 0 ? 'increase' : figure < 0 ? 'decrease' : 'even';
  const absNum = Math.abs(figure);
  return (
    <Tag
      className={cn('rate', {
        increase: state === 'increase',
        decrease: state === 'decrease',
        large: large,
      })}
    >
      {state === 'increase' ? '+' : state === 'decrease' ? '-' : null}
      {absNum}%
    </Tag>
  );
};

export default TagFluctuationRate;
