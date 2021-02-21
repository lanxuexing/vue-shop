<template>
  <div class="address-content">
    <nav-bar>
      <template v-slot:default>地址管理</template>
    </nav-bar>
    <div v-show="list?.length == 0" class="empty">
      还没有地址信息，去添加吧！
    </div>
    <div class="address-item">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Address',
  components: {
    NavBar
  },
  setup () {
    let router = useRouter()
    // 组件状态
    const state = reactive({
      chosenAddressId: '1',
      list: []
    })
    // 组件挂载
    onMounted(() => {

    })
    // 添加
    const onAdd = () => {
      router.push({ path: '/addressedit', query: { type: 'add' } })
    }
    // 编辑
    const onEdit = (item) => {
      router.push({ path: '/addressedit', query: { type: 'edit', addressId: item.id } })
    }
    // 选中
    const onSelect = (item) => {
      router.push({ path: 'createorder', query: { addressId: item.id } })
    }
    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      onSelect
    }
  }
}
</script>

<style lang="scss" scoped>
.address-content {
  height: 300px;
  .empty {
    display: flex;
    margin-top: 50%;
    justify-content: center;
  }
  .van-radio__icon {
    display: none;
  }
  .address-item{
    margin-top: 45px;
    ::v-deep .van-button {
      background-color: var(--color-tint);
      border-color: var(--color-tint)
    }
  }
}
::v-deep .van-address-list__bottom {
  bottom: 100px !important;
}
</style> 