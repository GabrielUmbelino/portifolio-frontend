import nodeExternals from 'webpack-node-externals'
import { get } from './utils/Strapi'

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
  generate: {
    routes() {
      return get('works').then((response) => {
        const routes = []
        response.forEach((payload) =>
          routes.push({
            route: `/projects/${payload.id}`,
            payload,
          })
        )
        response.forEach((payload) =>
          routes.push({
            route: `/en/projects/${payload.id}`,
            payload,
          })
        )
        return routes
      })
    },
  },
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
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.less', '~/assets/styles/styles.less'],
  styleResources: { less: ['~/assets/styles/theme.less'] },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/vue-timeline',
    { src: '@/plugins/vue-carousel', ssr: false },
  ],
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
    '@nuxtjs/style-resources',
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
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.GRAPHQL_URL || 'http://localhost:1337/graphql',
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
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
      if (ctx.isServer) {
        config.externals = [nodeExternals({ allowlist: [/^vue-carousel/] })]
      }
    },
  },
}
