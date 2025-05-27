import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
}

export function ConfirmationDialog({ open, onClose, name }: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mb-4 bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Thank You, {name}!</DialogTitle>
          <DialogDescription className="mt-2 text-center">
            Your message has been sent successfully. One of our representatives will contact you soon.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
} 