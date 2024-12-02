/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { fileURLToPath, URL } from 'url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.ts',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        quasar({
            sassVariables: path.resolve(__dirname, './resources/css/quasar-variables.sass'),
        }),
        AutoImport({
            imports: [
                'vue',
                {
                    '@inertiajs/vue3': ['Head', 'Link'],
                    '@formkit/vue': ['useFormKitContext', 'createInput'],
                    '@/schemas/auth': ['loginSchema'],
                },
            ],
            dts: 'resources/js/auto-imports.d.ts',
            dirs: ['resources/js/composables/**', 'resources/js/utils/**'],
            vueTemplate: true,
        }),
        Components({
            dirs: ['resources/js/Components'],
            dts: 'resources/js/components.d.ts',
            include: [/\.vue$/, /\.vue\?vue/],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
        },
    },
    server: {
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
        },
    },
});
