<script>
export default {
  functional: true,
  props: {
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  render(h, { props }) {
    return (
      <div class="web-mock">
        <figure>
          <img src={props.image} alt={props.name} />
        </figure>
      </div>
    )
  },
}
</script>

<style lang="less" scope>
@image-width: 420px;
@mock-width: @image-width + 40px;


.web-mock {
  max-height: 500px;
  overflow: hidden;
  display: flex;

  figure {
    position: relative;
    width: @mock-width;
    margin: auto;
    padding: 0px 0px;
  
    &:before {
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
      width: @image-width;
      padding: 22px 36px 51px 36px;
    }
  }
}
</style>
