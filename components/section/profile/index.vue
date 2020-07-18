<template>
  <a-row class="profile">
    <a-col class="video" :lg="12" :md="24">
      <div v-html="localizedProfile.presentationVideoUrl" />
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
      <div class="technologies">
        <h4>
          {{ $t('technologies') }}
        </h4>
        <Technology
          v-for="t in localizedProfile.technologies"
          :key="t.id"
          :name="t.name"
          :svgIcon="t.svgIcon"
        />
      </div>
    </a-col>
  </a-row>
</template>

<script>
import Technology from '~/components/shared/technology'
export default {
  components: {
    Technology
  },
  props: ['profile'],
  computed: {
    localizedProfile() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      if (!this.profile) {
        return
      }

      return {
        ...this.profile,
        interests: this.profile[`interests_${lang}`]
      }
    }
  }
}
</script>

<style lang="less">
.profile {
  margin: auto;
  .video {
    padding: 0;
    margin-bottom: 3.125rem;
    > div {
      justify-content: left;
      display: flex;
      > * {
        max-width: 100%;
      }
    }
  }
  .content {
    padding: 0 0.5rem;
    > div {
      max-width: 520px;
      margin: auto;
      margin-bottom: 3.125rem;
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
      padding: 0.5rem 0;
    }
    .video {
      padding: 0.5rem 0;
      > div {
        justify-content: center;
      }
    }
  }
}
</style>
