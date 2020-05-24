<template>
  <a-layout class="layout">
    <a-layout-content
      v-if="works.length"
      :style="{ padding: '0 24px', minHeight: '280px' }"
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
import worksQuery from '~/apollo/queries/pages/works.gql'

export default {
  data() {
    return {
      works: []
    }
  },
  apollo: {
    works: {
      prefetch: true,
      query: worksQuery
    }
  },
  mounted() {
    console.log(this.works)
  }
}
</script>

<style lang="sass">

.title
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;

.subtitle
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;

.links
  padding-top: 15px;
#__layout
  .ant-layout
    min-height: 100vh;
</style>
