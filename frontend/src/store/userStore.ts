import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface LoggedUser {
  email: string,
  name: string,
  lastName: string,
  token: string,
}

interface UserStore {
  user: LoggedUser | "",
  logUser: (newUser: LoggedUser) => void,
  logoutUser: () => void,
}

const userState: StateCreator<UserStore> = (set) => ({
  user: "",
  logUser: (newUser) => set({user: newUser}),
  logoutUser: () => set({user: ""})
})

export const useUserStore = create<UserStore>()(
  persist(userState, {name: "userStorage"})
)