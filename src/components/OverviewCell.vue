<template>
    <van-cell
        :title="name"
        :label="label"
        center
        :to="{ name: 'transactionList', query: { time_gte: props.start, time_lte: props.end } }"
    >
        <template #value>
            <div class="expense">{{ formatMoney(amounts.expense) }}</div>
            <div class="income">{{ formatMoney(amounts.income) }}</div>
        </template>
        <template #label v-if="loadLast">
            <div v-if="lastTransaction">最近一笔&nbsp;{{ lastTransaction?.category?.name }}&nbsp;{{ formatMoney(lastTransaction.amount) }}</div>
            <div v-else>无记录</div>
        </template>
    </van-cell>
</template>

<style scoped>
.expense {
    font-weight: bold;
    font-size: 1rem;
    color: rgb(12, 107, 12);
}
.income {
    color: rgb(150, 12, 12);
    font-weight: bold;
    font-size: 1rem;
}
</style>

<script setup lang="ts">
import { transactionApi } from '@/remote';
import { ref } from 'vue';
import { formatMoney } from '@/utils/strings';
import { computed } from 'vue';
import dayjs from 'dayjs';
import type { Transaction } from '@/api';

const props = withDefaults(defineProps<{
    start: string;
    end?: string;
    name: string;
    loadLast?: boolean;
}>(), {
    loadLast: false,
})

const amounts = ref<Record<string, number>>({})
const lastTransaction = ref<Transaction>()

const label = computed(() => {
    let ret = dayjs(props.start).format('MM-DD')
    if (props.end) {
        ret += ` - ${dayjs(props.end).format('MM-DD')}`
    }
    return ret
})

const buildFilters = () => {
    return {
        time: {
            gte: props.start ?? undefined,
            lte: props.end ?? undefined,
        }
    }
}

const loadLastTransaction = async () => {
    const res = await transactionApi.paginateTransactions({
        paginateTransactionsRequest: {
            filters: buildFilters(),
        },
        limit: 1,
        page: 1,
    })
    if (res.data.length) {
        lastTransaction.value = res.data[0] as Transaction
    }
}

const load = async () => {
    if (props.loadLast) {
        loadLastTransaction()
    }
    const res = await transactionApi.groupTransactions({
        groupTransactionsRequest: {
            filters: buildFilters(),
            groupBy: ['type']
        }
    })
    res.forEach(r => {
        amounts.value[r.type!] = r.amount
    })
}

defineExpose({
    load,
})
</script>