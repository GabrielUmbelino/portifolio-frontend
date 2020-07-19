<template>
  <a-layout class="layout">
    <a-layout-content :style="{ minHeight: '280px' }">
      <Section :name="$t('profile')">
        <Profile :profile="profile" />
      </Section>
      <Section :name="$t('experience')">
        <Experience :experiencies="experiencies" />
      </Section>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { post } from '~/utils/Strapi'
import Section from '~/components/section';
import Profile from '~/components/section/profile';
import Experience from '~/components/section/experience';
import profileQuery from '~/apollo/queries/pages/profile.gql'
import experienciesQuery from '~/apollo/queries/pages/experiencies.gql'

export default {
  components: {
    Section,
    Profile,
    Experience
  },
  async asyncData() {
    const { profile } = await post(profileQuery.loc.source.body)
    const { experiencies } = await post(experienciesQuery.loc.source.body)

    return {
      profile,
      experiencies,
    }
  },
}
</script>
<style lang="less">
.layout {
  margin: auto;
  .ant-layout-content {
    max-width: 100%;
    .section:last-child {
      margin-bottom: 0;
      .content {
        hr {
          display: none;
        }
      }
    }
  }
}
</style>