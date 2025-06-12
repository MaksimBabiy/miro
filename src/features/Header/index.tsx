import { useAuthStore } from "@/shared/store/auth";
import { Button } from "@/shared/ui/kit/button";

export function AppHeader() {
  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);

  if (!session) {
    return null;
  }

  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold">Miro Copy</div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{session.email}</span>
          <Button
            variant="default"
            size="sm"
            onClick={() => logout()}
            className="hover:bg-destructive/10"
          >
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
