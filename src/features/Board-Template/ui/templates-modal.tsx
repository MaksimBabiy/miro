import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { TemplatesGallery } from "./templates-gallery";
import { useModalStore } from "@/shared/store/modal";

export function TemplatesModal() {
  const handleClone = useModalStore((store) => store.close);
  const isOpen = useModalStore((store) => store.isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={handleClone}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Выберите шаблон</DialogTitle>
          <DialogDescription>
            Выберите шаблон для создания новой доски
          </DialogDescription>
        </DialogHeader>

        <TemplatesGallery className="h-[60vh] pr-4" />
      </DialogContent>
    </Dialog>
  );
}
