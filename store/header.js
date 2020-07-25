const SET_SECTIONS = "SET_SECTIONS";
const SET_HEADER_CONTENT = "SET_HEADER_CONTENT";

export const state = () => ({
  sections: [],
  headerContent: {}
})

export const mutations = {
  setSections(state, sections) {
    state.sections.push(...sections)
  },
  setHeaderContent(state, headerContent) {
    state.headerContent = { ...headerContent }
  }
}