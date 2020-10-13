<template>
  <div v-if="work" class="work-details">
    <ProjectHeader
      :name="localizedWork.name"
      :background-color="work.backgroundColor"
      :repository="work.repository"
      :project_link="work.project_link"
      :mock-url="projectImageUrl"
      :is-mobile="isMobile"
    />
    <a-layout class="layout">
      <a-layout-content>
        <div class="content">
          <a-row>
            <a-col v-if="projectRoles && projectRoles.length" :xs="24">
              <Roles :roles="projectRoles" />
            </a-col>
            <a-col
              v-if="softwareAndResources && softwareAndResources.length"
              :xs="24"
            >
              <SoftwareAndResources
                :software-and-resources="softwareAndResources"
              />
            </a-col>
            <a-col
              v-if="work.technologies && work.technologies.length"
              :xs="24"
            >
              <Technologies :technologies="work.technologies" />
            </a-col>
            <a-col v-if="localizedWork.problem" class="problem" :xs="24">
              <h4 class="subtitle">
                {{ $t('problem') }}
              </h4>
              <p>
                {{ localizedWork.problem }}
              </p>
            </a-col>
            <a-col v-if="projectFeatures && projectFeatures.length" :xs="24">
              <ProjectFeatures :project-features="projectFeatures" />
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
      <ProjectStats :project-stats="projectStats" />
      <client-only>
        <ProjectImages
          :mock-url-list="mockUrlList"
          :background-color="work.backgroundColor"
        />
      </client-only>
    </a-layout>
  </div>
</template>

<script>
import { post, apiUrl, get } from '~/utils/Strapi'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'
import ProjectHeader from '~/components/project/project-header'
import ProjectStats from '~/components/project/project-stats'
import ProjectImages from '~/components/project/project-images'
import Technologies from '~/components/shared/technologies.js'
import SoftwareAndResources from '~/components/shared/softwareAndResources.js'
import Roles from '~/components/shared/roles.js'
import ProjectFeatures from '~/components/project/project-features'

export default {
  components: {
    Roles,
    Technologies,
    ProjectStats,
    ProjectImages,
    ProjectHeader,
    ProjectFeatures,
    SoftwareAndResources,
  },
  async asyncData({ store, payload, params }) {
    const { pages: sections } = await post(sectionsQuery.loc.source.body)
    store.commit(
      'header/setSections',
      sections.sort((a, b) => (a.order < b.order ? -1 : 1))
    )
    store.commit('header/setApiUrl', apiUrl)

    return {
      work: payload || (await get(`works/${params.id}`)),
    }
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
      const images = this.work.mobile_images.length
        ? this.work.mobile_images
        : this.work.images
      return images.map((image) => ({
        ...image,
        url: `${apiUrl}${image.url}`,
      }))
    },
    projectStats() {
      return this.work.project_stats.map((stats) => ({
        id: stats.id,
        number: stats.number,
        description: stats[`description_${this.lang}`],
      }))
    },
    projectFeatures() {
      return this.work.project_features.map((feature) => ({
        id: feature.id,
        description: feature[`description_${this.lang}`],
      }))
    },
    softwareAndResources() {
      return this.work.software_and_resources.map((sr) => ({
        id: sr.id,
        description: sr[`description_${this.lang}`],
      }))
    },
    projectRoles() {
      return this.work.project_roles.map((sr) => ({
        id: sr.id,
        description: sr[`description_${this.lang}`],
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
      .ant-row {
        .ant-col {
          margin-bottom: 3.125rem;
          &.problem {
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
