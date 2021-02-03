<template>
  <a-row class="profile" :class="{ hasVideo: profile.embededVideoUrl }">
    <a-col
      v-if="profile.embededVideoUrl"
      class="video"
      :xs="24"
      :lg="10"
      :xl="9"
    >
      <div>
        <iframe
          width="560"
          height="315"
          :src="profile.embededVideoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </a-col>
    <a-col
      class="content"
      :xs="24"
      :lg="profile.embededVideoUrl ? 14 : 24"
      :xl="profile.embededVideoUrl ? 15 : 24"
    >
      <div v-if="localizedProfile.interests" class="interests">
        <h4 class="subtitle">
          {{ $t('interests') }}
        </h4>
        <span>
          {{ localizedProfile.interests }}
        </span>
      </div>
      <div class="technologies">
        <Technologies :technologies="localizedProfile.technologies" />
      </div>
    </a-col>
    <div class="image">
      <img src="~/static/images/plantinha_dark.svg" :alt="$t('profile')" />
    </div>
  </a-row>
</template>

<script>
import Technologies from '~/components/shared/technologies.js'
export default {
  components: {
    Technologies,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    localizedProfile() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      if (!this.profile) {
        return
      }

      return {
        ...this.profile,
        interests: this.profile[`interests_${lang}`],
      }
    },
  },
}
</script>

<style lang="less">
div.profile {
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
    padding: 0 1rem;

    .interests {
      padding-bottom: 2rem;

      span {
        font-size: 1.1rem;
      }
    }

    > div {
      h4.subtitle {
        font-size: 1.5rem;
        text-transform: uppercase;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .hasVideo {
    .content {
      padding: 0 1rem;
      padding-left: 3.3125rem;

      > div {
        max-width: 520px;
        margin-bottom: 3.125rem;
      }
    }
  }
  @media (max-width: 768px) {
    .content {
      padding: 0.5rem 0;

      .video {
        > div {
          justify-content: center;
        }
      }
    }
  }
}
</style>
