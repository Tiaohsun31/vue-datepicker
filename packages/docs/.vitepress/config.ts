import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
// https://vitepress.dev/reference/site-config
export default defineConfig({
    vite: {
        plugins: [
            tailwindcss()
        ],
        resolve: {
            preserveSymlinks: true,
        },
        server: {
            hmr: {
                overlay: false
            }
        },
        optimizeDeps: {
            force: true
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: undefined
                }
            }
        }
    },

    title: "Vue-Datepicker",
    description: "A VitePress Site",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/guide/markdown-examples' }
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: '安裝指南', link: '/pages/guide/installation' },
                    { text: '基礎使用', link: '/pages/guide/basic-usage' }
                ]
            },
            {
                text: 'Calendar Systems',
                items: [
                    { text: '日曆系統', link: '/pages/calendars/basic' },
                    { text: 'Roc Plugin', link: '/pages/calendars/roc-plugin' },
                ]
            },
            {
                text: 'API Reference',
                items: [
                    { text: 'Props', link: '/api/props' },
                    { text: 'Events', link: '/api/events' },
                    { text: 'Slots', link: '/api/slots' }
                ]
            }, {
                items: [
                    { text: 'Theme & Mode', link: '/pages/theming' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Tiaohsun31/vue-datepicker' }
        ]
    }
})
