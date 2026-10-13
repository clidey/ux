/*
 * Copyright 2025 Clidey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    // maplibre-gl >= 6.12 loads its worker from a sibling file via import.meta.url;
    // the dev pre-bundle copies the module but not the worker, so serve it unbundled.
    exclude: ["maplibre-gl"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // The showcase consumes the public entry point like an app would.
      "@clidey/ux": path.resolve(__dirname, "./src/index.ts"),
    },
  },
})