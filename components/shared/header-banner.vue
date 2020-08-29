<template>
  <a-layout-content
    v-if="headerContent"
    class="header-content"
    :style="{ background: headerContent.backgroundColor }"
    align="middle"
  >
    <a-row>
      <a-col class="logo" :xl="8" :md="10" :xs="24" align="middle">
        <figure>
          <img
            v-if="headerContent && headerContent.bannerImage"
            :src="bannerImageUrl"
            :width="headerContent.bannerImage.width"
            :height="headerContent.bannerImage.height"
          />
        </figure>
      </a-col>
      <a-col class="details" :xl="16" :md="14" :xs="24" align="middle">
        <h2 class="secondary-title">{{ localizedHeaderContent.title }}</h2>
        <span>{{ localizedHeaderContent.description }}</span>
        <a-button
          v-if="headerContent.header_action_link"
          type="primary"
          size="large"
          @click="navigateToActionLink"
        >
          {{ localizedHeaderContent.header_action_text }}
        </a-button>
      </a-col>
    </a-row>
  </a-layout-content>
</template>
<script>
import { apiUrl } from '~/utils/Strapi.js'

export default {
  computed: {
    headerContent() {
      return this.$store.state.header.content
    },
    bannerImageUrl() {
      if (!this.headerContent || !this.headerContent.bannerImage) {
        return ''
      }
      return `${apiUrl}${this.headerContent.bannerImage.url}`
    },
    localizedHeaderContent() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return {
        title: this.headerContent[`title_${lang}`],
        description: this.headerContent[`description_${lang}`],
        header_action_text: this.$store.state.header.content[
          `header_action_text_${lang}`
        ]
      }
    }
  },
  methods: {
    navigateToActionLink() {
      this.$router.push({ path: '/' + this.headerContent.header_action_text })
    }
  }
}
</script>
<style lang="less">
.header-content {
  padding: 153px 0;
  border-bottom: solid @grey-2 6px;
  .ant-row {
    max-width: 850px;
    margin: auto;
  }

  .logo {
    figure {
      border-radius: 100%;
      box-shadow: 0px 0px 6px @primary-title-shadow-color;
      border: 3px solid @primary-title-text-color;
      position: relative;
      width: 214px;
      height: 214px;

      img {
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        max-width: 70%;
        max-height: 70%;
        height: auto;
        width: auto;
      }
    }
  }

  .details {
    align-content: center;
    padding: 0 20px;

    > * {
      text-align: left;
      display: block;
      float: left;
    }

    > h2 {
      font-size: 2.3rem;
    }

    > span {
      color: @text-color-dark;
    }

    > .ant-btn-primary {
      margin-top: 33px;
    }
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 60px 0;
  }
}
</style>
