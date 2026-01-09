// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false, // ✅ ensures SSR is enabled
  app: {
    head: {
      title: "ClickHospitals",
      meta: [
        { name: "description", content: "A simple Nuxt SSR example with useHead" },
        { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicons/favicon-32x32.png' },
        //   // ✅ Bootstrap CSS
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",

        },

        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css",
        },
        //   // ✅ Google Fonts: Moulpali (loaded with print -> all trick)
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap",
        },
        //   // ✅ Font Awesome
        // {
        //   rel: "stylesheet",
        //   href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css",
        // },
      ],

    },
  },

  css: [
    '~/assets/css/style.css',
    '~/assets/css/start.css',
    '~/assets/css/partner.css',
    '~/assets/css/otp.css',
    '~/assets/css/modal.css',
    '~/assets/css/list.css',
    '~/assets/css/header.css',
    '~/assets/css/footer.css',
    '~/assets/css/details.css',
    '~/assets/css/contact.css',
    '~/assets/css/about.css',
    '~/assets/css/main.css'
  ],

  modules: [
    'usebootstrap',
    '@nuxt/eslint',
    'nuxt-link-checker',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/color-mode'
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 'tab',
        semi: true,
      }
    }
  },
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseUrl: 'https://flyhospitals.dev/api',
      ImageUrl: 'https://flyhospitals.dev/',
      webUrl: 'https://clickhospitals.com/',
    },
  },
})
