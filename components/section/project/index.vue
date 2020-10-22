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
        <div v-if="p.problem" class="details">
          <h4>
            {{ p.name }}
          </h4>
          <span>
            {{ p.problem }}
          </span>
        </div>
        <a-button
          type="link"
          size="large"
          icon="link"
          @click="onProjectDetails(p.id)"
        >
          Details
        </a-button>
      </a-col>
    </a-row>
    <div class="image">
      <img src="~/static/images/abaju.svg" :alt="$t('projects')" />
    </div>
  </div>
</template>

<script>
import { apiUrl } from '~/utils/Strapi.js'

export default {
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localizedProjects() {
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      if (!this.projects || !this.projects.length) {
        return []
      }

      return this.projects.map((p) => ({
        ...p,
        name: p[`name_${lang}`],
        role: p[`role_${lang}`],
        problem: p[`problem_${lang}`],
        categories:
          p.categories &&
          p.categories.map((c) => ({
            description: c[`description_${lang}`],
          })),
      }))
    },
    baseUrl() {
      return apiUrl
    },
  },
  methods: {
    onProjectDetails(projectId) {
      const newPath = this.localePath({
        path: `/projects/${projectId}`,
      })

      this.$router.push(newPath)
    },
  },
}
</script>

<style lang="less">
div.projects {
  margin: auto;
  margin-right: 0;
  max-width: calc(750px + 7rem);
  padding-right: 7rem;
  > .ant-row {
    padding-bottom: 4.25rem;
    &:last-child {
      padding-bottom: 0;
    }
  }
  .ant-row {
    .thumbnail {
      padding: 0;
      border-radius: 3px;
      overflow: hidden;
      width: fit-content;

      figure {
        justify-content: left;
        display: flex;
        float: right;
        margin: 0;

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
          margin-top: -8px;
          margin-bottom: 0.2rem;
        }

        span {
          font-size: 1.1rem;
          max-height: 80px;
          overflow: hidden;
          display: block;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  div.projects {
    .ant-row {
      .content {
        padding-left: 2rem;

        .details {
          padding: 0.5rem 0;
        }
      }

      .thumbnail {
        figure {
          img {
            max-height: 149px;
            max-width: 282px;
          }
        }
      }
    }
  }
}
@media (max-width: 990px) {
  div.projects {
    padding: 0;
    margin: auto;
    .ant-row {
      .content {
        padding-left: 0;
        padding-top: 1rem;

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
  }
}
</style>
