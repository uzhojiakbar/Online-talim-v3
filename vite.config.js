import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://37.27.215.130:5013", // Proksi sifatida ishlatiladigan server manzili
        changeOrigin: true, // Serverga kelayotgan so'rovni o'zgartirish
        secure: false, // Agar HTTPS bo'lsa, buni true qilib qo'yishingiz mumkin
        // pathRewrite: { '^/api': '' }, // Agar yo'lni o'zgartirmoqchi bo'lsangiz
      },
    },
    port: 5014,
  },
  preview: {
    port: 5014,
  },
});
