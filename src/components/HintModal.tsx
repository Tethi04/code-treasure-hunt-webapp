
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface HintModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  hint: string;
  onUseHint: () => void;
}

const HintModal = ({ open, setOpen, hint, onUseHint }: HintModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span>Need a hint?</span>
          </DialogTitle>
          <DialogDescription>
            Using a hint might help you solve the challenge, but real treasure hunters try without help first!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            I'll try again
          </Button>
          <Button onClick={() => {
            onUseHint();
            setOpen(false);
          }}>
            Show hint
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HintModal;
