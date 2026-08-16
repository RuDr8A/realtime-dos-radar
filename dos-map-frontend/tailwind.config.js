/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary": "#4a2800", "on-secondary-fixed": "#002204", "surface-container": "#201f21",
        "on-tertiary-container": "#8d0100", "on-secondary": "#00390a", "surface": "#131315",
        "tertiary-fixed": "#ffdad4", "on-tertiary-fixed-variant": "#930100", "on-secondary-container": "#95fb92",
        "outline": "#a38d7a", "error-container": "#93000a", "tertiary-container": "#ff9382",
        "surface-variant": "#353437", "surface-tint": "#ffb870", "on-primary-fixed-variant": "#693c00",
        "primary-fixed-dim": "#ffb870", "tertiary": "#ffbcb1", "on-surface": "#e5e1e4",
        "on-tertiary-fixed": "#410000", "primary-fixed": "#ffdcbe", "on-error-container": "#ffdad6",
        "surface-container-high": "#2a2a2c", "on-error": "#690005", "on-primary-container": "#653900",
        "secondary-container": "#00761f", "background": "#131315", "secondary-fixed": "#94f990",
        "inverse-surface": "#e5e1e4", "on-primary-fixed": "#2c1600", "surface-container-low": "#1b1b1d",
        "surface-dim": "#131315", "surface-container-highest": "#353437", "secondary": "#78dc77",
        "primary-container": "#ff9800", "outline-variant": "#554434", "error": "#ffb4ab",
        "primary": "#ffc081", "surface-bright": "#39393b", "tertiary-fixed-dim": "#ffb4a8",
        "on-secondary-fixed-variant": "#005313", "on-surface-variant": "#dbc2ad",
        "secondary-fixed-dim": "#78dc77", "surface-container-lowest": "#0e0e10",
        "on-tertiary": "#690100", "on-background": "#e5e1e4", "inverse-primary": "#8b5000",
        "inverse-on-surface": "#303032"
      },
     
      spacing: {
        "base": "4px",
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
      },
      fontFamily: {
        "telemetry-code": ["JetBrains Mono", "monospace"],
        "body-base": ["JetBrains Mono", "monospace"],
        "badge-caps": ["JetBrains Mono", "monospace"],
        "headline-md": ["JetBrains Mono", "monospace"],
        "title-sm": ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: [],
}
