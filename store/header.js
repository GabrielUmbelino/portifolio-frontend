export const state = () => ({
  sections: [],
  content: {}
})

export const mutations = {
  setSections(state, sections) {
    state.sections.push(...sections)
  },
  setContent(state, content) {
    state.content = { ...content }
  }
}