import React, { useState } from 'react';
import { Globe, ArrowRight, Copy, CheckCircle, AlertTriangle, RefreshCw, Smartphone, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Types
type VerificationStatus = 'idle' | 'pending' | 'verifying' | 'verified' | 'error';

interface VerifiedDomain {
  id: string;
  domain: string;
  method: 'DNS_TXT';
  dateVerified: string;
  status: 'verified';
}

export function DomainVerificationTab() {
  const [rootDomain, setRootDomain] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [verificationToken, setVerificationToken] = useState('');
  const [verifiedDomains, setVerifiedDomains] = useState<VerifiedDomain[]>([
    // Mock existing verified domain if needed, or keeping empty as per request
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerateToken = () => {
    // Basic validation
    if (!rootDomain) return;
    
    // Check for subdomain
    const domainParts = rootDomain.split('.');
    if (domainParts.length > 2) {
      // Very basic check, e.g. api.techsoft.pk vs techsoft.pk. 
      // User requested alert for subdomain.
      setErrorMsg(`Please verify the ROOT domain (e.g., ${domainParts.slice(-2).join('.')}) first.`);
      setVerificationStatus('error');
      return;
    }

    setErrorMsg('');
    setVerificationStatus('pending');
    // Generate mock token
    const uniqueToken = `bc-verification=${Math.random().toString(36).substring(2, 15)}`;
    setVerificationToken(uniqueToken);
  };

  const handleVerifyDns = async () => {
    setVerificationStatus('verifying');
    
    // Simulate API Call
    setTimeout(() => {
      // Mock Success Logic (80% chance success for demo)
      const success = Math.random() > 0.2; 
      
      if (success) {
        setVerificationStatus('verified');
        const newDomain: VerifiedDomain = {
          id: Math.random().toString(36).substr(2, 9),
          domain: rootDomain,
          method: 'DNS_TXT',
          dateVerified: new Date().toISOString().split('T')[0],
          status: 'verified'
        };
        setVerifiedDomains(prev => [...prev, newDomain]);
        toast.success("Domain Verified Successfully. Asset Discovery Enabled.");
        // Reset form after success
        setTimeout(() => {
            setVerificationStatus('idle');
            setRootDomain('');
            setVerificationToken('');
        }, 2000);
      } else {
        setVerificationStatus('error');
        setErrorMsg("TXT record not found. DNS propagation may take time. (Code: DNS_PROBE_FAILED)");
      }
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section A: Add Domain Workflow */}
      <GlassCard className="p-6 border-border bg-card/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-mono text-foreground tracking-tight">DOMAIN_OWNERSHIP_VERIFICATION</h3>
            <p className="text-xs text-muted-foreground font-mono">Verify root domain to enable asset discovery</p>
          </div>
        </div>

        <div className="space-y-6 max-w-2xl">
          {/* Input Area */}
          <div className="space-y-2">
            <Label className="font-mono text-xs uppercase text-muted-foreground">Root Domain</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="example.com" 
                  className="pl-10 bg-background/50 border-input font-mono text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                  value={rootDomain}
                  onChange={(e) => setRootDomain(e.target.value)}
                  disabled={verificationStatus === 'pending' || verificationStatus === 'verifying'}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') handleGenerateToken();
                  }}
                />
              </div>
              {verificationStatus === 'idle' || verificationStatus === 'error' ? (
                <Button 
                   onClick={handleGenerateToken}
                   className="font-mono font-bold tracking-tight"
                >
                  GENERATE_TOKEN
                </Button>
              ) : (
                <Button 
                   onClick={() => {
                       setVerificationStatus('idle');
                       setVerificationToken('');
                       setErrorMsg('');
                   }}
                   variant="outline"
                   className="font-mono"
                >
                   CANCEL
                </Button>
              )}
            </div>
            {verificationStatus === 'error' && (
                <div className="flex items-center gap-2 text-destructive text-xs font-mono mt-2 animate-pulse">
                    <AlertCircle className="h-3 w-3" />
                    {errorMsg}
                </div>
            )}
          </div>

          {/* Verification Instructions (Pending State) */}
          {(verificationStatus === 'pending' || verificationStatus === 'verifying') && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-4">
                <Alert className="bg-primary/5 border-primary/20">
                    <Terminal className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary font-mono text-sm font-bold">DNS CONFIGURATION REQUIRED</AlertTitle>
                    <AlertDescription className="text-muted-foreground text-xs font-mono mt-1">
                        Add the following TXT record to your DNS provider (GoDaddy, Cloudflare, AWS Route53) to prove ownership.
                    </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1 bg-muted/50 border border-border rounded-lg p-3">
                        <p className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Type</p>
                        <p className="font-mono text-sm text-foreground">TXT</p>
                    </div>
                    <div className="md:col-span-1 bg-muted/50 border border-border rounded-lg p-3">
                        <p className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Host</p>
                        <p className="font-mono text-sm text-foreground">@</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                        <Label className="text-[10px] text-muted-foreground uppercase font-mono">Value</Label>
                        <div className="flex gap-2">
                            <Input 
                                readOnly 
                                value={verificationToken} 
                                className="font-mono text-sm bg-muted/50 border-border text-primary font-bold"
                            />
                            <Button
                                size="icon"
                                variant="outline"
                                className="shrink-0 border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                                onClick={() => copyToClipboard(verificationToken)}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Button 
                    onClick={handleVerifyDns} 
                    disabled={verificationStatus === 'verifying'}
                    className="w-full font-mono font-bold tracking-tight shadow-lg"
                >
                    {verificationStatus === 'verifying' ? (
                        <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            VERIFYING_DNS_RECORDS...
                        </>
                    ) : (
                        <>
                            <ShieldCheck className="h-4 w-4 mr-2" />
                            VERIFY_DNS_RECORD
                        </>
                    )}
                </Button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Section B: Verified Domains List */}
      <GlassCard className="p-0 overflow-hidden border-border bg-card/50">
         <div className="p-6 border-b border-border/50">
             <h3 className="text-sm font-bold font-mono text-muted-foreground uppercase tracking-widest">VERIFIED_ASSETS</h3>
         </div>
         
         {verifiedDomains.length > 0 ? (
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                     <thead className="bg-muted/50 font-mono text-xs uppercase text-muted-foreground">
                         <tr>
                             <th className="px-6 py-3 font-medium">Domain</th>
                             <th className="px-6 py-3 font-medium">Method</th>
                             <th className="px-6 py-3 font-medium">Date Verified</th>
                             <th className="px-6 py-3 font-medium text-right">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-border/50">
                         {verifiedDomains.map((domain) => (
                             <tr key={domain.id} className="hover:bg-muted/50 transition-colors">
                                 <td className="px-6 py-4 font-mono font-medium text-foreground">{domain.domain}</td>
                                 <td className="px-6 py-4 font-mono text-muted-foreground">{domain.method}</td>
                                 <td className="px-6 py-4 font-mono text-muted-foreground">{domain.dateVerified}</td>
                                 <td className="px-6 py-4 text-right">
                                     <Badge variant="secondary" className="font-mono text-xs uppercase">
                                         VERIFIED
                                     </Badge>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         ) : (
             <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
                 <div className="p-3 bg-muted rounded-full">
                    <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                 </div>
                 <div className="max-w-xs">
                     <p className="text-foreground font-medium font-mono">No verified domains</p>
                     <p className="text-muted-foreground text-xs mt-1">Verify a root domain to enable Asset Discovery for your organization.</p>
                 </div>
             </div>
         )}
      </GlassCard>
    </div>
  );
}
