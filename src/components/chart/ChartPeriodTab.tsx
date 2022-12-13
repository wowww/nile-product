import cn from 'classnames';
import { Radio } from 'antd';
import { useTranslation } from 'next-i18next';

type filterDataType = 'day' | 'month' | 'week' | 'year' | 'millisecond' | 'second' | 'minute' | 'hour';

interface Props {
  defaultValue?: string;
  setFilter: (e: filterDataType) => void;
  isAll?: boolean;
  dark?: boolean;
  filterData?: filterDataType[];
}

const ChartPeriodTab = ({
  defaultValue = 'day',
  setFilter,
  filterData = ['day', 'week', 'month', 'year'],
  isAll = false,
  dark = false,
}: Props): JSX.Element => {
  const { t } = useTranslation('common');
  return (
    <div className={cn('period', dark ? 'dark-type' : null)}>
      <Radio.Group name="period-group" defaultValue={defaultValue} className={cn('period-wrap')} onChange={(e) => setFilter(e.target.value)}>
        {filterData.map((el, index) => {
          return (
            <Radio.Button value={el} key={`${el}-${index}`}>
              1{t(el)}
            </Radio.Button>
          );
        })}
        {isAll && <Radio.Button value="all">{t('all')}</Radio.Button>}
      </Radio.Group>
    </div>
  );
};

export default ChartPeriodTab;
