import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useQueryClient } from "@tanstack/react-query";
import { href, Link } from "react-router";

const Boads = () => {
  const queryClient = useQueryClient();
  const boadsQuery = rqClient.useQuery("get", "/boards");

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
      },
    }
  );
  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
    },
  });

  return (
    <div className="flex flex-col grow items-center justify-center">
      <h1 className="text-3xl font-bold text-red-500">Create Board</h1>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          if (!formData.has("name")) return;
          if (createBoardMutation.isPending) return;
          if (formData.get("name")?.toString().length === 0) return;
          createBoardMutation.mutate({
            body: {
              name: formData.get("name") as string,
            },
          });
        }}
      >
        <input type="text" name="name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          Create
        </button>
      </form>
      <h1>Boardssss</h1>
      {boadsQuery.data?.map((board) => (
        <div key={board.id}>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
          <button
            disabled={deleteBoardMutation.isPending}
            onClick={() => {
              deleteBoardMutation.mutate({
                params: { path: { boardId: board.id } },
              });
            }}
          >
            Delete
          </button>
        </div>
      ))}
      {boadsQuery.data?.length === 0 && "No boards"}
    </div>
  );
};

export const Component = Boads;
