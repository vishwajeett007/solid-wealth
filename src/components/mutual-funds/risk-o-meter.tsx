"use client";

import React from "react";
import { RiskLevel } from "@/lib/mutual-funds-data";
import { cn } from "@/lib/utils";

interface RiskOMeterProps {
  risk: RiskLevel;
  className?: string;
}

const RISK_LEVELS: {
  level: RiskLevel;
  label: string;
  color: string;
  angle: number; // Angle from -90 (far left) to +90 (far right)
  description: string;
}[] = [
  {
    level: "Low",
    label: "Low",
    color: "#00C853",
    angle: -75,
    description: "Investors understand that their principal will be at low risk",
  },
  {
    level: "Moderately Low",
    label: "Moderately Low",
    color: "#4ade80",
    angle: -45,
    description: "Investors understand that their principal will be at moderately low risk",
  },
  {
    level: "Moderate",
    label: "Moderate",
    color: "#FFD600",
    angle: -15,
    description: "Investors understand that their principal will be at moderate risk",
  },
  {
    level: "Moderately High",
    label: "Moderately High",
    color: "#FF9100",
    angle: 15,
    description: "Investors understand that their principal will be at moderately high risk",
  },
  {
    level: "High",
    label: "High",
    color: "#FF3D00",
    angle: 45,
    description: "Investors understand that their principal will be at high risk",
  },
  {
    level: "Very High",
    label: "Very High",
    color: "#D50000",
    angle: 75,
    description: "Investors understand that their principal will be at very high risk",
  },
];

export function RiskOMeter({ risk, className }: RiskOMeterProps) {
  const currentRisk =
    RISK_LEVELS.find((r) => r.level.toLowerCase() === risk.toLowerCase()) ||
    RISK_LEVELS[5]; // default Very High

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm",
        className
      )}
    >
      <h3 className="text-base font-bold text-[#1f2937] tracking-tight mb-2">
        Risk-o-meter
      </h3>

      {/* SVG Semi-Circle Speedometer */}
      <div className="relative flex items-center justify-center w-[260px] h-[140px] overflow-hidden">
        <svg
          viewBox="0 0 200 110"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <filter id="needle-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* 6 Arc Segments: 180 degrees divided into 6 x 30-degree slices with 2-degree gaps */}
          {/* Slices drawn from left (180°) to right (0°) */}
          {/* Segment 1: Low (180° to 152°) */}
          <path
            d="M 15 100 A 85 85 0 0 1 24.8 62.4 L 46.2 73.5 A 60 60 0 0 0 39.2 100 Z"
            fill="#00C853"
          />
          {/* Segment 2: Moderately Low (148° to 122°) */}
          <path
            d="M 27.9 57.2 A 85 85 0 0 1 55.4 29.8 L 68.5 50.4 A 60 60 0 0 0 49.1 69.8 Z"
            fill="#4ade80"
          />
          {/* Segment 3: Moderate (118° to 92°) */}
          <path
            d="M 60.1 26.2 A 85 85 0 0 1 97 15.1 L 97.9 40.1 A 60 60 0 0 0 71.8 47.9 Z"
            fill="#FFD600"
          />
          {/* Segment 4: Moderately High (88° to 62°) */}
          <path
            d="M 103 15.1 A 85 85 0 0 1 139.9 26.2 L 128.2 47.9 A 60 60 0 0 0 102.1 40.1 Z"
            fill="#FF9100"
          />
          {/* Segment 5: High (58° to 32°) */}
          <path
            d="M 144.6 29.8 A 85 85 0 0 1 172.1 57.2 L 150.9 69.8 A 60 60 0 0 0 131.5 50.4 Z"
            fill="#FF3D00"
          />
          {/* Segment 6: Very High (28° to 0°) */}
          <path
            d="M 175.2 62.4 A 85 85 0 0 1 185 100 L 160.8 100 A 60 60 0 0 0 153.8 73.5 Z"
            fill="#D50000"
          />

          {/* Needle Group with dynamic rotation */}
          <g
            transform={`translate(100, 100) rotate(${currentRisk.angle})`}
            filter="url(#needle-shadow)"
            className="transition-transform duration-700 ease-out"
          >
            {/* Needle shape */}
            <polygon points="-3,0 0,-78 3,0" fill="#1f2937" />
            <circle cx="0" cy="0" r="8" fill="#1f2937" />
            <circle cx="0" cy="0" r="4" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* Risk Badge */}
      <div className="mt-3">
        <span className="inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-bold text-white bg-[#0B63E5] shadow-xs">
          {currentRisk.label}
        </span>
      </div>

      {/* Regulatory caption */}
      <p className="mt-3 text-center text-xs text-[#6b7280] leading-relaxed max-w-[220px]">
        {currentRisk.description}
      </p>
    </div>
  );
}
