import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

/**
 * TODO: i want to store the information about weather to show signup and signin button or logout button
 * and both the buttons should also have visibility if user is on the signup or signin page because on
 * signup  or login page we don't want to show any of these buttons.
 */
type AuthStatus = "loggedOut" | "loggingIn" | "idle" | "signingUp";

type AuthState = {
  status: AuthStatus;
};

type AuthActions = {
  login: () => void;
  logout: () => void;
  signUp: () => void;
  idle: () => void;
  setStatus: (status: AuthStatus) => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  immer((set) => ({
    status: "loggedOut",

    login: () =>
      set((state) => {
        state.status = "loggingIn";
      }),

    logout: () =>
      set((state) => {
        state.status = "loggedOut";
        // Perform logout logic here
      }),

    signUp: () =>
      set((state) => {
        state.status = "signingUp";
        // Perform sign-up logic here
        // After successful sign-up:
      }),

    idle: () =>
      set((state) => {
        state.status = "idle";
      }),

    setStatus: (status: AuthStatus) =>
      set((state) => {
        state.status = status;
      }),
  }))
);
