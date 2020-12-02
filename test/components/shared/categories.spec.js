import { shallowMount } from '@vue/test-utils'
import Categories from '@/components/shared/categories'

describe('Project Stats', () => {
  it('Render categories with values', async () => {
    const wrapper = shallowMount(Categories, {
      propsData: { categories: [{ id: 1, description: 'Foo Bar' }] },
      mocks: {
        $t: () => 'Gabriel tomando um pau dos testes',
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test.each([[], null, undefined])(
    'Do not render when categories are %s',
    (categories) => {
      const wrapper = shallowMount(Categories, {
        propsData: { categories },
      })

      expect(wrapper.element).toMatchSnapshot()
    }
  )
})
