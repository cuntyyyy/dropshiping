import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'wish-area-auth';

// Mock user data for demo purposes
const mockUsers: { email: string; password: string; user: User }[] = [
  {
    email: 'demo@wisharea.com',
    password: 'demo123',
    user: {
      id: 'user-001',
      email: 'demo@wisharea.com',
      name: 'Demo User',
      role: 'customer',
      createdAt: '2024-01-01',
    },
  },
  {
    email: 'admin@wisharea.com',
    password: 'admin123',
    user: {
      id: 'user-admin',
      email: 'admin@wisharea.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01',
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const parsedUser = JSON.parse(savedAuth);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading auth from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const foundUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        setUser(foundUser.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser.user));
        return { success: true };
      }

      return { success: false, error: 'Invalid email or password' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return { success: false, error: 'Email already in use' };
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };

      // Add to mock users (in real app, this would be an API call)
      mockUsers.push({ email, password, user: newUser });

      setUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
