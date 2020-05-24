<template>
  <a-layout-header>
    <a-menu
      mode="horizontal"
      :default-selected-keys="['2']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item v-for="page in pages" :key="page.id">
        <NuxtLink :to="page.path">
          {{ page.description }}
        </NuxtLink>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
import pagesQuery from '~/apollo/queries/pages/pages.gql'

export default {
  data() {
    return {
      pages: []
    }
  },
  apollo: {
    pages: {
      prefetch: true,
      query: pagesQuery
    }
  }
}
</script>
<style lang="sass">
.ant-layout-header
  white-space: nowrap;
  border: 0;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: none;
  background-color: #ffffff;
  height: 66px;
</style>
