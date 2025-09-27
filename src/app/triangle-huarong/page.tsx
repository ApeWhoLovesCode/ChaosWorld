'use client';

import { useState } from 'react';
import { CompleteDialog } from './components/CompleteDialog';
import Huarong from './huarong';

export default function Home() {
  const [completeOpen, setCompleteOpen] = useState(false);

  const onComplete = () => {
    setCompleteOpen(true);
  }

  const reTry = () => {
    
  }

  return (
    <div className="w-[80%] h-full">
      <Huarong isReadyComplete={false} onComplete={onComplete} />
      <CompleteDialog open={completeOpen} onOpenChange={setCompleteOpen} reTry={reTry} />
    </div>
  );
}
