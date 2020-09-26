import Tag from '~/components/shared/tag'
export default {
  components: {
    Tag,
  },
  functional: true,
  render(h, { props, parent }) {
    if (!props.categories || !props.categories.length) {
      return
    }

    return (
      <div class="role">
        <h4>{parent.$t('role_in_the_project')}</h4>
        {props.roles.map((t) => (
          <Tag key={t.id} name={t.description} />
        ))}
      </div>
    )
  },
}
