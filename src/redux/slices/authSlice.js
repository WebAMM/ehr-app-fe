import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const saveAuthToCookies = (token, userData) => {
  Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict' });
  Cookies.set('user_data', JSON.stringify(userData), { expires: 7, secure: true, sameSite: 'strict' });
};
const clearAuthFromCookies = () => {
  Cookies.remove('auth_token');
  Cookies.remove('user_data');
};
const getAuthFromCookies = () => {
  const token = Cookies.get('auth_token');
  const userDataStr = Cookies.get('user_data');
  
  if (token && userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      return { token, user: userData };
    } catch (error) {
      console.error('Error parsing user data from cookies:', error);
      clearAuthFromCookies();
      return null;
    }
  }
  return null;
};
const authFromCookies = getAuthFromCookies();

const initialState = {
  token: authFromCookies?.token || null,
  user: authFromCookies?.user || null,
  isAuthenticated: !!authFromCookies?.token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      saveAuthToCookies(token, user);
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    
      clearAuthFromCookies();
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
   
      clearAuthFromCookies();
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    
      if (state.token) {
        saveAuthToCookies(state.token, state.user);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateUser,
} = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;