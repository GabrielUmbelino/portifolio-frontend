export const state = () => ({
  content: {},
  apiUrl: '',
})

export const mutations = {
  setContent(state, content) {
    state.content = { ...content }
  },
  setApiUrl(state, apiUrl) {
    state.apiUrl = apiUrl
  },
}
