export const state = () => ({
  sections: [],
  content: {},
  apiUrl: '',
})

export const mutations = {
  setSections(state, sections) {
    state.sections = sections
  },
  setContent(state, content) {
    state.content = { ...content }
  },
  setApiUrl(state, apiUrl) {
    state.apiUrl = apiUrl
  },
}
