import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const boards: ApiSchemas["Board"][] = [
  {
    id: "board-1",
    name: "Marketing Campaign",
  },
  {
    id: "board-2",
    name: "Product Roadmap",
  },
];

export const boardsHandlers = [
  http.get("/boards", () => {
    return HttpResponse.json(boards);
  }),
  http.delete("/boards/{boardId}", ({params}) => {
    const {boardId} = params;
    const boardIndex = boards.findIndex((board) => board.id === boardId);
    if(boardIndex === -1) return HttpResponse.json({message: "Board not found", code: "NOT_FOUND"}, {status: 404});
    boards.splice(boardIndex, 1);
    return HttpResponse.json({message: "Board deleted", code: "OK"});
  }),
  http.post("/boards", async (ctx) => {
    const data = await ctx.request.json();
   const board : ApiSchemas["Board"] = {
    id: crypto.randomUUID(),
    name: data.name
   };
   boards.push(board);
   return HttpResponse.json(board);
  }),
];