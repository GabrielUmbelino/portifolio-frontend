<template>
  <div>
    <a-layout-header>
      <a-layout-content>
        <a-row type="flex" justify="space-between">
          <a-col
            class="gutter-row"
            :lg="20"
            :md="18"
            :xs="16"
            :offsetalign="middle"
          >
            <a-menu
              mode="horizontal"
              :default-selected-keys="['1']"
              :style="{ lineHeight: '64px' }"
            >
              <a-menu-item
                v-for="section in localizedSections"
                :key="section.id"
              >
                {{ section.description }}
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col class="gutter-row" :lg="4" :md="6" :xs="8" align="middle">
            <language-switcher />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout-header>
    <a-row
      class="header-content"
      :style="{ background: headerContent.backgroundColor }"
      align="middle"
    >
      <a-col
        :lg="{ span: 18, offset: 3 }"
        :md="{ span: 20, offset: 2 }"
        :sm="{ span: 22, offset: 1 }"
        :xs="{ span: 24 }"
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
            <h2>{{ localizedHeaderContent.title }}</h2>
            <span>{{ localizedHeaderContent.description }}</span>
            <a-button @click="headerContent.headerActionLink" type="primary">
              {{ headerContent.headerActionText }}
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
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
  white-space: nowrap;
  border: 0;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: none;
  background-color: #ffffff;
  .ant-layout-content {
    height: 66px;
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
@media (max-width: 768px) {
  .header-content {
    padding: 60px 0;
  }
}
.header-content {
  padding: 153px 0;
  .logo {
    figure {
      border-radius: 100%;
      // border: solid 3px @primary-color;
      position: relative;
      background: #262627;
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
      font-weight: bold;
    }
    > .ant-btn-primary {
      margin-top: 33px;
    }
  }
}
</style>
