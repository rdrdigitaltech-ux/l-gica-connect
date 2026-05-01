import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":    ["react", "react-dom"],
          "vendor-router":   ["react-router-dom"],
          "vendor-query":    ["@tanstack/react-query"],
          "vendor-ui":       [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-aspect-ratio",
          ],
          "vendor-icons":     ["lucide-react"],
          "vendor-animation": ["framer-motion"],
          "vendor-forms":     [
            "react-hook-form",
            "@hookform/resolvers",
            "zod",
            "input-otp",
          ],
          "vendor-utils":     [
            "clsx",
            "class-variance-authority",
            "tailwind-merge",
            "tailwindcss-animate",
            "date-fns",
          ],
          "vendor-carousel":  ["embla-carousel-react"],
          "vendor-charts":    ["recharts"],
          "vendor-extras":    [
            "cmdk",
            "vaul",
            "react-resizable-panels",
            "react-day-picker",
            "sonner",
            "next-themes",
          ],
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },
}));
