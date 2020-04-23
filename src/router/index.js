import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect:'/store'
  },
  {
    path: '/ebook',
    name: 'Ebook',
    component: () => import('@/views/ebook/Index'),
    children:[
      {
        path:':category/:fileName/:model/:opf/:href?',
        name:'Read',
        component: () => import('@/components/ebook/EbookReader')
      }
    ]
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('@/views/store/Index'),
    redirect:'/store/home',
    children:[
      {
        path:'home',
        name:'Home',
        meta:{index:1},
        component: () => import('@/views/store/BookHome')
      },
      {
        path: 'list/:category/:categoryText',
        name: 'List',
        meta:{index:2},
        component: () => import('@/views/store/BookList'),
      },
      {
        path: 'detail/:category/:fileName',
        name: 'Detail',
        meta:{index:3},
        component: () => import('@/components/detail/Index'),
      },
      {
        path: 'shelf',
        name: 'Shelf',
        meta:{index:4},
        component: () => import('@/views/store/BookShelf'),
      }
    ]
  },

]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
