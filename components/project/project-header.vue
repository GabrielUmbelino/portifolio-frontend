<template>
  <a-layout-content
    class="project-header"
    align="middle"
    :class="{ hasMock: mockUrl }"
    :style="{ background: backgroundColor }"
  >
    <div>
      <a-row>
        <a-col v-if="mockUrl" :xl="16" :lg="16" :xs="24">
          <div class="mock">
            <MobileMock
              v-if="mockUrl && isMobile"
              :image="mockUrl"
              :name="name"
              show-half
            />
            <WebMock v-else :image="mockUrl" :name="name" />
          </div>
        </a-col>
        <a-col
          class="details"
          :xl="details.xl"
          :lg="details.lg"
          :xs="details.xs"
        >
          <h2 class="secondary-title">{{ name }}</h2>
          <a-button
            v-if="repository"
            type="primary"
            icon="github"
            size="large"
            @click="openLinkNewTab(repository)"
          >
            {{ $t('see_repository') }}
          </a-button>
          <a-button
            v-if="projectLink"
            type="primary"
            icon="link"
            size="large"
            @click="openLinkNewTab(projectLink)"
          >
            {{ $t('project_link') }}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>
<script>
import MobileMock from '~/components/project/mobile-mock'
import WebMock from '~/components/project/web-mock'

export default {
  components: {
    MobileMock,
    WebMock,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    repository: {
      type: String,
      default: null,
    },
    projectLink: {
      type: String,
      default: null,
    },
    mockUrl: {
      type: String,
      default: null,
    },
    isMobile: {
      type: Boolean,
    },
  },
  computed: {
    details() {
      if (this.mockUrl) {
        return {
          xl: 8,
          lg: 8,
          xs: 24,
        }
      }

      return {
        xl: 24,
        md: 24,
        sm: 24,
        xs: 24,
      }
    },
  },
  methods: {
    openLinkNewTab(url) {
      window.open(url, '_blank')
    },
  },
}
</script>
<style lang="less">
.project-header {
  border-bottom: solid @grey-2 6px;

  > div {
    max-width: 800px;
    margin: auto;
  }

  .ant-row {
    display: flex;
  }

  .details {
    padding: 150px 0;
    padding-left: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    > h2 {
      font-size: 4.1rem;
    }

    > .ant-btn-primary {
      margin-top: 0;
    }
  }

  &.hasMock {
    .mock {
      display: flex;
      align-items: revert;
      justify-content: flex-end;
      margin: 0;
      margin-top: 20px;
      max-width: 100%;
      height: calc(100% - 20px);
    }

    .details {
      align-items: baseline;
      padding: 150px 0;
      padding-left: 60px;

      h2 {
        text-align: left;
      }
    }
  }

  @media (max-width: 999px) {
    .ant-row {
      flex-flow: column-reverse;
      .ant-col {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 0;
        padding-top: 20px;

        > .mock {
          margin: 0;
          margin-top: 20px;
        }
      }
    }
    &.hasMock {
      .mock {
        margin-right: 20px;
      }
      .details {
        padding-left: 20px;

        h2 {
          text-align: center;
        }
      }
    }
  }
}
</style>
