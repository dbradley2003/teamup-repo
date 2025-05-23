import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 base: "/",
 plugins: [react()],
 preview: {
  port: 5173,
  strictPort: true,
 },
 server: {
  port: 5173,
  strictPort: true,
  host: true,
  // origin: "http://0.0.0.0:8080",
 },
//  "VITE_API_URL": JSON.stringify(process.env.VITE_API_URL || "http://localhost:8000"),
});