import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';

import {
  Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem,
  Collapse, CollapseItem, Tab, Tabs, Card, Image as VanImage,
  Tag, Button, Empty, Form, Field, Notify, Toast, Checkbox,
  CheckboxGroup, SwipeCell, Stepper, SubmitBar, Icon, AddressList,
  AddressEdit
} from 'vant';

createApp(App)
.use(Swipe)
.use(SwipeItem)
.use(Lazyload, { loading: require('./assets/images/default-img.png') })
.use(Badge)
.use(Sidebar)
.use(SidebarItem)
.use(Collapse)
.use(CollapseItem)
.use(Tab)
.use(Tabs)
.use(Card)
.use(VanImage)
.use(Tag)
.use(Button)
.use(Empty)
.use(Form)
.use(Field)
.use(Notify)
.use(Toast)
.use(Checkbox)
.use(CheckboxGroup)
.use(SwipeCell)
.use(Stepper)
.use(SubmitBar)
.use(Icon)
.use(AddressList)
.use(AddressEdit)
.use(store)
.use(router)
.mount('#app')
