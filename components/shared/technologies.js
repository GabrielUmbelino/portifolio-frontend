import Tag from '~/components/shared/tag'
export default {
  components: {
    Tag
  },
  functional: true,
  render(h, { props, parent }) {
    if (!props.technologies || !props.technologies.length) {
      return
    }

    return (
      <div class="technologies">
        <h4>{parent.$t('technologies')}</h4>
        {props.technologies.map((t) => (
          <Tag key={t.id} name={t.name} svg-icon={t.svgIcon} />
        ))}
      </div>
    )
  }
}
