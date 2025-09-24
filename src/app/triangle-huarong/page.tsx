'use client';

import Huarong from './huarong';

export default function Home() {

  const onComplete = () => {
    alert('恭喜完成拼图');
  }

  return (
    <div className="w-[80%] h-full">
      <Huarong onComplete={onComplete} />
    </div>
  );
}
