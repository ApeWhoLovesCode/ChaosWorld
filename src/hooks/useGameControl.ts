import { useLocalStorageState } from 'ahooks';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

export interface HistoryInfo {
  record: {
    /** 完成用时 */
    time: number;
    /** 日期 */
    date: string;
  }[];
}

export default function useGameControl({historyKey}: {historyKey: string}) {
  /** 当前用时 */
  const [time, setTime] = useState(0);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const countTimer = useRef<NodeJS.Timeout>(undefined);
  const [gameAreaKey, setGameAreaKey] = useState(0);
  const [historyInfo, setHistoryInfo] = useLocalStorageState<HistoryInfo>(historyKey, {
    defaultValue: { record: [] },
  });

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

  const setHistory = () => {
    const newI = historyInfo.record.findLastIndex((v) => time > v.time);
    if(newI !== -1) {
      historyInfo.record[newI] = { time, date: dayjs().format('YYYY-MM-DD HH:mm:ss') };
    } else {
      historyInfo.record.push({ time, date: dayjs().format('YYYY-MM-DD HH:mm:ss') });
    }
    historyInfo.record.splice(10);
    setHistoryInfo(historyInfo)
  };

  const onEnd = () => {
    setHistory()
    setCompleteOpen(true);
    setIsStart(false);
    clearInterval(countTimer.current);
  };

  useEffect(() => {
    return () => {
      clearInterval(countTimer.current);
    };
  }, []);

  return { historyInfo, gameAreaKey, setGameAreaKey, completeOpen, setCompleteOpen, time, isStart, onStart, onReStart, onEnd };
}
