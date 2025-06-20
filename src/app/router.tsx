import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import { ROUTES } from "@/shared/model/routes";
import { Providers } from "./providers";
import ProtectedRoute, { ProtectedRouteLoader } from "./ProtectedRoute";
import { AppHeader } from "@/features/Header";

export const routes = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: ProtectedRouteLoader,
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.BOARDS,
            lazy: () => import("@/features/BoardList/boards.page"),
          },
          {
            path: ROUTES.FAVORITE_BOARDS,
            lazy: () =>
              import("@/features/BoardList/boards-list-favorite.page"),
          },
          {
            path: ROUTES.RECENT_BOARDS,
            lazy: () => import("@/features/BoardList/boards-list-recent.page"),
          },
          {
            path: ROUTES.BOARD,
            lazy: () => import("@/features/Board/board.page"),
          },
        ],
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BOARDS),
      },

      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/Auth/ui/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/features/Auth/ui/register.page"),
      },
    ],
  },
]);
