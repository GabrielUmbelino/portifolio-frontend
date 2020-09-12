<script>
export default {
  functional: true,
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    showSmall: {
      type: Boolean,
      default: true,
    },
  },
  render(h, { props }) {
    const mockClass = props.showSmall ? 'web-mock small' : 'web-mock'

    return (
      <div class={mockClass}>
        <figure>
          <img src={props.image} alt={props.name} />
        </figure>
      </div>
    )
  },
}
</script>

<style lang="less" scope>
@image-small-width: 420px;
@image-width: 820px;
@mock-width: @image-width + 80px;
@mock-small-width: @image-width + 40px;

.web-mock {
  overflow: hidden;
  display: flex;
  figure {
    position: relative;
    width: @mock-width;
    margin: auto;
    padding: 0;

    &::before {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('~static/images/web_mock.png');
    }

    img {
      height: auto;
      margin: auto;
      width: @image-width;
      padding: 44px 72px 102px 72px;
    }
  }

  &.small {
    max-height: 500px;
    figure {
      width: @mock-small-width;
      img {
        width: @image-small-width;
        padding: 22px 36px 51px 36px;
      }
    }
  }
}
@media (max-width: 900) {
  .web-mock {
    max-height: 500px;
    figure {
      width: @mock-small-width;
      img {
        width: @image-small-width;
        padding: 22px 36px 51px 36px;
      }
    }
  }
}
</style>
