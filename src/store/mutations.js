const mutations = {
  SET_FILENAME(state,newFileName){
    state.fileName = newFileName
  },
  SET_NAVVISIBLE(state,newNavVisible){
    state.navVisible = newNavVisible
  },
  SET_FONTSIZE(state,newDefaultFontSize){
    state.defaultFontSize = newDefaultFontSize
  },
  SET_FONTFAMILY(state,newDefaultFontFamily){
    state.defaultFontFamily = newDefaultFontFamily
  },
  SET_CURRENTBOOK(state,newCurrentBook){
    state.currentBook =  newCurrentBook;
  },
  SET_THEME(state,newTheme){
    state.defaultTheme = newTheme
  },
  SET_BOOKAVILABLE(state,newBookAvailable){
    state.bookAvailable = newBookAvailable
  },
  SET_OFFSETY(state,data){
    state.offsetY = data
  },
  SET_PROGRESS(state,data){
    state.progress = data
  },
  SET_SECTION(state,data){
    state.sectionValue = data
  },
  SET_PAGELIST(state, pagelist){
    state.pagelist = pagelist
  },
  SET_NAVIGATION(state, navigation){
    state.navigation = navigation
  },
  SET_COVER: (state, cover) => {
    state.cover = cover
  },
  SET_METADATA: (state, metadata) => {
    state.metadata = metadata
  },
  SET_PAGINATE: (state, paginate) => {
    state.paginate = paginate
  },
  SET_BOXSHADOW: (state,  boxShadow) => {
    state.boxShadow =  boxShadow
  },
  SET_IS_BOOKMARK: (state, isBookmark) => {
    state.isBookmark = isBookmark
  },
  SET_IS_LOADING: (state, isLoading) => {
    state.isLoading = isLoading
  },
  SET_LISTDATA: (state, listData) => {
    state.listData = listData
  },

}
export default mutations

