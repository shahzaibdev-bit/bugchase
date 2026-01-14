import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Ban, CheckCircle, Mail, Shield, User, AlertTriangle } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InvertedTiltCard } from '@/components/InvertedTiltCard';
import { InverseSpotlightCard } from '@/components/InverseSpotlightCard';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const mockUsers = [
  { id: '1', name: 'Alex Hunter', email: 'alex@email.com', role: 'researcher', status: 'active', reports: 45, joined: '2024-01-15' },
  { id: '2', name: 'TechCorp Inc.', email: 'security@techcorp.com', role: 'company', status: 'active', programs: 3, joined: '2024-01-20' },
  { id: '3', name: 'Sarah Chen', email: 'sarah@email.com', role: 'triager', status: 'active', triaged: 128, joined: '2024-02-01' },
  { id: '4', name: 'John Doe', email: 'john@email.com', role: 'researcher', status: 'suspended', reports: 12, joined: '2024-02-10' },
  { id: '5', name: 'SecureTech Ltd.', email: 'admin@securetech.com', role: 'company', status: 'active', programs: 5, joined: '2024-02-15' },
  { id: '6', name: 'Mike Wilson', email: 'mike@email.com', role: 'researcher', status: 'banned', reports: 0, joined: '2024-03-01' },
];

const roleColors: Record<string, string> = {
  researcher: 'bg-zinc-100 text-zinc-900 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800',
  company: 'bg-zinc-100 text-zinc-900 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800',
  triager: 'bg-zinc-100 text-zinc-900 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800',
  admin: 'bg-zinc-900 text-white border-zinc-800 dark:bg-white dark:text-black dark:border-zinc-200',
};

const statusColors: Record<string, string> = {
  active: 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800',
  suspended: 'bg-zinc-100 text-zinc-500 line-through decoration-zinc-500/50',
  banned: 'bg-background text-muted-foreground border border-zinc-200 dark:border-zinc-800 opacity-70',
};

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono uppercase">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage platform users and their access</p>
      </div>

      {/* Stats with InvertedTiltCard and InverseSpotlightCard */}
      {/* Stats with Cyberpunk styling */}
      {/* Stats with InvertedTiltCard and InverseSpotlightCard */}
      {/* Stats with Cyberpunk styling */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">{mockUsers.length}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total Users</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>

        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
              {mockUsers.filter(u => u.role === 'researcher').length}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Researchers</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>

        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
              {mockUsers.filter(u => u.role === 'company').length}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Companies</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>

        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-500 transition-colors">
            <span className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">
              {mockUsers.filter(u => u.role === 'triager').length}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Triagers</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 font-mono"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-background/50 font-mono">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ALL_ROLES</SelectItem>
            <SelectItem value="researcher">RESEARCHER</SelectItem>
            <SelectItem value="company">COMPANY</SelectItem>
            <SelectItem value="triager">TRIAGER</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-background/50 font-mono">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ALL_STATUS</SelectItem>
            <SelectItem value="active">ACTIVE</SelectItem>
            <SelectItem value="suspended">SUSPENDED</SelectItem>
            <SelectItem value="banned">BANNED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <GlassCard className="p-0 overflow-hidden border-border bg-card/50">
        <div className="w-full">
            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4 bg-zinc-50/50 dark:bg-zinc-900/20">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-background border border-border p-4 rounded-xl shadow-sm flex flex-col gap-4">
                         {/* Header: User & Action */}
                         <div className="flex justify-between items-start">
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
                               {user.role === 'company' ? (
                                 <Shield className="h-5 w-5 text-muted-foreground" />
                               ) : (
                                 <User className="h-5 w-5 text-muted-foreground" />
                               )}
                             </div>
                             <div>
                               <p className="font-bold text-foreground font-mono text-sm">{user.name}</p>
                               <p className="text-xs text-muted-foreground font-mono">{user.email}</p>
                             </div>
                           </div>
                           
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-foreground/5 -mr-2">
                                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-background border-border">
                                <DropdownMenuItem className="focus:bg-muted font-mono text-xs">
                                  <Mail className="h-3 w-3 mr-2" />
                                  SEND_EMAIL
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-muted font-mono text-xs">
                                  <User className="h-3 w-3 mr-2" />
                                  VIEW_PROFILE
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border" />
                                {user.status === 'active' && (
                                  <DropdownMenuItem className="text-muted-foreground focus:bg-muted focus:text-foreground font-mono text-xs">
                                    <AlertTriangle className="h-3 w-3 mr-2" />
                                    SUSPEND_USER
                                  </DropdownMenuItem>
                                )}
                                {user.status !== 'banned' && (
                                  <DropdownMenuItem className="text-foreground focus:bg-destructive/10 focus:text-destructive font-mono text-xs">
                                    <Ban className="h-3 w-3 mr-2" />
                                    BAN_USER
                                  </DropdownMenuItem>
                                )}
                                {(user.status === 'suspended' || user.status === 'banned') && (
                                  <DropdownMenuItem className="text-foreground focus:bg-muted font-mono text-xs">
                                    <CheckCircle className="h-3 w-3 mr-2" />
                                    RESTORE_USER
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                         </div>

                         {/* Details Grid */}
                         <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30">
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Role</span>
                              <div>
                                <Badge variant="outline" className={`font-mono text-xs uppercase ${roleColors[user.role]}`}>
                                  {user.role}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Status</span>
                              <div>
                                <Badge variant="secondary" className={`font-mono text-xs uppercase ${statusColors[user.status]}`}>
                                  {user.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Activity</span>
                              <p className="font-mono text-sm text-foreground">
                                {user.role === 'researcher' && `${user.reports} reports`}
                                {user.role === 'company' && `${user.programs} programs`}
                                {user.role === 'triager' && `${user.triaged} triaged`}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Joined</span>
                              <p className="font-mono text-sm text-foreground">{user.joined}</p>
                            </div>
                         </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 font-mono text-xs uppercase text-muted-foreground">
                  <tr className="border-b border-border/30">
                    <th className="px-6 py-3 font-medium">User</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Activity</th>
                    <th className="px-6 py-3 font-medium">Joined</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
                            {user.role === 'company' ? (
                              <Shield className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <User className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground font-mono">{user.name}</p>
                            <p className="text-sm text-muted-foreground font-mono text-xs">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={`font-mono text-xs uppercase ${roleColors[user.role]}`}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className={`font-mono text-xs uppercase ${statusColors[user.status]}`}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-muted-foreground">
                        {user.role === 'researcher' && `${user.reports} reports`}
                        {user.role === 'company' && `${user.programs} programs`}
                        {user.role === 'triager' && `${user.triaged} triaged`}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{user.joined}</td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-foreground/5">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background border-border">
                            <DropdownMenuItem className="focus:bg-muted font-mono text-xs">
                              <Mail className="h-3 w-3 mr-2" />
                              SEND_EMAIL
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-muted font-mono text-xs">
                              <User className="h-3 w-3 mr-2" />
                              VIEW_PROFILE
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-border" />
                            {user.status === 'active' && (
                              <DropdownMenuItem className="text-muted-foreground focus:bg-muted focus:text-foreground font-mono text-xs">
                                <AlertTriangle className="h-3 w-3 mr-2" />
                                SUSPEND_USER
                              </DropdownMenuItem>
                            )}
                            {user.status !== 'banned' && (
                              <DropdownMenuItem className="text-foreground focus:bg-destructive/10 focus:text-destructive font-mono text-xs">
                                <Ban className="h-3 w-3 mr-2" />
                                BAN_USER
                              </DropdownMenuItem>
                            )}
                            {(user.status === 'suspended' || user.status === 'banned') && (
                              <DropdownMenuItem className="text-foreground focus:bg-muted font-mono text-xs">
                                <CheckCircle className="h-3 w-3 mr-2" />
                                RESTORE_USER
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </GlassCard>
    </div>
  );
}
