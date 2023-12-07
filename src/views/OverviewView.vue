<template>
    <div class="overview-view">
        <div class="container">
            <van-pull-refresh style="min-height: 100%;" v-model="loading" @refresh="load">
                <van-cell-group title="最近流水">
                    <TransactionRecord
                        v-for="trans in transactions"
                        :key="trans.id"
                        :transaction="trans"
                        @update="load"
                    />
                </van-cell-group>
            </van-pull-refresh>
        </div>
        <div class="van-safe-area-bottom"></div>
    </div>
</template>

<style lang="less" scoped>
.overview-view {
    height: 100%;
    overflow: scroll;
    .container {
        display: flex;
        flex-direction: column;
    }
}
</style>

<script setup lang="ts">
import type { Transaction } from '@/api';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { transactionApi } from '@/remote';
import TransactionRecord from '@/components/TransactionRecord.vue';
import { useRouter } from 'vue-router';

const loading = ref(false)
const transactions = ref<Transaction[]>([])

const router = useRouter()

const loadRecentTransactions = async () => {
    const res = await transactionApi.transactionsPagePost({
        limit: 20,
        page: 1,
        transactionsPagePostRequest: {
            filter: {},
        }
    })
    // @ts-ignore
    transactions.value = res.data
}

const load = () => {
    console.log('load')
    loading.value = true
    Promise.all([
        loadRecentTransactions(),
    ]).finally(() => {
        loading.value = false
    })
}

onMounted(() => {
    load()
})
</script>