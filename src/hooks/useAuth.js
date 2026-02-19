import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  logout,
  clearError,
  updateUser,
} from '../redux';
import { useLoginMutation, useLogoutMutation } from '../services';
import { authCookies } from '../utils/cookieUtils';
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

 
  const login = async (credentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      // The auth slice will automatically handle the success case
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err };
    }
  };

 
  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
   
      dispatch(logout());
    }
  };

  // Clear any auth errors
  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Check if session is still valid on component mount
  useEffect(() => {
    if (isAuthenticated && !authCookies.isAuthenticated()) {
      // Token was cleared from cookies but Redux still thinks user is logged in
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return {
    // State
    auth,
    user,
    isAuthenticated,
    loading: loading || isLoggingIn || isLoggingOut,
    error,
    
    // Actions
    login,
    logout: handleLogout,
    clearError: clearAuthError,
    
    // Loading states
    isLoggingIn,
    isLoggingOut,
  };
};

// Hook for user role-based access
export const useUserRole = () => {
  const user = useSelector(selectUser);
  
  const isDoctor = user?.role === 'doctor';
  const isPatient = user?.role === 'patient' || user?.role === 'user';
  const isClinicAdmin = user?.role === 'clinic_admin';
  const isAdmin = user?.role === 'admin';
  
  const hasRole = (role) => user?.role === role;
  const hasAnyRole = (roles = []) => roles.includes(user?.role);
  
  return {
    isDoctor,
    isPatient,
    isClinicAdmin,
    isAdmin,
    role: user?.role,
    hasRole,
    hasAnyRole,
  };
};

// Hook for managing user profile
export const useUserProfile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const updateUserData = (newUserData) => {
    dispatch(updateUser(newUserData));
  };
  
  return {
    user,
    updateUserData,
  };
};