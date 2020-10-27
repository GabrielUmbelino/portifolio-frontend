import { mount, config } from '@vue/test-utils'
import ExperienceSection from '@/components/section/experience/index.vue'
import Vue from 'vue'
import VueTimeline from '@growthbunker/vuetimeline'
Vue.use(VueTimeline)

config.silent = true

const Section = {
  template: '<div></div>',
}

describe('Experience section', () => {
  beforeEach(() => {
    config.mocks = {
      $t: (msg) => msg,
      $i18n: {
        locale: 'en',
      },
    }
  })

  const experiencies = [
    {
      id: '1',
      company: 'NJB - Engenharia e Gerenciamento',
      job_title_en: 'Web Developer',
      job_title_pt: 'Desenvolvedor Web',
      description_en: 'Development of Interfaces in HTML and CSS.',
      description_pt: 'Desenvolvimento de Interfaces em HTML e CSS.\n',
      start_date: '2012-10-31',
      end_date: '2013-07-31',
    },
    {
      id: '2',
      company: 'E-GrupoMidia',
      job_title_en: 'Programming Trainee',
      job_title_pt: 'Estagiário de Programação',
      description_en:
        'Development of Websites using Wordpress.\nCreation of layouts for e-commerce using HTML, CSS and Javascript.\nIntegrations with payment platforms.\nBuilding javascript plugins for e-commerce.',
      description_pt:
        'Desenvolvimento de Websites utilizando Wordpress.\nCriação de layouts para e-commerce utilizando HTML, CSS e Javascript.\nIntegrações com plataformas de pagamento.\nConstruindo Plugins javascript voltado a e-commerce.',
      start_date: '2013-08-31',
      end_date: '2015-09-30',
    },
  ]

  it('Render empty component', () => {
    const wrapper = mount(ExperienceSection, {
      propsData: { experiencies: [] },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('Render list of experiencies', () => {
    const wrapper = mount(ExperienceSection, {
      propsData: { experiencies },
      parentComponent: Section,
    })

    const vueTimeline = wrapper
      .findAllComponents({
        name: 'vue-timeline-update',
      })
      .at(-1)
    const title = vueTimeline.find('.gb-vue-timeline-update__title')

    expect(title.contains('E-GrupoMidia')).toBe(true)
  })

  // it('Resume have been called with resume url EN', async (done) => {
  //   const resumeUrl = apiUrl + '/uploads/CV-EN-Gabriel-Umbelino_8fbef4cd28.pdf'
  //   const wrapper = mount(ExperienceSection, {
  //     propsData: { experiencies },
  //     parentComponent: Section,
  //   })

  //   const resumeButton = wrapper.find('#resume')
  //   resumeButton.trigger('click')
  //   await Vue.nextTick();
  //   expect(window.open).toBeCalledWith(resumeUrl)
  //   done()
  // })

  // it('Render list of experiencies', () => {
  //   const wrapper = shallowMount(ExperienceSection, {
  //     propsData: { experiencies },
  //     parentComponent: Section,
  //   })
  //   const period = wrapper.findAll('.gb-vue-timeline-update__ago').at(-1)
  //   expect(period.text()).toContain('2013 a 2015 (26 meses)')
  // })
})
