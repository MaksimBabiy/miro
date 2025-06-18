import { rqClient } from "@/shared/api/instance";
import { useCallback, type RefCallback } from "react";


type QueryParams = {
    limit?: number;
    isFavorite?: boolean;
    search?: string;
    sort?: "name" | "createdAt" | "updatedAt" | "lastOpenedAt";
}
export const useBoardsList = (
    { limit, isFavorite, search, sort }: QueryParams
) => {
    const {fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage} = rqClient.useInfiniteQuery("get", "/boards", {
        params: {
            query: {
                page: 1,
                limit : limit ?? 10,
                isFavorite : isFavorite ?? false,
                search : search ?? "",
                sort:  sort ?? "createdAt"
            }
            
        },
        
    }, {
        initialData: { pages: [], pageParams: [1] },
        pageParamName: "page",
        getNextPageParam: (lastPage: { totalPages: number }, _: number, lastPageParams : string) => {
          return Number(lastPageParams) < lastPage.totalPages && Number(lastPageParams) + 1
        }
    }
);
const cursorRef: RefCallback<HTMLDivElement> = useCallback((node) => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchNextPage()
        }
        
    }, {
        threshold: 0.5
    })
    if(node) {
        observer.observe(node)

        return () => {
            observer.disconnect()
        }
    }
}, [fetchNextPage])

const boards = data?.pages.flatMap((page) => page.list ) ?? [];

return {
    boards,
    cursorRef,
    isFetchingNextPage,
    isPending,
    hasNextPage
}
}