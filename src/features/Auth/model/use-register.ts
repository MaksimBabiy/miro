
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";
import type { ApiSchemas } from "@/shared/api/schema";

import { pbClient } from "@/shared/api/instance";
import { useAuthStore } from "@/shared/store/auth";

export const useRegister = () => {
    const navigate = useNavigate();
 const authStore = useAuthStore.getState();
    const registerMutation = pbClient.useMutation("post", "/auth/register", {
        onSuccess: (data) => {
            authStore.login(data.accessToken)
            navigate(ROUTES.LOGIN);
        },
        onError: (err) => {
            throw new Error(err.message);
        }
    });
  const errorMessage = registerMutation.isError ? registerMutation.error?.message : undefined;
    const register = (data: ApiSchemas["RegisterRequest"]) => {
        registerMutation.mutate({
            body: data,
        });
    }

return {
    register, isPending: registerMutation.isPending, errorMessage
}
}