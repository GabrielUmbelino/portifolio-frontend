import Tag from '~/components/shared/tag'
export default {
  components: {
    Tag
  },
  functional: true,
  render(h, { props, parent }) {
    if (!props.categories || !props.categories.length) {
      return
    }

    return (
      <div class="categories">
        <h4>{parent.$t('kind')}</h4>
        {props.categories.map((t) => (
          <Tag key={t.id} name={t.description} />
        ))}
      </div>
    )
  }
}
