<template>
  <a-layout-header>
    <a-layout-content>
      <a-row type="flex" justify="space-between">
        <a-col class="gutter-row menu-items" :xs="20" align="left">
          <a-menu
            v-if="menu && menu.length"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
          >
            <a-menu-item
              v-for="m in menu"
              :key="m.id"
              @click="(e) => onMenuClicked(m)"
            >
              <ion-icon v-if="m.icon_name" :name="m.icon_name"></ion-icon>
              {{ m.description }}
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

export default {
  components: {
    LanguageSwitcher,
  },
  computed: {
    menu() {
      const { menu } = this.$store.state.header.content
      if (!menu || !menu.length) {
        return []
      }

      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      return menu.map((m) => ({
        ...m,
        description: m[`description_${lang}`],
      }))
    },
    defaultSectionId() {
      return this.menu
        .filter(({ path, hash }) => `${path}${hash}` === this.$route.fullPath)
        .map((m) => m.id)
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
