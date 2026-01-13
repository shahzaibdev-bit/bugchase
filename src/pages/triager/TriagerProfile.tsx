import React, { useState } from 'react';
import { 
  Shield, 
  Linkedin, 
  Twitter, 
  Trophy, 
  Lock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Camera,
  Globe,
  Bell,
  History,
  Target,
  Bug,
  FileCheck,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';


// Mock Data Types
interface ProfileState {
  nickname: string;
  country: string;
  bio: string;
  hireable: boolean;
  showStats: boolean;
  isPrivate: boolean;
  twitter: string;
  linkedin: string;
  notifications: {
      platform: boolean;
      assignments: boolean;
      payouts: boolean;
      marketing: boolean;
  };
  twoFactor: boolean;
}

type TabType = 'account' | 'security' | 'notifications' | 'stats';

export default function TriagerProfile() {
  // State
  const [activeTab, setActiveTab] = useState<TabType>('account');

  const [profile, setProfile] = useState<ProfileState>({
    nickname: 'TriagerOne',
    country: 'United Kingdom',
    bio: 'Senior Security Analyst specializing in Web Application security. Triaging reports with precision.',
    hireable: false,
    showStats: true,
    isPrivate: false,
    twitter: 'https://twitter.com/triagerone',
    linkedin: 'https://linkedin.com/in/triagerone',
    notifications: {
        platform: true,
        assignments: true,
        payouts: true,
        marketing: false
    },
    twoFactor: true
  });

  // Handlers
  const handleSave = (section: string) => {
    console.log(`Saving ${section}...`);
    // Toast notification would go here
  };

  const navTabs: { id: TabType; label: string }[] = [
      { id: 'account', label: 'Account' },
      { id: 'security', label: 'Security' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'stats', label: 'Stats' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      
      {/* 1. Header & Tabs */}
      <div className="flex flex-col gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-1">
         <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Profile Settings</h1>
         
         <div className="flex items-center gap-8 text-sm font-medium overflow-x-auto no-scrollbar">
            {navTabs.map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                        "pb-4 px-1 transition-colors relative whitespace-nowrap",
                        activeTab === tab.id 
                            ? "text-black dark:text-white" 
                            : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    )}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white rounded-t-full" />
                    )}
                </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === LEFT COLUMN (2/3) - Tab Content === */}
        <div className="lg:col-span-2 space-y-8 min-h-[500px]">
            
            {/* --- ACCOUNT TAB --- */}
            {activeTab === 'account' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                    {/* General Info */}
                    <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                General info
                                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">Triager Level 3</span>
                            </h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                                <div className="w-24 h-24 rounded-full border-2 border-zinc-200 dark:border-zinc-700 p-1 relative group cursor-pointer overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3" 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover group-hover:opacity-75 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="text-xs text-black dark:text-white hover:underline font-medium">Upload new</button>
                                    <p className="text-[10px] text-zinc-500 mt-1">JPG or PNG. Max 800kB</p>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-500 dark:text-zinc-400">Nickname <span className="text-red-500">*</span></label>
                                        <Input 
                                            value={profile.nickname} 
                                            onChange={(e) => setProfile({...profile, nickname: e.target.value})}
                                            className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-black dark:focus:border-white focus:ring-0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-500 dark:text-zinc-400">Country</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                                            <Input 
                                                value={profile.country} 
                                                onChange={(e) => setProfile({...profile, country: e.target.value})}
                                                className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-black dark:focus:border-white focus:ring-0 pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-500 dark:text-zinc-400">Bio</label>
                                    <Textarea 
                                        value={profile.bio} 
                                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                        className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-black dark:focus:border-white focus:ring-0 min-h-[100px]"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button className="bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-medium" onClick={() => handleSave('General')}>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Socials */}
                    <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">My Socials</h2>
                        <div className="space-y-4">
                            {/* Linkedin */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center shrink-0">
                                    <Linkedin className="w-5 h-5 text-[#0077b5]" />
                                </div>
                                <Input 
                                    value={profile.linkedin}
                                    onChange={(e) => setProfile({...profile, linkedin: e.target.value})} 
                                    className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-black dark:focus:border-white focus:ring-0" 
                                    placeholder="LinkedIn URL"
                                />
                                <Button size="sm" variant="outline" className="border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">Save</Button>
                            </div>

                            {/* Twitter */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                    <Twitter className="w-5 h-5 text-black dark:text-white" />
                                </div>
                                <Input 
                                    value={profile.twitter}
                                    onChange={(e) => setProfile({...profile, twitter: e.target.value})} 
                                    className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-black dark:focus:border-white focus:ring-0" 
                                    placeholder="Twitter URL"
                                />
                                <Button size="sm" variant="outline" className="border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">Save</Button>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* --- SECURITY TAB --- */}
            {activeTab === 'security' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                    <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-black dark:text-white" /> Security Settings
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950/50">
                                <div className="space-y-0.5">
                                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
                                    <p className="text-xs text-zinc-500">Secure your account with an authentication app</p>
                                </div>
                                <Switch 
                                    checked={profile.twoFactor}
                                    onCheckedChange={(c) => setProfile({...profile, twoFactor: c})}
                                    className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-500 dark:text-zinc-400">Current Password</label>
                                    <Input type="password" className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-black dark:focus:border-white focus:ring-0" placeholder="••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-500 dark:text-zinc-400">New Password</label>
                                    <Input type="password" className="bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:border-black dark:focus:border-white focus:ring-0" placeholder="••••••••" />
                                </div>
                            </div>
                            <Button className="bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black">Update Password</Button>
                        </div>
                    </section>

                    {/* Login History */}
                    <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            <History className="w-5 h-5" /> Login History
                        </h2>
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-4 h-4 text-zinc-500" />
                                        <div>
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300">Chrome on Windows</p>
                                            <p className="text-xs text-zinc-500">London, UK • 2 hours ago</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 px-2 py-0.5 rounded-full">Active</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {/* --- NOTIFICATIONS TAB --- */}
            {activeTab === 'notifications' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                    <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5" /> Notification Preferences
                        </h2>
                        <div className="space-y-6">
                            {Object.entries(profile.notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <h3 className="text-sm font-medium text-zinc-900 dark:text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} Notifications</h3>
                                        <p className="text-xs text-zinc-500">Receive updates about {key} via email</p>
                                    </div>
                                    <Switch 
                                        checked={value}
                                        onCheckedChange={(c) => setProfile({...profile, notifications: {...profile.notifications, [key]: c}})}
                                        className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {/* --- STATS TAB --- */}
            {activeTab === 'stats' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                     {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-3">
                                <FileCheck className="w-5 h-5 text-black dark:text-white" />
                            </div>
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white">412</span>
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">Reports Review</span>
                        </div>
                        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-3">
                                <Clock className="w-5 h-5 text-black dark:text-white" />
                            </div>
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white">4h 12m</span>
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">Avg Response</span>
                        </div>
                         <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center mb-3">
                                <Target className="w-5 h-5 text-black dark:text-white" />
                            </div>
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white">96.5%</span>
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">Consensus Score</span>
                        </div>
                    </div>

                    {/* Achievements */}
                    <section className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                         <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-black dark:text-white" /> Triager Achievements
                         </h2>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                             {[
                                 { 
                                     title: 'Fast Track',
                                     sub: 'Speed Demon',
                                     date: 'Jan 15, 2024',
                                     desc: 'Maintained < 2h response time for 7 days.',
                                     icon: Clock,
                                     bg: 'bg-zinc-100 dark:bg-zinc-800'
                                 },
                                 { 
                                     title: 'Eagle Eye',
                                     sub: 'Validation Expert',
                                     date: 'Feb 10, 2024',
                                     desc: 'Correctly validated 50 critical reports consecutively.',
                                     icon: Bug, 
                                     bg: 'bg-zinc-100 dark:bg-zinc-800'
                                 },
                                 { 
                                     title: 'Guardian',
                                     sub: 'Top Triager',
                                     date: 'Mar 05, 2024',
                                     desc: 'Rated top 5% triager for quality.',
                                     icon: Shield, 
                                     bg: 'bg-zinc-100 dark:bg-zinc-800'
                                 },
                             ].map((badge, i) => (
                                 <div key={i} className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/50 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors group">
                                     {/* Badge Image Area (Mocked with Icon) */}
                                     <div className={`h-40 flex items-center justify-center ${badge.bg} group-hover:opacity-80 transition-opacity`}>
                                         <badge.icon className="w-16 h-16 text-black dark:text-white drop-shadow-lg" />
                                     </div>
                                     
                                     {/* Content */}
                                     <div className="p-4 text-center">
                                         <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">{badge.title}</h3>
                                         <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300 mb-1">{badge.sub}</p>
                                         <p className="text-[10px] text-zinc-500 mb-3">{badge.date}</p>
                                         <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full mb-3" />
                                         <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                             {badge.desc}
                                         </p>
                                     </div>
                                 </div>
                             ))}
                             
                             {/* Locked Placeholder */}
                             <div className="flex flex-col border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/30 opacity-60">
                                 <div className="h-40 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900/50">
                                     <Lock className="w-12 h-12 text-zinc-400 dark:text-zinc-600" />
                                 </div>
                                 <div className="p-4 text-center">
                                     <h3 className="font-bold text-zinc-400 dark:text-zinc-500 text-sm mb-1">Locked Badge</h3>
                                     <p className="text-[10px] text-zinc-500 dark:text-zinc-600 mb-3">???</p>
                                     <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full mb-3" />
                                     <p className="text-xs text-zinc-500 dark:text-zinc-600">
                                         Continue triaging to unlock more achievements.
                                     </p>
                                 </div>
                             </div>
                         </div>
                    </section>
                </div>
            )}
        </div>

        {/* === RIGHT COLUMN (1/3) - Widgets (Persist across tabs) === */}
        <div className="space-y-8">
            
            {/* Status Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-zinc-300 via-zinc-500 to-zinc-300 dark:from-zinc-700 dark:via-zinc-500 dark:to-zinc-700" />
                
                <div className="relative inline-block mb-3">
                    <img 
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3" 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full border-4 border-white dark:border-zinc-800 object-cover shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 bg-black dark:bg-white text-white dark:text-black p-1 rounded-full border-2 border-white dark:border-zinc-900">
                        <CheckCircle2 className="w-3 h-3" />
                    </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{profile.nickname}</h3>
                <p className="text-zinc-500 text-sm mb-4">Triager Level 3</p>

                <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 mb-4">
                     <div className="flex justify-between text-sm mb-1">
                        <span className="text-zinc-500 dark:text-zinc-400">Profile Completion</span>
                        <span className="text-black dark:text-white font-mono">92%</span>
                     </div>
                     <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                         <div className="h-full bg-black dark:bg-white w-[92%]" />
                     </div>
                </div>
                 
                 <div className="text-xs text-zinc-500">
                    Active since Jan 2024
                 </div>
            </div>

            {/* Public Profile Settings */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-4">Public Profile</h3>
                
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs text-zinc-500 dark:text-zinc-400">Public URL</label>
                        <div className="flex items-center gap-2">
                            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 truncate flex-1 font-mono">
                                bugchase.com/t/triagerone
                            </div>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-zinc-500 hover:text-black dark:hover:text-white">
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                         <div className="space-y-0.5">
                            <span className="text-sm text-zinc-700 dark:text-zinc-300 block">Performance Stats</span>
                            <span className="text-[10px] text-zinc-500 block">Show public statistics</span>
                         </div>
                          <Switch 
                            checked={profile.showStats}
                            onCheckedChange={(c) => setProfile({...profile, showStats: c})}
                            className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                         />
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                         <div className="space-y-0.5">
                            <span className="text-sm text-zinc-700 dark:text-zinc-300 block">Private Profile</span>
                            <span className="text-[10px] text-zinc-500 block">Hide profile from public</span>
                         </div>
                          <Switch 
                            checked={profile.isPrivate}
                            onCheckedChange={(c) => setProfile({...profile, isPrivate: c})}
                            className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                         />
                    </div>
                </div>
            </div>

        </div>

      </div>



    </div>
  );
};
