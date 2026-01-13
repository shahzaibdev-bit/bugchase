import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MoreVertical, Shield, Building2, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';
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

const mockPrograms = [
  { id: '1', name: 'FinTech Secure Core', company: 'FinTech Solutions Ltd', type: 'Private', bountyRange: '$1k - $10k', status: 'pending', reports: 0, submitted: '2025-05-15' },
  { id: '2', name: 'HealthCare Plus API', company: 'HealthCare Plus', type: 'Public', bountyRange: '$500 - $5k', status: 'active', reports: 12, submitted: '2025-04-20' },
  { id: '3', name: 'E-Shop Global', company: 'E-Shop Inc', type: 'Public', bountyRange: '$100 - $2k', status: 'active', reports: 45, submitted: '2025-03-10' },
  { id: '4', name: 'Legacy Systems V2', company: 'OldTech Corp', type: 'Private', bountyRange: '$2k - $15k', status: 'paused', reports: 5, submitted: '2025-02-01' },
  { id: '5', name: 'CryptoExchange V1', company: 'CryptoX', type: 'Private', bountyRange: '$5k - $50k', status: 'rejected', reports: 0, submitted: '2025-05-10' },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-500 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  paused: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
  rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function AdminPrograms() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    const matchesType = typeFilter === 'all' || program.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono uppercase">Program Management</h1>
        <p className="text-muted-foreground mt-2">Oversee and manage security programs from companies</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-500 transition-colors">
            <span className="text-4xl font-bold text-white tracking-tight mb-2">{mockPrograms.length}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total Programs</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>

        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-500 transition-colors">
            <span className="text-4xl font-bold text-white tracking-tight mb-2">
              {mockPrograms.filter(p => p.status === 'active').length}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Active</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>

        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-500 transition-colors">
             <span className="text-4xl font-bold text-white tracking-tight mb-2">
              {mockPrograms.filter(p => p.status === 'pending').length}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Pending Review</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>

        <InvertedTiltCard>
          <InverseSpotlightCard className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center backdrop-blur-sm hover:border-zinc-500 transition-colors">
             <span className="text-4xl font-bold text-white tracking-tight mb-2">
              {mockPrograms.filter(p => p.type === 'Private').length}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Private</span>
          </InverseSpotlightCard>
        </InvertedTiltCard>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search programs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 font-mono"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-background/50 font-mono">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ALL_STATUS</SelectItem>
            <SelectItem value="active">ACTIVE</SelectItem>
            <SelectItem value="pending">PENDING</SelectItem>
            <SelectItem value="paused">PAUSED</SelectItem>
             <SelectItem value="rejected">REJECTED</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-background/50 font-mono">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ALL_TYPES</SelectItem>
            <SelectItem value="public">PUBLIC</SelectItem>
            <SelectItem value="private">PRIVATE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Programs Table */}
      <GlassCard className="p-0 overflow-hidden border-border bg-card/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 font-mono text-xs uppercase text-muted-foreground">
              <tr className="border-b border-border/30">
                <th className="px-6 py-3 font-medium">Program</th>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Bounty Range</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Submitted</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-border flex items-center justify-center">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground font-mono">{program.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="font-mono text-xs">{program.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    {program.type.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {program.bountyRange}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`font-mono text-[10px] uppercase ${statusColors[program.status]}`}>
                      {program.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {program.submitted}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-foreground/5">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background border-border">
                        <DropdownMenuItem 
                            className="focus:bg-muted font-mono text-xs"
                            onClick={() => navigate(`/admin/programs/${program.id}`)}
                        >
                          <Eye className="h-3 w-3 mr-2" />
                          VIEW_DETAILS
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border" />
                        {program.status === 'pending' && (
                            <>
                                <DropdownMenuItem className="text-green-500 focus:bg-green-500/10 focus:text-green-500 font-mono text-xs">
                                <CheckCircle className="h-3 w-3 mr-2" />
                                APPROVE
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500 font-mono text-xs">
                                <XCircle className="h-3 w-3 mr-2" />
                                REJECT
                                </DropdownMenuItem>
                            </>
                        )}
                        {program.status === 'active' && (
                           <DropdownMenuItem className="text-yellow-500 focus:bg-yellow-500/10 focus:text-yellow-500 font-mono text-xs">
                              <AlertTriangle className="h-3 w-3 mr-2" />
                              PAUSE_PROGRAM
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
      </GlassCard>
    </div>
  );
}
