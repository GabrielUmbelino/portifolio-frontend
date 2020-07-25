<template>
  <a-layout class="layout">
    <a-layout-content :style="{ minHeight: '280px' }">
      <Section :name="$t('profile')">
        <Profile :profile="profile" />
      </Section>
      <Section :name="$t('experience')">
        <Experience :experiencies="experiencies" />
      </Section>
      <Section :name="$t('projects')">
        <Project :projects="projects" />
      </Section>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { post } from '~/utils/Strapi'
import Section from '~/components/section';
import Profile from '~/components/section/profile';
import Project from '~/components/section/project';
import Experience from '~/components/section/experience';
import profileQuery from '~/apollo/queries/pages/profile.gql'
import projectsQuery from '~/apollo/queries/pages/projects.gql'
import experienciesQuery from '~/apollo/queries/pages/experiencies.gql'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'
import headerContentQuery from '~/apollo/queries/pages/headerContent.gql'

export default {
  components: {
    Section,
    Profile,
    Project,
    Experience,
  },
  async asyncData({ store }) {
    const { profile } = await post(profileQuery.loc.source.body)
    const { experiencies } = await post(experienciesQuery.loc.source.body)
    const { works: projects } = await post(projectsQuery.loc.source.body)
    const { pages: sections } = await post(sectionsQuery.loc.source.body)
    const { headerContent } = await post(headerContentQuery.loc.source.body)

    store.commit('header/setSections', sections.sort((a, b) => (a.order < b.order ? -1 : 1)))
    store.commit('header/setHeaderContent', headerContent)

    return {
      profile,
      experiencies,
      projects,
    }
  },
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