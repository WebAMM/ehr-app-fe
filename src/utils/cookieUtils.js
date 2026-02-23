import Cookies from 'js-cookie';
const COOKIE_CONFIG = {
  expires: 7, 
  secure: import.meta.env.NODE_ENV === 'production',
  sameSite: 'strict',
};
export const authCookies = {
  saveAuth: (token, userData) => {
    try {
      Cookies.set('auth_token', token, COOKIE_CONFIG);
      Cookies.set('user_data', JSON.stringify(userData), COOKIE_CONFIG);
      return true;
    } catch (error) {
      console.error('Error saving auth to cookies:', error);
      return false;
    }
  },
  getAuth: () => {
    try {
      const token = Cookies.get('auth_token');
      const userDataStr = Cookies.get('user_data');
      
      if (token && userDataStr) {
        const userData = JSON.parse(userDataStr);
        return { token, user: userData };
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing auth data from cookies:', error);
      authCookies.clearAuth();
      return null;
    }
  },
  clearAuth: () => {
    try {
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      return true;
    } catch (error) {
      console.error('Error clearing auth cookies:', error);
      return false;
    }
  },
  isAuthenticated: () => {
    const token = Cookies.get('auth_token');
    return !!token;
  },
  getToken: () => {
    return Cookies.get('auth_token');
  },
  getUser: () => {
    try {
      const userDataStr = Cookies.get('user_data');
      return userDataStr ? JSON.parse(userDataStr) : null;
    } catch (error) {
      console.error('Error parsing user data from cookies:', error);
      return null;
    }
  },
  updateUser: (updatedUserData) => {
    try {
      const token = Cookies.get('auth_token');
      if (token) {
        Cookies.set('user_data', JSON.stringify(updatedUserData), COOKIE_CONFIG);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user data in cookies:', error);
      return false;
    }
  },
};

export const cookieUtils = {
  
  set: (name, value, options = {}) => {
    const config = { ...COOKIE_CONFIG, ...options };
    return Cookies.set(name, value, config);
  },
  get: (name) => {
    return Cookies.get(name);
  },
  remove: (name) => {
    return Cookies.remove(name);
  },
  exists: (name) => {
    return Cookies.get(name) !== undefined;
  },
  getAll: () => {
    return Cookies.get();
  },
  clearAll: () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(name => {
      Cookies.remove(name);
    });
  },
};


export const sessionUtils = {
  startSession: (token, userData) => {
    return authCookies.saveAuth(token, userData);
  },
  endSession: () => {
    return authCookies.clearAuth();
  },
  isValidSession: () => {
    return authCookies.isAuthenticated();
  },
  refreshSession: (token, userData) => {
    authCookies.clearAuth();
    return authCookies.saveAuth(token, userData);
  },
  getSessionData: () => {
    return authCookies.getAuth();
  },
};

export default {
  authCookies,
  cookieUtils,
  sessionUtils,
};