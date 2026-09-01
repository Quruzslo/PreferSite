export default function ClipMask() {
  return (
    <svg width="0" height="0" className="absolute block pointer-events-none">
      <defs>
        <clipPath id="rounded-clip" clipPathUnits="objectBoundingBox">
          <path d="M 0.914 0.001 H 0.092 A 0.049 0.032 0 0 0 0.051 0.016 L 0.01 0.057 A 0.032 0.032 0 0 0 0.002 0.075 v 0.851 a 0.032 0.032 0 0 0 0.008 0.018 l 0.036 0.036 a 0.065 0.043 0 0 0 0.054 0.019 h 0.805 a 0.065 0.043 0 0 0 0.056 -0.021 l 0.031 -0.035 a 0.032 0.032 0 0 0 0.007 -0.016 V 0.074 c 0 -0.006 -0.002 -0.011 -0.007 -0.016 L 0.957 0.017 A 0.049 0.032 0 0 0 0.914 0.001 Z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
