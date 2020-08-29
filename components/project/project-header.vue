<template>
  <a-layout-content
    class="project-header"
    align="middle"
    :class="{ hasMock: mockUrl }"
    :style="{ background: backgroundColor }"
  >
    <div>
      <a-row>
        <a-col v-if="mockUrl" :xl="13" :md="14" :sm="24" :xs="24">
          <div class="mock">
            <MobileMock
              v-if="mockUrl && isMobile"
              :image="mockUrl"
              :name="name"
            />
            <WebMock v-else :image="mockUrl" :name="name" />
          </div>
        </a-col>
        <a-col
          class="details"
          :xl="details.xl"
          :md="details.md"
          :sm="details.sm"
          :xs="details.xs"
        >
          <h2 class="secondary-title">{{ name }}</h2>
          <a-button
            v-if="repository"
            type="primary"
            icon="github"
            size="large"
            @click="repository"
          >
            {{ $t('see_repository') }}
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
    WebMock
  },
  props: {
    name: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      required: true
    },
    repository: {
      type: String,
      default: null
    },
    mockUrl: {
      type: String,
      default: null
    },
    isMobile: {
      type: Boolean
    }
  },
  computed: {
    details() {
      if (this.mockUrl) {
        return {
          xl: 11,
          md: 10,
          sm: 24,
          xs: 24
        }
      }

      return {
        xl: 24,
        md: 24,
        sm: 24,
        xs: 24
      }
    }
  }
}
</script>
<style lang="less">
.project-header {
  border-bottom: solid @grey-2 6px;

  > div {
    max-width: @layout-header-width;
    margin: auto;
  }

  .ant-row {
    display: flex;
    align-items: stretch;
  }

  &.hasMock {
    .mock {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      margin: 0;
      margin-right: 60px;
      margin-top: 70px;
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
      margin-top: 0px;
    }
  }

  @media (max-width: 999px) {
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

  @media (max-width: 768px) {
    .ant-row {
      display: flex;
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
  }
}
</style>
