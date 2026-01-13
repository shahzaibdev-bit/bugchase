import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, MessageSquare, AlertTriangle, ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const assignedReports = [
  {
    id: 'RPT-007',
    title: 'Authentication Bypass via Session Fixation',
    severity: 'critical',
    status: 'in_progress',
    program: 'Web Security Program',
    researcher: 'elite_hacker',
    assignedAt: '2024-03-15 10:30',
    deadline: '2024-03-17',
    messages: 3,
  },
  {
    id: 'RPT-012',
    title: 'Stored XSS in User Comments',
    severity: 'high',
    status: 'pending_info',
    program: 'Mobile App Security',
    researcher: 'bug_finder_pro',
    assignedAt: '2024-03-14 14:20',
    deadline: '2024-03-16',
    messages: 5,
  },
  {
    id: 'RPT-018',
    title: 'Rate Limiting Missing on Login',
    severity: 'medium',
    status: 'in_progress',
    program: 'API Security Audit',
    researcher: 'security_researcher',
    assignedAt: '2024-03-14 09:15',
    deadline: '2024-03-18',
    messages: 1,
  },
  {
    id: 'RPT-021',
    title: 'Sensitive Data Exposure in Error Messages',
    severity: 'medium',
    status: 'validated',
    program: 'Web Security Program',
    researcher: 'cyber_warrior',
    assignedAt: '2024-03-13 16:45',
    deadline: '2024-03-15',
    messages: 4,
  },
];

const severityColors: Record<string, string> = {
  critical: 'severity-critical',
  high: 'severity-high',
  medium: 'severity-medium',
  low: 'severity-low',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  in_progress: { label: 'In Progress', color: 'text-primary' },
  pending_info: { label: 'Pending Info', color: 'text-yellow-500' },
  validated: { label: 'Validated', color: 'text-green-500' },
};

export default function TriagerAssigned() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = assignedReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-mono">Assigned Reports</h1>
        <p className="text-muted-foreground text-sm">Reports currently assigned to you for triage</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold font-mono text-foreground">{assignedReports.length}</p>
          <p className="text-sm text-muted-foreground">Total Assigned</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold font-mono text-primary">
            {assignedReports.filter(r => r.status === 'in_progress').length}
          </p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold font-mono text-yellow-500">
            {assignedReports.filter(r => r.status === 'pending_info').length}
          </p>
          <p className="text-sm text-muted-foreground">Pending Info</p>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <p className="text-2xl font-bold font-mono text-green-500">
            {assignedReports.filter(r => r.status === 'validated').length}
          </p>
          <p className="text-sm text-muted-foreground">Validated</p>
        </GlassCard>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assigned reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending_info">Pending Info</SelectItem>
              <SelectItem value="validated">Validated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GlassCard>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <GlassCard key={report.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-primary text-sm">{report.id}</span>
                  <Badge className={severityColors[report.severity]}>{report.severity}</Badge>
                  <span className={`text-sm font-medium ${statusLabels[report.status].color}`}>
                    {statusLabels[report.status].label}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{report.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span>{report.program}</span>
                  <span>•</span>
                  <span className="font-mono">@{report.researcher}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Due: {report.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{report.messages}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate(`/triager/reports/${report.id}#reply`)}>
                    <MessageSquare className="h-4 w-4" />
                    Reply
                  </Button>
                  <Button size="sm" className="gap-1" onClick={() => navigate(`/triager/reports/${report.id}`)}>
                    <ExternalLink className="h-4 w-4" />
                    Review
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
