"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

/* -----------------------------------------------------------------------------
 * Pixel canvas
 * Animated grid of pixels that ripples in from the center on hover and fades
 * out on leave. Colors are drawn from the card's brand palette.
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number,
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.1, 0.9) * baseSpeed,
    size: 0,
    sizeStep: Math.random() * 0.4,
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current
      ? 0
      : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current
          ? 0
          : Math.sqrt(dx * dx + dy * dy);
        pixels.push(
          createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay),
        );
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    const card = wrapRef.current?.parentElement;
    const handleEnter = () => animate("appear");
    const handleLeave = () => animate("disappear");
    card?.addEventListener("mouseenter", handleEnter);
    card?.addEventListener("mouseleave", handleLeave);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
      card?.removeEventListener("mouseenter", handleEnter);
      card?.removeEventListener("mouseleave", handleLeave);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Logo SVGs
 * -------------------------------------------------------------------------- */

type LogoSvgProps = { className?: string; style?: React.CSSProperties };

function ForbesLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fontFamily="serif"
        letterSpacing="1"
      >
        Forbes
      </text>
    </svg>
  );
}

function TechCrunchLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="-0.5"
      >
        TechCrunch
      </text>
    </svg>
  );
}

function BloombergLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        Bloomberg
      </text>
    </svg>
  );
}

function ReutersLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <circle cx="16" cy="16" r="8" fill="#FF8000" />
      <text x="32" y="22" fontSize="20" fontWeight="normal" fontFamily="serif">
        REUTERS
      </text>
    </svg>
  );
}

function WiredLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 100 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="22"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="1"
      >
        WIRED
      </text>
    </svg>
  );
}

function WSJLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 80 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fontFamily="serif"
      >
        WSJ
      </text>
    </svg>
  );
}

function CNBCLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 100 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        CNBC
      </text>
    </svg>
  );
}

function FTLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 160 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="normal"
        fontFamily="serif"
      >
        FINANCIAL TIMES
      </text>
    </svg>
  );
}

function BusinessInsiderLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 180 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        BUSINESS INSIDER
      </text>
    </svg>
  );
}

function YahooFinanceLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 150 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        yahoo! finance
      </text>
    </svg>
  );
}

function InvestopediaLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 160 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight="normal"
        fontFamily="serif"
      >
        Investopedia
      </text>
    </svg>
  );
}

function MarketWatchLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 150 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        MarketWatch
      </text>
    </svg>
  );
}

function BarronLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fontFamily="serif"
      >
        BARRON'S
      </text>
    </svg>
  );
}

function FortuneLogo({ className, style }: LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="1"
      >
        FORTUNE
      </text>
    </svg>
  );
}

type Logo = {
  name: string;
  brandLight: string;
  brandDark?: string;
  height: number;
  multicolor: boolean;
  pixelColors: string[];
  row: number;
  col: number;
  Svg: React.ComponentType<LogoSvgProps>;
};

const LOGOS: Logo[] = [
  // Row 1
  {
    name: "Forbes",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#333333", "#666666"],
    row: 1,
    col: 1,
    Svg: ForbesLogo,
  },
  {
    name: "TechCrunch",
    brandLight: "#00A562",
    height: 24,
    multicolor: false,
    pixelColors: ["#00A562", "#008542", "#00C582"],
    row: 1,
    col: 2,
    Svg: TechCrunchLogo,
  },
  {
    name: "Bloomberg",
    brandLight: "#2800D7",
    height: 24,
    multicolor: false,
    pixelColors: ["#2800D7", "#4820F7", "#1800B7"],
    row: 1,
    col: 3,
    Svg: BloombergLogo,
  },
  {
    name: "Reuters",
    brandLight: "#FF8000",
    height: 24,
    multicolor: true,
    pixelColors: ["#FF8000", "#FF6000", "#FFA000"],
    row: 1,
    col: 4,
    Svg: ReutersLogo,
  },
  {
    name: "Wired",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#111111", "#444444"],
    row: 1,
    col: 5,
    Svg: WiredLogo,
  },

  // Middle rows (text block spans cols 2-4, rows 2-3)
  {
    name: "WSJ",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#222222", "#555555"],
    row: 2,
    col: 1,
    Svg: WSJLogo,
  },
  {
    name: "CNBC",
    brandLight: "#00478F",
    height: 24,
    multicolor: false,
    pixelColors: ["#00478F", "#00376F", "#0057AF"],
    row: 3,
    col: 1,
    Svg: CNBCLogo,
  },
  {
    name: "FT",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#333333", "#666666"],
    row: 2,
    col: 5,
    Svg: FTLogo,
  },
  {
    name: "Business Insider",
    brandLight: "#1F73B7",
    height: 24,
    multicolor: false,
    pixelColors: ["#1F73B7", "#0F5397", "#2F93D7"],
    row: 3,
    col: 5,
    Svg: BusinessInsiderLogo,
  },

  // Row 4
  {
    name: "Yahoo Finance",
    brandLight: "#6001D2",
    height: 24,
    multicolor: false,
    pixelColors: ["#6001D2", "#4001B2", "#8001F2"],
    row: 4,
    col: 1,
    Svg: YahooFinanceLogo,
  },
  {
    name: "Investopedia",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#222222", "#444444"],
    row: 4,
    col: 2,
    Svg: InvestopediaLogo,
  },
  {
    name: "MarketWatch",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#111111", "#333333"],
    row: 4,
    col: 3,
    Svg: MarketWatchLogo,
  },
  {
    name: "Barron's",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#222222", "#555555"],
    row: 4,
    col: 4,
    Svg: BarronLogo,
  },
  {
    name: "Fortune",
    brandLight: "#000000",
    height: 24,
    multicolor: false,
    pixelColors: ["#000000", "#111111", "#444444"],
    row: 4,
    col: 5,
    Svg: FortuneLogo,
  },
];

function LogoCard({ logo }: { logo: Logo }) {
  const { Svg, multicolor, brandLight, height, pixelColors, row, col } = logo;

  return (
    <div
      className={cn(
        "group relative grid place-items-center overflow-hidden bg-white cursor-pointer select-none isolate",
        "transition-all duration-300 hover:z-[2]",
        "[--brand:var(--brand-light)]",
        "hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--brand)_25%,transparent),0_0_0_1px_color-mix(in_srgb,var(--brand)_40%,transparent)]",
      )}
      style={
        {
          "--brand-light": brandLight,
          gridRow: row,
          gridColumn: col,
        } as React.CSSProperties
      }
    >
      <PixelCanvas colors={pixelColors} gap={5} speed={30} />
      <Svg
        className={cn(
          "relative z-[1] w-auto max-w-[80%] transition-all duration-300 group-hover:scale-[1.06]",
          multicolor
            ? cn(
                "grayscale opacity-70",
                "group-hover:grayscale-0 group-hover:opacity-100",
              )
            : "text-gray-500 group-hover:text-[var(--brand)]",
        )}
        style={{ height: `${height}px`, maxHeight: `${height}px` }}
      />
    </div>
  );
}

export type ComponentProps = {
  badge?: string;
  heading?: string;
};

export const PixelLogoGrid = ({
  badge = "Featured In",
  heading = "Recognized by top financial publications across the globe",
}: ComponentProps = {}) => {
  return (
    <section className="w-full bg-[#f4f5f7] px-4 py-20 md:px-12 md:py-24">
      <div
        className="grid grid-cols-2 md:grid-cols-5 max-w-[1160px] mx-auto gap-px bg-gray-200 border border-gray-200 shadow-sm rounded-xl overflow-hidden"
        style={{ gridTemplateRows: "repeat(4, 96px)" }}
      >
        {LOGOS.map((logo) => (
          <LogoCard key={logo.name} logo={logo} />
        ))}

        <div
          className="flex flex-col items-center justify-center gap-5 bg-white hidden md:flex"
          style={{ gridColumn: "2 / span 3", gridRow: "2 / span 2" }}
        >
          {/* <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm">
            {badge}
          </span> */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 max-w-[516px] leading-tight tracking-tight px-4">
            {heading}
          </h2>
        </div>
      </div>
    </section>
  );
};
