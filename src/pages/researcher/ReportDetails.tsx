import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, Users, Link as LinkIcon, ExternalLink, ChevronRight, MessageSquare, History, Shield, AlertTriangle, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CyberpunkEditor from '@/components/ui/CyberpunkEditor';

// --- Mock Data ---
const report = {
  id: 'MINAPR-46',
  title: 'Reverse Shell via Npm dependency',
  program: { name: 'Mina Protocol', logo: '/mina-logo.png', type: 'Company' },
  state: 'Out of scope',
  statusStep: 2, // 0: Reported, 1: In Review, 2: Triaged, 3: Paid, 4: Resolved
  severity: 'Critical',
  created: '24.12.2024 23:06',
  visibility: 'Hidden',
  category: 'Remote Code Execution (RCE)',
  content: {
    details: 'I discovered a private package on GitHub and noticed that the package wasn’t available on npm. I was able to claim the package name on the public registry and inject malicious code that executes when the internal build system installs dependencies.',
    impact: 'This vulnerability allows an attacker to take over the entire organization build pipeline, inject backdoors into production artifacts, and potentially access sensitive environment variables and secrets.',
    poc: [
      'I visited this URL: [https://github.com/mina-protocol/internal-repo]',
      'I searched for the package "mina-utils-internal" on npm and found it was unclaimed.',
      'I created a new package with the same name and added a preinstall script that sends "whoami" output to my server.',
      'I modified my package.json file to mimic the internal package versioning.',
    ]
  },
  participants: [
    { name: 'HP-Triage0x00', role: 'Company Admin', avatar: 'bg-red-500' },
    { name: 'mr-kasim-mehar', role: 'Author', avatar: 'bg-blue-500' },
    { name: 'kaozn', role: 'Participant', avatar: 'bg-green-500' }
  ]
};

// --- Components ---

const Timeline = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Reported', 'In review', 'Triaged', 'Paid', 'Resolved'];

  return (
    <div className="flex items-center w-full mb-12 relative px-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center relative z-10 group cursor-default">
              
              {/* Dot */}
              <div 
                className={cn(
                  "w-4 h-4 rounded-full transition-all duration-300 border-2",
                  isCompleted 
                    ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] scale-100" 
                    : isActive 
                        ? "bg-white dark:bg-black border-zinc-900 dark:border-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-125" 
                        : "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                )} 
              >
                  {isCompleted && (
                      <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white dark:bg-black rounded-full opacity-50" />
                      </div>
                  )}
              </div>

              {/* Label */}
              <span 
                className={cn(
                  "absolute top-8 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors",
                  isCompleted ? "text-zinc-600 dark:text-zinc-400 font-medium" :
                  isActive ? "text-zinc-900 dark:text-white font-bold scale-110 origin-top" :
                  "text-zinc-400 dark:text-zinc-600"
                )}
              >
                {step}
              </span>
            </div>
            
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 h-[2px] rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative">
                  <div 
                    className={cn(
                        "absolute inset-0 bg-zinc-900 dark:bg-white transition-transform duration-700 ease-out origin-left",
                        index < currentStep ? "scale-x-100" : "scale-x-0"
                    )} 
                  />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function ReportDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'comments' | 'history'>('comments');
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen bg-transparent text-zinc-900 dark:text-zinc-100 p-8 pt-6 font-sans selection:bg-emerald-500/20 transition-colors duration-300">
      
      {/* 1. Header & Timeline */}
      <div className="mb-12">
        <div className="flex flex-col gap-2 mb-8">
            <span className="text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3" /> Bug Bounty Report
            </span>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{report.title}</h1>
        </div>
        <Timeline currentStep={report.statusStep} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        
        {/* --- LEFT COLUMN (Content) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Content (Frameless) */}
          <div className="space-y-8">
            
            {/* Section 1: Target */}
            <div className="flex items-center gap-4 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-700 dark:text-white uppercase border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    {report.program.name.charAt(0)}
                </div>
                <div>
                     <h3 className="text-zinc-500 dark:text-zinc-400 font-mono text-xs mb-1 uppercase tracking-wider">Target</h3>
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">{report.program.name}</span>
                </div>
            </div>

            {/* Section 2: Details */}
            <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Vulnerability details</h2>
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-2">Dependency Confusion Leading to RCE</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                        {report.content.details}
                    </p>
                </div>

                {/* Impact Block */}
                <div className="bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20 rounded-lg p-6">
                    <h4 className="flex items-center gap-2 text-red-600 dark:text-red-500 font-mono text-sm uppercase mb-3 font-bold">
                        <AlertTriangle className="w-4 h-4" /> Impact
                    </h4>
                    <p className="text-zinc-700 dark:text-red-200/70 text-sm leading-relaxed">
                        {report.content.impact}
                    </p>
                </div>
            </div>

            {/* Section 3: Validation Steps (POC) */}
            <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Validation steps</h2>
                <div className="space-y-3">
                    {report.content.poc.map((step, i) => (
                        <div key={i} className="flex gap-4 group">
                            <span className="font-mono text-emerald-600 dark:text-emerald-500 text-sm pt-2.5 font-bold">0{i + 1}</span>
                            <div className="flex-1 text-zinc-600 dark:text-zinc-300 text-sm font-mono leading-relaxed bg-white dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors shadow-sm">
                                {step}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Section 4: Comments System */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-6 mb-8">
                <button 
                    onClick={() => setActiveTab('comments')}
                    className={cn(
                        "pb-1 text-sm font-bold flex items-center gap-2 transition-colors",
                        activeTab === 'comments' ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-600"
                    )}
                >
                    <MessageSquare className="w-4 h-4" /> Comments
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={cn(
                        "pb-1 text-sm font-bold flex items-center gap-2 transition-colors",
                        activeTab === 'history' ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-600"
                    )}
                >
                    <History className="w-4 h-4" /> History
                </button>
            </div>

            {activeTab === 'comments' ? (
                <div className="space-y-6">
                     {/* Advanced Composer */}
                     <div className="bg-white dark:bg-zinc-900/30 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                        
                        {/* Editor */}
                        <div className="min-h-[120px]">
                             <CyberpunkEditor 
                                content={comment} 
                                onChange={setComment} 
                                placeholder="Write a comment..." 
                            />
                        </div>

                        {/* Footer Area: Upload + Submit */}
                        <div className="bg-zinc-50/50 dark:bg-zinc-950/30 p-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                            
                            {/* Compact Upload Zone */}
                            <div 
                                className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-4 flex flex-col items-center justify-center text-zinc-400 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-zinc-900 transition-all cursor-pointer group"
                                role="button"
                                tabIndex={0}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform text-zinc-500">
                                        <UploadCloud className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Click to upload files</p>
                                        <p className="text-[10px] text-zinc-400 font-mono">PNG, JPG, PDF (Max 50MB)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[10px] text-zinc-400 font-mono">* Markdown supported</span>
                                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 shadow-md hover:shadow-lg transition-all active:scale-95">
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                     </div>
                </div>
            ) : (
                <div className="p-8 text-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/20 text-zinc-500 font-mono text-sm">
                    No history events recorded yet.
                </div>
            )}
          </div>

        </div>

        {/* --- RIGHT COLUMN (Sidebar) --- */}
        <div className="space-y-6">
            
            {/* Card 1: Company Info */}
            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 flex items-center justify-between group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer shadow-sm">
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-700 dark:text-white uppercase">
                        {report.program.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{report.program.name}</h4>
                        <span className="text-xs text-zinc-500 font-mono">Business</span>
                    </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            </div>

            {/* Card 2: Details Table */}
            <div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-lg backdrop-blur-sm overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">Details</h3>
                </div>
                <div className="p-4 space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500">Report ID</span>
                        <span className="text-sm font-mono text-zinc-900 dark:text-white">{report.id}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500">Created</span>
                        <span className="text-sm font-mono text-zinc-900 dark:text-white">{report.created}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500">State</span>
                        <Badge variant="outline" className="bg-zinc-100 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono text-[10px] uppercase">
                            {report.state}
                        </Badge>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500">Severity</span>
                        <span className="text-sm font-bold text-pink-600 dark:text-pink-500">{report.severity}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500">Visibility</span>
                        <span className="text-sm font-mono text-zinc-400 flex items-center gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" /> {report.visibility}
                        </span>
                     </div>
                     <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/50">
                        <span className="text-xs text-zinc-500 block mb-1">Vulnerability Category</span>
                        <span className="text-sm text-zinc-900 dark:text-white font-medium block truncate" title={report.category}>
                            {report.category}
                        </span>
                     </div>
                </div>
            </div>

            {/* Card 3: Participants */}
            <div className="bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-lg backdrop-blur-sm p-4 shadow-sm">
                 <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold mb-4">
                    Participants ({report.participants.length})
                 </h3>
                 <div className="space-y-3">
                    {report.participants.map((p, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold", p.avatar)}>
                                {p.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-zinc-900 dark:text-zinc-300 font-medium leading-none">{p.name}</span>
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono mt-0.5">{p.role}</span>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Card 4: Need Help */}
            <div className="bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/30 rounded-lg p-4 text-center">
                <p className="text-xs text-emerald-700 dark:text-emerald-200/70 mb-2">Need help with this report?</p>
                <a href="#" className="text-sm font-bold text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 hover:underline">
                    Contact Support
                </a>
            </div>

        </div>
      </div>
    </div>
  );
}
