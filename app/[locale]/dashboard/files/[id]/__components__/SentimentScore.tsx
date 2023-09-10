'use client';

import { Sentiment } from '@/types/analyseData';
import { BsFillTriangleFill } from 'react-icons/bs';
import './sentiment_score.css';

export default function SentimentScore({
  sentimentData,
}: {
  sentimentData: Sentiment[] | undefined;
}) {
  const positiveCount = sentimentData?.length
    ? sentimentData
      ?.filter((item) => item.label === 'Positive')
      .length
    : 0;

  const negativeCount = sentimentData?.length
    ? sentimentData
      ?.filter((item) => item.label === 'Negative')
      .length
    : 0;

  const score = (positiveCount - negativeCount) * 100 / (sentimentData?.length || 0);

  let chartStyle = { color: (score >= 0 ? '#3d9970' : '#b83638') };

  return (
    <div id='sentiment_score'>
      <h4>Sentiment Score</h4>
      <BsFillTriangleFill style={chartStyle}></BsFillTriangleFill>
      <span style={chartStyle}>{score.toFixed(2)}</span>
    </div>
  );
}
