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
                    { text: '安裝指南', link: '/guide/installation' },
                    { text: '基礎使用', link: '/guide/basic-usage' }
                ]
            },
            {
                text: 'API Reference',
                items: [
                    { text: 'Props', link: '/api/props' },
                    { text: 'Events', link: '/api/events' },
                    { text: 'Slots', link: '/api/slots' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Tiaohsun31/vue-datepicker' }
        ]
    }
})
