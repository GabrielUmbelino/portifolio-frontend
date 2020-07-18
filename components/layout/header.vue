<template>
  <div>
    <a-layout-header>
      <a-layout-content>
        <a-row type="flex" justify="space-between">
          <a-col class="gutter-row" :lg="20" :md="18" :xs="16" offsetalign="middle">
            <a-menu
              mode="horizontal"
              :default-selected-keys="['1']"
              :style="{ lineHeight: '64px' }"
            >
              <a-menu-item
                v-for="section in localizedSections"
                :key="section.id"
              >{{ section.description }}</a-menu-item>
            </a-menu>
          </a-col>
          <a-col class="gutter-row" :lg="4" :md="6" :xs="8" align="middle">
            <language-switcher />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout-header>
    <a-layout-content
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
          <h2 class="primary-title">{{ localizedHeaderContent.title }}</h2>
          <span>{{ localizedHeaderContent.description }}</span>
          <a-button
            size="large"
            v-if="headerContent.headerActionLink"
            @click="headerContent.headerActionLink"
            type="primary"
          >{{ headerContent.headerActionText }}</a-button>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
</template>
<script>
import { post, apiUrl } from '~/utils/Strapi.js'
import sectionsQuery from '~/apollo/queries/pages/sections.gql'
import headerContentQuery from '~/apollo/queries/pages/headerContent.gql'
import LanguageSwitcher from '~/components/shared/languageSwitcher'
export default {
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      sections: [],
      headerContent: {}
    }
  },
  async mounted() {
    this.fetch().then(({ headerContent, sections }) => {
      this.sections = sections
      this.headerContent = headerContent
    })
  },
  methods: {
    async fetch() {
      const { pages } = await post(sectionsQuery.loc.source.body)
      const { headerContent } = await post(headerContentQuery.loc.source.body)

      return {
        headerContent,
        sections: pages.sort((a, b) => (a.order < b.order ? -1 : 1))
      }
    }
  },
  computed: {
    localizedSections() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return this.sections.map((locale) => ({
        id: locale.id,
        description: locale[`description_${lang}`]
      }))
    },
    logoUrl() {
      return `${apiUrl}${this.headerContent.logo.url}`
    },
    bannerImageUrl() {
      return `${apiUrl}${this.headerContent.bannerImage.url}`
    },
    localizedHeaderContent() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return {
        title: this.headerContent[`title_${lang}`],
        description: this.headerContent[`description_${lang}`]
      }
    }
  }
}
</script>
<style lang="less">
.ant-layout-header {
  background-color: @layout-header-background;
  white-space: nowrap;
  border: 0;
  box-shadow: none;
  .ant-layout-content {
    height: @layout-header-height;
  }
  .ant-row-flex {
    height: 100%;
    .logo {
      height: 100%;
      img {
        max-height: 100%;
        padding: 10px;
        width: auto;
      }
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
      box-shadow: 0px 0px 6px @primary-color;
      border: 3px solid @primary-color-1;
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
      text-align: center;
      display: block;
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
