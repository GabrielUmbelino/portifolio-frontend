<template>
  <div class="projects">
    <a-row v-for="p in localizedProjects" :key="p.id">
      <a-col class="thumbnail" :xs="24" :lg="10" :xl="8">
        <figure>
          <img
            v-if="p.thumbnail"
            :src="`${baseUrl}${p.thumbnail.url}`"
            :alt="p.name"
            :width="p.thumbnail.width"
            :height="p.thumbnail.height"
          />
        </figure>
      </a-col>
      <a-col class="content" :xs="24" :lg="14" :xl="16">
        <div v-if="p.details" class="details">
          <h4>
            {{ p.name }}
          </h4>
          <span>
            {{ p.details }}
          </span>
        </div>
        <a-button
          type="link"
          size="large"
          icon="link"
          @click="$router.push(`/projects/${p.id}`)"
        >
          Details
        </a-button>
      </a-col>
    </a-row>
    <div
      class="image"
      v-html="$store.state.header.content.projects_background"
    />
  </div>
</template>

<script>
import { apiUrl } from '~/utils/Strapi.js'

export default {
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  computed: {
    localizedProjects() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      if (!this.projects || !this.projects.length) {
        return
      }

      return this.projects.map((p) => ({
        ...p,
        name: p[`name_${lang}`],
        role: p[`role_${lang}`],
        details: p[`details_${lang}`],
        categories: p.categories.map((c) => ({
          description: c[`description_${lang}`]
        }))
      }))
    },
    baseUrl() {
      return apiUrl
    }
  }
}
</script>

<style lang="less">
div.projects {
  margin: auto;
  margin-right: 0;
  max-width: calc(860px + 3rem);
  padding-right: 3rem;
  > .ant-row {
    padding-bottom: 4.25rem;
    &:last-child {
      padding-bottom: 0;
    }
  }
  .thumbnail {
    padding: 0;
    figure {
      justify-content: left;
      display: flex;
      float: right;
      img {
        max-height: 149px;
        max-width: 282px;
        width: auto;
        height: auto;
        display: block;
        position: relative;
      }
    }
  }
  .content {
    padding: 0;
    padding-left: 3.3125rem;
    .details {
      max-width: 520px;
      margin-bottom: 0.5rem;
      h4 {
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: -8px;
        margin-bottom: 0.2rem;
      }
      span {
        font-size: 1.1rem;
      }
    }
    .ant-btn {
      padding: 0;
      color: @btn-primary-bg;
    }
  }
}
@media (max-width: 768px) {
  div.projects {
    padding-right: 0;
    max-width: 100%;
    .details {
      padding: 0.5rem 0;
    }
    .content {
      padding-left: 2rem;
    }
    .thumbnail {
      margin-bottom: @section-margin-mobile;
      figure {
        img {
          max-height: 149px;
          max-width: 282px;
        }
      }
    }
  }
}
@media (max-width: 990px) {
  .projects {
    .thumbnail {
      figure {
        justify-content: center;
        margin: auto;
        float: none;
        padding-bottom: 2rem;
      }
    }
  }
}
</style>
