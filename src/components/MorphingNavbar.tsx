import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'motion/react';
import { Link } from 'react-router-dom';
import { CyberLogo } from '@/components/CyberLogo';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { MagneticButton } from '@/components/MagneticButton';

// @ts-ignore
import CardNav from '@/components/CardNav';

const navItems = [
  {
    label: 'Solution',
    headerLeft: 'SECURITY SOLUTIONS',
    headerRight: 'V 4.0',
    links: [
      { href: '/solutions/rewards', label: 'Security Rewards', description: 'Crowdsourced Intelligence.' },
      { href: '/solutions/vdp', label: 'VDP Programs', description: 'Vulnerability Disclosure Programs.' },
      { href: '/solutions/ptaas', label: 'PTaaS', description: 'Security Assessment Services.' },
    ]
  },
  {
    label: 'Company',
    headerLeft: 'ORGANIZATION',
    headerRight: 'EST. 2023',
    links: [
      { href: '/company/about', label: 'About Us', description: 'Corporate Overview.' },
      { href: '/company/careers', label: 'Careers', description: 'Join the Team.' },
      { href: '/company/contact', label: 'Secure Communications', description: 'Secure Connection.' },
    ]
  },
  {
    label: 'Legal',
    headerLeft: 'COMPLIANCE FRAMEWORKS',
    headerRight: 'SECURE',
    links: [
      { href: '/legal/sovereignty', label: 'Data Sovereignty', description: 'National Residency Standards.' },
      { href: '/legal/rules', label: 'Rules of Engagement', description: 'Operational Directives.' },
      { href: '/legal/immunity', label: 'Legal Immunity', description: 'Authorized Research Protection.' },
    ]
  }
];

export const MorphingNavbar = () => {
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  // Scroll Animations
  // Map scrollY: 0 -> 100 to width: 85% -> 70%
  const widthRaw = useTransform(scrollY, [0, 100], ['85%', '70%']);
  const width = useSpring(widthRaw, { stiffness: 300, damping: 30, restDelta: 0.001 });

  // Optional: Adjust top position or padding if needed, but fixed top-6 is usually good
  // We can also animate the backdrop blur intensity or border opacity
  const borderOpacityRaw = useTransform(scrollY, [0, 100], [0.1, 0.3]);
  const borderOpacity = useSpring(borderOpacityRaw, { stiffness: 300, damping: 30 });

  return (
    <div className="fixed top-6 w-full flex justify-center z-50 pointer-events-none">
      <motion.nav
        style={{
          width,
        }}
        className="pointer-events-auto relative px-6 py-4 rounded-xl bg-white/70 dark:bg-black/70 backdrop-blur-md border border-black/15 dark:border-white/10 shadow-2xl shadow-black/20 group transition-[height] duration-300 ease-out"
      >
        {/* Flashlight/Torch Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer rounded-xl overflow-hidden" />

        {/* LAYER 1: The Control Bar (Always on Top) */}
        <div className="relative z-50 flex items-start justify-between md:justify-center min-h-[40px] px-2">
            
          {/* Left: Logo - Wrapped to stay at top */}
          <div className="h-[40px] flex items-center flex-shrink-0 scale-75 origin-left md:absolute md:left-0 md:top-0 z-50">
             <Link to="/">
                <CyberLogo size="md" />
             </Link>
          </div>

          {/* Center: CardNav Triggers */}
          <div className="flex-1 md:flex-none flex justify-end md:justify-center w-full max-w-2xl relative z-50">
             <CardNav 
                items={navItems} 
                theme={theme === 'dark' ? 'dark' : 'light'}
                baseColor="transparent"
                menuColor={theme === 'dark' ? '#ffffff' : '#000000'}
                buttonBgColor="transparent"
                buttonTextColor={theme === 'dark' ? '#ffffff' : '#18181b'}
                className="w-full"
            />
          </div>

          {/* Right: Buttons - Wrapped to stay at top */}
          <div className="h-[40px] flex items-center gap-3 md:absolute md:right-0 md:top-0 z-50">
            <MagneticButton strength={0.3} triggerRadius={50} className="rounded-full">
                <Button variant="ghost" size="icon" onClick={(e) => {
                  // View Transition Logic
                  if (!document.startViewTransition) {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                    return;
                  }

                  const x = e.clientX;
                  const y = e.clientY;
                  const endRadius = Math.hypot(
                    Math.max(x, window.innerWidth - x),
                    Math.max(y, window.innerHeight - y)
                  );

                  const transition = document.startViewTransition(() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  });

                  transition.ready.then(() => {
                    document.documentElement.animate(
                      {
                        clipPath: [
                          `circle(0px at ${x}px ${y}px)`,
                          `circle(${endRadius}px at ${x}px ${y}px)`,
                        ],
                      },
                      {
                        duration: 500,
                        easing: 'ease-in-out',
                        pseudoElement: '::view-transition-new(root)',
                      }
                    );
                  });
                }} className="rounded-full text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
            </MagneticButton>
            
            {/* UPDATED: Direct Links */}
            <Link to="/login">
              <MagneticButton strength={0.3} triggerRadius={60}>
                 <Button className="rounded-full bg-transparent hover:bg-zinc-900 text-zinc-900 hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 font-mono text-xs border border-transparent">LOGIN</Button>
              </MagneticButton>
            </Link>
            {/* UPDATED: Direct Links */}
            <Link to="/signup">
              <MagneticButton strength={0.3} triggerRadius={60}>
                 <Button className="btn-3d font-mono text-xs rounded-full px-6 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg shadow-zinc-900/20 dark:shadow-white/20 border-0">INITIALIZE</Button>
              </MagneticButton>
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};
