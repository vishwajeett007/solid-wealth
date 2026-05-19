"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  onLetterAnimationComplete?: () => void;
  trigger?: boolean;
}

export function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag: Tag = "p",
  onLetterAnimationComplete,
  trigger = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  // Ensure animations trigger only when web fonts are fully ready
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.fonts && document.fonts.status === "loaded") {
        setFontsLoaded(true);
      } else if (document.fonts) {
        document.fonts.ready.then(() => {
          setFontsLoaded(true);
        });
      } else {
        setFontsLoaded(true);
      }
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      
      const el = ref.current;
      const targets = el.querySelectorAll(".split-item");

      if (!targets.length) return;

      // When trigger is false, immediately reset items to their hidden states and clear complete flag
      if (!trigger) {
        gsap.set(targets, { ...from });
        animationCompletedRef.current = false;
        return;
      }

      // If already animated, don't replay stagger until reset occurs
      if (animationCompletedRef.current) return;

      const tween = gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        }
      );

      return () => {
        tween.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        fontsLoaded,
        trigger,
      ],
      scope: ref,
    }
  );

  const style: React.CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
  };

  const items = splitType === "words" ? text.split(" ") : text.split("");

  return (
    <Tag ref={ref as any} style={style} className={`split-parent ${className}`}>
      {items.map((item, index) => {
        // Handle space characters in character mode beautifully
        if (splitType === "chars" && item === " ") {
          return (
            <span key={index} className="inline-block">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={index}
            className="split-item inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {item}
            {splitType === "words" && index < items.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}

export default SplitText;
