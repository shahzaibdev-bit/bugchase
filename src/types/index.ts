export type UserRole = 'researcher' | 'company' | 'triager' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Program {
  id: string;
  name: string;
  company: string;
  logo: string;
  description: string;
  type: 'public' | 'private';
  tags: string[];
  rewards: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  scope: string[];
  outOfScope: string[];
  submissionCount: number;
  status: 'active' | 'paused' | 'closed';
}

export interface Report {
  id: string;
  title: string;
  programId: string;
  programName: string;
  researcherId: string;
  researcherName: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  status: 'new' | 'triaging' | 'accepted' | 'rejected' | 'duplicate' | 'resolved' | 'paid';
  createdAt: string;
  updatedAt: string;
  asset: string;
  description: string;
  poc: string;
  cvssScore?: number;
  bountyAmount?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  type: 'bounty' | 'payout' | 'pending';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'processing';
  createdAt: string;
}

export interface Asset {
  id: string;
  domain: string;
  type: 'subdomain' | 'ip' | 'api' | 'mobile';
  status: 'potential' | 'in-scope' | 'out-of-scope';
  discoveredAt: string;
  ports?: number[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  reputation: number;
  bounties: number;
  reportsSubmitted: number;
  country: string;
}
