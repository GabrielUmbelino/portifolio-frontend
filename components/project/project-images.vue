<template>
  <a-layout-content
    v-if="mockUrlList && mockUrlList.length"
    class="project-images"
    align="middle"
    :style="{ background: backgroundColor }"
  >
    <a-row>
      <a-col :xs="24">
        <div>
          <carousel :navigation-enabled="true" :per-page="1">
            <slide v-for="m of mockUrlList" :key="m.id">
              <WebMock v-if="m.width > m.height" :image="m.url" />
              <MobileMock v-else :image="m.url" :show-half="false" />
            </slide>
          </carousel>
        </div>
      </a-col>
    </a-row>
  </a-layout-content>
</template>
<script>
import WebMock from '~/components/project/web-mock'
import MobileMock from '~/components/project/mobile-mock'

export default {
  components: {
    MobileMock,
    WebMock,
  },
  props: {
    mockUrlList: {
      type: Array,
      default: () => [],
    },
    backgroundColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    showNavigation() {
      return window.innerWidth > 700
    },
  },
}
</script>
<style lang="less">
.project-images {
  > div {
    max-width: 100%;
    margin: 0 34px;
  }

  .ant-row {
    display: flex;
    align-items: stretch;
    .ant-col {
      > div {
        max-width: 100%;
      }
    }
  }
  .VueCarousel {
    .VueCarousel-wrapper {
      margin-top: 70px;
      margin-bottom: 70px;
      overflow: hidden;
    }

    .VueCarousel-navigation {
      &-button {
        border-width: 3px;
        font-weight: bold;
        font-family: 'Titillium';
        text-transform: uppercase;
        border: 3px solid @btn-primary-border;
        background-color: @btn-primary-bg;
        color: transparent;
        width: 40px;
        height: 40px;

        &:hover {
          border-color: @btn-primary-border;
          background-color: @btn-primary-border;
        }
        &::before {
          content: '';
          background-image: url('~static/images/seta.svg');
          background-repeat: no-repeat;
          background-position: center;
          top: 0;
          left: 0;
          display: block;
          padding: 9px 0;
        }
      }

      &-prev {
        margin-left: 6px;
        &::before {
          transform: rotateZ(180deg);
        }
      }

      &-next {
        margin-right: 6px;
      }
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-flow: column-reverse;

    > div {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      padding: 0;
      padding-top: 20px;
      margin: 0;

      .VueCarousel {
        margin-top: 20px;
        margin-bottom: 20px;

        .VueCarousel-navigation {
          display: none;
        }
      }
    }
  }
}
</style>
