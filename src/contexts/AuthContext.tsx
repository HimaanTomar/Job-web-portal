import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Smith',
    role: 'jobseeker',
    location: 'New York, NY',
    bio: 'Experienced software developer with 5+ years in full-stack development.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python'],
    experience: '5 years',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    email: 'sarah@techcorp.com',
    password: 'password123',
    name: 'Sarah Johnson',
    role: 'employer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    bio: 'HR Manager at TechCorp, passionate about finding great talent.',
    createdAt: new Date('2023-02-10'),
  },
  {
    id: '3',
    email: 'admin@jobportal.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    location: 'Global',
    createdAt: new Date('2023-01-01'),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('jobPortalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: User['role']): Promise<boolean> => {
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('jobPortalUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    if (mockUsers.some(u => u.email === userData.email)) {
      return false; // User already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: userData.role!,
      company: userData.company,
      location: userData.location,
      bio: userData.bio,
      skills: userData.skills,
      experience: userData.experience,
      createdAt: new Date(),
    };

    mockUsers.push({ ...newUser, password: userData.password });
    setUser(newUser);
    localStorage.setItem('jobPortalUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jobPortalUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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