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
    showHalf: {
      type: Boolean,
    },
  },
  render(h, { props }) {
    const mockClass = props.showHalf ? 'mobile-mock half' : 'mobile-mock'

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
@image-width: 320px;
@mock-width: @image-width + 40px;
.mobile-mock {
  overflow: hidden;
  display: flex;
  position: relative;
  width: fit-content;
  margin: auto;
  margin-bottom: 0;
  max-width: 100%;

  &.half {
    max-height: 500px;
  }

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
      background-image: url('~static/images/mobile_mock.svg');
    }

    img {
      height: auto;
      width: @image-width;
      margin: auto;
      padding: 10px 0;
      border-radius: 37px;
    }
  }
}
</style>
