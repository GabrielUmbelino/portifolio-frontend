<template>
  <a-layout class="layout">
    <a-layout-content :style="{ minHeight: '280px' }">
      <Section>
        {{ work.name_en }}
      </Section>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { post, apiUrl } from '~/utils/Strapi'
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
  async asyncData({ store }) {
    const { headerContent: content } = await post(contentQuery.loc.source.body)
    const { pages: sections } = await post(sectionsQuery.loc.source.body)

    store.commit(
      'header/setSections',
      sections.sort((a, b) => (a.order < b.order ? -1 : 1))
    )

    store.commit('header/setContent', content)
    store.commit('header/setApiUrl', apiUrl)
  },
  data() {
    return {
      work: {}
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
