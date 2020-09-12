<script>
import MobileMock from '~/components/project/mobile-mock'
import WebMock from '~/components/project/web-mock'

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
      <MobileMock image={m} show-half={false} />
    ))

    const imageList = props.mockUrlList.map((m) => (
      <WebMock image={m} show-small={false} />
    ))

    return (
      <a-layout-content
        class="project-header"
        align="middle"
        style={{ background: props.backgroundColor }}
      >
        <div>
          <a-row>
            <a-col xs={24}>
              <a-carousel>{props.isMobile ? mobileList : imageList}</a-carousel>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    )
  },
}
</script>
<style lang="less">
.project-header {
  > div {
    max-width: @layout-header-width;
    margin: auto;
  }

  .ant-row {
    display: flex;
    align-items: stretch;
  }

  .ant-carousel {
    margin-top: 70px;
    margin-bottom: 70px;
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
