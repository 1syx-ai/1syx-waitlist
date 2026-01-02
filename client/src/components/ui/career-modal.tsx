import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CareerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CareerModal({ open, onOpenChange }: CareerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col bg-zinc-950 border-zinc-800 text-zinc-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-white mb-0">
            Join the 1SYX Team
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm leading-relaxed">
          <p className="text-lg text-white font-medium">
          Not hiring workers, but torchbearers with skin in
          </p>

          <div className="space-y-2">
            <p>
            1SYX will outgrow this team. To take it global, we need more people in the core circle.
              <br />
              <br />
              We are not hiring worker bees. We are expanding the crew of builder bees, people who want to shape the system, not just follow it.
              <br />
              <br />
              If you want a steady chair and a polite job description, you will hate it here.
              <br />
              <br />
              If you want real ownership, meaningful ESOPs and work you can point to years from now and say, I helped build that, you are exactly who we want to talk to.
              <br />
              <br />
            </p>
          </div>

          <div className="border-t border-zinc-800 " />

          <div className="bg-zinc-900/50 p-4 border border-zinc-800 mt-4 rounded-sm">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2">
              How to apply
            </p>
            <p>
            Pick anyone on About Us page, connect on LinkedIn, and tell us one thing. What would you fix first, and why should it be you doing it?<br />
            <br />
If you make yourself impossible to ignore, we will find you a seat.

              {" "}
              <br />
              <a
                href="mailto:careers@1syxai.com"
                className="text-white hover:underline"
              >
                careers@1syxai.com
              </a>
              .
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t border-zinc-800">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
