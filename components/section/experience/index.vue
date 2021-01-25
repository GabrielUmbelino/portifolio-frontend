<template>
  <a-row v-if="experiencies && experiencies.length" class="experiencies">
    <a-col class="content" :lg="22" :xs="24">
      <div>
        <ExperienceTimeline :experiencies="localizedExperiencies" />
        <a-button id="resume" type="link" size="large" @click="openResume">
          <ion-icon name="document"></ion-icon>
          {{ $t('see_complete_resume') }}
        </a-button>
      </div>
    </a-col>
    <div class="image">
      <img src="~/static/images/canequinha.svg" :alt="$t('experience')" />
    </div>
  </a-row>
</template>

<script>
import vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment'
import humanizeDuration from 'humanize-duration'
import ExperienceTimeline from '~/components/section/experience/experience-timeline'
import { apiUrl } from '~/utils/Strapi.js'

vue.use(VueMoment, { moment })

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
      const locale = this.$i18n.locale === 'pt' ? 'pt-br' : 'en-us'
      this.$moment.locale(locale)

      return this.experiencies
        .map((experience) => {
          return {
            ...experience,
            period: this.timeToPeriod(
              experience.start_date,
              experience.end_date
            ),
            description: experience[`description_${lang}`],
            job_title: experience[`job_title_${lang}`],
          }
        })
        .sort((a, b) => new Date(b.end_date) - new Date(a.end_date))
    },
  },
  methods: {
    openResume() {
      const resumeEN = '/uploads/CV-EN-Gabriel-Umbelino_8fbef4cd28.pdf'
      const resumeBR = '/uploads/CV-PT-Gabriel-Umbelino_825135ae6f.pdf'
      const resume = this.$i18n.locale === 'pt' ? resumeBR : resumeEN
      return window.open(apiUrl + resume, '_blank')
    },
    timeToPeriod(startDateTime, endDateTime) {
      const startDate = this.$moment(startDateTime)
      const endDate = this.$moment(endDateTime)
      const startYear = startDate.format('YYYY')
      const endYear = endDate.format('YYYY')
      const isOlderThanNow = endDate.diff(this.$moment())
      const period = isOlderThanNow
        ? this.$moment.duration(this.$moment().diff(startDate))
        : this.$moment.duration(endDate.diff(startDate))

      const periodFormatted = humanizeDuration(period, {
        largest: 2,
        units: ['y', 'mo'],
        language: this.$i18n.locale === 'pt' ? 'pt' : 'en',
        round: true,
        conjunction: ` ${this.$t('and')} `,
        serialComma: false,
      })

      if (isOlderThanNow > 0) {
        return `${startYear} - ${this.$t('present')} (${periodFormatted})`
      } else if (isOlderThanNow === 0) {
        return `${startYear} - ${this.$t('present')}`
      }

      return `${startYear} - ${endYear} (${periodFormatted})`
    },
  },
}
</script>

<style lang="less">
section .content {
  div.experiencies {
    > .image {
      right: -2px;
      left: initial;
      margin-left: 0;
      margin-right: @section-outer-margin;
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

      .ant-btn {
        display: block;
        margin-right: auto;
        margin-left: 255px;
        margin-top: 50px;
      }

      @media (max-width: 768px) {
        > div {
          padding: 0.5rem 0;

          .ant-btn {
            margin-left: 105px;
          }
        }
      }

      @media (max-width: 450px) {
        > div {
          .ant-btn {
            margin-left: auto;
          }
        }
      }
    }
  }
}
</style>
