import { useState } from "react";
export type BoardSortOptions = "name" | "createdAt" | "updatedAt" | "lastOpenedAt";
export type BoardsFilters = {
    search: string;
    sort: BoardSortOptions;

}
export const useBoardsFilters = () => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<BoardSortOptions>("createdAt");


  return { search, setSearch, sort, setSort};
}