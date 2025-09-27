import { IoIosRefresh } from 'react-icons/io';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type PropsType = {
  children: React.ReactNode;
  reTry?: () => void;
};

export default ({ children, reTry }: PropsType) => {
  return (
    <div className="flex h-[90%] gap-x-4">
      <div className="aspect-square h-full rounded-lg border-2 border-solid border-zinc-600 p-4 pt-20 dark:border-zinc-400">
        {children}
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger>
            <div onClick={reTry} className="flex-center size-10 cursor-pointer rounded-[50%] bg-zinc-400 hover:opacity-90 dark:bg-zinc-600">
              <IoIosRefresh />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">重新开始</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
