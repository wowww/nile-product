/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import cn from 'classnames';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { stackedChartDefaultData } from '@/components/chart/tokensChartDummyData';
import { omit } from 'lodash';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { v4 as uid } from 'uuid';

/* 22.10.27 수정: 차트 라이센스 추가 */
am5.addLicense('AM5C358434391');

interface LineChartPropsType {
  data: stackedChartDefaultData[];
  category: string[]; // 더미 데이터 label 바꾸는 용도
}

const StackLineChart: React.FC<LineChartPropsType> = ({ data, category }) => {
  const Id = uid();
  const tooltipColorChip = [am5.color(0x9860ff), am5.color(0x36b8ff), am5.color(0x5e5ff5), am5.color(0xffd056)];
  const graphColorChip = [am5.color(0x9860ff), am5.color(0x1d94f5), am5.color(0x465cff), am5.color(0xeda20b)];

  useEffect(() => {
    const root = am5.Root.new(Id);
    root.setThemes([am5themes_Animated.new(root)]);
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        paddingRight: 0,
        maxTooltipDistance: 0,
      })
    );
    chart.zoomOutButton.set('forceHidden', true);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "#.#'B'",
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
        }),
      })
    );
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: 'month', count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          visible: false,
          minGridDistance: 30,
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
          // categoryXField: 'date',
          valueXField: 'date',
          stroke,
          fill: stroke,
          // minDistance: 0,
          minBulletDistance: 10,
          // maskBullets: false,
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

      const tooltip = series.set(
        'tooltip',
        am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          getFillFromSprite: false,
          getLabelFillFromSprite: false,
          paddingRight: 8,
          paddingLeft: 8,
          paddingTop: 6,
          paddingBottom: 6,
          // width: 95,
        })
      );

      tooltip.get('background')!.setAll({
        // interactive: true,
        opacity: 1,
        fill: am5.color(0x404040),
        stroke: am5.color(0x404040),
        fillOpacity: 1,
        // width: 95,
      });

      //TODO 개발 진행중
      tooltip.label.adapters.add('html', (html, target) => {
        const categoryValueObj: any = target.dataItem?.dataContext;

        if (categoryValueObj) {
          const newCategoryValueObj = omit(categoryValueObj, ['date']); // date 뺀 값 가져오기
          const newObjArray = Object.entries(newCategoryValueObj).map(([key, value]) => ({ key, value }));

          let text = '';
          text += `<div class="stack-tooltip">`;

          category.forEach((newCategoryValueObj, index) => {
            const categoryValue = newObjArray[index];
            if (categoryValue !== undefined) {
              const currentValue = categoryValue.value;
              if (index === 0) {
                // total
                text += `<dl class="total">
                  <dt>${category[index]}</dt>
                  <dd>${currentValue}B</dd>
                </dl>`;
              } else {
                text += `<dl class="category">
                    <dt><span style="background-color: ${tooltipColorChip[index - 1]}"></span>${category[index]}</dt>
                    <dd>${currentValue}B</dd>
                  </dl>`;
              }
            }
          });

          text += '</div>';
          return text;
        }
      });

      const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          // behavior: 'none',
          xAxis,
        })
      );
      cursor.lineX.setAll({
        stroke: am5.color(0x404040),
        strokeDasharray: [0, 0],
      });
      cursor.lineY.set('visible', false);
      series.data.setAll(data);
      series.appear(1000);
    };

    for (let i = category.length - 1; i >= 0; i--) {
      createSeries(category[i], category[i], graphColorChip[i - 1]);
    }

    // createSeries('etc', 'etc', graphColorChip[3]);
    // createSeries('BUSD', 'BUSD', graphColorChip[2]);
    // createSeries('USDT', 'USDT', graphColorChip[1]);
    // createSeries('WBNB', 'WBNB', graphColorChip[0]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);
  return (
    <div className={cn('chart-wrap')}>
      <div id={Id} className={cn('stack-chart-wrap')} />
    </div>
  );
};

export default StackLineChart;
