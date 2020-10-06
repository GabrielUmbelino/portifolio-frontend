import { mount } from '@vue/test-utils'
import ProjectStats from '@/components/project/project-stats.vue'

const projectStats = [
  {
    id: 1,
    description: 'Horas de Trabalho',
    value: 140,
  },
  {
    id: 2,
    description: 'Copos de Café',
    value: 70,
  },
  {
    id: 3,
    description: 'Clientes felizes',
    value: 1,
  },
]

describe('Project Stats', () => {
  it('Render Project Stats with values', () => {
    const wrapper = mount(ProjectStats, { propsData: { projectStats } })

    expect(
      wrapper.find(`.project-stats .stat-1 .primary-title`).text()
    ).toEqual('Horas de Trabalho')

    expect(wrapper.find(`.project-stats .stat-1 span`).text()).toEqual('140')
  })
})
