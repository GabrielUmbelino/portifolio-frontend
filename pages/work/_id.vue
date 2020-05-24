<template>
  <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <nuxt-link to="/work">
          work
        </nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        {{ work.name }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-card>
      <h1>
        {{ work.name }}
      </h1>
      {{ work.details }}
    </a-card>
  </a-layout-content>
</template>

<script>
import workQuery from '~/apollo/queries/pages/work.gql'

export default {
  data() {
    return {
      work: {}
    }
  },
  apollo: {
    work: {
      prefetch: true,
      query: workQuery,
      variables() {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>
