
import { publicFetchClient } from "../api/instance";
import { useAuthStore, type Session } from "../store/auth";

  
let refreshPromise: Promise<string | null> | null = null;
const authStore = useAuthStore.getState();
  export const refreshToken = async () => {

        if(!authStore.token) return null

        const session  = authStore.session as Session;
  

        if(session.exp < Date.now() / 1000)  {
            if(!refreshPromise) {
                refreshPromise = publicFetchClient.POST("/auth/refresh").then((res) => {
                  console.log(res);
                    return res.data?.accessToken ?? null
                    
                }).then((newToken) => {
                  if(newToken) {
                    console.log(newToken);
                    authStore.login(newToken);
                    return newToken
                  } else {
                    authStore.logout();
                    return null
                  }
                  
                }).finally(() => {
                    refreshPromise = null;
                })
            }
          
            const newToken = await refreshPromise;

            if(newToken) {
        
                return newToken
               
            }
            else {
                return null
            }
        }

         return authStore.token
    };