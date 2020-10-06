import { mount } from '@vue/test-utils'
import ProjectStats from '@/components/project/project-stats.vue'

const projectStats = [
  {
    id: 1,
    description: 'Horas de Trabalho',
    number: 140,
  },
  {
    id: 2,
    description: 'Copos de Café',
    number: 70,
  },
  {
    id: 3,
    description: 'Clientes felizes',
    number: 1,
  },
]

describe('Project Stats', () => {
  it('Render Project Stats with values', () => {
    const wrapper = mount(ProjectStats, { propsData: { projectStats } })
    const description = wrapper.find(`.project-stats .stat-1 .primary-title`)
    const value = wrapper.find(`.project-stats .stat-1 span`)
    expect(description.text()).toContain('140')
    expect(value.text()).toContain('Horas de Trabalho')
  })
})
