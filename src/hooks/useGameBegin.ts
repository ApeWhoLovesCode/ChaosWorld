import { useEffect, useRef, useState } from 'react';

export default function useGameBegin() {
  const [completeOpen, setCompleteOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const countTimer = useRef<NodeJS.Timeout>(undefined);
  const [gameAreaKey, setGameAreaKey] = useState(0);

  const onStart = () => {
    setIsStart(true);
    clearInterval(countTimer.current);
    countTimer.current = setInterval(() => {
      setTime((c) => ++c);
    }, 1000);
  };

  const onReStart = () => {
    setCompleteOpen(false);
    setTime(0);
    onStart();
  };

  const onEnd = () => {
    setCompleteOpen(true);
    setIsStart(false);
    clearInterval(countTimer.current);
  };

  useEffect(() => {
    return () => {
      clearInterval(countTimer.current);
    };
  }, []);

  return { gameAreaKey, setGameAreaKey, completeOpen, setCompleteOpen, time, isStart, onStart, onReStart, onEnd };
}
