import { defineConfig } from "vite"; // Use `import` instead of `require`
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
