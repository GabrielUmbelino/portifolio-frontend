<template>
  <a-layout class="layout">
    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      <Section :name="$t('profile')">
        <Profile />
      </Section>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Section from '~/components/section';
import Profile from '~/components/section/profile';
export default {
  components: {
    Section,
    Profile
  }
}
</script>
<style lang="sass">
.layout
  max-width: 1170px
  .ant-layout-content
    max-width: 100%
    margin: auto
</style>