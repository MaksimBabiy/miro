import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useQueryClient } from "@tanstack/react-query";
import { href, useNavigate } from "react-router";


export const useCreateBoard = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {

      await queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
    },
    onSuccess: (data) => {
      navigate(href(ROUTES.BOARD, {boardId: data.id}));
    },
  });

  return {
    createBoard: () => createBoardMutation.mutate({}),
    createBoardPending: createBoardMutation.isPending
  };
}