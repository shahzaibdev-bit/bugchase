import React, { useState } from 'react';
import { Building2, Mail, Globe, Shield, Bell, Users, Key, Save, GlobeLock, Camera, Upload, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { DomainVerificationTab } from './DomainVerificationTab';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CompanySettings() {
  const [notifications, setNotifications] = useState({
    newReports: true,
    statusUpdates: true,
    weeklyDigest: false,
    criticalAlerts: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-mono">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your company profile and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="glass-panel p-1 w-full justify-start overflow-x-auto no-scrollbar">
          <TabsTrigger value="profile" className="gap-2 shrink-0">
            <Building2 className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 shrink-0">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 shrink-0">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2 shrink-0">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="domains" className="gap-2 shrink-0">
            <GlobeLock className="h-4 w-4" />
            Domain Verification
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <GlassCard className="p-6 space-y-8 bg-card/50 dark:bg-zinc-950/30">
            <div className="flex items-start justify-between">
                <div>
                     <h3 className="text-lg font-semibold text-foreground">Company Profile</h3>
                     <p className="text-sm text-muted-foreground">Update your company branding and public details.</p>
                </div>
                <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                    PUBLIC
                </Badge>
            </div>
            
            {/* Logo Upload Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-4 rounded-xl border border-dashed border-border bg-muted/30">
                <div className="relative group cursor-pointer shrink-0">
                    <div className="w-24 h-24 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden relative">
                         {/* Mock Logo Placeholder or Image */}
                         <Building2 className="h-10 w-10 text-muted-foreground" />
                         
                         {/* Hover Overlay */}
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Camera className="h-6 w-6 text-white" />
                         </div>
                    </div>
                </div>
                <div className="space-y-2 flex-1 text-center md:text-left">
                    <div className="flex flex-col">
                        <Label className="text-base font-medium">Company Logo</Label>
                        <span className="text-xs text-muted-foreground mt-1">Recommended size: 512x512px (PNG, JPG)</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <Button variant="secondary" size="sm" className="gap-2">
                            <Upload className="h-3 w-3" />
                            Upload New
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            Remove
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input defaultValue="TechCorp Inc." className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input defaultValue="Technology / SaaS" className="bg-background/50" />
              </div>
              
              {/* Location Fields */}
              <div className="space-y-2">
                <Label>Headquarters (City)</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="San Francisco" className="pl-10 bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input defaultValue="United States" className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label>Contact Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" defaultValue="security@techcorp.com" className="pl-10 bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input defaultValue="https://techcorp.com" className="pl-10 bg-background/50" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Company Description</Label>
                <Textarea 
                  rows={4}
                  defaultValue="TechCorp is a leading SaaS provider specializing in enterprise solutions..."
                  className="bg-background/50 resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">0 / 500 characters</p>
              </div>

              {/* Social Links */}
              <div className="space-y-4 md:col-span-2 pt-4 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground">Social Presence</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">LinkedIn</Label>
                        <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="linkedin.com/company/..." className="pl-10 bg-background/50" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Twitter / X</Label>
                        <div className="relative">
                            <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="x.com/..." className="pl-10 bg-background/50" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">GitHub</Label>
                        <div className="relative">
                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="github.com/..." className="pl-10 bg-background/50" />
                        </div>
                      </div>
                  </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Profile
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <GlassCard className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
            
            <div className="space-y-4">
              {[
                { key: 'newReports', label: 'New Report Submissions', description: 'Get notified when researchers submit new vulnerability reports' },
                { key: 'statusUpdates', label: 'Report Status Updates', description: 'Receive updates when report statuses change' },
                { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Get a weekly summary of your program activity' },
                { key: 'criticalAlerts', label: 'Critical Vulnerability Alerts', description: 'Immediate notifications for critical severity reports' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, [item.key]: checked }))
                    }
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <GlassCard className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
              
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </GlassCard>

            <GlassCard className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">API Keys</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-border/30">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground font-mono">pk_live_***************</p>
                      <p className="text-xs text-muted-foreground">Created: March 1, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
              </div>
              
              <Button variant="outline" className="gap-2">
                <Key className="h-4 w-4" />
                Create New API Key
              </Button>
            </GlassCard>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <GlassCard className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
              <Button className="gap-2">
                <Users className="h-4 w-4" />
                Invite Member
              </Button>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'John Doe', email: 'john@techcorp.com', role: 'Admin' },
                { name: 'Jane Smith', email: 'jane@techcorp.com', role: 'Manager' },
                { name: 'Bob Wilson', email: 'bob@techcorp.com', role: 'Viewer' },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-foreground/5 border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{member.role}</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>
     {/* Domain Verificaiton Tab */}
        <TabsContent value="domains">
            <DomainVerificationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
