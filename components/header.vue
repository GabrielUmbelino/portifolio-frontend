<template>
  <a-layout-header>
    <a-row  type="flex" justify="space-between">
      <a-col class="gutter-row" :lg="1" :md="2" :xs="3">
        <a-icon type="smile" theme="twoTone" />
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
</template>
<script>
import { post } from '~/utils/Strapi.js'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'
import LanguageSwitcher from './languageSwitcher'
export default {
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      sections: []
    }
  },
  async mounted() {
    this.fetch().then((sections) => (this.sections = sections))
  },
  methods: {
    async fetch() {
      const { pages } = await post(sectionsQuery.loc.source.body)
      return pages.sort((a, b) => (a.order < b.order ? -1 : 1))
    }
  },
  computed: {
    localizedSections() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale;
      return this.sections.map(locale => ({
        id: locale.id,
        description: locale[`description_${lang}`]
      }))
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
  .logo
    width: 120px
    height: 31px
    background: rgba(255, 255, 255, 0.2)
    margin: 16px 28px 16px 0
    float: left
</style>
