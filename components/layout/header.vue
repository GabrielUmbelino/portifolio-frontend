<template>
  <div class="">
    <a-layout-header>
      <a-layout-content>
        <a-row type="flex" justify="space-between">
          <a-col class="gutter-row menu-items" :xs="20" align="left">
            <a-menu
              v-if="localizedSections.length"
              mode="horizontal"
              :default-selected-keys="defaultSectionId"
              :style="{ lineHeight: '64px' }"
            >
              <a-menu-item
  
                v-for="section in localizedSections"
                :key="section.id"
                @click="e => onMenuClicked(e, section.url)"
              >
                <a-icon v-if="section.icon_type" :type="section.icon_type" theme="filled" />

                <TechnologyIcon v-else-if="section.icon_svg" :svgIcon="section.icon_svg"/>
                {{ section.description }}
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col class="gutter-row language-switcher" :xs="4" align="right">
            <language-switcher />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout-header>
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
            size="large"
            v-if="headerContent.header_action_link"
            @click="navigateToActionLink"
            type="primary"
          >
          {{ localizedHeaderContent.header_action_text }}
          </a-button>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
</template>
<script>
import { apiUrl } from '~/utils/Strapi.js'
import LanguageSwitcher from '~/components/shared/languageSwitcher'
import TechnologyIcon from '~/components/shared/technology/technologyIcon'
export default {
  components: {
    LanguageSwitcher,
    TechnologyIcon
  },
  methods: {
    onMenuClicked(e, route) {
      if ('resume' === route) {
        console.log('download resume not implemented yet')
      } else if (this.$route.fullPath !== route) {
        if (route) {
          this.$router.push({ hash: route });
        } else {
          this.$router.push('/');
        }
      }
    },
    navigateToActionLink() {
     this.$router.push({ hash: this.headerContent.header_action_link });
    }
  },
  computed: {
    sections() {
      return this.$store.state.header.sections
    },
    headerContent() {
      return this.$store.state.header.content
    },
    localizedSections() {
      if (!this.sections || !this.sections.length) {
        return []
      }

      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return this.sections.map((section) => ({
        ...section,
        description: section[`description_${lang}`]
      }))
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
        header_action_text: this.$store.state.header.content[`header_action_text_${lang}`]
      }
    },
    defaultSectionId() {
      const [firstSection] = this.localizedSections;
      return [firstSection.id]
    }
  }
}
</script>
<style lang="less">
.ant-layout-header {
  max-width: 1290px;
  margin: auto;
  background-color: @layout-header-background;
  white-space: nowrap;
  border: 0;
  box-shadow: none;

  .ant-layout-content {
    height: @layout-header-height;
  }
  .ant-row-flex {
    height: 100%;
    .ant-menu-horizontal {
      border: none;
    }
  }
}
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
  .ant-layout-header {
    padding: 0 5px;
  }
  .header-content {
    padding: 60px 0;
  }
}
</style>
