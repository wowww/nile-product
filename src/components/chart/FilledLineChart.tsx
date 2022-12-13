/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { basicChartDataType } from '@/components/chart/chartDummyData';
import { v4 as uid } from 'uuid';
import TagFluctuationRate from '@components/tag/TagFluctuationRate';
import { StackChartFilterState } from '@/components/chart/tokensChartDummyData';
import ChartPeriodTab from '@components/chart/ChartPeriodTab';
import { useAtom } from 'jotai';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface LineChartPropsType {
  data: basicChartDataType[];
}

const FilledLineChart: React.FC<LineChartPropsType> = ({ data }) => {
  const [filter, setFilter] = useAtom(StackChartFilterState);
  const Id = uid();
  useEffect(() => {
    const root = am5.Root.new(Id);
    // root.setThemes([
    //   am5themes_Animated.new(root)
    // ]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        maxTooltipDistance: 0,
      })
    );
    /* 22.10.27 수정: 차트 zoomButton 제거 코드 추가 */
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "#.#'B'",
        renderer: am5xy.AxisRendererY.new(root, {
          // opposite: true,
          visible: false,
        }),
      })
    );
    // const xAxis = chart.xAxes.push(
    //   am5xy.DateAxis.new(root, {
    //     baseInterval: { timeUnit: 'day', count: 1 },
    //     dateFormats: {
    //       day: 'MM-dd',
    //     },
    //     gridIntervals: [{ timeUnit: 'day', count: 3 }],
    //     renderer: am5xy.AxisRendererX.new(root, {
    //       visible: false,
    //     }),
    //   })
    // );
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'date',
        // startLocation: -0.1,
        endLocation: 0,
        paddingLeft: 15,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
        }),
      })
    );
    xAxis.data.setAll(data);

    // 축 스타일
    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
      // stroke: am5.color(0xffffff),
    }); // x축 배경선
    xRenderer.labels.template.setAll({
      oversizedBehavior: 'none',
      // maxWidth: 40,
      textAlign: 'center',
      fill: am5.color(0x8c8c8c),
      paddingTop: 8,
      paddingLeft: 0,
      fontSize: 12,
    }); // x축 라벨
    const yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      visible: false,
    }); // y축 배경선
    yRenderer.labels.template.setAll({
      // visible: false,
      oversizedBehavior: 'fit',
      textAlign: 'center',
      fill: am5.color(0x8c8c8c),
      fontSize: 12,
    }); // y축 라벨

    // 시리즈 생성
    const createSeries = (name: string, field: string, stroke: any) => {
      const series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          categoryXField: 'date',
          stroke,
          // minDistance: 0,
          // minBulletDistance: 10,
          // maskBullets: false,
          fill: am5.color(0x9860ff),
          stacked: true,
        })
      );
      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.6,
      });
      series.strokes.template.setAll({
        strokeWidth: 1,
        stroke,
      });

      series.data.setAll(data);
      series.appear(1000);
    };

    createSeries('LineChart', 'value', am5.color('rgba(152, 96, 255, 0.6)'));
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);
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
        <div id={Id} className={cn('filed-chart-wrap')} />
      </div>
    </>
  );
};

export default FilledLineChart;
