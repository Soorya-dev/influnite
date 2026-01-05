/**
 * Example component showing how to use Redux in your React components
 * This is just a reference - you can delete this file once you understand the pattern
 */

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, logoutUser, clearError } from '../store/slices/authSlice';
import { fetchUserProfile } from '../store/slices/userSlice';
import { useState } from 'react';

export default function ExampleReduxUsage() {
  const dispatch = useAppDispatch();
  
  // Access state from Redux store
  const { isAuthenticated, user, isLoading, error } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.user);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch async thunk
    await dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleFetchProfile = () => {
    dispatch(fetchUserProfile());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div>
      <h2>Redux Usage Example</h2>
      
      {error && (
        <div>
          <p>Error: {error}</p>
          <button onClick={handleClearError}>Clear Error</button>
        </div>
      )}

      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleFetchProfile}>Fetch Profile</button>
          
          {profile && (
            <div>
              <h3>Profile:</h3>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

