<template>
    <div class="category-list-view">
        <van-nav-bar title="分类设置" left-arrow @click-left="back" right-text="添加" @click-right="showCreateDialog = true" />
        <van-pull-refresh style="flex: 1" v-model="accountingStore.loadingCategories" @refresh="accountingStore.refreshCategories">
            <van-list>
                <van-cell
                    v-for="category in accountingStore.categories"
                    :key="category.id"
                    :title="category.name"
                />
            </van-list>
        </van-pull-refresh>
        <van-dialog v-model:show="showCreateDialog" title="新建分类" show-cancel-button :before-close="addCategory">
            <van-field v-model="categoryName" placeholder="分类名称" :rules="[{ required: true }]" />
        </van-dialog>
    </div>
</template>

<style lang="less" scoped>
.category-list-view {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>

<script setup lang="ts">
import { categoryApi } from '@/remote';
import { useAccountingStore } from '@/stores/accounting';
import { ref } from 'vue';
import { showFailToast } from 'vant';
import 'vant/es/toast/style';

const accountingStore = useAccountingStore()
const showCreateDialog = ref(false)
const categoryName = ref('')

const back = () => {
    history.back()
}

const addCategory = async (action: any) => {
    if (action !== 'confirm') {
        return true
    }
    if (categoryName.value.length === 0) {
        return false
    }
    try {
        await categoryApi.categoriesPost({
            body: {
                name: categoryName.value,
            },
        })
        categoryName.value = ''
        await accountingStore.refreshCategories()
        return true
    } catch (e) {
        showFailToast('发生错误')
        return true
    }
}
</script>