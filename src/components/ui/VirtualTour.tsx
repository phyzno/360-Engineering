"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface VirtualTourProps {
  embedUrl?: string;
  title?: string;
}

export function VirtualTour({
  // Using a public Matterport showcase model as a placeholder
  embedUrl = "https://my.matterport.com/show/?m=J9v9N39bM2M&play=1", 
  title = "3D Virtual Tour",
}: VirtualTourProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full aspect-square md:aspect-[16/9] lg:aspect-[21/9] bg-[#0a1206] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-[#c9a84c]/20">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a1206] text-[#d4c5ae]/70 z-10">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#c9a84c]" />
          <p className="text-xs md:text-sm font-medium tracking-widest uppercase">Loading 3D Experience...</p>
        </div>
      )}
      
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        allow="xr-spatial-tracking"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
