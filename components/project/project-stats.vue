<script>
export default {
  functional: true,
  props: {
    projectPeriod: {
      type: Number,
      required: true,
    },
    teamSize: {
      type: Number,
      required: true,
    },
    happyCustomers: {
      type: Number,
      required: true,
    },
  },
  render(h, { props, parent }) {
    if (!props.projectPeriod || !props.teamSize || !props.happyCustomers) {
      return
    }

    return (
      <a-layout class="project-stats">
        <a-layout-content>
          <a-row type="flex">
            <a-col xl={8} xs={24}>
              <h3 class="primary-title">{props.projectPeriod}</h3>
              <span> {parent.$t('months_of_development')}</span>
            </a-col>
            <a-col xl={8} xs={24}>
              <h3 class="primary-title">{props.teamSize}</h3>
              <span> {parent.$t('team_members')}</span>
            </a-col>
            <a-col xl={8} xs={24}>
              <h3 class="primary-title">{props.happyCustomers}</h3>
              <span> {parent.$t('happy_customers')}</span>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    )
  },
}
</script>
<style lang="less">
.project-stats {
  background-color: @heading-color;
  .ant-layout-content {
    width: 940px;
    max-width: 100%;
    margin: auto;
    padding: 50px 10px;
    .ant-col {
      text-align: center;
      h3 {
        font-size: 3.125rem;
        margin-bottom: 10px;
      }

      span {
        color: @text-color-dark;
      }
    }
    @media (max-width: 768px) {
      .ant-col {
        padding-bottom: 50px;
      }
    }
  }
}
</style>
