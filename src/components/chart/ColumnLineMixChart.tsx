/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import { Percent } from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { daoColorSet1, daoColorSet2 } from '@/components/dao/daoColorSet';
import { multiChartDataType } from '@/components/chart/chartDummyData';
import { daoThemeAtom } from '@/state/daoAtom';
import { useAtom } from 'jotai';

am5.addLicense('AM5C358434391');
interface ColumnLineMixChartPropsType {
  id: string;
  data: multiChartDataType[];
}
const ColumnLineMixChart: React.FC<ColumnLineMixChartPropsType> = ({ id, data }) => {
  const [activeDao, setActiveDao] = useAtom(daoThemeAtom);
  useEffect(() => {
    const root = am5.Root.new(id);
    // root.setThemes([
    //   am5themes_Animated.new(root)
    // ]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        // maxTooltipDistance: 0,
      })
    );
    chart.zoomOutButton.set('forceHidden', true);
    chart.getNumberFormatter().set('numberFormat', '#.#sK');
    chart.children.unshift(
      am5.Label.new(root, {
        html: "<div style='width: 100%; height: 1px; border-bottom: 1px solid #D9D9D9;'>",
        x: am5.percent(0),
        y: am5.percent(90.5),
        paddingTop: 0,
        paddingBottom: 0,
      })
    );
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          // inversed: true,
          cellStartLocation: 0,
          cellEndLocation: 0.9,
          minGridDistance: 50,
        }),
        min: -200,
        max: 200,
        strictMinMax: true,
      })
    );
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'date',
        renderer: am5xy.AxisRendererX.new(root, {
          // inversed: true,
          // visible: false,
          // minGridDistance: 100,
        }),
      })
    );
    xAxis.data.setAll(data);
    const yRenderer = yAxis.get('renderer');
    // 축 스타일
    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
    }); // x축 배경선
    xRenderer.labels.template.setAll({
      oversizedBehavior: 'none',
      textAlign: 'left',
      fill: am5.color(0xa6a6a6),
      paddingTop: 8,
      paddingLeft: 25,
      fontSize: 12,
    }); // x축 라벨
    yRenderer.grid.template.setAll({
      // visible: false,
      fill: am5.color(0xd9d9d9),
      strokeDasharray: [4, 4],
    }); // y축 배경선
    yRenderer.labels.template.setAll({
      // visible: false,
      oversizedBehavior: 'none',
      textAlign: 'center',
      fill: am5.color(0xa6a6a6),
      fontSize: 12,
    }); // y축 라벨
    // 시리즈 생성
    const createSeriesLine = (name: string, field: string, stroke: any) => {
      const seriesLine = chart.series.push(
        am5xy.LineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          categoryXField: 'date',
          stroke,
          minDistance: 0,
          minBulletDistance: 10,
          maskBullets: false,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{categoryX}: {valueY}, {inflow}',
          }),
        })
      );
      seriesLine.strokes.template.setAll({
        strokeWidth: 2,
        stroke,
      });
      seriesLine.bullets.push(() => {
        // create the circle first
        const circle = am5.Circle.new(root, {
          radius: 5,
          interactive: true,
          fill: am5.color(0xffffff),
          strokeWidth: 1,
          stroke,
          opacity: 1,
        });
        return am5.Bullet.new(root, {
          sprite: circle,
        });
      });
      // const tooltip = seriesLine.set(
      //   'tooltip',
      //   am5.Tooltip.new(root, {
      //     getFillFromSprite: false,
      //     getStrokeFromSprite: false,
      //     autoTextColor: false,
      //     pointerOrientation: 'horizontal',
      //     paddingLeft: 16,
      //     paddingRight: 16,
      //     paddingTop: 12,
      //     paddingBottom: 16,
      //   })
      // );
      // tooltip.get('background')!.setAll({
      //   fill: am5.color(0xffffff),
      //   fillOpacity: 0.8,
      //   stroke: am5.color(0xffffff),
      //   strokeOpacity: 1,
      //   shadowBlur: 8,
      //   shadowColor: am5.color(0x000000),
      //   shadowOpacity: 0.18,
      //   shadowOffsetY: 6,
      // });
      // tooltip.label.adapters.add('html', () => {
      //   return `
      //     <div style="width: 132px; font-family: 'Noto Sans KR', sans-serif;">
      //       <div style="display: flex; margin-top: 2px; font-size: 14px; line-height: 20px; color: #fff; justify-content: space-between;">
      //         <span style="color: #BFBFBF;">High</span><span>{valueY} GWei</span>
      //       </div>
      //     </div>
      //   `;
      // });
      const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
      cursor.lineX.set('visible', false);
      cursor.lineY.set('visible', false);
      seriesLine.data.setAll(data);
    };

    const createSeries = (name: string, labelCenterX: Percent, field: string, stroke: any) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          categoryXField: 'date',
          clustered: false,
          fill: stroke,
          // tooltip: am5.Tooltip.new(root, {
          //   pointerOrientation: 'horizontal',
          //   labelText: '{name} in {categoryX}: {valueY} {info}',
          // }),
        })
      );
      series.columns.template.setAll({
        width: 4,
        height: am5.p100,
        templateField: 'columnSettings',
        cornerRadiusTL: 2,
        cornerRadiusTR: 2,
      });
      series.bullets.push(() => {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerY: am5.p50,
            text: '{valueX}',
            populateText: true,
            centerX: labelCenterX,
          }),
        });
      });
      // chart.set('cursor', am5xy.XYCursor.new(root, {}));
      series.data.setAll(data);
    };
    createSeriesLine('totalChart', 'total', am5.color(daoColorSet1(activeDao.value)));
    createSeries('inflowChart', am5.p0, 'inflow', am5.color(daoColorSet2(activeDao.value)));
    createSeries('outflowChart', am5.p100, 'outflow', am5.color(daoColorSet1(activeDao.value)));
  }, [id, data]);
  return <div id={id} style={{ width: '100%', height: '249px' }} className={cn('line-chart-wrap')} />;
};
export default ColumnLineMixChart;
