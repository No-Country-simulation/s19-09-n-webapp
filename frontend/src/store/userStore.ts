import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string,
  name: string,
  lastName: string,
  token: string,
}

interface UserStore {
  user: User,
  logUser: (newUser: User) => void,
  logoutUser: () => void,
}

const initialUser: User = {
  email: "",
  name: "",
  lastName: "",
  token: "",
}

const userState: StateCreator<UserStore> = (set) => ({
  user: initialUser,
  logUser: (newUser) => set({user: newUser}),
  logoutUser: () => set({user: initialUser})
})

export const useUserStore = create<UserStore>()(
  persist(userState, {name: "userStorage"})
)