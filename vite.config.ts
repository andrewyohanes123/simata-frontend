import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import unfonts from "unplugin-fonts/vite";
import tsConfigPaths from "vite-tsconfig-paths";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    tsConfigPaths(),
    splitVendorChunkPlugin(),
    unfonts({
      custom: {
        prefetch: true,
        preload: false,
        families: [
          {
            /**
             * Name of the font family.
             */
            name: "Barlow",
            /**
             * Local name of the font. Used to add `src: local()` to `@font-rule`.
             */
            local: "Barlow",
            /**
             * Regex(es) of font files to import. The names of the files will
             * predicate the `font-style` and `font-weight` values of the `@font-rule`'s.
             */
            src: "./src/assets/fonts/*.ttf",

            /**
             * This function allow you to transform the font object before it is used
             * to generate the `@font-rule` and head tags.
             */
            transform(font) {
              if (font.basename === "Barlow-Bold") {
                // update the font weight
                font.weight = 700;
              }

              // we can also return null to skip the font
              return font;
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          yup: ["yup"],
          icons: ["@tabler/icons-react"],
          react: ["react"],
          mantine: ["@mantine/core", "@mantine/form"],
          mapbox: ["mapbox-gl"],
        },
      },
    },
  },
});
