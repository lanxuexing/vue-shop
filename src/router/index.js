import { createRouter, createWebHistory } from 'vue-router'
import { Notify } from 'vant'
import store from '../store'
const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Detail = () => import('../views/detail/Detail.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Shopcart = () => import('../views/shopcart/Shopcart.vue')
const Register = () => import('../views/profile/Register.vue')
const Login = () => import('../views/profile/Login.vue')

const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home,
    meta: {
      title: '图书兄弟'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '图书兄弟'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: '商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
    meta: {
      title: '购物车',
      isAuthRequired: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '个人中心',
      isAuthRequired: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫，例如没有登录，在这里做拦截
router.beforeEach((to, from, next) => {
  if (to.meta.isAuthRequired && !store.state.user.isLogin) {
    Notify('您还没有登录，请先登录')
    return next('/login')
  } else {
    next()
  }
  document.title = to.meta.title
})

export default router
