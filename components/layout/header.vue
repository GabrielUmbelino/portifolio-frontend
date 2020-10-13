<template>
  <a-layout-header>
    <a-layout-content>
      <a-row type="flex" justify="space-between">
        <a-col class="gutter-row menu-items" :xs="20" align="left">
          <a-menu
            v-if="sections && sections.length"
            mode="horizontal"
            :default-selected-keys="defaultSectionId"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item
              v-for="section in localizedSections"
              :key="section.id"
              @click="(e) => onMenuClicked(section)"
            >
              <a-icon
                v-if="section.icon_type"
                :type="section.icon_type"
                theme="filled"
              />

              <SvgIcon
                v-else-if="section.icon_svg"
                :svg-icon="section.icon_svg"
              />
              {{ section.description }}
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col class="gutter-row language-switcher" :xs="4" align="right">
          <LanguageSwitcher />
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout-header>
</template>
<script>
import LanguageSwitcher from '~/components/shared/language-switcher'
import SvgIcon from '~/components/shared/tag/svg-icon'

export default {
  components: {
    LanguageSwitcher,
    SvgIcon,
  },
  computed: {
    sections() {
      return this.$store.state.header.sections
    },
    localizedSections() {
      if (!this.sections || !this.sections.length) {
        return []
      }

      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return this.sections.map((section) => ({
        ...section,
        description: section[`description_${lang}`],
      }))
    },
    defaultSectionId() {
      const [firstSection] = this.localizedSections
      return [firstSection.id]
    },
  },
  methods: {
    onMenuClicked(section) {
      const newPath = this.localePath({
        path: section.path,
        hash: section.hash,
      })

      this.$router.push({
        path: newPath,
      })
    },
  },
}
</script>
<style lang="less">
.ant-layout-header {
  max-width: @layout-header-width;
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

@media (max-width: 768px) {
  .ant-layout-header {
    padding: 0 5px;
  }
}
</style>
