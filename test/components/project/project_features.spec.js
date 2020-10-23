import { mount, config, shallowMount } from '@vue/test-utils'
import ProjectFeatures from '@/components/project/project-features.vue'
import Footer from '@/components/layout/footer.vue'

describe('Project Features', () => {
  beforeEach(() => {
    config.mocks.$t = (msg) => msg
  })

  const projectFeatures = [
    {
      id: '1',
      description: 'Emissão de notas fiscais e boletos',
    },
    {
      id: '2',
      description: 'Offline mode',
    },
    {
      id: '3',
      description: 'Product register',
    },
    {
      id: '4',
      description: 'Reports',
    },
  ]

  it('Render project description', () => {
    const wrapper = mount(ProjectFeatures, {
      propsData: { projectFeatures },
      parentComponent: Footer,
    })
    const feature = wrapper.find('li')
    expect(feature.text()).toContain('Emissão de notas fiscais e boletos')
  })

  it('Render all project features passed as props', () => {
    const wrapper = shallowMount(ProjectFeatures, {
      propsData: { projectFeatures },
    })
    const lastFeature = wrapper.findAll('li').at(-1)
    expect(lastFeature.text()).toContain('Reports')
  })

  it('Render nothing if the feature list is empty', () => {
    const wrapper = mount(ProjectFeatures, {
      propsData: {
        projectFeatures: [],
      },
    })
    expect(wrapper.isEmpty()).toBe(true)
  })
})
