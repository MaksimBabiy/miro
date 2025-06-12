import "react-router"

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    BOARDS: "/boards",
    BOARD: "/board/:boardId",
}


export type PathParams = {
    [ROUTES.BOARD] : {
        boardId: string
    }
}

declare module "react-router" {
    interface Register {
        params: PathParams
    }
}