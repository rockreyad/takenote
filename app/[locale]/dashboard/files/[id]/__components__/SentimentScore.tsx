'use client';

import { BsFillTriangleFill } from 'react-icons/bs';
import './sentiment_score.css';

export default function SentimentScore() {
  return (
    <div id='sentiment_score'>
      <h4>Sentiment Score</h4>
      <BsFillTriangleFill />
      <span>6.68</span>
    </div>
  );
}
