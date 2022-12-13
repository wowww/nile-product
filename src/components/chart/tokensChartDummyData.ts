import { atom } from 'jotai';

export interface stackedChartDefaultData {
  date: number | undefined;
  total: number | undefined;
  WBNB: number | undefined;
  USDT: number | undefined;
  BUSD: number | undefined;
  etc: number | undefined;
}

// 오픈 후
export const stackedChartDefaultData = [
  {
    date: new Date(2022, 7, 12).getTime(),
    total: 0,
    WBNB: 1.31,
    USDT: 0.99,
    BUSD: 0.78,
    etc: 0.4,
  },
  {
    date: new Date(2022, 8, 13).getTime(),
    total: 0,
    WBNB: 1.41,
    USDT: 0.9,
    BUSD: 0.7,
    etc: 0.6,
  },
  {
    date: new Date(2022, 9, 14).getTime(),
    total: 0,
    WBNB: 1.71,
    USDT: 1.32,
    BUSD: 1.01,
    etc: 0.87,
  },
  {
    date: new Date(2022, 10, 15).getTime(),
    total: 0,
    WBNB: 1.34,
    USDT: 0.87,
    BUSD: 0.63,
    etc: 0.6,
  },
  {
    date: new Date(2022, 11, 15).getTime(),
    total: 0,
    WBNB: 1.44,
    USDT: 0.97,
    BUSD: 0.73,
    etc: 0.5,
  },
  {
    date: new Date(2022, 12, 15).getTime(),
    total: 0,
    WBNB: 1.81,
    USDT: 1.38,
    BUSD: 1.11,
    etc: 0.9,
  },
  {
    date: new Date(2023, 1, 15).getTime(),
    total: 0,
    WBNB: 2.31,
    USDT: 1.98,
    BUSD: 1.61,
    etc: 1.3,
  },
  {
    date: new Date(2023, 2, 19).getTime(),
    total: 0,
    WBNB: 2.51,
    USDT: 2.18,
    BUSD: 1.81,
    etc: 1.4,
  },
  {
    date: new Date(2023, 3, 20).getTime(),
    total: 0,
    WBNB: 5.5,
    USDT: 2.2,
    BUSD: 1.71,
    etc: 1.6,
  },
  {
    date: new Date(2023, 4, 21).getTime(),
    total: 0,
    WBNB: 10.04,
    USDT: 2.9,
    BUSD: 1.81,
    etc: 1.11,
  },
  {
    date: new Date(2023, 5, 22).getTime(),
    total: 0,
    WBNB: 11.23,
    USDT: 1.02,
    BUSD: 2.32,
    etc: 0.35,
  },
  {
    date: new Date(2023, 6, 22).getTime(),
    total: 0,
    WBNB: 11.23,
    USDT: 1.02,
    BUSD: 4.32,
    etc: 1.25,
  },
];

export const totalFuncStacked = stackedChartDefaultData.forEach((el, index) => {
  el.total = el.WBNB + el.USDT + el.BUSD + el.etc;
});

export const StackedChartData = atom([...stackedChartDefaultData]);

// 오픈 전
export const stackChartDefaultData = [
  {
    date: '08-22',
    value: 2.0,
  },
  {
    date: '08-23',
    value: 2.56,
  },
  {
    date: '08-24',
    value: 4.86,
  },
  {
    date: '08-25',
    value: 4.3,
  },
  {
    date: '08-26',
    value: 3.3,
  },
  {
    date: '08-27',
    value: 4.5,
  },
  {
    date: '08-28',
    value: 3.24,
  },
  {
    date: '08-29',
    value: 5.2,
  },
  {
    date: '08-30',
    value: 4.1,
  },
  {
    date: '09-01',
    value: 3.1,
  },
  {
    date: '09-02',
    value: 5.0,
  },
  {
    date: '09-03',
    value: 8.2,
  },
  {
    date: '09-04',
    value: 8.3,
  },
  {
    date: '09-05',
    value: 8.45,
  },
  {
    date: '09-06',
    value: 9.1,
  },
  {
    date: '09-07',
    value: 13.2,
  },
  {
    date: '09-08',
    value: 14.58,
  },
  {
    date: '09-09',
    value: 14.2,
  },
  {
    date: '09-10',
    value: 14.5,
  },
  {
    date: '09-11',
    value: 15.01,
  },
  {
    date: '09-12',
    value: 15.0,
  },
  {
    date: '09-13',
    value: 15.12,
  },
  {
    date: '09-14',
    value: 15.03,
  },
  {
    date: '09-15',
    value: 15.45,
  },
];

export const StackChartData = atom([...stackChartDefaultData]);

export const StackChartFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>('year');

export const TinyChartDefaultData = [
  {
    date: new Date(2022, 7, 13).getTime(),
    value: 69.01,
  },
  {
    date: new Date(2022, 8, 14).getTime(),
    value: 130.0,
  },
  {
    date: new Date(2022, 9, 15).getTime(),
    value: 160.12,
  },
  {
    date: new Date(2022, 10, 15).getTime(),
    value: 160.12,
  },
  {
    date: new Date(2022, 11, 16).getTime(),
    value: 130.03,
  },
  {
    date: new Date(2023, 0, 18).getTime(),
    value: 240.01,
  },
  {
    date: new Date(2023, 1, 18).getTime(),
    value: 240.01,
  },
  {
    date: new Date(2023, 2, 19).getTime(),
    value: 250.2,
  },
  {
    date: new Date(2023, 3, 20).getTime(),
    value: 210.2,
  },
  {
    date: new Date(2023, 4, 21).getTime(),
    value: 260.2,
  },
  {
    date: new Date(2023, 5, 22).getTime(),
    value: 200.2,
  },
  {
    date: new Date(2023, 6, 12).getTime(),
    value: 22.01,
  },
];

export const TinyChartData = atom([...TinyChartDefaultData]);

export const TinyChartFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>('year');

export const TinyChartDefaultHourData = [
  {
    date: new Date(2022, 8, 18, 0, 0).getTime(),
    value: 15.0,
  },
  {
    date: new Date(2022, 8, 18, 1, 0).getTime(),
    value: 10.0,
  },
  {
    date: new Date(2022, 8, 18, 2, 0).getTime(),
    value: 6.12,
  },
  {
    date: new Date(2022, 8, 18, 3, 0).getTime(),
    value: 3.03,
  },
  {
    date: new Date(2022, 8, 18, 4, 0).getTime(),
    value: 4.01,
  },
  {
    date: new Date(2022, 8, 18, 5, 0).getTime(),
    value: 12.01,
  },
  {
    date: new Date(2022, 8, 18, 6, 0).getTime(),
    value: 14.2,
  },
  {
    date: new Date(2022, 8, 18, 7, 0).getTime(),
    value: 13.2,
  },
  {
    date: new Date(2022, 8, 18, 8, 0).getTime(),
    value: 11.2,
  },
  {
    date: new Date(2022, 8, 18, 9, 0).getTime(),
    value: 9.01,
  },
  {
    date: new Date(2022, 8, 18, 10, 0).getTime(),
    value: 8.0,
  },
  {
    date: new Date(2022, 8, 18, 11, 0).getTime(),
    value: 2.01,
  },
  {
    date: new Date(2022, 8, 18, 12, 0).getTime(),
    value: 6.02,
  },
  {
    date: new Date(2022, 8, 18, 13, 0).getTime(),
    value: 13.03,
  },
  {
    date: new Date(2022, 8, 18, 14, 0).getTime(),
    value: 14.01,
  },
  {
    date: new Date(2022, 8, 18, 15, 0).getTime(),
    value: 13.0,
  },
  {
    date: new Date(2022, 8, 18, 16, 0).getTime(),
    value: 5.2,
  },
  {
    date: new Date(2022, 8, 18, 17, 0).getTime(),
    value: 6.2,
  },
  {
    date: new Date(2022, 8, 18, 18, 0).getTime(),
    value: 9.01,
  },
  {
    date: new Date(2022, 8, 18, 19, 0).getTime(),
    value: 13.01,
  },
  {
    date: new Date(2022, 8, 18, 20, 0).getTime(),
    value: 4.01,
  },
  {
    date: new Date(2022, 8, 18, 21, 0).getTime(),
    value: 6.2,
  },
  {
    date: new Date(2022, 8, 18, 22, 0).getTime(),
    value: 13.01,
  },
  {
    date: new Date(2022, 8, 18, 23, 0).getTime(),
    value: 12.01,
  },
  {
    date: new Date(2022, 8, 18, 24, 0).getTime(),
    value: 6.2,
  },
];

export const TinyChartHourData = atom([...TinyChartDefaultHourData]);

// export const TinyChartFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>({
//   key: 'TinyChartFilterState',
//   default: 'year',
// });
