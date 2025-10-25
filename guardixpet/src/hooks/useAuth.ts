import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { api } from '../lib/api';
import { socketClient } from '../lib/socket';
import { LoginCredentials, SignupCredentials, User } from '../types/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, clearAuth } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
      setAuth(response.user, response.token);
      socketClient.connect(response.token);
      addToast({ message: 'Logged in successfully', type: 'success' });
      navigate('/home');
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Login failed', type: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setIsLoading(true);
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/signup', credentials);
      setAuth(response.user, response.token);
      socketClient.connect(response.token);
      addToast({ message: 'Account created successfully', type: 'success' });
      navigate('/welcome-tour');
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Signup failed', type: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    socketClient.disconnect();
    addToast({ message: 'Logged out successfully', type: 'success' });
    navigate('/auth');
  };

  const verifyTwoFactor = async (code: string, token: string) => {
    setIsLoading(true);
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/verify-2fa', { code, token });
      setAuth(response.user, response.token);
      socketClient.connect(response.token);
      addToast({ message: 'Logged in successfully', type: 'success' });
      navigate('/home');
    } catch (error: any) {
      addToast({ message: error.response?.data?.message || 'Verification failed', type: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    signup,
    logout,
    verifyTwoFactor,
    isLoading,
  };
}
