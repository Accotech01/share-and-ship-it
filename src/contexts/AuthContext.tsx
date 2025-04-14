
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'recipient' | 'both';
  joinedAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'donor' | 'recipient' | 'both') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock user data - this would connect to your backend in production
  const mockUser = {
    id: '123456',
    name: 'Gabriel Edet',
    email: 'edetgabriel49@gmail.com',
    role: 'both' as const,
    joinedAt: new Date(),
  };

  useEffect(() => {
    // Check for stored auth token in localStorage
    const storedUser = localStorage.getItem('shareCircleUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Mocking authentication for demo - this would be an API call in production
      if (email === 'edetgabriel49@gmail.com' && password === '1234gabriel') {
        setCurrentUser(mockUser);
        localStorage.setItem('shareCircleUser', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'donor' | 'recipient' | 'both') => {
    setLoading(true);
    
    try {
      // Mocking registration - would be an API call in production
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        joinedAt: new Date(),
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('shareCircleUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('shareCircleUser');
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
