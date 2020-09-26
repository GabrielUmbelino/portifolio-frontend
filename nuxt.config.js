export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  env: {
    API_URL: process.env.API_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
  generate: {
    fallback: 'index.html',
  },
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.less', '~/assets/styles/styles.less'],
  styleResources: { less: ['~/assets/styles/theme.less'] },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/antd-ui', '@/plugins/vuetimeline.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'POR',
            code: 'pt',
            locale: 'pt-BR',
            file: 'pt-BR.js',
          },
          {
            name: 'ENG',
            code: 'en',
            locale: 'en-US',
            file: 'en-US.js',
          },
        ],
        langDir: 'lang/',
        defaultLocale: 'pt',
        lazy: true,
      },
    ],
    ['@nuxtjs/style-resources'],
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:1337/graphql',
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    loaders: {
      less: {
        javascriptEnabled: true,
      },
    },
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
  },
}
