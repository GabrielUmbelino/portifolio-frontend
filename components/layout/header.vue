<template>
  <div>
    <a-layout-header>
      <a-row type="flex" justify="space-between">
        <a-col class="gutter-row logo" :lg="1" :md="2" :xs="3">
          <img
              v-if="headerContent && headerContent.logo"
              :src="logoUrl"
              :width="headerContent.logo.width"
              :height="headerContent.logo.height"
            />
        </a-col>
        <a-col class="gutter-row" :lg="10" :md="8" :xs="6">
          <a-menu
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item v-for="section in localizedSections" :key="section.id">
              {{ section.description }}
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col class="gutter-row" :lg="1" :md="2" :xs="3">
          <language-switcher />
        </a-col>
      </a-row>
    </a-layout-header>
    <a-row class="header-content" :style="{ background: headerContent.backgroundColor }">
      <a-col class="logo" :xs="8" :offset="8">
        <img
          v-if="headerContent && headerContent.bannerImage"
          :src="bannerImageUrl"
          :width="headerContent.bannerImage.width"
          :height="headerContent.bannerImage.height"
        />
      </a-col>
      <a-col class="details" :xs="8" :offset="8" align="middle">
        <h2>{{localizedHeaderContent.title}}</h2>
        <span>{{localizedHeaderContent.description}}</span>
        <a-button @click="headerContent.headerActionLink" type="primary">
          {{ headerContent.headerActionText }}
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { post, apiUrl } from '~/utils/Strapi.js'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'
import headerContentQuery from '~/apollo/queries/pages/headerContent.gql'
import LanguageSwitcher from '~/components/shared/languageSwitcher'
export default {
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      sections: [],
      headerContent: {}
    }
  },
  async mounted() {
    this.fetch().then(({ headerContent, sections }) => {
      this.sections = sections
      this.headerContent = headerContent
    })
  },
  methods: {
    async fetch() {
      const { pages } = await post(sectionsQuery.loc.source.body)
      const { headerContent } = await post(headerContentQuery.loc.source.body)

      return {
        headerContent,
        sections: pages.sort((a, b) => (a.order < b.order ? -1 : 1))
      }
    }
  },
  computed: {
    localizedSections() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return this.sections.map((locale) => ({
        id: locale.id,
        description: locale[`description_${lang}`]
      }))
    },
    logoUrl() {
      return `${apiUrl}${this.headerContent.logo.url}`;
    },
    bannerImageUrl() {
      return `${apiUrl}${this.headerContent.bannerImage.url}`;
    },
    localizedHeaderContent() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale;
      return {
        title: this.headerContent[`title_${lang}`],
        description: this.headerContent[`description_${lang}`]
      }

    }
  }
}
</script>
<style lang="sass">
.ant-layout-header
  white-space: nowrap
  border: 0
  border-bottom: 1px solid #e8e8e8
  box-shadow: none
  background-color: #ffffff
  height: 66px
  .ant-row-flex
    height: 100%
    .logo
      height: 100%
      img
        max-height: 100%
        max-width: 100%
        padding: 10px
.header-content
  .logo
    img
      margin: 65px auto 40px auto
      display: block
  .details
    align-content: center
    margin-bottom: 60px
    > *
      text-align: center
      display: block
    > h2
      font-weight: bold
    > .ant-btn-primary
      margin-top: 33px
</style>
