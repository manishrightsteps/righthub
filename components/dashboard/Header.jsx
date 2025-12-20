import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Terminal, Clock, Activity } from 'lucide-react';

export function Header({ detailedData, lastUpdate }) {
  return (
    <div className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20">
              <Image
                src="/logo.png"
                alt="Right Steps Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-primary" />
                <h1 className="text-2xl font-bold tracking-tight">
                  rightsteps-health-monitor
                </h1>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="outline" className="text-xs font-mono">
                  v8.0.0
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {detailedData?.environment || 'production'}
                </span>
              </div>
            </div>
          </div>
          {detailedData && (
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">UPTIME:</span>{' '}
                <span className="font-semibold text-foreground">
                  {Math.floor(detailedData.uptime / 60)}m
                </span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-chart-2 animate-pulse" />
                <span className="text-muted-foreground">LAST:</span>{' '}
                <span className="font-semibold text-foreground">{lastUpdate}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
