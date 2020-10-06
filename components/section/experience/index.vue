<template>
  <a-row class="experiencies">
    <a-col class="content" :lg="22" :xs="24">
      <div>
        <ExperienceTimeline :experiencies="localizedExperiencies" />
      </div>
    </a-col>
    <div class="image">
      <img src="~/static/images/canequinha.svg" :alt="$t('experience')" />
    </div>
  </a-row>
</template>

<script>
import ExperienceTimeline from '~/components/section/experience/experience-timeline'

export default {
  components: {
    ExperienceTimeline,
  },
  props: {
    experiencies: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localizedExperiencies() {
      if (!this.experiencies || !this.experiencies.length) {
        return []
      }
      const lang = this.$i18n.locale || this.$i18n.defaultLocale
      const parseDate = (start, end) => {
        // const startPeriod = new Date(start)
        // const endPeriod = new Date(end)
        // const locale = this.$i18n.locales.find((locale) => locale.code === lang)
        // const startMonth = startPeriod
        //   .toLocaleString(locale, { month: 'long' })
        //   .substring(0, 3)
        //   .capitalize()
        // const startYear = startPeriod.getFullYear()
        // const endMonth = endPeriod
        //   .toLocaleString(locale, { month: 'long' })
        //   .substring(0, 3)
        //   .capitalize()
        // const endYear = endPeriod.getFullYear()

        // return `${startMonth}/${startYear} ${this.$t(
        //   'to'
        // )} ${endMonth}/${endYear}`
        return ''
      }
      return this.experiencies
        .map((experience) => ({
          ...experience,
          period: parseDate(experience.start_date, experience.end_date),
          description: experience[`description_${lang}`],
          job_title: experience[`job_title_${lang}`],
        }))
        .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    },
  },
}
</script>

<style lang="less">
section .content {
  div.experiencies {
    padding-bottom: 9.25rem;
    > .image {
      right: 10px;
      left: initial;
      margin-left: 0;
      margin-right: @section-margin;
    }
    .content {
      margin: auto;
      max-width: 836px;
      float: right;
      > div {
        h4 {
          font-weight: bold;
          text-transform: uppercase;
          margin-top: -8px;
        }
      }
    }
    @media (max-width: 768px) {
      > div {
        padding: 0.5rem 0;
      }
    }
  }
}
</style>
