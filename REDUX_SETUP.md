# Redux Toolkit Setup Guide

This project is configured with Redux Toolkit and RTK Query for state management and API calls, with cookie-based authentication.

## 🚀 Features

- ✅ Redux Toolkit for state management
- ✅ RTK Query for API calls with caching
- ✅ Cookie-based session management  
- ✅ Separate API services for Auth, User, Doctor, and Clinic
- ✅ Automatic token refresh and logout on 401 errors
- ✅ Custom hooks for easy component integration
- ✅ Type-safe selectors and actions

## 📁 Project Structure

```
src/
├── redux/
│   ├── api/
│   │   └── baseApi.js          # Base RTK Query API configuration
│   ├── slices/
│   │   └── authSlice.js        # Authentication state management
│   ├── store.js                # Redux store configuration
│   └── index.js                # Redux exports
├── services/
│   ├── authApi.js              # Auth-related API endpoints
│   ├── userApi.js              # User/Patient API endpoints  
│   ├── doctorApi.js            # Doctor API endpoints
│   ├── clinicApi.js            # Clinic API endpoints
│   └── index.js                # Services exports
├── hooks/
│   └── useAuth.js              # Authentication hooks
├── utils/
│   └── cookieUtils.js          # Cookie management utilities
└── components/
    └── examples/
        └── ReduxExamples.jsx   # Example usage components
```

## 🛠️ Setup Instructions

### 1. Environment Configuration

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Update the API base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
NODE_ENV=development
```

### 2. Dependencies

All required dependencies are already installed:

- `@reduxjs/toolkit` - Redux Toolkit core
- `react-redux` - React bindings for Redux
- `js-cookie` - Cookie management library

## 🔧 Usage Examples

### Authentication

```jsx
import { useAuth } from '../hooks/useAuth';

const LoginComponent = () => {
  const { login, logout, isAuthenticated, loading, error, user } = useAuth();

  const handleLogin = async () => {
    const result = await login({ email, password });
    if (result.success) {
      // Login successful
      console.log('Logged in user:', result.data);
    } else {
      // Handle error
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      )}
    </div>
  );
};
```

### Role-based Access

```jsx
import { useUserRole } from '../hooks/useAuth';

const DashboardComponent = () => {
  const { isDoctor, isPatient, isClinicAdmin, role } = useUserRole();

  return (
    <div>
      <h1>Dashboard</h1>
      {isDoctor && <DoctorDashboard />}
      {isPatient && <PatientDashboard />}
      {isClinicAdmin && <ClinicDashboard />}
    </div>
  );
};
```

### API Queries

```jsx
import { 
  useGetUserProfileQuery,
  useUpdateUserProfileMutation 
} from '../services';

const ProfileComponent = ({ userId }) => {
  const { data: profile, isLoading, error } = useGetUserProfileQuery(userId);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  const handleUpdate = async (newData) => {
    try {
      await updateProfile({ userId, userData: newData }).unwrap();
      console.log('Profile updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <button onClick={() => handleUpdate({ name: 'New Name' })}>
        {isUpdating ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
};
```

### Manual Redux Usage

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../redux';

const Component = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>User: {user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
```

## 📡 API Services

### Auth API (`authApi.js`)
- `useLoginMutation` - User login
- `useRegisterMutation` - User registration
- `useForgotPasswordMutation` - Password reset request
- `useResetPasswordMutation` - Password reset
- `useVerifyOtpMutation` - OTP verification
- `useLogoutMutation` - User logout

### User API (`userApi.js`)
- `useGetUserProfileQuery` - Get user profile
- `useUpdateUserProfileMutation` - Update user profile
- `useGetUserAppointmentsQuery` - Get user appointments
- `useBookAppointmentMutation` - Book new appointment
- `useSearchDoctorsQuery` - Search for doctors

### Doctor API (`doctorApi.js`)
- `useGetDoctorProfileQuery` - Get doctor profile
- `useGetDoctorDashboardQuery` - Get dashboard stats
- `useGetDoctorAppointmentsQuery` - Get doctor appointments
- `useUpdateAppointmentStatusMutation` - Update appointment
- `useGetDoctorPatientsQuery` - Get doctor's patients

### Clinic API (`clinicApi.js`)
- `useGetClinicProfileQuery` - Get clinic profile
- `useGetClinicDashboardQuery` - Get clinic dashboard
- `useGetClinicStaffQuery` - Get clinic staff
- `useAddStaffMemberMutation` - Add staff member
- `useGetClinicAppointmentsQuery` - Get clinic appointments

## 🍪 Cookie Management

### Automatic Cookie Handling

Authentication data is automatically saved to secure cookies:

```javascript
// Cookies are automatically managed by the auth slice
// Token expires in 7 days
// Secure flag enabled in production
// SameSite: strict for CSRF protection
```

### Manual Cookie Operations

```javascript
import { authCookies, cookieUtils } from '../utils/cookieUtils';

// Check authentication status
const isLoggedIn = authCookies.isAuthenticated();

// Get current user data
const userData = authCookies.getUser();

// Clear all auth data
authCookies.clearAuth();

// General cookie operations
cookieUtils.set('key', 'value');
const value = cookieUtils.get('key');
cookieUtils.remove('key');
```

## 🔄 Automatic Features

### Token Management
- Tokens are automatically included in API requests
- 401 responses trigger automatic logout
- Secure cookie storage with configurable expiration

### Cache Management
- RTK Query provides automatic caching
- Data is cached based on endpoints and parameters
- Cache invalidation on mutations

### Error Handling
- Network errors are handled gracefully
- Authentication errors trigger automatic cleanup
- Error states are available in components

## 🚨 Important Notes

1. **Environment Variables**: Make sure to set `VITE_API_BASE_URL` in your `.env` file
2. **Cookie Security**: Cookies use secure flags in production
3. **CORS**: Ensure your backend accepts cookies with credentials
4. **Token Expiry**: Implement token refresh logic in your backend
5. **Error Boundaries**: Consider adding React error boundaries for better UX

## 🏗️ Backend Requirements

Your backend should:

1. Accept JWT tokens in the `Authorization: Bearer <token>` header
2. Return user data in login/register responses:
   ```json
   {
     "token": "jwt_token_here",
     "user": { 
       "id": "123", 
       "name": "John Doe", 
       "role": "patient" 
     }
   }
   ```
3. Handle 401 responses for expired/invalid tokens
4. Support the API endpoints defined in the service files

## 🎯 Next Steps

1. Update API service endpoints to match your backend
2. Add more slices for other state management needs  
3. Customize cookie configuration in `cookieUtils.js`
4. Add loading spinners and better error handling
5. Implement role-based routing with React Router
6. Add optimistic updates for better UX

## 🤝 Contributing

When adding new API endpoints:

1. Add them to the appropriate service file (`authApi.js`, `userApi.js`, etc.)
2. Use proper RTK Query patterns with tags for cache invalidation
3. Export the hooks for component usage
4. Update this README if needed

Happy coding! 🎉