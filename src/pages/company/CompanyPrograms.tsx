import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Globe, Lock, Users, DollarSign, Calendar, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreateProgramModal } from '@/components/company/CreateProgramModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockPrograms = [
  {
    id: '1',
    name: 'Web Application Security',
    status: 'active',
    type: 'public',
    researchers: 156,
    reports: 45,
    bountyRange: '$100 - $10,000',
    totalPaid: 45000,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Mobile App Testing',
    status: 'active',
    type: 'private',
    researchers: 24,
    reports: 12,
    bountyRange: '$200 - $15,000',
    totalPaid: 28000,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'API Security Audit',
    status: 'paused',
    type: 'public',
    researchers: 89,
    reports: 28,
    bountyRange: '$150 - $8,000',
    totalPaid: 32000,
    createdAt: '2024-03-10',
  },
];

export default function CompanyPrograms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredPrograms = mockPrograms.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono">Programs</h1>
          <p className="text-muted-foreground text-sm">Manage your bug bounty programs</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Program
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Programs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map((program) => (
          <GlassCard 
            key={program.id} 
            className="p-6 space-y-4 cursor-pointer hover:border-foreground/50 transition-all group relative overflow-hidden"
            onClick={() => navigate(`/company/programs/${program.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {program.type === 'public' ? (
                    <Globe className="h-4 w-4 text-primary" />
                  ) : (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {program.type}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{program.name}</h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-panel">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/company/programs/${program.id}`); }}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/company/programs/${program.id}`); }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
              {program.status}
            </Badge>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/30">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span className="text-xs">Researchers</span>
                </div>
                <p className="font-mono font-semibold">{program.researchers}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  <span className="text-xs">Total Paid</span>
                </div>
                <p className="font-mono font-semibold">${program.totalPaid.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bounty Range</span>
              <span className="font-mono text-primary">{program.bountyRange}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Created {program.createdAt}
            </div>
          </GlassCard>
        ))}
      </div>

      <CreateProgramModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}
