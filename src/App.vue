<template>
  <!-- <router-view/> -->
  <!-- 迁移文档：https://next.router.vuejs.org/guide/migration/index.html#router-view-keep-alive-and-transition -->
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon"><i class="iconfont icon-gouwuche"></i></div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-wode"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</template>

<style lang="scss">
@import 'assets/css/base.css'; // 导入全局样式文件
@import 'assets/css/iconfont.css'; // 导入底部Tab图标

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #F6F6F6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: var(--color-shadow);
  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
  .tab-bar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    height: 50px;
    font-size: var(--font-size);
    .icon {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      display: inline-block;
    }
  }
}

</style>
