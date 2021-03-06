import Tag from '~/components/shared/tag'
export default {
  components: {
    Tag,
  },
  functional: true,
  render(h, { props, parent }) {
    if (!props.softwareAndResources || !props.softwareAndResources.length) {
      return
    }

    return (
      <div class="software-and-resources">
        <h4 class="subtitle">{parent.$t('software_and_resources')}</h4>
        {props.softwareAndResources.map((t) => (
          <Tag key={t.id} name={t.description} />
        ))}
      </div>
    )
  },
}
