import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: LoginPayload) => Promise<string | null>;
  signup: (data: SignupPayload) => Promise<string | null>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const USER_KEY = 'APP_USER';
const ACCOUNT_KEY = 'APP_ACCOUNT';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(USER_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupPayload) => {
    const raw = await AsyncStorage.getItem(ACCOUNT_KEY);
  
    const accounts = raw ? JSON.parse(raw) : [];
  
    const exists = accounts.find(
      (item: any) =>
        item.email === data.email.toLowerCase(),
    );
  
    if (exists) {
      return 'Email already registered.';
    }
  
    const newAccount = {
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
    };
  
    accounts.push(newAccount);
  
    await AsyncStorage.setItem(
      ACCOUNT_KEY,
      JSON.stringify(accounts),
    );
  
    const sessionUser = {
      name: newAccount.name,
      email: newAccount.email,
    };
  
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(sessionUser),
    );
  
    setUser(sessionUser);
  
    return null;
  };

  const login = async (data: LoginPayload) => {
    const raw = await AsyncStorage.getItem(ACCOUNT_KEY);
  
    const accounts = raw ? JSON.parse(raw) : [];
  
    const found = accounts.find(
      (item: any) =>
        item.email === data.email.toLowerCase() &&
        item.password === data.password,
    );
  
    if (!found) {
      return 'Incorrect email or password.';
    }
  
    const sessionUser = {
      name: found.name,
      email: found.email,
    };
  
    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(sessionUser),
    );
  
    setUser(sessionUser);
  
    return null;
  };
  
  const logout = async () => {
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};