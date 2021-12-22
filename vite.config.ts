const path = require("path");
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

function resolve(dir: string) {
  return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    extensions: [".js", ".vue", ".json", "jsx"],
    alias: {
      "@": resolve("src"),
    },
  },
});
