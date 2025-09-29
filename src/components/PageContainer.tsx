'use client';
import { IoIosRefresh } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa6';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatTime } from '@/utils/format';

type PropsType = {
  children: React.ReactNode;
  isStart: boolean;
  time: number;
  onStart: () => void;
  onReStart?: () => void;
};

export default ({ children, isStart, time, onStart, onReStart }: PropsType) => {

  return (
    <div className="flex h-[90%] gap-x-4">
      <div className="relative aspect-square h-full rounded-lg border-2 border-solid border-zinc-600 p-4 pt-20 dark:border-zinc-400">
        {children}
        {!isStart ? (
          <div
            className="flex-center flex-col gap-y-3 absolute top-0 left-0 z-10 size-full cursor-pointer hover:opacity-90 bg-black/40 dark:bg-white/20"
            onClick={onStart}
          >
            <FaPlay className="text-xl" />
            点击开始
          </div>
        ) : null}
      </div>
      <div className="space-y-3">
        <div className="text-xs">
          用时：
          <span className="text-sm font-bold">{time ? formatTime(time) : '--'}</span>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={onReStart}
              className="flex-center size-12 cursor-pointer rounded-[50%] bg-zinc-400 hover:opacity-90 dark:bg-zinc-600"
            >
              <IoIosRefresh className="text-xl" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">重新开始</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
