import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bolt,
  Gem,
  Globe2,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";

export type FeatureItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type MarketItem = {
  name: string;
  value: string;
  change: string;
  direction: "up" | "down";
};

export type NavLinkItem = {
  label: string;
  href: string;
  active?: boolean;
};

export const navLinks: NavLinkItem[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Analytics", href: "#analytics" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

export const avatarImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDImuTWeiOslCRTrKKhik4leMjn_rYr8_aMjek7x03ufVxMbfh4k-J9IsIIKtl84fYz5R8Vjpdl9bQoiWGxEAJae4QMvSETmY8R1ViujHl2QR5K4mYAADtAot2Z8xSMbtJNTclxCRaAsWvm5mmAWqoAJcUyaL8H8HfJfoE3l7QOndXWL6z7uOGff3c1qBBAEs8HYxZUEnEzWhqs6iExrFk464wRqOQPvTHMWkrjKN2E3VMCxmgFf8vNRozjBqquKyZDfv4pMXND4v8",
    alt: "Investor profile",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBseB2ULs3kypwkVePaGsUuRLRfgRkzFjkjAe2Dnk75Hk-gOkJ-0FK5X-MS3ddaSEGpM_QmhWxchqMocDgF4IrTciOKqIOmMq8PE6hxDUXWtn4LEeWoSpYrsJoOlUsbAYoQZrc1TLb8lJRltogkbPM4Wtax65uBeAoq8pxy6rRc0W5VHmwk3PLQeBCAMa41WEt70qcSAKWZBF2U8TBCRpYbn6cG8_UH09pz9xiffFrCQOuaA-ZD4hmWbA18GzxUVFC770qOS9xJ_ZA",
    alt: "Investor profile",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuASmwv2QeRSqcNGlk9xayhyJmEx6KCrftwA5KGjPNV_J4wbfllhb8i-RJm61omh6ZSBJ7vQkiqzk-E4z2RmJ_VWhw7xHNOPA_cpOscO0ewxP5wLAdnCx73XgLNDv35FPqRRwvS2V9cEugmdDFg8S-r3S2uYdnlvlScm6_OeUEgQZXIMxog3E36nTxBPQMATbSHC9NT4Gp0l5qL3TthpdGU6tdxq_4NDFIrsx24yIF9UsJFiMuVh4Helt8vlJf93D37Z0yGHfbR20mo",
    alt: "Investor profile",
  },
];

export const marketItems: MarketItem[] = [
  { name: "AAPL", value: "182.34", change: "+1.24%", direction: "up" },
  { name: "TSLA", value: "241.17", change: "-0.83%", direction: "down" },
  { name: "BTC/USD", value: "67,420", change: "+2.11%", direction: "up" },
  { name: "MSFT", value: "415.22", change: "+0.95%", direction: "up" },
  { name: "ETH/USD", value: "3,850", change: "+3.41%", direction: "up" },
  { name: "NVDA", value: "894.60", change: "+4.02%", direction: "up" },
  { name: "S&P 500", value: "5,214", change: "+0.71%", direction: "up" },
  { name: "GOOGL", value: "168.40", change: "-0.22%", direction: "down" },
];

export const featuredLogos = [
  "FORBES",
  "TECHCRUNCH",
  "BLOOMBERG",
  "REUTERS",
  "WIRED",
];

export const featureItems: FeatureItem[] = [
  {
    title: "Military-Grade Security",
    description:
      "Your assets are protected by advanced AES-256 encryption and multi-signature protocols, audited quarterly by independent firms.",
    href: "#security",
    icon: Shield,
  },
  {
    title: "Smart Analytics",
    description:
      "AI-driven insights that continuously analyze your spending patterns, portfolio exposure, and growth potential in real time.",
    href: "#analytics",
    icon: BarChart3,
  },
  {
    title: "Instant Transfers",
    description:
      "Move money across borders in seconds with zero hidden fees, transparent exchange rates, and real-time settlement tracking.",
    href: "#transfers",
    icon: Zap,
  },
];

export const wealthStats = [
  { value: "500", suffix: "+", label: "Financial Partners" },
  { value: "14", suffix: "M", label: "Active Users" },
  { value: "15", suffix: "K", label: "Institutional Clients" },
];

export const premiumBenefits = [
  {
    lead: "Personalized advisory services",
    detail: "with dedicated account managers available 24/7.",
  },
  {
    lead: "Real-time tax optimization",
    detail: "and automated reporting for high-net-worth portfolios.",
  },
  {
    lead: "Exclusive private equity",
    detail: "and venture capital opportunities reserved for members.",
  },
  {
    lead: "Global concierge benefits",
    detail: "and lifestyle perks seamlessly integrated into your wealth app.",
  },
];

export const sectionIcons = {
  bolt: Bolt,
  globe: Globe2,
  gem: Gem,
  trending: TrendingUp,
};

export const statsImage = {
  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFRxGoNLCAFG7icA9aMwFFLiR5eQakicwoFZqJwc2m3YD_jVCfWGJu0RA8CDKpWsGioHVWB1xFCUerEVMPIBof4V7O6H4AS-9ShkZLpNvtnJgiMzVS9dQTCNhyQW3dQ7mMv1lwcEaxdRsR80yuCuMe1O1XodOopprWrsVnTvLf0ev7s8g-VaTU-T-MXuOG1uKOe9POaeGKrV-AHCQ8l5gzQBye16jVvgRqASepNKIzP7cxJ3YFSZxcZl7xZbhGlZ3ScAdIv8lCAm8",
  alt: "LuxeFinance dashboard analytics preview",
};

export const premiumImage = {
  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJl66m-vEFhyMT1MuIroTKs0S-mzDvKIihJttqznNbvXCMpQZE5l5u1bCqh9ekUjS4qrmBrc3PjEDBMsqdsPwb1oQE391_Trl0MGNFcU3BOWCjKMPv01z0i2G2UHTx-AuVz2p9Eo_JYIGYHV8x9oszi1ZhRK3bo0z5hYfffaPZ-E92AIzx2eiczjOaff2DZo8Uj_VxSDCsGiZpvhuT50LdnBtU4f17miWOViTMVGgwWbbSOTKEyqiV-hHrz_EoyfWXpvFBY0oL8cQ",
  alt: "LuxeFinance advisory team collaborating with clients",
};
