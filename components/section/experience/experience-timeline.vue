<template functional>
  <div v-if="props.experiencies && props.experiencies.length">
    <vue-timeline-update
      v-for="(e, i) in props.experiencies"
      :key="e.id"
      :light="props.theme"
      :date="new Date(e.end_date)"
      :date-string="e.period || ''"
      :title="e.company"
      :description="e.description"
      icon=""
      :is-last="props.experiencies.length === i + 1"
    ></vue-timeline-update>
  </div>
</template>
<script>
export default {
  props: {
    experiencies: {
      type: Array,
      default: () => [],
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
}
</script>
<style lang="less">
article.gb-vue-timeline-update {
  div.gb-vue-timeline-update__left {
    width: 167px;
    span.gb-vue-timeline-update__ago {
      background-color: @heading-color;
      color: @white;
      padding: 2px 10px 4px 10px;
      font-size: 0.8rem;
      line-height: 1.3rem;
      text-align: left;
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
      top: 2px;

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
    padding-bottom: 80px;

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
        font-size: 1.5rem;
        text-transform: initial;
      }
    }

    p.gb-vue-timeline-update__description {
      color: @text-color;
    }
  }
}
article.gb-vue-timeline-update.gb-vue-timeline-update--is-last {
  div.gb-vue-timeline-update__right {
    padding-bottom: 40px;
  }
  .gb-vue-timeline-update__line {
    display: none;
  }
}
@media (max-width: 990px) {
  article.gb-vue-timeline-update {
    div.gb-vue-timeline-update__center {
      margin-right: 16px;
      margin-left: 12px;
    }
  }
}
</style>
