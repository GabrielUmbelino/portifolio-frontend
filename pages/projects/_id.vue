<template>
  <div v-if="work" class="work-details">
    <ProjectHeader
      :name="localizedWork.name"
      :background-color="work.backgroundColor"
      :repository="work.repository"
      :mock-url="mockUrl"
      :is-mobile="isMobile"
    />
    <a-layout class="layout">
      <a-layout-content>
        <div class="content">
          <a-row type="flex">
            <a-col class="description" :xs="24">
              <h2>
                {{ localizedWork.name }}
              </h2>
              <p>
                {{ localizedWork.details }}
              </p>
            </a-col>
            <a-col :xl="12" :xs="24">
              <Technologies :technologies="work.technologies" />
            </a-col>
            <a-col :xl="12" :xs="24">
              <Categories :categories="localizedWork.categories" />
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
      <ProjectStats
        :project-period="work.project_period"
        :team-size="work.team_size"
        :happy-customers="work.happy_customers"
      />
      <ProjectImages
        :mock-url-list="localizedWork.mockUrlList"
        :is-mobile="localizedWork.isProjectImagesMobile"
        :background-color="work.backgroundColor"
      />
    </a-layout>
  </div>
</template>

<script>
import { post, apiUrl } from '~/utils/Strapi'
import projectQuery from '~/apollo/queries/pages/project.gql'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'
import ProjectHeader from '~/components/project/project-header'
import ProjectStats from '~/components/project/project-stats'
import ProjectImages from '~/components/project/project-images'
import Technologies from '~/components/shared/technologies.js'
import Categories from '~/components/shared/categories.js'

export default {
  components: {
    ProjectHeader,
    Technologies,
    Categories,
    ProjectStats,
    ProjectImages
  },
  async asyncData({ store }) {
    const { pages: sections } = await post(sectionsQuery.loc.source.body)
    store.commit(
      'header/setSections',
      sections.sort((a, b) => (a.order < b.order ? -1 : 1))
    )
    store.commit('header/setApiUrl', apiUrl)
  },
  computed: {
    localizedWork() {
      if (!this.work) {
        return null
      }

      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      const categories = this.work.categories.map((category) => ({
        description: category[`description_${lang}`]
      }))
      const isProjectImagesMobile =
        this.work.mobile_images && this.work.mobile_images.length > 0
      let mockUrlList = []

      if (isProjectImagesMobile) {
        mockUrlList = this.work.mobile_images.map(
          ({ url }) => `${apiUrl}${url}`
        )
      } else {
        mockUrlList = this.work.images.map(({ url }) => `${apiUrl}${url}`)
      }

      return {
        name: this.work[`name_${lang}`],
        details: this.work[`details_${lang}`],
        categories,
        isProjectImagesMobile,
        mockUrlList
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
  },
  head: {
    script: [
      {
        src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js'
      }
    ]
  },
  apollo: {
    // TODO move this request to asyncData
    work: {
      prefetch: true,
      query: projectQuery,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>
<style lang="less">
.work-details {
  font-size: 1.2rem;
  .layout {
    margin: auto;
  }

  .ant-layout-content {
    max-width: 100%;
    .content {
      padding: 40px 10px;
      width: 800px;
      max-width: 100%;
      margin: auto;
      .ant-row-flex {
        .ant-col {
          margin-bottom: 3.125rem;
          &.description {
            h2 {
              font-size: 2.125rem;
              text-align: left;
              font-weight: bold;
              margin-bottom: 15px;
              line-height: 52px;
            }
            p {
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>
