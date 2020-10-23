<template>
  <div class="home">
    <HeaderBanner />
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
        <Section :name="$t('contact')">
          <Contact />
        </Section>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { post, apiUrl } from '~/utils/Strapi'
import HeaderBanner from '~/components/shared/header-banner'
import Section from '~/components/section'
import Profile from '~/components/section/profile'
import Project from '~/components/section/project'
import Experience from '~/components/section/experience'
import Contact from '~/components/section/contact'
import profileQuery from '~/apollo/queries/pages/profile.gql'
import projectsQuery from '~/apollo/queries/pages/projects.gql'
import experienciesQuery from '~/apollo/queries/pages/experiencies.gql'
import contentQuery from '~/apollo/queries/pages/content.gql'

export default {
  components: {
    HeaderBanner,
    Section,
    Profile,
    Project,
    Experience,
    Contact,
  },
  async asyncData({ store }) {
    const { profile } = await post(profileQuery.loc.source.body)
    const { experiencies } = await post(experienciesQuery.loc.source.body)
    const { works: projects } = await post(projectsQuery.loc.source.body)
    const { headerContent: content } = await post(contentQuery.loc.source.body)

    store.commit('header/setContent', content)
    store.commit('header/setApiUrl', apiUrl)

    return {
      profile,
      experiencies,
      projects,
    }
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
.home {
  .layout {
    margin: auto;
    .ant-layout-content {
      max-width: 100%;
    }
  }
}
</style>
