import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';

import { Swipe, SwipeItem, Lazyload, Badge } from 'vant';

createApp(App)
.use(Swipe)
.use(SwipeItem)
.use(Lazyload, { loading: require('./assets/images/default-img.png') })
.use(Badge)
.use(store)
.use(router)
.mount('#app')
