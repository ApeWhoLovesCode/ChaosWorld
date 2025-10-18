'use client';

import { CompleteDialog } from '@/components/CompleteDialog';
import SliderPuzzle from './index';
import PageContainer from '@/components/PageContainer';
import useGameControl from '@/hooks/useGameControl';
import { SliderPuzzleInstance } from './type';
import { useRef } from 'react';

export default function Home() {
  const { historyInfo, gameAreaKey, setGameAreaKey, time, isStart, completeOpen, setCompleteOpen, onStart, onReStart, onEnd } =
    useGameControl({historyKey: 'triangle-huarong'});
  const huarongRef = useRef<SliderPuzzleInstance>(null);

  return (
    <>
      <PageContainer time={time} isStart={isStart} onStart={onStart} onReStart={onReStart}>
        <div className="h-full w-[100%]">
          <SliderPuzzle key={gameAreaKey} ref={huarongRef} onComplete={onEnd} />
        </div>
      </PageContainer>
      <CompleteDialog
        time={time}
        open={completeOpen}
        historyInfo={historyInfo}
        onOpenChange={setCompleteOpen}
        onReStart={() => {
          // huarongRef.current?.initData();
          setGameAreaKey((v) => ++v);
          onReStart();
        }}
      />
    </>
  );
}
