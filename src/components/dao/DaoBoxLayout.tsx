import cn from 'classnames';
import { ReactNode } from 'react';

interface DaoBoxLayoutType {
  children: ReactNode;
  className?: string;
  type?: 'full' | 'half' | 'ratio';
}

interface DaoBoxType {
  children: ReactNode;
  className?: string;
  type?: 'full';
}

interface DaoTitleType {
  children?: ReactNode;
  title: string;
  desc?: string;
  className?: string;
  type?: 'text' | 'img';
}

type ChartSummaryType = {
  name: string;
  value: string;
  unit?: string;
};

interface DaoChartBoxType {
  children?: ReactNode;
  title: string;
  date?: string;
  className?: string;
  summary?: ChartSummaryType;
}

export const DaoBoxLayout = ({ children, className, type = 'full' }: DaoBoxLayoutType) => {
  return <div className={cn('dao-box-wrap', className, type)}>{children}</div>;
};

export const DaoBox = ({ children, className, type }: DaoBoxType) => {
  return <div className={cn('dao-box', className, type)}>{children}</div>;
};

export const DaoBoxTitle = ({ children, title, desc, className, type }: DaoTitleType) => {
  return (
    <div className={cn('dao-title-box', className, type)}>
      <div className={cn('title-wrap')}>
        <h3 className={cn('title')}>{title}</h3>
        {desc && <p className={cn('desc')}>{desc}</p>}
      </div>
      {children}
    </div>
  );
};

export const DaoChartBox = ({ children, title, date, summary, className }: DaoChartBoxType) => {
  return (
    <div className={cn('dao-chart-top', className)}>
      <div className={cn('chart-info-wrap')}>
        <h3 className={cn('title')}>{title}</h3>
        <p className={cn('date')}>{date}</p>
      </div>
      <div className={cn('chart-detail-wrap')}>
        {summary && (
          <div className={cn('chart-summary-wrap')}>
            <strong className={cn('name')}>{summary.name}</strong>
            <span className={cn('value')}>
              <strong className={cn('num')}>{summary.value}</strong>
              {summary.unit && <span className={cn('unit')}>%</span>}
            </span>
          </div>
        )}
        {children && <div className={cn('chart-control-wrap')}>{children}</div>}
      </div>
    </div>
  );
};
