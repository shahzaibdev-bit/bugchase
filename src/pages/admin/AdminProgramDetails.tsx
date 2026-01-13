import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, AlertTriangle, Building2, Calendar, DollarSign, ExternalLink, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { toast } from 'sonner';
import { ProgramRejectionModal } from '@/components/admin/ProgramRejectionModal';

export default function AdminProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Mock Data (In a real app, fetch by ID)
  const program = {
    id: id,
    name: 'FinTech Secure Core',
    company: 'FinTech Solutions Ltd',
    submittedOn: '2025-05-15',
    status: 'pending', // pending, active, rejected
    description: `FinTech Solutions is launching a new core banking module. We invite researchers to test the API endpoints and web dashboard for vulnerabilities. Focus on IDOR, SQLi, and Business Logic errors.`,
    scopes: [
      { asset: '*.fintech-core.com', type: 'Wildcard', tier: 'Tier 1 (Critical)' },
      { asset: 'api.fintech-core.com', type: 'API', tier: 'Tier 1 (Critical)' },
      { asset: 'staging.fintech-core.com', type: 'Web', tier: 'Tier 2 (High)' },
    ],
    outOfScope: [
        'DDoS attacks',
        'Social Engineering',
        'Physical Security',
        'Third-party payment gateways'
    ],
    rewards: [
      { severity: 'Critical', amount: '$5,000 - $10,000' },
      { severity: 'High', amount: '$2,000 - $5,000' },
      { severity: 'Medium', amount: '$500 - $2,000' },
      { severity: 'Low', amount: '$100 - $500' },
    ]
  };

  const handleApprove = () => {
    // API Call to approve
    toast.success("Program Approved Successfully", {
        description: `${program.name} is now LIVE on the platform.`
    });
    navigate('/admin/programs');
  };

  const handleReject = (reason: string, note: string) => {
    // API Call to reject
    console.log('Rejected:', reason, note);
    toast.error("Program Rejected", {
        description: "Feedback has been sent to the company."
    });
    setIsRejectModalOpen(false);
    navigate('/admin/programs');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Back Navigation */}
      <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" onClick={() => navigate('/admin/programs')}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Programs
      </Button>

      {/* Header Section */}
      <GlassCard className="p-8 border-border bg-card/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="font-mono text-sm text-muted-foreground uppercase">{program.company}</span>
                    <span className="text-zinc-600 dark:text-zinc-400">•</span>
                    <span className="font-mono text-sm text-muted-foreground">{program.submittedOn}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground font-mono tracking-tight">{program.name}</h1>
            </div>
            <Badge variant="outline" className="text-foreground border-foreground/30 text-sm px-3 py-1">
                PENDING_APPROVAL
            </Badge>
        </div>
        {/* Decorative bg element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Description */}
            <GlassCard className="p-6 border-border bg-card/50">
                <h3 className="text-lg font-bold font-mono text-foreground mb-4">PROGRAM_IDENTITY</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {program.description}
                </p>
            </GlassCard>

            {/* Scope Table */}
            <GlassCard className="p-0 overflow-hidden border-border bg-card/50">
                <div className="p-6 border-b border-border/50">
                     <h3 className="text-lg font-bold font-mono text-foreground">SCOPE_DEFINITIONS</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 font-mono text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Asset</th>
                                <th className="px-6 py-3 font-medium">Type</th>
                                <th className="px-6 py-3 font-medium">Tier</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {program.scopes.map((scope, idx) => (
                                <tr key={idx} className="hover:bg-muted/30">
                                    <td className="px-6 py-3 font-mono text-foreground font-bold">{scope.asset}</td>
                                    <td className="px-6 py-3 font-mono text-muted-foreground">{scope.type}</td>
                                    <td className="px-6 py-3 font-mono text-muted-foreground">{scope.tier}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="p-6 border-t border-border/50 bg-muted/20">
                    <h4 className="text-xs font-bold font-mono text-muted-foreground uppercase mb-3">OUT_OF_SCOPE</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground font-mono">
                        {program.outOfScope.map((item, idx) => (
                            <li key={idx} className="marker:text-foreground">{item}</li>
                        ))}
                    </ul>
                </div>
            </GlassCard>
            
            {/* Rewards Table */}
             <GlassCard className="p-0 overflow-hidden border-border bg-card/50">
                <div className="p-6 border-b border-border/50">
                     <h3 className="text-lg font-bold font-mono text-foreground">REWARD_STRUCTURE</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                    {/* High Rewards */}
                     <div className="p-6 space-y-4">
                        {program.rewards.slice(0, 2).map((reward, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-border/50 bg-muted/30">
                                <span className="font-mono font-bold text-foreground underline underline-offset-4 decoration-1 decoration-foreground/30">
                                    {reward.severity.toUpperCase()}
                                </span>
                                <span className="font-mono text-foreground">{reward.amount}</span>
                            </div>
                        ))}
                     </div>
                     {/* Low Rewards */}
                      <div className="p-6 space-y-4">
                        {program.rewards.slice(2).map((reward, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-border/50 bg-muted/30">
                                <span className="font-mono font-bold text-muted-foreground">
                                    {reward.severity.toUpperCase()}
                                </span>
                                <span className="font-mono text-muted-foreground">{reward.amount}</span>
                            </div>
                        ))}
                     </div>
                </div>
             </GlassCard>

        </div>

        {/* Right Column: Actions (Sticky) */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                <GlassCard className="p-6 border-border bg-card/50 space-y-6">
                    <div>
                        <h3 className="text-lg font-bold font-mono text-foreground mb-1">VALIDATION_ACTIONS</h3>
                        <p className="text-xs text-muted-foreground">Review the program details carefully before approving content availability to researchers.</p>
                    </div>
                    
                    <div className="space-y-3">
                        <Button 
                            className="w-full bg-foreground text-background hover:bg-foreground/90 font-mono font-bold tracking-tight"
                            onClick={handleApprove}
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            APPROVE_PROGRAM
                        </Button>
                        <Button 
                            variant="outline"
                            className="w-full border-foreground/20 text-foreground hover:bg-foreground/5 font-mono font-bold tracking-tight"
                            onClick={() => setIsRejectModalOpen(true)}
                        >
                            <XCircle className="h-4 w-4 mr-2" />
                            REJECT_PROGRAM
                        </Button>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Shield className="h-3 w-3" />
                            <span>Authorized by Admin</span>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
      </div>

      <ProgramRejectionModal 
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
      />
    </div>
  );
}
