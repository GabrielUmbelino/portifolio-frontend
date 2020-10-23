import Tag from '~/components/shared/tag'
export default {
  components: {
    Tag,
  },
  functional: true,
  render(h, { props, parent }) {
    if (!props.roles || !props.roles.length) {
      return
    }

    return (
      <div class="role">
        <h4 class="subtitle">{parent.$t('role_in_the_project')}</h4>
        {props.roles.map((t) => (
          <Tag key={t.id} name={t.description} />
        ))}
      </div>
    )
  },
}
