import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
export type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

interface AuthStore {
    token: string
    login: (token: string) => void
    logout: () => void;
    session: Session | null
    setSession: (token: string) => void,
    clearSession: () => void
  
}


const TOKEN_KEY = 'token'
export const useAuthStore = create<AuthStore>()(
devtools(persist((set,get) => ({
  token: localStorage.getItem(TOKEN_KEY) || '',
  session: {} as Session,
  login: (token: string) => {
    set({ token });
    localStorage.setItem(TOKEN_KEY, token);
    get().setSession(token);
  },
  logout: () => {
    set({ token: '' });
    localStorage.removeItem(TOKEN_KEY);
   get().clearSession();
  },
  setSession(token) {
    const session = jwtDecode<Session>(token);
    set({ session });
  },
  clearSession() {
    set({session: null});
  },
}), {
   
      name: 'authPersist', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
   
})))