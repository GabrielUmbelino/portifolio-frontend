<template>
  <div>
    <header-banner-project
      v-if="work"
      :name="localizedWork.name"
      :mobileMockupImage="work.mobile_mockup_image"
      :webMockupImage="work.web_mockup_image"
      :repositoryUrl="work.repository"
      :previewUrl="work.link"
      :backgroundColor="work.backgroundColor"
    />
    <a-layout class="layout">
      <a-layout-content :style="{ minHeight: '280px' }">
          <b>
            {{ localizedWork.name }}
          </b>
          <p>
            {{ localizedWork.description }}
          </p>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { post, apiUrl } from '~/utils/Strapi'

import HeaderBannerProject from '~/components/layout/header-banner-project'

import projectQuery from '~/apollo/queries/pages/project.gql'
import contentQuery from '~/apollo/queries/pages/content.gql'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'

export default {
  head: {
    script: [
      {
        src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js'
      }
    ]
  },
  components: {
    HeaderBannerProject
  },
  async asyncData({ store }) {
    const { pages: sections } = await post(sectionsQuery.loc.source.body)
    store.commit(
      'header/setSections',
      sections.sort((a, b) => (a.order < b.order ? -1 : 1))
    )
    store.commit('header/setApiUrl', apiUrl)
  },
  data() {
    return {
      work: null
    }
  },
  apollo: {
    work: {
      prefetch: true,
      query: projectQuery,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  },
  computed: {
    localizedWork() {
      if (!this.work) {
        return []
      }

      const lang = this.$i18n.locale || this.$i18n.defaultLocale

      return {
        name: this.work[`name_${lang}`],
        description: this.work[`description_${lang}`]
      }
    }
  }
}
</script>
<style lang="less">
.layout {
  margin: auto;
  .ant-layout-content {
    max-width: 100%;
  }
}
</style>
