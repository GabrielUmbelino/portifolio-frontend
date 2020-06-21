<template>
  <a-layout class="layout">
    <a-layout-content v-if="localizedProfile.interests" :style="{ padding: '0 24px', minHeight: '280px' }">
      <a-card>
        {{ localizedProfile.interests }}
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import profileQuery from '~/apollo/queries/pages/profile.gql'
import { post } from "~/utils/Strapi"
export default {
  data() {
    return {
      profile: {}
    }
  },
  async mounted() {
    this.fetch().then(profile => this.profile = profile)
  },
  methods: {
    async fetch() {
      const data = await post(profileQuery.loc.source.body)
      return data.profile;
    }
  },
  computed: {
    localizedProfile() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale;
      return {
        interests: this.profile[`interests_${lang}`]
      }
    }
  }
}
</script>

<style lang="sass">

.title
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block
  font-weight: 300
  font-size: 100px
  color: #35495e
  letter-spacing: 1px

.subtitle
  font-weight: 300
  font-size: 42px
  color: #526488
  word-spacing: 5px
  padding-bottom: 15px

.links
  padding-top: 15px
#__layout
  .ant-layout
    min-height: calc(100vh - 135px)
</style>
