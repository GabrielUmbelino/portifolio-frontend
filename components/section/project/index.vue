<template>
  <div class="projects">
    <a-row v-for="p in localizedProjects" :key="p.id">
      <a-col class="thumbnail" :lg="8" :md="24">
        <figure>
          <img :src="`${baseUrl}${p.thumbnail.url}`" :alt="p.name">
        </figure>
      </a-col>
      <a-col class="content" :lg="16" :md="24">
        <div class="details" v-if="p.details">
          <h4>
            {{ p.name }}
          </h4>
          <span>
            {{ p.details }}
          </span>
        </div>
        <a-button type="link" size="large" @click="$router.push(`/projects/${p.id}`)" icon="link">
          Details
        </a-button>
        <!-- <div class="technologies">
          <h4>
            {{ $t('technologies') }}
          </h4>
          <Technology
            v-for="t in p.technologies"
            :key="t.id"
            :name="t.name"
            :svgIcon="t.svgIcon"
          />
        </div> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Technology from '~/components/shared/technology'
import { apiUrl } from '~/utils/Strapi.js'

export default {
  components: {
    Technology
  },
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
      return apiUrl;
    }
  }
}
</script>

<style lang="less">
.projects {
  margin: auto;
  max-width: 770px;
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
        img {
          max-width: 100%;
        }
      }
    } 
  .content {
    padding: 0;
    padding-left: 4rem;
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
  @media (max-width: 768px) {
    .details {
      padding: 0.5rem 0;
    }
    .content {
      padding-left: 2rem;
    }
    .thumbnail {
      margin-bottom: @section-margin-mobile;
      > div {
        justify-content: center;
      }
    }
  }
}
</style>
