<script>
import TechnologyIcon from '~/components/shared/technology/technologyIcon'
export default {
  functional: true,
  components: { TechnologyIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    svgIcon: {
      type: String,
      required: true
    }
  },
  render(h, { props }) {
    return (
      <a-tag >
        <div>
          { 
            props.svgIcon && 
            <TechnologyIcon svgIcon={ props.svgIcon } />
          }
          <span>
            { props.name }
          </span>
        </div>
      </a-tag>
    )
  }
}
</script>
<style scoped lang="less">
.ant-tag {
  margin-right: 1rem;
  margin-right: 0.9rem;
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
