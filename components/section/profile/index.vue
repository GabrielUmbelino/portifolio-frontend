<template>
  <a-row class="profile">
    <a-col class="video" :xs="6" :sm="12">
      <div v-html="profile.presentationVideoUrl"/>
    </a-col>
    <a-col class="content" :xs="6" :sm="12">
      <div class="interests" v-if="localizedProfile.interests">
        <h4>
          {{ $t('interests') }}
        </h4>
        <span>
          {{ localizedProfile.interests }}
        </span>
      </div>
      <div class="technologies" v-if="profile.technologies">
        <h4>
          {{ $t('technologies') }}
        </h4>
        <Technology
          v-for="t in profile.technologies"
          :key="t.id"
          :name="t.name"
          :svgIcon="t.svgIcon"
        />
      </div>
    </a-col>
  </a-row>
</template>

<script>
import profileQuery from '~/apollo/queries/pages/profile.gql'
import Technology from '~/components/shared/technology'
import { post } from '~/utils/Strapi'

export default {
  components: {
    Technology
  },
  data() {
    return {
      profile: {}
    }
  },
  async mounted() {
    this.fetch().then((profile) => (this.profile = profile))
  },
  methods: {
    async fetch() {
      const data = await post(profileQuery.loc.source.body)
      return data.profile
    }
  },
  computed: {
    localizedProfile() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return {
        interests: this.profile[`interests_${lang}`]
      }
    }
  }
}
</script>

<style lang="sass">
.profile
  .video
    > div
      height: 400px
      justify-content: center
      display: flex
  .content
    > div 
      &:first-child
        margin-bottom: 3.125rem
      h4
        font-size: 1.5rem
        font-weight: bold
        text-transform: uppercase
      span
        font-size: 1.1rem
</style>
