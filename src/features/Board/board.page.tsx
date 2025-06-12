import type { PathParams, ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router";

const Board = () => {
  const { boardId } = useParams<PathParams[typeof ROUTES.BOARD]>();
  return <div>boardid {boardId}</div>;
};

export const Component = Board;
