import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/baseApi';
import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [baseApi.util.getRunningQueriesThunk.type],
        ignoredPaths: [baseApi.reducerPath + '.queries'],
      },
    }).concat(baseApi.middleware),

  devTools: import.meta.env.NODE_ENV !== 'production',
});
setupListeners(store.dispatch);