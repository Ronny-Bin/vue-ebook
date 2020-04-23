const state = {
  fileName:null,//当前书籍
  navVisible:false,
  isLoading:true,
  boxShadow:false,
  defaultFontSize: 16,//字体
  defaultFontFamily: 'Default',//字体
  defaultTheme: 'Default',//主题
  currentBook: null,//书籍
  bookAvailable: false,//进度条加载
  offsetY:0,
  progress: 0,
  sectionValue: 0,
  pagelist: null,
  navigation: null,
  cover: null,
  metadata: null,
  paginate: '',
  isBookmark:false,
  listData:null

}
export default state