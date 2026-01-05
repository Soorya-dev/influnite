# Redux Setup Guide for Frontend

## ✅ Redux Toolkit is Now Installed and Configured!

I've set up Redux Toolkit with TypeScript support for your React application. Here's what has been created:

## 📁 Structure Created

```
client/src/
├── store/
│   ├── store.ts              # Main Redux store configuration
│   ├── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
│   ├── slices/
│   │   ├── authSlice.ts      # Authentication state management
│   │   └── userSlice.ts      # User profile state management
│   └── README.md             # Detailed documentation
├── components/
│   └── ExampleReduxUsage.tsx # Example component showing Redux usage
└── main.tsx                  # Updated with Redux Provider
```

## 🚀 How to Use Redux in Your Components

### Basic Usage Pattern

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/slices/authSlice';

function MyComponent() {
  // Get dispatch function
  const dispatch = useAppDispatch();
  
  // Access state from store
  const { isAuthenticated, user, isLoading } = useAppSelector(
    (state) => state.auth
  );

  // Dispatch actions
  const handleLogin = async () => {
    await dispatch(loginUser({ 
      email: 'user@example.com', 
      password: 'password123' 
    }));
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## 📦 Available Slices

### 1. Auth Slice (`authSlice.ts`)

**State:**
- `user`: Current user object
- `token`: Authentication token
- `isAuthenticated`: Boolean flag
- `isLoading`: Loading state
- `error`: Error message

**Actions:**
- `loginUser(credentials)` - Async thunk for login
- `registerUser(userData)` - Async thunk for registration
- `logoutUser()` - Logout user
- `clearError()` - Clear error message
- `setCredentials({ user, token })` - Set user credentials

**Usage:**
```typescript
import { loginUser, logoutUser } from '../store/slices/authSlice';

// Login
await dispatch(loginUser({ email, password }));

// Logout
dispatch(logoutUser());
```

### 2. User Slice (`userSlice.ts`)

**State:**
- `profile`: User profile object
- `isLoading`: Loading state
- `error`: Error message

**Actions:**
- `fetchUserProfile()` - Fetch user profile
- `updateUserProfile(data)` - Update user profile
- `setProfile(profile)` - Set profile directly
- `clearUserError()` - Clear error

**Usage:**
```typescript
import { fetchUserProfile, updateUserProfile } from '../store/slices/userSlice';

// Fetch profile
await dispatch(fetchUserProfile());

// Update profile
await dispatch(updateUserProfile({ name: 'New Name', bio: 'New bio' }));
```

## 🎯 Creating New Slices

When you need to add new features (e.g., influencers, campaigns, etc.):

### Step 1: Create the Slice File

```typescript
// store/slices/influencerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface InfluencerState {
  list: Influencer[];
  selected: Influencer | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InfluencerState = {
  list: [],
  selected: null,
  isLoading: false,
  error: null,
};

// Async thunk for API calls
export const fetchInfluencers = createAsyncThunk(
  'influencers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/influencers');
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const influencerSlice = createSlice({
  name: 'influencers',
  initialState,
  reducers: {
    selectInfluencer: (state, action) => {
      state.selected = action.payload;
    },
    clearSelection: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfluencers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInfluencers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchInfluencers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectInfluencer, clearSelection } = influencerSlice.actions;
export default influencerSlice.reducer;
```

### Step 2: Add to Store

```typescript
// store/store.ts
import influencerReducer from './slices/influencerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    influencer: influencerReducer, // Add here
  },
});
```

### Step 3: Use in Components

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchInfluencers } from '../store/slices/influencerSlice';

function InfluencerList() {
  const dispatch = useAppDispatch();
  const { list, isLoading } = useAppSelector((state) => state.influencer);

  useEffect(() => {
    dispatch(fetchInfluencers());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : (
        list.map(influencer => (
          <div key={influencer._id}>{influencer.name}</div>
        ))
      )}
    </div>
  );
}
```

## 🔧 API Configuration

**Important:** Update the API base URL in your slices. Currently, they use relative paths (`/api/...`). 

You can:
1. Create an API utility file:
```typescript
// utils/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  get: (endpoint: string) => fetch(`${API_BASE_URL}${endpoint}`),
  post: (endpoint: string, data: any) => 
    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  // ... other methods
};
```

2. Or update slices to use environment variables:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await fetch(`${API_URL}/api/auth/login`, { ... });
```

## 📝 Best Practices

1. **Always use typed hooks**: Use `useAppDispatch` and `useAppSelector` instead of plain Redux hooks
2. **Handle loading states**: Check `isLoading` before rendering data
3. **Handle errors**: Display error messages from the store
4. **Use async thunks**: For all API calls, use `createAsyncThunk`
5. **Type everything**: Leverage TypeScript for type safety
6. **Keep slices focused**: One slice per feature/domain

## 🎨 Example: Complete Component

See `components/ExampleReduxUsage.tsx` for a complete example of:
- Login/logout flow
- Error handling
- Loading states
- Fetching user profile

## 🚦 Next Steps

1. Update API endpoints in slices to match your backend routes
2. Create slices for your specific features:
   - `influencerSlice.ts` - Influencer management
   - `businessSlice.ts` - Business management
   - `campaignSlice.ts` - Campaign management
   - `adminSlice.ts` - Admin features
3. Set up API interceptors for authentication tokens
4. Add error handling middleware if needed

Your Redux setup is ready to use! 🎉

