import { Dialog, DialogOverlay, DialogContent } from '@components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-transparent">
        <DialogContent className="overflow-y-hidden">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
