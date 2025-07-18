// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    srcDir: './pages',
    vite: {
        plugins: [tailwindcss()],
        publicDir: '../public',
        resolve: {
            preserveSymlinks: true,
        },
        server: {
            hmr: {
                overlay: false
            }
        },
        optimizeDeps: {
            force: true,
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: undefined
                }
            }
        }
    },
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
        ['meta', {
            name: 'google-site-verification',
            content: 'jknyn5AQRCyHKjLqSGjLwz8y0Ff1tTXuR4b9nCVbCqA'
        }],
        // 全局 alternate links
        ['link', { rel: 'alternate', hreflang: 'en-us', href: 'https://vue-datepicker.tiaohsun.dev/en-us/' }],
        ['link', { rel: 'alternate', hreflang: 'zh-tw', href: 'https://vue-datepicker.tiaohsun.dev/zh-tw/' }],
        ['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://vue-datepicker.tiaohsun.dev/en-us/' }],
        ['link', { rel: 'canonical', href: 'https://vue-datepicker.tiaohsun.dev/' }],
    ],

    // 添加站點級別的配置
    title: "Vue-Datepicker",
    description: "A Vue 3 datepicker component with multi-calendar support",
    sitemap: {
        hostname: 'https://vue-datepicker.tiaohsun.dev',
    },
    locales: {
        'en-us': {
            label: 'English',
            lang: 'en-US',
            title: "Vue-Datepicker",
            description: "A Vue 3 datepicker component with multi-calendar support",
            head: [
                ['meta', { name: 'author', content: 'tiaohsun' }],
                ['meta', { property: 'og:title', content: 'Vue-Datepicker' }],
                ['meta', { property: 'og:description', content: 'A Vue 3 datepicker component with multi-calendar support' }],
                ['meta', { property: 'og:type', content: 'website' }],
                ['meta', { property: 'og:url', content: 'https://vue-datepicker.tiaohsun.dev/en-us/' }],
                ['meta', { property: 'og:locale', content: 'en_US' }],
                ['link', { rel: 'canonical', href: 'https://vue-datepicker.tiaohsun.dev/en-us/' }],
            ],
            themeConfig: {
                nav: [
                    { text: 'Home', link: '/en-us/' },
                    { text: 'Guide', link: '/en-us/guide/installation' },
                    { text: 'v1.0.X', link: 'https://github.com/Tiaohsun31/vue-datatable/releases' }
                ],
                sidebar: [
                    {
                        text: 'Getting Started',
                        items: [
                            { text: 'Installation', link: '/en-us/guide/installation' },
                            { text: 'Basic Usage', link: '/en-us/guide/basic-usage' }
                        ]
                    },
                    {
                        text: 'Components',
                        items: [
                            { text: 'DatePicker', link: '/en-us/components/datepicker' },
                            { text: 'DateRange', link: '/en-us/components/daterange' },
                        ]
                    },
                    {
                        text: 'Calendar Systems',
                        items: [
                            { text: 'Calendar Systems', link: '/en-us/calendars/basic' },
                            { text: 'ROC Plugin', link: '/en-us/calendars/roc-plugin' },
                        ]
                    },
                    {
                        text: 'Customization',
                        items: [
                            { text: 'Theme & Mode', link: '/en-us/customization/theming' },
                            { text: 'Error Message', link: '/en-us/customization/error-message' }
                        ]
                    },
                ],
                search: {
                    provider: 'local',
                    options: {
                        miniSearch: {
                            options: {
                                tokenize: (string) => string.split(/[\s\-]+/),
                                processTerm: (term) => term.toLowerCase()
                            },
                            searchOptions: {
                                fuzzy: 0.2,
                                prefix: true,
                                boost: { title: 4, text: 2, titles: 1 }
                            }
                        }
                    }
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Tiaohsun31/vue-datepicker' }
                ]
            }
        },

        'zh-tw': {
            label: '繁體中文',
            lang: 'zh-TW',
            title: "Vue-Datepicker",
            description: '一個基於 Vue 3 的日期選擇器組件，支援多種日曆系統和自定義主題',
            head: [
                ['meta', { name: 'author', content: 'tiaohsun' }],
                ['meta', { property: 'og:title', content: 'Vue-Datepicker' }],
                ['meta', { property: 'og:description', content: '一個基於 Vue 3 的日期選擇器組件，支援多種日曆系統和自定義主題' }],
                ['meta', { property: 'og:type', content: 'website' }],
                ['meta', { property: 'og:url', content: 'https://vue-datepicker.tiaohsun.dev/zh-tw/' }],
                ['meta', { property: 'og:locale', content: 'zh_TW' }],
                ['link', { rel: 'canonical', href: 'https://vue-datepicker.tiaohsun.dev/zh-tw/' }],
            ],
            themeConfig: {
                nav: [
                    { text: '首頁', link: '/zh-tw/' },
                    { text: '指南', link: '/zh-tw/guide/installation' },
                    { text: 'v1.0.X', link: 'https://github.com/Tiaohsun31/vue-datatable/releases' }
                ],
                sidebar: [
                    {
                        text: '開始使用',
                        items: [
                            { text: '安裝指南', link: '/zh-tw/guide/installation' },
                            { text: '基礎使用', link: '/zh-tw/guide/basic-usage' }
                        ]
                    },
                    {
                        text: '組件',
                        items: [
                            { text: 'DatePicker', link: '/zh-tw/components/datepicker' },
                            { text: 'DateRange', link: '/zh-tw/components/daterange' },
                        ]
                    },
                    {
                        text: '日曆系統',
                        items: [
                            { text: '日曆系統', link: '/zh-tw/calendars/basic' },
                            { text: 'ROC 插件', link: '/zh-tw/calendars/roc-plugin' },
                        ]
                    },
                    {
                        text: '自定義',
                        items: [
                            { text: '主題設定', link: '/zh-tw/customization/theming' },
                            { text: '錯誤訊息', link: '/zh-tw/customization/error-message' }
                        ]
                    },
                ],
                search: {
                    provider: 'local',
                    options: {
                        locales: {
                            'zh-tw': {
                                translations: {
                                    button: {
                                        buttonText: '搜尋文檔',
                                        buttonAriaLabel: '搜尋文檔'
                                    }
                                }
                            }
                        },
                        miniSearch: {
                            options: {
                                tokenize: (string) => string.split(/[\s\-\u4e00-\u9fff]+/),
                                processTerm: (term) => term.toLowerCase()
                            },
                            searchOptions: {
                                fuzzy: 0.1, // 中文搜尋建議降低模糊匹配
                                prefix: true,
                                boost: { title: 4, text: 2, titles: 1 }
                            }
                        }
                    }
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Tiaohsun31/vue-datepicker' }
                ]
            }
        }
    }
})
