<template>
  <div v-if="work" class="work-details">
    <ProjectHeader
      :name="localizedWork.name"
      :background-color="work.backgroundColor"
      :repository="work.repository"
      :mock-url="projectImageUrl"
      :is-mobile="isMobile"
    />
    <a-layout class="layout">
      <a-layout-content>
        <div class="content">
          <a-row type="flex">
            <a-col
              v-if="
                localizedWork.project_roles &&
                localizedWork.project_roles.length
              "
              :xs="24"
            >
              <Roles :roles="localizedWork.project_roles" />
            </a-col>
            <a-col
              v-if="
                localizedWork.SoftwareAndResources &&
                localizedWork.SoftwareAndResources.length
              "
              :xs="24"
            >
              <SoftwareAndResources
                :software-and-resources="localizedWork.SoftwareAndResources"
              />
            </a-col>
            <a-col
              v-if="work.technologies && work.technologies.length"
              :xs="24"
            >
              <Technologies :technologies="work.technologies" />
            </a-col>
            <a-col v-if="localizedWork.problem" class="description" :xs="24">
              <h2>
                {{ $t('problem') }}
              </h2>
              <p>
                {{ localizedWork.problem }}
              </p>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
      <ProjectStats :project-stats="localizedWork.projectStats" />
      <client-only>
        <ProjectImages
          :mock-url-list="localizedWork.mockUrlList"
          :is-mobile="isMobile"
          :background-color="work.backgroundColor"
        />
      </client-only>
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
import SoftwareAndResources from '~/components/shared/softwareAndResources.js'
import Roles from '~/components/shared/roles.js'

export default {
  components: {
    ProjectHeader,
    Technologies,
    ProjectStats,
    ProjectImages,
    SoftwareAndResources,
    Roles,
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

      const categories = this.work.categories.map((category) => ({
        description: category[`description_${this.lang}`],
      }))

      return {
        categories,
        mockUrlList: this.mockUrlList,
        projectStats: this.projectStats,
        name: this.work[`name_${this.lang}`],
        problem: this.work[`problem_${this.lang}`],
      }
    },
    isMobile() {
      return (
        this.work.mockup_image &&
        this.work.mockup_image.width < this.work.mockup_image.height
      )
    },
    projectImageUrl() {
      if (!this.work.mockup_image) {
        return null
      }

      return `${apiUrl}${this.work.mockup_image.url}`
    },
    mockUrlList() {
      const images = this.isMobile ? this.work.mobile_images : this.work.images
      return images.map(({ url }) => `${apiUrl}${url}`)
    },
    projectStats() {
      return this.work.project_stats.map((stats) => ({
        ...stats,
        description: stats[`description_${this.lang}`],
      }))
    },
    lang() {
      return this.$i18n.locale || this.$i18n.defaultLocale
    },
  },
  head: {
    script: [
      {
        src: 'https://unpkg.com/ionicons@5.0.0/dist/ionicons.js',
      },
    ],
  },
  apollo: {
    // TODO move this request to asyncData
    work: {
      prefetch: true,
      query: projectQuery,
      variables() {
        return { id: this.$route.params.id }
      },
    },
  },
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
