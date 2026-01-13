import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: 'researcher' | 'company') => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const signup = useCallback(async (
    email: string, 
    password: string, 
    name: string, 
    role: 'researcher' | 'company'
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser: User = {
      id: String(Date.now()),
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    return { success: true };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
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
