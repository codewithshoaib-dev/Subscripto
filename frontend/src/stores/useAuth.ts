import { create } from "zustand";
import apiClient from "../api/ApiClient";

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

type AuthState = {
  accessToken: string | null;
  initialized: boolean;
  refreshing: boolean;
  queue: QueueItem[];
  loading: boolean;
  error: unknown;

  setAccessToken: (token: string | null) => void;
  login: (username: string, password: string) => Promise<any>;
  refreshAccess: () => Promise<string>;
  initAuth: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  reset: () => void;
};

export const useAuth = create<AuthState>((set, get) => ({
  accessToken: null,
  initialized: false,
  refreshing: false,
  queue: [],
  loading: false,
  error: null,

  setAccessToken: (token) => {
    set({ accessToken: token });
  },

  login: async (username, password) => {
    set({ loading: true, error: null });

    try {
      const { data } = await apiClient.post("api/login/", {
        username,
        password,
      });

      set({
        loading: false,
        error: null,
        accessToken: data.access,
      });

      return data;
    } catch (err) {
      set({ loading: false, error: err });
      throw err;
    }
  },

  refreshAccess: async () => {
    const { refreshing, queue } = get();

    // Prevent multiple refresh calls
    if (refreshing) {
      return new Promise<string>((resolve, reject) => {
        set({ queue: [...queue, { resolve, reject }] });
      });
    }

    set({ refreshing: true });

    try {
      const { data } = await apiClient.post("api/refresh/");
      set({ accessToken: data.access });

      // Resolve queued requests
      get().queue.forEach((p) => p.resolve(data.access));
      set({ queue: [] });

      return data.access;
    } catch (err) {
      // Reject queued requests
      get().queue.forEach((p) => p.reject(err));
      set({ queue: [], accessToken: null });
      throw err;
    } finally {
      set({ refreshing: false });
    }
  },

  initAuth: async ({ username, password }) => {
    if (get().initialized) return;

    try {
      await get().refreshAccess();
      set({ initialized: true });
    } catch (err: any) {
      if (err?.response?.status === 401) {
        try {
          await get().login(username, password);
          set({ initialized: true });
        } catch {
          set({ initialized: true, accessToken: null });
        }
      } else {
        set({ initialized: true });
      }
    }
  },

  reset: () => {
    set({
      accessToken: null,
      initialized: false,
      refreshing: false,
      queue: [],
      loading: false,
      error: null,
    });
  },
}));
