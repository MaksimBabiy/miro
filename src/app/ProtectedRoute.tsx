import { refreshToken } from "@/shared/lib/refreshtoken";
import { ROUTES } from "@/shared/model/routes";
import { useAuthStore } from "@/shared/store/auth";
import { Navigate, Outlet, redirect } from "react-router";

const ProtectedRoute = () => {
  const session = useAuthStore((state) => state.session);
  if (!session?.userId) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

export const ProtectedRouteLoader = async () => {
  const token = await refreshToken();

  if (!token) return redirect(ROUTES.LOGIN);
};
