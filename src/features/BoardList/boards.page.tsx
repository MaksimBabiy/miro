import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { href, Link } from "react-router";
import { useBoardsList } from "./model/use-boards-list";
import { Switch } from "@/shared/ui/kit/switch";
import {
  useBoardsFilters,
  type BoardSortOptions,
} from "./model/use-boards-filters";
import { useDebounce } from "@/shared/lib/react";
import { useCreateBoard } from "./model/use-create-board";
import { useDeleteBoard } from "./model/use-delete-board";
import { useFavouriteBoard } from "./model/use-favourite-board";

const Boads = () => {
  const [page, setPage] = useState(1);
  const { search, setSearch, sort, setSort } = useBoardsFilters();
  const debouncedValue = useDebounce(search, 500);
  const boardsQuery = useBoardsList({
    search: debouncedValue,
    sort,
  });

  const { createBoard, createBoardPending } = useCreateBoard();
  const { deleteBoard, getIsPending } = useDeleteBoard();
  const { toggle, isOptimisticFavorite } = useFavouriteBoard();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Доски {CONFIG.API_BASE_URL}</h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Label htmlFor="search">Поиск</Label>
          <Input
            id="search"
            placeholder="Введите название доски..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="sort">Сортировка</Label>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as BoardSortOptions)}
          >
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastOpenedAt">По дате открытия</SelectItem>
              <SelectItem value="createdAt">По дате создания</SelectItem>
              <SelectItem value="updatedAt">По дате обновления</SelectItem>
              <SelectItem value="name">По имени</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Все доски</TabsTrigger>
          <TabsTrigger value="favorites">Избранные</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-8">
        <form
          className="flex gap-4 items-end"
          onSubmit={(e) => {
            e.preventDefault();
            createBoard();
            e.currentTarget.reset();
          }}
        >
          <div className="flex-grow">
            <Label htmlFor="board-name">Название новой доски</Label>
            <Input
              id="board-name"
              name="name"
              placeholder="Введите название..."
            />
          </div>
          <Button type="submit" disabled={createBoardPending}>
            Создать доску
          </Button>
        </form>
      </div>

      {boardsQuery.isPending && page === 1 ? (
        <div className="text-center py-10">Загрузка...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardsQuery.boards.map((board) => (
              <Card key={board.id} className="relative">
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <Switch
                    checked={isOptimisticFavorite(board)}
                    onCheckedChange={() => toggle(board)}
                  />
                </div>
                <CardHeader>
                  <div className="flex flex-col gap-2">
                    <Button
                      asChild
                      variant="link"
                      className="text-left justify-start h-auto p-0"
                    >
                      <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                        <span className="text-xl font-medium">
                          {board.name}
                        </span>
                      </Link>
                    </Button>
                    <div className="text-sm text-gray-500">
                      Создано: {new Date(board.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Последнее открытие:{" "}
                      {new Date(board.lastOpenedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="destructive"
                    disabled={getIsPending(board.id)}
                    onClick={() => deleteBoard(board.id)}
                  >
                    Удалить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {boardsQuery.boards.length === 0 && !boardsQuery.isPending && (
            <div className="text-center py-10">Доски не найдены</div>
          )}

          {boardsQuery.hasNextPage && (
            <div ref={boardsQuery.cursorRef} className="text-center py-8">
              {boardsQuery.isFetchingNextPage &&
                "Загрузка дополнительных досок..."}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const Component = Boads;
