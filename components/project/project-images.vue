<script>
import WebMock from '~/components/project/web-mock'
import MobileMock from '~/components/project/mobile-mock'

export default {
  functional: true,
  components: {
    MobileMock,
    WebMock,
  },
  props: {
    mockUrlList: {
      type: Array,
      default: () => [],
    },
    isMobile: {
      type: Boolean,
    },
    backgroundColor: {
      type: String,
      default: '',
    },
  },
  render(h, { props }) {
    if (!props.mockUrlList || !props.mockUrlList.length) {
      return
    }

    const mobileList = props.mockUrlList.map((m) => (
      <slide>
        <MobileMock image={m} show-half={false} />
      </slide>
    ))

    const imageList = props.mockUrlList.map((m) => (
      <slide>
        <WebMock image={m} />
      </slide>
    ))

    return (
      <a-layout-content
        class="project-images"
        align="middle"
        style={{ background: props.backgroundColor }}
      >
        <a-row>
          <a-col xs={24}>
            <div>
              <carousel perPage={1}>
                {props.isMobile ? mobileList : imageList}
              </carousel>
            </div>
          </a-col>
        </a-row>
      </a-layout-content>
    )
  },
}
</script>
<style lang="less">
.project-images {
  max-width: 100%;
  > div {
    max-width: @layout-header-width;
    margin: auto;
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

  .VueCarousel-wrapper {
    margin-top: 70px;
    margin-bottom: 70px;
    overflow: hidden;
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

        > .ant-carousel {
          margin-top: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
