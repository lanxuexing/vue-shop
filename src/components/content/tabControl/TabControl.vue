<template>
  <div class="tab-control">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab-control-item"
      :class="{active: index == currentIndex}"
      @click.prevent="tabClick(index)">
      <span>{{tab}}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'TabControl',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, {emit}) {
    let currentIndex = ref(0)
    const tabClick = (index) => {
      currentIndex.value = index
      emit('tabClick', index)
    }
    return {
      currentIndex,
      tabClick
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #FFF;
  width: 100%;
  position: sticky; // 吸顶效果
  top: 45px;
  .tab-control-item {
    flex: 1;
    span {
      padding: 6px;
    }
  }
  .active span {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
}
</style>