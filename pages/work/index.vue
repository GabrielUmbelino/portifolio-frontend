<template>
  <a-layout class="layout">
    <a-layout-content
      v-if="works.length"
      :style="{ minHeight: '280px' }"
    >
      <a-card v-for="work in works" :key="work.id">
        <h2>
          {{ work.name }}
        </h2>
        {{ work.details }}
        <nuxt-link :to="`work/${work.id}`">More</nuxt-link>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { post } from "~/utils/Strapi.js"
import worksQuery from '~/apollo/queries/pages/experiencies.gql'

export default {
  computed: {
    works() {
      return this.$store.getters["works/list"]
    }
  },
  async fetch({ store }) {
    store.commit("works/empty")
    const data = await post(worksQuery.loc.source.body)
    store.commit("works/add", data.works)    
  }
}
</script>

<style lang="less">

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: @text-color;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: @text-color-secondary;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
#__layout {
  .ant-layout {
    min-height: 100vh;
  }
}
</style>
