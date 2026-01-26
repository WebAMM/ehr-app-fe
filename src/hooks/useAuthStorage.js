import { useCallback } from "react";
export function useAuthStorage() {
  const getPersistRoot = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem("persist:root") || "{}");
    } catch {
      return {};
    }
  }, []);

  const getAuthState = useCallback(() => {
    const persistRoot = getPersistRoot();
    if (persistRoot?.auth) {
      try {
        return JSON.parse(persistRoot.auth);
      } catch {
        return null;
      }
    }
    return null;
  }, [getPersistRoot]);

  const getToken = useCallback(() => {
    const authState = getAuthState();
    return authState?.token || null;
  }, [getAuthState]);

  const getUser = useCallback(() => {
    const authState = getAuthState();
    return authState?.user || null;
  }, [getAuthState]);
  const getRole = useCallback(() => {
    const user = getUser();
    return user?.role || null;
  }, [getUser]);

  const removeAuth = useCallback(() => {
    const persistRoot = getPersistRoot();
    if (persistRoot?.auth) {
      persistRoot.auth = "";
      localStorage.setItem("persist:root", JSON.stringify(persistRoot));
    }
  }, [getPersistRoot]);

  return {
    getToken,
    getUser,
    getRole,
    removeAuth,
    getAuthState,
    getPersistRoot,
  };
}
