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
import { post } from "~/utils/Strapi.js"

export default {
  data() {
    return {
      work: {}
    }
  },
  mounted() {
    this.fetch(this.$route.params.id).then(work => this.work = work)  
  },
  methods: {
    async fetch(id) {
      const data = await post(`
        {
          work(id: ${id}) {
            id
            details
            name
            image {
              url
              width
              height
            },
            link
            backgroundColor
            categories {
              description
            }
            technologies {
              description
            }
          }
        }
      `)
      return data.work;
    }
  }
}
</script>
