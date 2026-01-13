import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { mockPrograms } from '@/data/mockData';
import { Link } from 'react-router-dom';

const allTags = ['Web', 'Mobile', 'API', 'Fintech', 'E-commerce', 'Banking', 'IoT', 'Crypto'];

export default function ResearcherPrograms() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(search.toLowerCase()) ||
                          program.company.toLowerCase().includes(search.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => program.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Bug Bounty Programs</h1>
        <p className="text-muted-foreground">Discover and join security programs</p>
      </div>

      {/* Search and Filters */}
      <GlassCard className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'tag'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </GlassCard>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrograms.map((program, index) => (
          <GlassCard 
            key={program.id}
            variant="glow"
            className="group hover:scale-[1.02] transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4 mb-4">
              <img 
                src={program.logo} 
                alt={program.company}
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{program.name}</h3>
                  {program.type === 'private' && (
                    <Badge variant="warning" className="text-xs">Private</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{program.company}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {program.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {program.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="tag" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {program.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{program.tags.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div>
                <p className="text-xs text-muted-foreground">Max Bounty</p>
                <p className="font-bold text-primary">${program.rewards.critical.toLocaleString()}</p>
              </div>
              <Link to={`/researcher/programs/${program.id}`}>
                <Button variant="glass" size="sm" className="gap-1 group-hover:bg-primary/20">
                  View Program
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <GlassCard className="text-center py-12">
          <p className="text-muted-foreground">No programs found matching your criteria</p>
        </GlassCard>
      )}
    </div>
  );
}
