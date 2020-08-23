<template>
  <a-layout-content
    class="header-content"
    align="middle"
    :class="{ 'hasMock': mockUrl }"
    :style="{ background: backgroundColor }"
  >
    <div>
      <a-row>
        <a-col v-if="mockUrl" :xl="13" :md="14" :sm="24" :xs="24">
          <div class="mock">
            <mobile-mock v-if="mockUrl && isMobile" :image="mockUrl" :name="name"/>
            <web-mock v-else :image="mockUrl" :name="name"/>
          </div>
        </a-col>
        <a-col class="details"
          :xl="details.xl"
          :md="details.md"
          :sm="details.sm"
          :xs="details.xs"
        >
          <h2 class="secondary-title">{{ name }}</h2>
          <a-button
            size="large"
            v-if="repository"
            @click="repository"
            type="primary"
            icon="github"
          >
            {{ $t('see_repository') }}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>
<script>
import MobileMock from '~/components/shared/project/mobile-mock';
import WebMock from '~/components/shared/project/web-mock';

export default {
  components: {
    MobileMock,
    WebMock,
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
      type: String
    },
    mockUrl: {
      type: String
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
    },
  }
}
</script>
<style lang="less">
.header-content {
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
    .details {
      align-items: baseline;

      h2 {
        text-align: left;
      }
    }
  }

  .mock {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin: 0;
    margin-right: 60px;
    margin-top: 70px;
  }

  .details {
    padding: 150px 0;
    padding-left: 60px;
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
}

@media (max-width: 768px) {
  .header-content {
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
