'use client';

import { useState } from 'react';
import { CompleteDialog } from './components/CompleteDialog';
import Huarong from './huarong';
import PageContainer from '@/components/PageContainer';

export default function Home() {
  const [completeOpen, setCompleteOpen] = useState(false);

  const onComplete = () => {
    setCompleteOpen(true);
  }

  const reTry = () => {
    console.log('reTry');
  }

  return (
    <>
      <PageContainer reTry={reTry}>
        <div className="w-[100%] h-full">
          <Huarong isReadyComplete={false} onComplete={onComplete} />
        </div>
      </PageContainer>
      <CompleteDialog open={completeOpen} onOpenChange={setCompleteOpen} reTry={reTry} />
    </>
  );
}
