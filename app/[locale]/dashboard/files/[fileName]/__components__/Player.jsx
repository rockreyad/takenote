'use client';

import { useAudioPlayer } from '@/context/AudioProvider';
import { useMemo } from 'react';

export default function Palayer({ episode }) {
  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type
      },
      link: `/${episode.id}`
    }),
    [episode]
  );
  let player = useAudioPlayer(audioPlayerData);
  return (
    <>
      <button
        type="button"
        onClick={() => player.toggle()}
        className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
        aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
          episode.title
        }`}
      >
        {player.playing ? 'Pause' : 'Play'}
        <span className="ml-3" aria-hidden="true">
          Listen
        </span>
      </button>
    </>
  );
}
