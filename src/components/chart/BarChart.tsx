import { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import cn from 'classnames';
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { useRecoilState } from 'recoil';
import { TinyChartFilterState } from '@/components/chart/tokensChartDummyData';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { useAtom } from 'jotai';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface Props {
  dataItems?: any;
  isPeriod?: boolean;
}

const BarChart = ({ dataItems, isPeriod }: Props) => {
  const [filter, setFilter] = useAtom(TinyChartFilterState);

  const chartRef: any = useRef(null);

  useEffect(() => {
    let root = am5.Root.new('barChartdiv');
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
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
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          numberFormat: "#.#'B'",
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: false,
          }),
        })
      );
      let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: 'month', count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            visible: false,
            minGridDistance: 30,
          }),
        })
      );
      xAxis.data.setAll(dataItems);

      // 축 스타일
      const xRenderer = xAxis.get('renderer');
      xRenderer.grid.template.setAll({
        visible: false,
      }); // x축 배경선
      xRenderer.labels.template.setAll({
        oversizedBehavior: 'fit',
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        paddingTop: 8,
        fontSize: 12,
      }); // x축 라벨
      const yRenderer = yAxis.get('renderer');
      yRenderer.grid.template.setAll({
        visible: false,
      }); // y축 배경선
      yRenderer.labels.template.setAll({
        oversizedBehavior: 'fit',
        textAlign: 'center',
        fill: am5.color(0x8c8c8c),
        fontSize: 12,
      }); // y축 라벨

      // 시리즈 생성
      const createSeries = (name: string, field: string, stroke: any) => {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name,
            xAxis,
            yAxis,
            valueYField: field,
            valueXField: 'date',
            stroke,
          })
        );
        // bar chart style
        series.columns.template.setAll({
          width: 13,
          strokeOpacity: 0,
          fillOpacity: 1,
          fill: am5.color(0x27c683),
        });

        series.data.setAll(dataItems);
        series.appear(1000);
      };

      createSeries('BarChart', 'value', am5.color(0xff3333));

      chartRef.current = chart;
      root.resize();
    }, 300);

    return () => {
      root.dispose();
    };
  }, [dataItems]);

  return (
    <>
      {isPeriod && (
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
      )}
      <div className={cn('chart-wrap')}>
        <div id="barChartdiv" className={cn('bar-chart-wrap')} />
      </div>
    </>
  );
};

export default BarChart;
