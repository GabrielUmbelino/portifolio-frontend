<script>
export default {
  functional: true,
  props: {
    experiencies: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  render(h, { props, options }) {
    return props.experiencies.map((e, i) => (
      <vue-timeline-update
        light={props.theme}
        dateString={e.period}
        date={new Date(e.start_date)}
        title={e.company}
        description={e.description}
        icon=""
        is-last={props.experiencies.length === i + 1}
      ></vue-timeline-update>
    ))
  }
}
</script>
<style lang="less">
article.gb-vue-timeline-update {
  div.gb-vue-timeline-update__left {
    width: 160px;
    span.gb-vue-timeline-update__ago {
      background-color: @heading-color;
      color: @white;
      padding: 2px 13px 4px 13px;
      font-size: 0.8rem;
      line-height: 1.3rem;
    }
  }
  div.gb-vue-timeline-update__center {
    margin-right: 65px;
    margin-left: 43px;
    .gb-vue-timeline-update__bullet.gb-base-number.gb-base-number--small {
      width: 24px;
      height: 24px;
      box-shadow: none;
      border-radius: 0;
      border-width: 8px;
      border-color: @primary-color-1;
      i {
        display: none;
      }
    }

    span.gb-vue-timeline-update__line {
      margin-top: 24px;
      background-color: #f1eeff;
    }
  }
  div.gb-vue-timeline-update__right {
    div.gb-vue-timeline-update__information {
      margin-top: 0;
      .gb-vue-timeline-update__meta {
        .gb-vue-timeline-update__ago {
          background-color: @heading-color;
          color: @white;
          padding: 2px 13px 4px 13px;
          font-size: 1rem;
          line-height: 1.3rem;
        }
      }
      .gb-vue-timeline-update__title {
        color: @heading-color;
      }
    }
    p.gb-vue-timeline-update__description {
      color: @text-color;
    }
  }
}
article.gb-vue-timeline-update.gb-vue-timeline-update--is-last {
  .gb-vue-timeline-update__line {
    display: none;
  }
}
</style>
