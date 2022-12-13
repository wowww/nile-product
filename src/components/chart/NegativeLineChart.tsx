import { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import cn from 'classnames';
// import CountUp from "react-countup";
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { useTranslation } from 'next-i18next';
import { v4 as uid } from 'uuid';
import { useRecoilState } from 'recoil';
import { TinyChartFilterState } from '@/components/chart/tokensChartDummyData';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { useAtom } from 'jotai';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface Props {
  dataItems?: any;
}

const NegativeLineChart = ({ dataItems }: Props) => {
  // translate
  const { t } = useTranslation('common');

  const [filter, setFilter] = useAtom(TinyChartFilterState);
  const chartRef: any = useRef(null);
  const Id = uid();

  useEffect(() => {
    const root = am5.Root.new(`${Id}`);
    root.setThemes([am5themes_Animated.new(root)]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
      })
    );
    chartRef.current = chart;
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    setTimeout(() => {
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          numberFormat: '#,###.00',
          renderer: am5xy.AxisRendererY.new(root, {
            minGridDistance: 30,
            opposite: false,
          }),
        })
      );
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: 'month', count: 1 },
          dateFormats: {
            hour: 'HH-MM',
            day: 'dd',
            week: 'dd',
            month: 'MM-dd',
            year: 'yyyy',
          },
          gridIntervals: [{ timeUnit: 'month', count: 2 }],
          renderer: am5xy.AxisRendererX.new(root, {
            // minGridDistance: 30,
          }),
          dx: 15,
        })
      );
      xAxis.data.setAll(dataItems);

      // 축 스타일
      const xRenderer = xAxis.get('renderer');
      xRenderer.grid.template.setAll({
        visible: false,
      }); // x축 배경선
      xRenderer.labels.template.setAll({
        oversizedBehavior: 'none',
        maxWidth: 50,
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        paddingTop: 8,
        fontSize: 12,
      }); // x축 라벨

      const yRenderer = yAxis.get('renderer');
      yRenderer.grid.template.setAll({
        strokeOpacity: 0,
        stroke: am5.color(0xf2f2f2),
      }); // y축 배경선
      yRenderer.labels.template.setAll({
        oversizedBehavior: 'none',
        maxWidth: 50,
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        fontSize: 12,
      }); // y축 라벨

      const createSeries = (
        name: string,
        field: string | undefined,
        lowColor: am5.Color | undefined,
        upColor: am5.Color | undefined,
        endValue: number
      ): void => {
        const series = chart.series.push(
          am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: field,
            valueXField: 'date',
            stroke: upColor,
          })
        );
        series.strokes.template.setAll({
          strokeWidth: 2,
        });
        series.data.setAll(dataItems);
        series.appear(1000);
        const rangeDataItem = yAxis.makeDataItem({
          value: -1000,
          endValue: endValue,
        });
        const range: any = series.createAxisRange(rangeDataItem);
        range.strokes.template.setAll({
          stroke: lowColor,
          strokeWidth: 2,
        });
      };

      createSeries('value', 'value', am5.color(0xff3333), am5.color(0x00bf20), 151.01);

      function createRange(value: number, color: am5.Color | undefined): void {
        const rangeDataItem = yAxis.makeDataItem({
          value: value,
        });

        const range: any = yAxis.createAxisRange(rangeDataItem);

        range.get('label').setAll({
          fill: am5.color(0xffffff),
          text: `${value}`,
          background: am5.Rectangle.new(root, {
            fill: color,
          }),
        });

        range.get('grid').setAll({
          stroke: color,
          strokeDasharray: [0],
          strokeOpacity: 1,
          location: 1,
        });
      }

      createRange(151.01, am5.color(0x00bf20));

      chartRef.current = chart;
      root.resize();
    }, 300);

    return () => {
      root.dispose();
    };
  }, [dataItems]);

  return (
    <>
      <div className={cn('chart-overview')}>
        <div className={cn('total-status')}>
          <span className={cn('figure-wrap')}>
            <span className={cn('figure')}>$258.09</span>
            <TagFluctuationRate figure={9.66} />
          </span>
          <div className={cn('today')}>2022-08-16 13:53</div>
        </div>
        <ChartPeriodTab setFilter={setFilter} />
      </div>
      <div className={cn('chart-wrap')}>
        <div id={Id} className={cn('negative-chart-wrap')} />
      </div>
    </>
  );
};

export default NegativeLineChart;
