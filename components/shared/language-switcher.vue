<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
      {{ locale.name }}
      <ion-icon slot="icon" name="caret-down-outline"></ion-icon>
    </a>
    <a-menu slot="overlay">
      <a-menu-item
        v-for="l in locales"
        :key="l.code"
        :to="switchLocalePath(l.code)"
      >
        <nuxt-link :to="switchLocalePath(l.code)">{{ l.name }}</nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  computed: {
    locales() {
      if (!this.$i18n.locales && !this.$i18n.locales.length) {
        return []
      }
      return this.$i18n.locales
    },
    locale() {
      if (!this.$i18n.locales && !this.$i18n.locales.length) {
        return
      }

      return this.$i18n.locales.find(
        (locale) => locale.code === this.$i18n.locale
      )
    },
  },
}
</script>

<style lang="less">
.language-switcher {
  a.ant-dropdown-link {
    color: @text-color;
    font-weight: 500;
    font-family: 'Cabin';
    .hydrated {
      color: @primary-color;
      margin: 0 0 -2px 2px;
    }
  }
}
</style>
