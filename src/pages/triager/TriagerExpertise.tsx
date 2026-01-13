import React, { useState } from 'react';
import { Shield, Code, Globe, Smartphone, Database, Cloud, Lock, Zap, Save, CheckCircle, FileText, Wifi } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const expertiseAreas = [
  { id: 'web', label: 'Web Application Security', icon: Globe, description: 'XSS, CSRF, SQL Injection, etc.' },
  { id: 'api', label: 'API Security', icon: Code, description: 'REST, GraphQL, Authentication' },
  { id: 'mobile', label: 'Mobile Security', icon: Smartphone, description: 'iOS and Android applications' },
  { id: 'cloud', label: 'Cloud Security', icon: Cloud, description: 'AWS, Azure, GCP misconfigurations' },
  { id: 'source', label: 'Source Code Review', icon: FileText, description: 'Static analysis, leaked credentials' }, // Added
  { id: 'iot', label: 'IoT & Firmware', icon: Wifi, description: 'Embedded systems, device security' }, // Added
  { id: 'crypto', label: 'Cryptography', icon: Lock, description: 'Encryption, hashing, key management' },
  { id: 'database', label: 'Database Security', icon: Database, description: 'SQL, NoSQL, data exposure' },
];

const severityPreferences = [
  { id: 'critical', label: 'Critical', color: 'bg-red-500' },
  { id: 'high', label: 'High', color: 'bg-orange-500' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { id: 'low', label: 'Low', color: 'bg-green-500' },
];

export default function TriagerExpertise() {
  const [availability, setAvailability] = useState(true);
  const [maxReports, setMaxReports] = useState([10]);
  const [expertise, setExpertise] = useState<Record<string, boolean>>({
    web: true,
    api: true,
    mobile: false,
    cloud: false,
    crypto: false,
    database: true,
  });
  const [severities, setSeverities] = useState<Record<string, boolean>>({
    critical: true,
    high: true,
    medium: true,
    low: false,
  });

  const toggleExpertise = (id: string) => {
    setExpertise(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSeverity = (id: string) => {
    setSeverities(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeExpertise = Object.entries(expertise).filter(([_, active]) => active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-mono">Expertise Settings</h1>
        <p className="text-muted-foreground text-sm">Configure your triage preferences and availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Availability */}
        <GlassCard className="p-6 lg:col-span-1">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${availability ? 'bg-green-500/10' : 'bg-foreground/10'}`}>
                  <Zap className={`h-6 w-6 ${availability ? 'text-green-500' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Availability</p>
                  <p className="text-sm text-muted-foreground">
                    {availability ? 'Accepting new reports' : 'Not accepting reports'}
                  </p>
                </div>
              </div>
              <Switch checked={availability} onCheckedChange={setAvailability} />
            </div>

            <div className="pt-4 border-t border-border/30 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Max Concurrent Reports</Label>
                <span className="font-mono font-semibold text-primary">{maxReports[0]}</span>
              </div>
              <Slider
                value={maxReports}
                onValueChange={setMaxReports}
                max={20}
                min={1}
                step={1}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of reports you can handle simultaneously
              </p>
            </div>

            <div className="pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">
                  {activeExpertise} expertise areas selected
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Expertise Areas */}
        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Expertise Areas
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Select the vulnerability types you're experienced in handling
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertiseAreas.map((area) => (
              <div
                key={area.id}
                onClick={() => toggleExpertise(area.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  expertise[area.id]
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border/30 bg-foreground/5 hover:border-border/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${expertise[area.id] ? 'bg-primary/10' : 'bg-foreground/10'}`}>
                    <area.icon className={`h-5 w-5 ${expertise[area.id] ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{area.label}</p>
                      <Switch checked={expertise[area.id]} onCheckedChange={() => toggleExpertise(area.id)} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Severity Preferences */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Severity Preferences</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select which severity levels you want to be assigned
        </p>

        <div className="flex flex-wrap gap-4">
          {severityPreferences.map((severity) => (
            <div
              key={severity.id}
              onClick={() => toggleSeverity(severity.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                severities[severity.id]
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border/30 bg-foreground/5 hover:border-border/50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${severity.color}`} />
              <span className="font-medium text-foreground">{severity.label}</span>
              <Switch checked={severities[severity.id]} onCheckedChange={() => toggleSeverity(severity.id)} />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
