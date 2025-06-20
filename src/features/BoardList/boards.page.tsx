import { useState } from "react";
import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters } from "./model/use-boards-filters";

import { useCreateBoard } from "./model/use-create-board";

import { PlusIcon } from "lucide-react";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";
import { type ViewMode, ViewModeToggle } from "./ui/view-mode-toggle";
import { BoardsSortSelect } from "./ui/boards-sort-select";
import { BoardsSearchInput } from "./ui/boards-search-input";

import { BoardsSidebar } from "./ui/boards-sidebar";

import { useDebounce } from "@/shared/lib/react";
import { BoardItem } from "./compose/board-item";
import { BoardCard } from "./compose/board-card";
import { TemplatesModal, TemplatesGallery } from "@/features/Board-Template";
import { useModalStore } from "@/shared/store/modal";

function BoardsListPage() {
  const { search, sort, setSort, setSearch } = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort,
    search: useDebounce(search, 300),
  });

  const HandleOpenModal = useModalStore((store) => store.open);

  const { createBoard, createBoardPending } = useCreateBoard();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <>
      <TemplatesModal />
      <BoardsListLayout
        templates={<TemplatesGallery />}
        sidebar={<BoardsSidebar />}
        header={
          <BoardsListLayoutHeader
            title="Доски"
            description="Здесь вы можете просматривать и управлять своими досками"
            actions={
              <>
                <Button variant="outline" onClick={() => HandleOpenModal()}>
                  Выбрать шаблон
                </Button>
                <Button disabled={createBoardPending} onClick={createBoard}>
                  <PlusIcon />
                  Создать доску
                </Button>
              </>
            }
          />
        }
        filters={
          <BoardsListLayoutFilters
            sort={<BoardsSortSelect value={sort} onValueChange={setSort} />}
            filters={<BoardsSearchInput value={search} onChange={setSearch} />}
            actions={
              <ViewModeToggle
                value={viewMode}
                onChange={(value) => setViewMode(value)}
              />
            }
          />
        }
      >
        <BoardsListLayoutContent
          isEmpty={boardsQuery.boards.length === 0}
          isPending={boardsQuery.isPending}
          isPendingNext={boardsQuery.isFetchingNextPage}
          cursorRef={boardsQuery.cursorRef}
          hasCursor={boardsQuery.hasNextPage}
          mode={viewMode}
          renderList={() =>
            boardsQuery.boards.map((board) => (
              <BoardItem key={board.id} board={board} />
            ))
          }
          renderGrid={() =>
            boardsQuery.boards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))
          }
        />
      </BoardsListLayout>
    </>
  );
}

export const Component = BoardsListPage;
