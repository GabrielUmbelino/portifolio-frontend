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
  height: 36px;
  > * {
    min-height: 20px;
    display: block;
    float: left;
    line-height: 14px;
  }
  .anticon,
  .md.hydrated {
    height: 22px;
    svg {
      margin: 2px auto;
    }
  }

  span {
    padding: 2px 3px;
    line-height: 18px;
  }
}
</style>
