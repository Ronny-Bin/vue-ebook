const actions = {
  setFileName({state,commit},newFileName){
    commit('SET_FILENAME',newFileName)
  },
  setNavVisible({state,commit},newNavVisible){
    commit('SET_NAVVISIBLE',newNavVisible)
  },
  setDefaultFontSize({state,commit},newDefaultFontSize){
    commit('SET_FONTSIZE',newDefaultFontSize)
  },
  setDefaultFontFamily({state,commit},newDefaultFontFamily){
    commit('SET_FONTFAMILY',newDefaultFontFamily)
  },
  setCurrentBook({state,commit},newCurrentBook){
    commit('SET_CURRENTBOOK',newCurrentBook)
  },
  setTheme({state,commit},newTheme){
    commit('SET_THEME',newTheme)
  },
  setBookAvailable({state,commit},newBookAvailable){
    commit('SET_BOOKAVILABLE',newBookAvailable)
  },
  setOffset({state,commit},data){
    commit('SET_OFFSETY',data)
  },
  setProgress({state,commit},data){
    commit('SET_PROGRESS',data)
  },
  setSection({state,commit},data){
    commit('SET_SECTION',data)
  },
  setPagelist({ commit }, pagelist) {
    return commit('SET_PAGELIST', pagelist)
  },
  setNavigation({ commit }, navigation){
    return commit('SET_NAVIGATION', navigation)
  },
  setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
  setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
  setPaginate: ({ commit }, paginate) => {
    return commit('SET_PAGINATE', paginate)
  },
  setBoxShadow: ({ commit }, boxShadow) => {
    return commit('SET_BOXSHADOW', boxShadow)
  },
  setIsBookmark({ commit }, isBookmark) {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
  setIsLoading({ commit }, isLoading) {
    return commit('SET_IS_LOADING', isLoading)
  },
  setListData({ commit }, listData) {
    return commit('SET_LISTDATA', listData)
  },


}
export default actions


