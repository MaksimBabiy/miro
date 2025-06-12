import { pbClient } from "@/shared/api/instance"
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";
import type { LoginValues } from "./schemas";
import { useAuthStore } from "@/shared/store/auth";


export const useLogin = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore.getState();
    const loginMutation = pbClient.useMutation("post", "/auth/login", {
        onSuccess: (data) => {
            authStore.login(data.accessToken)
            navigate(ROUTES.HOME);
        },
        onError: (err) => {
            throw new Error(err.message);
        }
    });
  const errorMessage = loginMutation.isError ? loginMutation.error?.message : undefined;
    const login = (data: LoginValues) => {
        loginMutation.mutate({
            body: data,
        });
    }

return {
    login, isPending: loginMutation.isPending, errorMessage
}
}