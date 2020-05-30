export const state = () => ({
  works: []
})

export const mutations = {
  add(state, works) {
    state.works.push(...works)
  },
  empty(state) {
    state.works = []
  }
}

export const getters = {
  list: ({ works }) => (works)
}