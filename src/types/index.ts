export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer' | 'admin';
  avatar?: string;
  company?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  company: string;
  category: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  requirements: string[];
  benefits: string[];
  postedBy: string;
  postedAt: Date;
  deadline: Date;
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: Date;
  userName: string;
  userEmail: string;
  jobTitle: string;
  company: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: User['role']) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}