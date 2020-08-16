import { useState, useEffect } from 'react';
export function useVideoControls() {
  const [videoDuration, setVideoDuration] = useState(0);
  const [buffering, setBuffering] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0.0);
  const [displayVideoDuration, setDisplayVideoDuration] = useState('0:00');

  return { videoDuration, setVideoDuration, displayVideoDuration, setDisplayVideoDuration, buffering, setBuffering, videoDuration, setVideoDuration };
}
