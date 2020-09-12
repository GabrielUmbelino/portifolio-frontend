<script>
export default {
  functional: true,
  props: {
    svgIcon: {
      type: String,
      required: true,
    },
  },
  render(h, { props }) {
    const svgComponent = {
      template: props.svgIcon,
    }
    return <a-icon component={svgComponent} />
  },
}
</script>
<style scoped lang="less">
.anticon {
  margin: 5px;
}
</style>
