<template>
  <div v-if="work">
    <project-header
      :name="localizedWork.name"
      :backgroundColor="work.backgroundColor"
      :repository="work.repository"
      :mockUrl="mockUrl"
      :isMobile="isMobile"
    />
    <a-layout class="layout">
      <a-layout-content :style="{ minHeight: '280px' }">
        <div class="section" v-if="localizedWork">
          <div class="content">
            <h2>
              {{ localizedWork.name }}
            </h2>
            <p>
              {{ localizedWork.details }}
            </p>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { post, apiUrl } from '~/utils/Strapi'
import projectQuery from '~/apollo/queries/pages/project.gql'
import contentQuery from '~/apollo/queries/pages/content.gql'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'
import ProjectHeader from '~/components/shared/project/project-header'
export default {
  head: {
    script: [
      {
        src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js'
      }
    ]
  },
  components: {
    ProjectHeader
  },
  async asyncData({ store }) {
    const { pages: sections } = await post(sectionsQuery.loc.source.body)
    store.commit(
      'header/setSections',
      sections.sort((a, b) => (a.order < b.order ? -1 : 1))
    )
    store.commit('header/setApiUrl', apiUrl)
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
        return null
      }

      const lang = this.$i18n.locale || this.$i18n.defaultLocale

      return {
        name: this.work[`name_${lang}`],
        details: this.work[`details_${lang}`]
      }
    },
    isMobile() {
      return (
        this.work.mockup_image &&
        this.work.mockup_image.width < this.work.mockup_image.height
      )
    },
    mockUrl() {
      if (!this.work.mockup_image) {
        return null
      }

      return `${apiUrl}${this.work.mockup_image.url}`
    }
  }
}
</script>
<style lang="less">
.layout {
  margin: auto;

  .ant-layout-content {
    max-width: 100%;
    .content {
      padding: 40px 10px;
      width: 800px;
      max-width: 100%;
      margin: auto;
      h2 {
        font-size: 3rem;
        text-align: center;
      }
    }
  }
}
</style>
