<script>
import SvgIcon from '~/components/shared/tag/svg-icon'
export default {
  functional: true,
  components: { SvgIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    svgIcon: {
      type: String,
      default: null,
    },
  },
  render(h, { props }) {
    return (
      <a-tag class="tag">
        {props.svgIcon && <SvgIcon svg-icon={props.svgIcon} />}
        <span>{props.name}</span>
      </a-tag>
    )
  },
}
</script>
<style scoped lang="less">
.ant-tag {
  margin-right: 0.9rem;
  margin-bottom: 0.45rem;
  > * {
    min-height: 20px;
    display: block;
    float: left;
    line-height: 14px;
  }
  .anticon {
    padding: 3px 3px;
  }
  span {
    padding: 3px 3px;
  }
}
</style>
