import { atom } from 'jotai';

export interface basicChartDataType {
  date?: string | number | undefined;
  time?: string;
  value?: number | undefined;
  bullet?: boolean | undefined;
}

export interface multiChartDataType {
  inflow?: number | undefined;
  outflow?: number | undefined;
  total?: number | undefined;
  date?: string | undefined;
}

export interface StackChartDataType {
  date?: number | undefined;
  wonderDao?: number | undefined;
  patronDao?: number | undefined;
  Top3Dao?: number | undefined;
  etc?: number | undefined;
  total?: number | undefined;
}

export interface PriceHistoryDataType {
  date?: string | number | undefined;
  value?: number | undefined;
  bullet?: boolean | undefined;
}

export interface DaoWonderPriceChartDataType {
  date: number;
  value: number;
}

export const lineBasicChartDefaultData = [
  {
    date: '22.08.13',
    value: 220.01,
  },
  {
    date: '22.08.14',
    value: 230.01,
  },
  {
    date: '22.08.15',
    value: 270.0,
  },
  {
    date: '22.08.16',
    value: 250.12,
  },
  {
    date: '22.08.17',
    value: 260.03,
  },
  {
    date: '22.08.18',
    value: 233.45,
  },
  {
    date: '22.08.19',
    value: 240.01,
  },
  {
    date: '22.08.20',
    value: 250.2,
  },
];

// 기본 bullet 값이 false 인 상태에서 데이터 갱신 시 마지막 데이터 값만 bullet을 true로 변경해주세요.
export const lineChartDefaultData = [
  {
    date: new Date(2022, 8, 18, 0, 0).getTime(),
    value: 2.0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 1, 0).getTime(),
    value: 2.56,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 2, 0).getTime(),
    value: 4.86,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 3, 0).getTime(),
    value: 4.3,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 4, 0).getTime(),
    value: 3.3,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 5, 0).getTime(),
    value: 4.5,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 6, 0).getTime(),
    value: 3.24,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 7, 0).getTime(),
    value: 5.2,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 8, 0).getTime(),
    value: 4.1,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 9, 0).getTime(),
    value: 3.1,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 10, 0).getTime(),
    value: 5.0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 11, 0).getTime(),
    value: 3.2,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 12, 0).getTime(),
    value: 4.3,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 13, 0).getTime(),
    value: 3.45,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 14, 0).getTime(),
    value: 4.1,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 15, 0).getTime(),
    value: 5.2,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 16, 0).getTime(),
    value: 4.58,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 17, 0).getTime(),
    value: 5.2,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 18, 0).getTime(),
    value: 5.5,
    bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 19, 0).getTime(),
    // value: 230.01,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 20, 0).getTime(),
    // value: 270.0,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 21, 0).getTime(),
    // value: 250.12,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 22, 0).getTime(),
    // value: 260.03,
    // bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 23, 0).getTime(),
    // value: 233.45,
    // bullet: false,
  },
];

// inflow의 데이터 값은 음수로 변환해서 들어와야 합니다.
export const ColumnLineMixChartDefaultData = [
  {
    inflow: -1491,
    outflow: 1491,
    total: 0,
    date: '2022-08-15',
  },
  {
    inflow: -65,
    outflow: 65,
    total: 20,
    date: '2022-08-16',
  },
  {
    inflow: -25,
    outflow: 60,
    total: 50,
    date: '2022-08-17',
  },
  {
    inflow: -30,
    outflow: 55,
    total: 25,
    date: '2022-08-18',
  },
  {
    inflow: -40,
    outflow: 55,
    total: 40,
    date: '2022-08-19',
  },
  {
    inflow: -25,
    outflow: 44,
    total: 12,
    date: '2022-08-20',
  },
  {
    inflow: -60,
    outflow: 30,
    total: 20,
    date: '2022-08-21',
  },
];

// export const PriceHistoryDefaultData = [
//   {
//     date: new Date(2022, 8, 18, 0, 0).getTime(),
//     value: 10,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 1, 0).getTime(),
//     value: 1216,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 2, 0).getTime(),
//     value: 1267,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 3, 0).getTime(),
//     value: 1317,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 4, 0).getTime(),
//     value: 1507,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 5, 0).getTime(),
//     value: 1206,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 6, 0).getTime(),
//     value: 1709,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 7, 0).getTime(),
//     value: 1666,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 8, 0).getTime(),
//     value: 1654,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 9, 0).getTime(),
//     value: 1544,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 10, 0).getTime(),
//     value: 1557,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 11, 0).getTime(),
//     value: 1601,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 12, 0).getTime(),
//     value: 1777,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 13, 0).getTime(),
//     value: 1888,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 14, 0).getTime(),
//     value: 1999,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 15, 0).getTime(),
//     value: 2053,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 16, 0).getTime(),
//     value: 1953,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 17, 0).getTime(),
//     value: 1553,
//     bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 18, 0).getTime(),
//     value: 1567,
//     bullet: true,
//   },
//   {
//     date: new Date(2022, 8, 18, 19, 0).getTime(),
//     // value: 230.01,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 20, 0).getTime(),
//     // value: 270.0,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 21, 0).getTime(),
//     // value: 250.12,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 22, 0).getTime(),
//     // value: 260.03,
//     // bullet: false,
//   },
//   {
//     date: new Date(2022, 8, 18, 23, 0).getTime(),
//     // value: 233.45,
//     // bullet: false,
//   },
// ];

export const PriceHistoryDefaultData = [
  {
    date: new Date(2023, 0, 18, 5, 0).getTime(),
    value: 995,
    bullet: false,
  },
  {
    date: new Date(2023, 1, 18, 6, 0).getTime(),
    value: 1209,
    bullet: false,
  },
  {
    date: new Date(2023, 2, 18, 7, 0).getTime(),
    value: 1366,
    bullet: false,
  },
  {
    date: new Date(2023, 3, 18, 8, 0).getTime(),
    value: 1554,
    bullet: false,
  },
  {
    date: new Date(2023, 4, 18, 9, 0).getTime(),
    value: 1544,
    bullet: false,
  },
  {
    date: new Date(2023, 5, 18, 10, 0).getTime(),
    value: 1657,
    bullet: false,
  },
  {
    date: new Date(2023, 6, 18, 11, 0).getTime(),
    value: 1601,
    bullet: false,
  },
  {
    date: new Date(2023, 7, 18, 12, 0).getTime(),
    value: 1777,
    bullet: false,
  },
  {
    date: new Date(2023, 8, 18, 13, 0).getTime(),
    value: 1888,
    bullet: false,
  },
  {
    date: new Date(2023, 9, 18, 14, 0).getTime(),
    value: 1999,
    bullet: false,
  },
  {
    date: new Date(2023, 10, 18, 15, 0).getTime(),
    value: 2053,
    bullet: false,
  },
  {
    date: new Date(2023, 11, 18, 16, 0).getTime(),
    value: 1953,
    bullet: false,
  },
];

export const stackChartDefaultData = [
  {
    date: new Date(2023, 7, 25).getTime(),
    wonderDao: 3200000,
    patronDao: 2500000,
    Top3Dao: 1800000,
    etc: 1280000,
    total: 0,
  },
  {
    date: new Date(2023, 7, 26).getTime(),
    wonderDao: 7000000,
    patronDao: 4000000,
    Top3Dao: 2000000,
    etc: 1300000,
    total: 0,
  },
  {
    date: new Date(2023, 7, 27).getTime(),
    wonderDao: 5000000,
    patronDao: 4990278,
    Top3Dao: 2200000,
    etc: 1160000,
    total: 0,
  },
  {
    date: new Date(2023, 7, 28).getTime(),
    wonderDao: 8893790,
    patronDao: 6405278,
    Top3Dao: 3449089,
    etc: 1856894,
    total: 0,
  },
  {
    date: new Date(2023, 7, 29).getTime(),
    wonderDao: 7893790,
    patronDao: 5450278,
    Top3Dao: 3040989,
    etc: 1556894,
    total: 0,
  },
  {
    date: new Date(2023, 7, 30).getTime(),
    wonderDao: 12189379,
    patronDao: 9450278,
    Top3Dao: 4040989,
    etc: 2356894,
    total: 0,
  },
  {
    date: new Date(2023, 7, 31).getTime(),
    wonderDao: 18189379,
    patronDao: 15045278,
    Top3Dao: 7049890,
    etc: 4056894,
    total: 0,
  },
];

export const lineBasicChartData = atom<basicChartDataType[]>([...lineBasicChartDefaultData]);

export const lineChartData = atom<basicChartDataType[]>([...lineChartDefaultData]);

export const ColumnLineMixChartData = atom<multiChartDataType[]>([...ColumnLineMixChartDefaultData]);

// export const PriceHistoryData = selectAtom({
//   key: 'PriceHistoryData',
//   get: ({ get }) => {
//     const filter = get(PriceHistoryFilterState);
//     switch (filter) {
//       case 'day':
//         return [...PriceHistoryDefaultData];
//       case 'week':
//         return [...PriceHistoryDefaultData];
//       case 'month':
//         return [...PriceHistoryDefaultData];
//       case 'year':
//         return [...PriceHistoryDefaultData];
//       default:
//         return [...PriceHistoryDefaultData];
//     }
//   },
// });

export const PriceHistoryFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>('year');

// mypage line chart
// 기본 bullet 값이 false 인 상태에서 데이터 갱신 시 마지막 데이터 값만 bullet을 true로 변경해주세요.
export const mypageLineChartDefaultData = [
  {
    date: new Date(2022, 8, 18, 0, 0).getTime(),
    value: 1150,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 1, 0).getTime(),
    value: 1938,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 2, 0).getTime(),
    value: 1608,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 3, 0).getTime(),
    value: 1557,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 4, 0).getTime(),
    value: 2320,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 5, 0).getTime(),
    value: 1998,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 6, 0).getTime(),
    value: 1500,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 7, 0).getTime(),
    value: 1800,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 8, 0).getTime(),
    value: 2111,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 9, 0).getTime(),
    value: 2231,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 10, 0).getTime(),
    value: 2500,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 11, 0).getTime(),
    value: 2200,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 12, 0).getTime(),
    value: 2800,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 13, 0).getTime(),
    value: 2600,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 14, 0).getTime(),
    value: 2800,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 15, 0).getTime(),
    value: 2300,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 16, 0).getTime(),
    value: 2900,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 17, 0).getTime(),
    value: 3200,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 18, 0).getTime(),
    value: 3600,
    bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 19, 0).getTime(),
    // value: 3600,
    // bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 20, 0).getTime(),
    value: 3600,
    bullet: true,
  },
  {
    date: new Date(2022, 8, 18, 21, 0).getTime(),
    value: 2900,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 22, 0).getTime(),
    value: 3200,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 23, 0).getTime(),
    value: 2900,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 18, 24, 0).getTime(),
    value: 3200,
    bullet: false,
  },
];

// export const LineChartData = selector({
//   key: 'LineChartData',
//   get: ({ get }) => {
//     const filter = get(LinChartFilterState);
//     switch (filter) {
//       case 'day':
//         return [...mypageLineChartDefaultData];
//       case 'week':
//         return [...mypageLineChartDefaultData];
//       case 'month':
//         return [...mypageLineChartDefaultData];
//       case 'year':
//         return [...mypageLineChartDefaultData];
//       default:
//         return [...mypageLineChartDefaultData];
//     }
//   },
// });

// dao line chanrt
export const daoLineChartDefaultData = [
  {
    date: new Date(2022, 8, 18).getTime(),
    value: 2.0,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 19).getTime(),
    value: 2.56,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 20).getTime(),
    value: 4.86,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 21).getTime(),
    value: 4.3,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 22).getTime(),
    value: 3.3,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 23).getTime(),
    value: 4.5,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 24).getTime(),
    value: 3.24,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 25).getTime(),
    value: 5.2,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 26).getTime(),
    value: 4.1,
    bullet: false,
  },
  {
    date: new Date(2022, 8, 30).getTime(),
    value: 3.1,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 5).getTime(),
    value: 3.2,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 10).getTime(),
    value: 4.3,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 18).getTime(),
    value: 3.45,
    bullet: false,
  },
  {
    date: new Date(2022, 9, 28).getTime(),
    value: 4.1,
    bullet: false,
  },
];

// export const daoLineChartData = selector({
//   key: 'DaoFilterState',
//   get: ({ get }) => {
//     const filter = get(LinChartFilterState);
//     switch (filter) {
//       case 'week':
//         return [...daoLineChartDefaultData];
//       case 'month':
//         return [...daoLineChartDefaultData];
//       case 'year':
//         return [...daoLineChartDefaultData];
//       default:
//         return [...daoLineChartDefaultData];
//     }
//   },
// });

export const LinChartFilterState = atom<'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'>('day');

export const DaoFilterState = atom<'week' | 'month' | 'year'>('week');

export const DaoWonderPriceChartDefaultData = [] as DaoWonderPriceChartDataType[];

for (let i = 0; i < 30; i++) {
  const dayData = {} as DaoWonderPriceChartDataType;
  dayData.date = new Date(2022, 10, i, 13, 0).getTime();
  dayData.value = Math.floor(Math.random() * 250 + 350);
  DaoWonderPriceChartDefaultData.push(dayData);
}

export const DaoWonderPriceChartData = atom<DaoWonderPriceChartDataType[]>([...DaoWonderPriceChartDefaultData]);

export const stackChartDarkDefaultData = [
  {
    date: new Date(2023, 7, 25).getTime(),
    total: 0,
    wonderDao: 320000,
    patronDao: 250000,
    Top3Dao: 180000,
    etc: 128000,
  },
  {
    date: new Date(2023, 7, 26).getTime(),
    total: 0,
    wonderDao: 700000,
    patronDao: 400000,
    Top3Dao: 200000,
    etc: 130000,
  },
  {
    date: new Date(2023, 7, 27).getTime(),
    total: 0,
    wonderDao: 500000,
    patronDao: 499020,
    Top3Dao: 220000,
    etc: 116000,
  },
  {
    date: new Date(2023, 7, 28).getTime(),
    total: 0,
    wonderDao: 889370,
    patronDao: 640520,
    Top3Dao: 344900,
    etc: 185680,
  },
  {
    date: new Date(2023, 7, 29).getTime(),
    total: 0,
    wonderDao: 789370,
    patronDao: 545020,
    Top3Dao: 304090,
    etc: 155680,
  },
  {
    date: new Date(2023, 7, 30).getTime(),
    total: 0,
    wonderDao: 1218930,
    patronDao: 945020,
    Top3Dao: 404090,
    etc: 235680,
  },
  {
    date: new Date(2023, 7, 31).getTime(),
    total: 0,
    wonderDao: 1818930,
    patronDao: 1504520,
    Top3Dao: 704980,
    etc: 405680,
  },
];

// 임시 code
export const totalFuncDark = stackChartDarkDefaultData.forEach((el) => {
  el.total = el.wonderDao + el.patronDao + el.Top3Dao + el.etc;
});
