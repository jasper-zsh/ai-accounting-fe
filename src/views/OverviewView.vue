<template>
    <div class="overview-view">
        <van-pull-refresh style="flex: 1" v-model="loading" @refresh="load">
            <van-cell-group title="最近流水">
                <TransactionRecord
                    v-for="trans in transactions"
                    :key="trans.id"
                    :transaction="trans"
                />
            </van-cell-group>
        </van-pull-refresh>
        <van-floating-bubble icon="chat" @click="ai" />
    </div>
</template>

<style lang="less" scoped>
.overview-view {
    height: 100%;
    display: flex;
    flex-direction: column;
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

const ai = () => {
    router.push({
        name: 'command'
    })
}

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