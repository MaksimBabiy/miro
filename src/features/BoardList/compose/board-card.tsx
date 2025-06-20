import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { BoardsListCard } from "../ui/boards-list-card";
import { Button } from "@/shared/ui/kit/button";

import { useDeleteBoard } from "../model/use-delete-board";
import type { ApiSchemas } from "@/shared/api/schema";
import { useFavouriteBoard } from "../model/use-favourite-board";

export function BoardCard({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useFavouriteBoard();

  return (
    <BoardsListCard
      key={board.id}
      board={board}
      rightTopActions={
        <BoardsFavoriteToggle
          isFavorite={updateFavorite.isOptimisticFavorite(board)}
          onToggle={() => updateFavorite.toggle(board)}
        />
      }
      bottomActions={
        <Button
          variant="destructive"
          disabled={deleteBoard.getIsPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </Button>
      }
    />
  );
}
