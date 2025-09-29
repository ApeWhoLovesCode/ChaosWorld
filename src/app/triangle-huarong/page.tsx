'use client';

import { CompleteDialog } from './components/CompleteDialog';
import Huarong from './huarong';
import PageContainer from '@/components/PageContainer';
import useGameBegin from '@/hooks/useGameBegin';
import { TriangleHuarongRoadInstance } from './type';
import { useRef } from 'react';

export default function Home() {
  const { gameAreaKey, setGameAreaKey, time, isStart, completeOpen, setCompleteOpen, onStart, onReStart, onEnd } =
    useGameBegin();
  const huarongRef = useRef<TriangleHuarongRoadInstance>(null);

  return (
    <>
      <PageContainer time={time} isStart={isStart} onStart={onStart} onReStart={onReStart}>
        <div className="h-full w-[100%]">
          <Huarong key={gameAreaKey} ref={huarongRef} isReadyComplete={true} onComplete={onEnd} />
        </div>
      </PageContainer>
      <CompleteDialog
        time={time}
        open={completeOpen}
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
