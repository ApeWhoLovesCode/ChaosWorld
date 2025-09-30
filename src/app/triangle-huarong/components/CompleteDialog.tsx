import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { HistoryInfo } from '@/hooks/useGameControl';
import { formatTime } from '@/utils/format';

export function CompleteDialog({
  open,
  time,
  historyInfo,
  onOpenChange,
  onReStart,
}: {
  open: boolean;
  time: number;
  historyInfo: HistoryInfo;
  onOpenChange: (open: boolean) => void;
  onReStart: () => void;
}) {
  const onClose = () => onOpenChange(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>挑战成功</DialogTitle>
          <DialogDescription>
            恭喜完成了拼图，用时 <i className="font-bold">{formatTime(time)}</i>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose}>
            关闭
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onClose();
              onReStart();
            }}
          >
            重新挑战
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
