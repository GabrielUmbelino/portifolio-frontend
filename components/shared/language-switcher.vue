<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
      {{ locale.name }} <a-icon type="down" />
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
