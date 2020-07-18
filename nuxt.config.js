export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  env: {
    API_URL: process.env.API_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'ant-design-vue/dist/antd.less',
    '~/assets/styles/styles.less',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/antd-ui',
    "@/plugins/vuetimeline.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    ['nuxt-i18n', {
      locales: [
        {
          name: 'Português',
          code: 'pt',
          locale: 'pt-BR',
          file: 'pt-BR.js'
        },
        {
          name: 'English',
          code: 'en',
          locale: 'en-US',
          file: 'en-US.js'
        },
      ],
      langDir: 'lang/',
      defaultLocale: 'pt',
      lazy: true,
    }],
    ['@nuxtjs/style-resources'],
  ],
  styleResources: {
      less: [
        '~/assets/styles/theme.less',
      ]
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:1337/graphql'
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    loaders: {
      less: {
        javascriptEnabled: true,
      }
    },
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
