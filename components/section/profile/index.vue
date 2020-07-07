<template>
  <a-row class="profile">
    <a-col class="video" :lg="12" :md="24">
      <div v-html="profile.presentationVideoUrl"/>
    </a-col>
    <a-col class="content" :lg="12" :md="24">
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

<style lang="less">
.profile {
  margin: auto;
  > div {
    padding: 1rem .5rem;
  }
  .video {    
    > div {
      justify-content: center;
      display: flex;
    }
  }
  .content {
    > div {
      max-width: 520px;
      margin: auto;

      &:first-child {
        margin-bottom: 3.125rem;
      }
      h4 {
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: -8px;
      }
      span {
        font-size: 1.1rem;
      }
    }
  }
  @media (max-width: 768px) {
    > div {
      padding: .5rem 0;
    }
  }
}
</style>
