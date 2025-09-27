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

export function CompleteDialog({
  open,
  onOpenChange,
  reTry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reTry: () => void;
}) {
  const onClose = () => onOpenChange(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>恭喜</DialogTitle>
          <DialogDescription>恭喜完成了拼图</DialogDescription>
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
              reTry();
            }}
          >
            重新挑战
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
