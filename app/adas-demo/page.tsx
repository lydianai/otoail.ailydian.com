import AdasVisualization from '@/components/adas/AdasVisualization';
import Logo from '@/components/Logo';
import { Activity } from 'lucide-react';

export default function AdasDemoPage() {
  return (
    <div className="h-screen w-screen bg-black">
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/95 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
              <Logo size="sm" />
              <Activity className="w-5 h-5 text-[#E30A17]" />
            </div>
          </div>
        </div>
      </div>
      <AdasVisualization />
    </div>
  );
}
