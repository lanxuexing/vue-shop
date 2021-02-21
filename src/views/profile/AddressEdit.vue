<template>
  <div class="addressedit-content">
    <nav-bar>
      <template v-slot:default>地址编辑</template>
    </nav-bar>
     <van-address-edit
      class="edit"
      show-set-default
      show-search-result
      :area-list="areaList"
      :show-delete="false"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import NavBar from 'components/common/navbar/NavBar'
// import { addAddress, editAddress, deleteAddress, getAddressDetail } from 'network/address'

export default {
  name: 'AddressEdit',
  components: {
    NavBar
  },
  setup () {
    // let route = useRoute()
    // let router = useRouter()
    // 组件状态
    const state = reactive({
      areaList: {
        provice_list: {},
        city_list: {},
        county_list: {}
      },
      searchResult: [],
      addressInfo: {}
    })
    // 组件挂载
    onMounted(() => {

    })
    // 保存
    const onSave = () => {

    }
    // 删除
    const onDelete = () => {

    }
    return {
      ...toRefs(state),
      onSave,
      onDelete
    }
  }
}
</script>

<style lang="scss" scoped>
.addressedit-content {
  margin-top: 44px;
  ::v-deep .van-button {
    background-color: var(--color-tint);
    border-color: var(--color-tint)
  }
  .edit {
    ::v-deep .van-filed__body {
      textarea {
        height: 26px !important;
      }
    }
  }
}
</style>