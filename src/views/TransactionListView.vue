<template>
    <div class="transaction-list-view">
        <van-nav-bar :title="title" left-arrow @click-left="back" />
        <van-pull-refresh style="flex: 1" v-model="refreshing" @refresh="load" >
            <van-list
                v-model:loading="loading"
                :finished="hasMore"
                @load="load"
                :immediate-check="false"
            >
                <TransactionRecord
                    v-for="trans in transactions"
                    :key="trans.id"
                    :transaction="trans"
                />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<style lang="less" scoped>
.transaction-list-view {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>

<script setup lang="ts">
import type { Transaction } from '@/api';
import { transactionApi } from '@/remote';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import TransactionRecord from '@/components/TransactionRecord.vue';
import { useRoute } from 'vue-router';
import type { TransactionFilter } from '@/api';

const route = useRoute()

const page = ref(1)
const refreshing = ref(false)
const loading = ref(false)
const transactions = ref<Transaction[]>([])
const total = ref(1)
const hasMore = computed(() => {
    return total.value > transactions.value.length
})

const title = computed(() => {
    if (route.query.accountId) {
        return '账户详情'
    }
    return '流水'
})

const back = () => {
    history.back()
}

const buildFilters = () => {
    const filters: TransactionFilter = {}
    if (route.query.accountId) {
        filters.accountId = Number.parseInt(route.query.accountId as string)
    }
    const timeFilter = (cond: 'lt'|'lte'|'gt'|'gte', val: string) => {
        if (!filters.time) {
            filters.time = {}
        }
        filters.time[cond] = val
    }
    if (route.query.time_lt) {
        timeFilter('lt', route.query.time_lt as string)
    }
    if (route.query.time_lte) {
        timeFilter('lte', route.query.time_lte as string)
    }
    if (route.query.time_gt) {
        timeFilter('gt', route.query.time_gt as string)
    }
    if (route.query.time_gte) {
        timeFilter('gte', route.query.time_gte as string)
    }
    return filters
}

const load = async () => {
    console.log('load', page.value, refreshing.value, loading.value)
    if (refreshing.value) {
        page.value = 1
    } else if (!hasMore.value) {
        loading.value = false
        return
    }
    try {
        const res = await transactionApi.paginateTransactions({
            paginateTransactionsRequest: {
                filters: buildFilters(),
            },
            limit: 20,
            page: page.value,
        })
        total.value = res.total
        if (refreshing.value) {
            transactions.value = []
        }
        transactions.value.push(...(res.data as Transaction[]))
        page.value += 1
    } finally {
        refreshing.value = false
        loading.value = false
    }
}

onMounted(() => {
    load()
})
</script>