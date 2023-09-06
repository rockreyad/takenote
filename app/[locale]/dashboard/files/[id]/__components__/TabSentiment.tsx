'use client';

import { Sentiment, SpeakerDiarization } from '@/types/analyseData';
import echarts, { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

// prettier-ignore
const days = [
  'Neutral', 'Positive', 'Negative'
];

type tColors = {
  [key: string]: string;
};

const colors: tColors = {
  Neutral: '#F4BA77',
  Positive: '#94D8AC',
  Negative: '#DF665A'
};

export default function TabSentiment({
  sentimentData,
  speakerDiarization
}: {
  sentimentData: Sentiment[] | undefined;
  speakerDiarization: SpeakerDiarization[] | undefined;
}) {
  const title: echarts.TitleComponentOption[] = [];
  const singleAxis: echarts.SingleAxisComponentOption[] = [];
  const series: echarts.ScatterSeriesOption[] = [];

  // console.log('speakerDiarization', speakerDiarization);
  const hours = speakerDiarization?.length
    ? speakerDiarization?.map((item) => item.end)
    : [];
  // console.log("hours", hours);

  const transcriptions = speakerDiarization?.length
    ? speakerDiarization
      ?.map((item) => item.text)
    : [];
  // console.log("transcriptions", transcriptions);

  days.forEach(function (day, idx) {
    title.push({
      textBaseline: 'middle',
      top: ((idx + 0.5) * 100) / 7 + '%',
      text: day,
      textStyle: {
        fontSize: 12
      }
    });
    singleAxis.push({
      left: 150,
      type: 'category',
      boundaryGap: false,
      data: hours,
      top: (idx * 100) / 7 + 5 + '%',
      height: 100 / 7 - 10 + '%',
      axisLabel: {
        interval: 2
      }
    });
    series.push({
      singleAxisIndex: idx,
      coordinateSystem: 'singleAxis',
      type: 'scatter',
      data: [],
      itemStyle: {
        color: colors[day]
      },
      symbolSize: function (dataItem) {
        return dataItem[1] * 15;
      }
    });
  });

  sentimentData
    ?.map((item) => (item.label === 'Neutral' ? item.score : 0))
    ?.forEach(function (val, idx) {
      (series as any)[0]?.data.push([idx, val.toFixed(6), transcriptions[idx]]);
    });

  sentimentData
    ?.map((item) => (item.label === 'Positive' ? item.score : 0))
    ?.forEach(function (val, idx) {
      (series as any)[1]?.data.push([idx, val.toFixed(6), transcriptions[idx]]);
    });

  sentimentData
    ?.map((item) => (item.label === 'Negative' ? item.score : 0))
    ?.forEach(function (val, idx) {
      (series as any)[2]?.data.push([idx, val.toFixed(6), transcriptions[idx]]);
    });
  // console.log('series', series);

  // Set data for SentimentScore Graph
  const ScoreDistributionOptions = {
    tooltip: {
      position: 'top'
    },
    title: title,
    singleAxis: singleAxis,
    series: series
  } as echarts.EChartsOption;

  // Set data for Sentiment Graph
  const sentimentNeutralValue = sentimentData?.length
    ? sentimentData
      ?.filter((item) => item.label === 'Neutral')
      .reduce((acc, current) => {
        return acc + current.score;
      }, 0)
    : 0;

  const sentimentPositiveValue = sentimentData?.length
    ? sentimentData
      ?.filter((item) => item.label === 'Positive')
      .reduce((acc, current) => {
        return acc + current.score;
      }, 0)
    : 0;
  const sentimentNegativeValue = sentimentData?.length
    ? sentimentData
      ?.filter((item) => item.label === 'Negative')
      .reduce((acc, current) => {
        return acc + current.score;
      }, 0)
    : 0;

  const SentimentAnalysisOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Neutral', 'Positive', 'Negative']
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.1]
    },
    series: [
      {
        data: [
          {
            value: sentimentNeutralValue,
            itemStyle: {
              color: colors.Neutral
            }
          },
          {
            value: sentimentPositiveValue,
            itemStyle: {
              color: colors.Positive
            }
          },
          {
            value: sentimentNegativeValue,
            itemStyle: {
              color: colors.Negative
            }
          }
        ],
        type: 'bar'
      }
    ]
  } as EChartsOption;
  return (
    <>
      <div className="space-y-8">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Sentiment
        </h2>
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Sentiment Analysis
        </h4>
        <ReactECharts option={SentimentAnalysisOption} className="!h-[500px]" />
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Sentiment Score Distribution
        </h4>
        <ReactECharts
          option={ScoreDistributionOptions}
          className="!h-[768px]"
        />
      </div>
    </>
  );
}
