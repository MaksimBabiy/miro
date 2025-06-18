import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { BoardsListItem } from "../ui/boards-list-item";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { useDeleteBoard } from "../model/use-delete-board";

import type { ApiSchemas } from "@/shared/api/schema";
import { useFavouriteBoard } from "../model/use-favourite-board";

export function BoardItem({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useFavouriteBoard();

  return (
    <BoardsListItem
      key={board.id}
      board={board}
      rightActions={
        <BoardsFavoriteToggle
          isFavorite={updateFavorite.isOptimisticFavorite(board)}
          onToggle={() => updateFavorite.toggle(board)}
        />
      }
      menuActions={
        <DropdownMenuItem
          variant="destructive"
          disabled={deleteBoard.getIsPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </DropdownMenuItem>
      }
    />
  );
}
