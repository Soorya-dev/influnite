//store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
// Import other reducers as you create them
// import influencerReducer from './slices/influencerSlice';
// import businessReducer from './slices/businessSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // Add other reducers here
    // influencer: influencerReducer,
    // business: businessReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

