<template>
    <div class="main-view">
        <div class="content">
            <router-view></router-view>
        </div>
        <van-tabbar route>
            <van-tabbar-item icon="apps-o" replace :to="{ name: 'overview' }">总览</van-tabbar-item>
            <van-tabbar-item icon="orders-o" :to="{ name: 'transactionList' }">流水</van-tabbar-item>
            <van-tabbar-item icon="volume-o" :to="{ name: 'command' }">语音</van-tabbar-item>
            <van-tabbar-item icon="debit-pay" replace :to="{ name: 'accounts' }">账户</van-tabbar-item>
            <van-tabbar-item icon="user-o" replace :to="{ name: 'profile' }">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="less" scoped>
.main-view {
    height: 100%;

    .content {
        height: calc(100% - var(--van-tabbar-height));
        overflow: hidden;
    }
}
</style>

<script setup lang="ts">
import { useAccountingStore } from '@/stores/accounting';
import { onMounted } from 'vue';

const accountingStore = useAccountingStore()

onMounted(() => {
    accountingStore.refreshAccounts()
    accountingStore.refreshCategories()
})
</script>