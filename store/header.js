export const state = () => ({
  sections: [],
  content: {}
})

export const mutations = {
  setSections(state, sections) {
    state.sections = sections;
  },
  setContent(state, content) {
    state.content = { ...content }
  }
}