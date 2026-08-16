declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": {
      src?: string;
      background?: string;
      speed?: string | number;
      loop?: boolean;
      autoplay?: boolean;
      style?: React.CSSProperties;
      [key: string]: unknown;
    };
  }
}
