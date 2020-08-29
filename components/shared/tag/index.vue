<script>
import SvgIcon from '~/components/shared/tag/svg-icon'
export default {
  functional: true,
  components: { SvgIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    svgIcon: {
      type: String,
      default: null
    }
  },
  render(h, { props }) {
    return (
      <a-tag>
        <div>
          {props.svgIcon && <SvgIcon svg-icon={props.svgIcon} />}
          <span>{props.name}</span>
        </div>
      </a-tag>
    )
  }
}
</script>
<style scoped lang="less">
.ant-tag {
  margin-right: 0.9rem;
  margin-bottom: 0.9rem;
  div {
    margin: 3px 0;
    line-height: 1.6rem;
    .anticon {
      padding: 3px 3px;
    }
    > span {
      padding: 3px 3px;
    }
  }
}
</style>
