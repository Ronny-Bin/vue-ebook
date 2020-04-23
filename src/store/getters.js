const getters = {
  getFileName(state){
    return state.fileName
  },
  getNavVisible(state){
    return state.navVisible
  },
  getDefaultFontSize(state){
    return state.defaultFontSize
  },
  getDefaultFontFamily(state){
    return state.defaultFontFamily
  },
  getCurrentBook(state){
    return state.currentBook
  },
  getTheme(state){
    return state.defaultTheme
  },
  getBookAvailable(state){
    return state.bookAvailable
  },
  getOffset(state){
    return state.offsetY
  },
  getProgress(state){
    return state.progress
  },
  getSection(state){
    return state.sectionValue
  },
  getPagelist: (state) => {
    return state.pagelist
  },
  getNavigation:(state) => {
    return state.navigation
  },
  getCover: state => state.cover,
  getMetadata: state => state.metadata,
  getPaginate: state => state.paginate,
  getBoxShadow: state => state.boxShadow,
  getIsBookmark(state) {
    return state.isBookmark
  },
  isLoading(state) {
    return state.isLoading
  },
  getListData(state) {
    return state.listData
  },


}
export default getters

