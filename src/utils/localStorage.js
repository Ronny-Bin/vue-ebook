//保存，修改
function setLocalStorage(key,value) {
  localStorage.setItem(key,value);
}
//获取
function getLocalStorage(key) {
  localStorage.getItem(key);
}
//删除
function removeLocalStorage(key) {
  localStorage.removeItem(key);
}
//删除所有
function clearLocalStorage(key) {
  localStorage.clear(key);
}


//设置全局字体
export const userSet ={
  getFontFamily:function() {
    return localStorage.getItem('fontFamily')
  },
  setFontFamily:function (fontFamily) {
    localStorage.setItem('fontFamily', fontFamily)
  },
  getFontSize:function () {
    return localStorage.getItem( 'fontSize')
  },
  saveFontSize:function (fontSize) {
    localStorage.setItem('fontSize', fontSize)
  },
  getTheme:function () {
    return localStorage.getItem( 'theme')
  },
  setTheme:function (theme) {
    localStorage.setItem('theme', theme)
  },
  //进度  时间
  setBook:function (fileName, key, value) {
    let book = localStorage.getItem(`${fileName}-info`)
    if(!book){
      book = {}
    }else {
      book = JSON.parse(book)
    }
    book[key] = value
    localStorage.setItem(`${fileName}-info`, JSON.stringify(book))
  },
  getBook:function (fileName,key) {
    let book = localStorage.getItem(`${fileName}-info`)
    if (book) {
      book = JSON.parse(book)
      return book[key]
    } else {
      return null
    }
  }
}

export const bookShelfList ={
  getBookShelf:function () {
    return JSON.parse(localStorage.getItem( 'bookShelf'))
  },
  updateBookShelfDown:function (selectedList) {
    var shelfData = this.getBookShelf()
    selectedList.forEach((value)=>{
      shelfData.v[value].isDown = 1
      console.log(shelfData.v[value].isDown)
    })
    this.clearBookShelf()
    localStorage.setItem('bookShelf',JSON.stringify(shelfData))
  },
  setBookShelf:function (bookInfo) {
    const date = new Date();
    const time = date.getTime()
    bookInfo.isDown = 0
    var shelfData = this.getBookShelf()
    if(!shelfData){
      shelfData = {}
      shelfData['c'] = time
      shelfData['v'] = []
    }else {
      shelfData.e = time
    }
    shelfData.v.push(bookInfo)
    localStorage.setItem('bookShelf',JSON.stringify(shelfData))
  },
  clearBookShelf:function () {
    localStorage.removeItem('bookShelf')
  },
  removeBookShelf:function (shelfList) {
    var shelfData = this.getBookShelf()
    shelfList.forEach(function (val) {
      shelfData.v.splice(val,1)
    })
    localStorage.setItem('bookShelf',JSON.stringify(shelfData))
  }
}


