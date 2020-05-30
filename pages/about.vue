<template>
  <a-layout class="layout">
    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      <a-card>
        {{ about.description }}
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import aboutQuery from '~/apollo/queries/pages/about.gql'
import { post } from "~/utils/Strapi"
export default {
  data() {
    return {
      about: {}
    }
  },
  async mounted() {
    this.fetch().then(about => this.about = about)
  },
  methods: {
    async fetch() {
      const data = post(aboutQuery.loc.source.body)
      return data.about;
    }
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
