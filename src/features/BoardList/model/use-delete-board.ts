import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";


export const useDeleteBoard = () => {
  
    const queryClient = useQueryClient();
  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
      },
    }
  );
  return {
    deleteBoard: (id: string) => deleteBoardMutation.mutate({params: { path: { boardId: id } },}),
    getIsPending: (boardId: string) => deleteBoardMutation.isPending && deleteBoardMutation.variables?.params?.path?.boardId === boardId 
  };
}


